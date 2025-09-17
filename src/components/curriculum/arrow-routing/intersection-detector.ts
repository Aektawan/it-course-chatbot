import { Point, Segment, PathSegment, Intersection } from './types';

export const getSegmentDirection = (start: Point, end: Point): 'horizontal' | 'vertical' => {
  return Math.abs(end.x - start.x) > Math.abs(end.y - start.y) ? 'horizontal' : 'vertical';
};

export const pathToSegments = (points: Point[], edgeId: string): PathSegment[] => {
  const segments: PathSegment[] = [];
  
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];
    const direction = getSegmentDirection(start, end);
    
    segments.push({
      start,
      end,
      direction,
      edgeId,
      segmentIndex: i
    });
  }
  
  return segments;
};

export const segmentsIntersect = (seg1: PathSegment, seg2: PathSegment): Point | null => {
  const { start: p1, end: p2 } = seg1;
  const { start: p3, end: p4 } = seg2;
  
  // Check if segments are orthogonal (one horizontal, one vertical)
  if (seg1.direction === seg2.direction) {
    return null; // Parallel segments handled by lane shifting
  }
  
  let hSeg: PathSegment, vSeg: PathSegment;
  if (seg1.direction === 'horizontal') {
    hSeg = seg1;
    vSeg = seg2;
  } else {
    hSeg = seg2;
    vSeg = seg1;
  }
  
  const hY = hSeg.start.y;
  const hMinX = Math.min(hSeg.start.x, hSeg.end.x);
  const hMaxX = Math.max(hSeg.start.x, hSeg.end.x);
  
  const vX = vSeg.start.x;
  const vMinY = Math.min(vSeg.start.y, vSeg.end.y);
  const vMaxY = Math.max(vSeg.start.y, vSeg.end.y);
  
  // Check if intersection point is within both segment bounds
  if (vX >= hMinX && vX <= hMaxX && hY >= vMinY && hY <= vMaxY) {
    return { x: vX, y: hY };
  }
  
  return null;
};

export const isPointAtEndpoint = (point: Point, segment: PathSegment, tolerance = 2): boolean => {
  const distToStart = Math.sqrt(
    Math.pow(point.x - segment.start.x, 2) + Math.pow(point.y - segment.start.y, 2)
  );
  const distToEnd = Math.sqrt(
    Math.pow(point.x - segment.end.x, 2) + Math.pow(point.y - segment.end.y, 2)
  );
  
  return distToStart <= tolerance || distToEnd <= tolerance;
};

export const isNearNode = (point: Point, courseRects: Array<{x: number, y: number, width: number, height: number}>, minDistance = 12): boolean => {
  return courseRects.some(rect => {
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    const distance = Math.sqrt(
      Math.pow(point.x - centerX, 2) + Math.pow(point.y - centerY, 2)
    );
    return distance < minDistance;
  });
};

export const detectIntersections = (
  allSegments: PathSegment[], 
  courseRects: Array<{x: number, y: number, width: number, height: number}>
): Intersection[] => {
  const intersections: Intersection[] = [];
  
  for (let i = 0; i < allSegments.length; i++) {
    for (let j = i + 1; j < allSegments.length; j++) {
      const seg1 = allSegments[i];
      const seg2 = allSegments[j];
      
      // Skip if same edge
      if (seg1.edgeId === seg2.edgeId) continue;
      
      const intersection = segmentsIntersect(seg1, seg2);
      if (!intersection) continue;
      
      // Check if intersection is at endpoint (not allowed for bridges)
      if (isPointAtEndpoint(intersection, seg1) || isPointAtEndpoint(intersection, seg2)) {
        continue;
      }
      
      // Check if too close to nodes
      if (isNearNode(intersection, courseRects)) {
        continue;
      }
      
      intersections.push({
        point: intersection,
        segment1: seg1,
        segment2: seg2,
        canBridge: true,
        bridgeDirection: 'horizontal' // Prefer horizontal over vertical
      });
    }
  }
  
  return intersections;
};