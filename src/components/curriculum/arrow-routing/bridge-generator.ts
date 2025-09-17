import { Point, Bridge, Intersection, ArrowPath } from './types';

export const generateBridge = (intersection: Intersection, radius = 7): Bridge => {
  return {
    center: intersection.point,
    radius,
    direction: intersection.bridgeDirection,
    edgeId: intersection.bridgeDirection === 'horizontal' 
      ? (intersection.segment1.direction === 'horizontal' ? intersection.segment1.edgeId : intersection.segment2.edgeId)
      : (intersection.segment1.direction === 'vertical' ? intersection.segment1.edgeId : intersection.segment2.edgeId),
    segmentIndex: intersection.bridgeDirection === 'horizontal'
      ? (intersection.segment1.direction === 'horizontal' ? intersection.segment1.segmentIndex : intersection.segment2.segmentIndex)
      : (intersection.segment1.direction === 'vertical' ? intersection.segment1.segmentIndex : intersection.segment2.segmentIndex)
  };
};

export const insertBridgeIntoPath = (originalPoints: Point[], bridge: Bridge): Point[] => {
  const newPoints = [...originalPoints];
  const { center, radius, direction } = bridge;
  
  // Find the segment that needs the bridge
  for (let i = 0; i < newPoints.length - 1; i++) {
    const start = newPoints[i];
    const end = newPoints[i + 1];
    
    // Check if this segment contains the bridge center
    const isOnSegment = direction === 'horizontal' 
      ? (Math.abs(start.y - center.y) < 1 && 
         center.x >= Math.min(start.x, end.x) && 
         center.x <= Math.max(start.x, end.x))
      : (Math.abs(start.x - center.x) < 1 && 
         center.y >= Math.min(start.y, end.y) && 
         center.y <= Math.max(start.y, end.y));
    
    if (isOnSegment) {
      // Create bridge points
      const bridgePoints: Point[] = [];
      
      if (direction === 'horizontal') {
        // Horizontal bridge (arc goes up and down)
        bridgePoints.push({ x: center.x - radius, y: center.y });
        bridgePoints.push({ x: center.x - radius * 0.7, y: center.y - radius });
        bridgePoints.push({ x: center.x, y: center.y - radius });
        bridgePoints.push({ x: center.x + radius * 0.7, y: center.y - radius });
        bridgePoints.push({ x: center.x + radius, y: center.y });
      } else {
        // Vertical bridge (arc goes left and right)
        bridgePoints.push({ x: center.x, y: center.y - radius });
        bridgePoints.push({ x: center.x + radius, y: center.y - radius * 0.7 });
        bridgePoints.push({ x: center.x + radius, y: center.y });
        bridgePoints.push({ x: center.x + radius, y: center.y + radius * 0.7 });
        bridgePoints.push({ x: center.x, y: center.y + radius });
      }
      
      // Replace the segment with bridge points
      newPoints.splice(i + 1, 0, ...bridgePoints);
      break;
    }
  }
  
  return newPoints;
};

export const generateBridgedPaths = (
  originalPaths: Array<{ id: string; pathPoints: Point[] }>,
  intersections: Intersection[],
  courseRects: Array<{x: number, y: number, width: number, height: number}>
): ArrowPath[] => {
  const bridgedPaths: ArrowPath[] = [];
  
  // Group intersections by edge that should get the bridge
  const bridgesByEdge = new Map<string, Bridge[]>();
  
  intersections.forEach(intersection => {
    const bridge = generateBridge(intersection);
    
    if (!bridgesByEdge.has(bridge.edgeId)) {
      bridgesByEdge.set(bridge.edgeId, []);
    }
    bridgesByEdge.get(bridge.edgeId)!.push(bridge);
  });
  
  // Apply bridges to each path
  originalPaths.forEach(path => {
    let finalPoints = [...path.pathPoints];
    const bridges = bridgesByEdge.get(path.id) || [];
    
    // Sort bridges by position along the path to avoid conflicts
    const sortedBridges = bridges.sort((a, b) => {
      // Simple distance-based sorting - could be improved
      return a.center.x - b.center.x;
    });
    
    // Apply each bridge
    sortedBridges.forEach(bridge => {
      finalPoints = insertBridgeIntoPath(finalPoints, bridge);
    });
    
    bridgedPaths.push({
      id: path.id,
      originalPoints: path.pathPoints,
      finalPoints,
      bridges: sortedBridges
    });
  });
  
  return bridgedPaths;
};