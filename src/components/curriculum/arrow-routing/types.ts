export interface Point {
  x: number;
  y: number;
}

export interface Segment {
  start: Point;
  end: Point;
  type: 'horizontal' | 'vertical';
  id: string;
  arrowId: string;
}

export interface Intersection {
  point: Point;
  segment1: Segment;
  segment2: Segment;
  isAtEndpoint: boolean;
}

export interface Bridge {
  intersectionPoint: Point;
  radius: number;
  liftedSegment: Segment;
  baseSegment: Segment;
}

export interface ArrowPath {
  id: string;
  segments: Segment[];
  bridges: Bridge[];
  pathString: string;
  totalLength: number;
  turns: number;
  penalty: number;
}

export interface RoutingConfig {
  jumpRadius: number;
  minDistanceFromNode: number;
  minDistanceBetweenJumps: number;
  gapUnderBridge: number;
  courseWidth: number;
  courseHeight: number;
  gutterWidth: number;
  gutterHeight: number;
  clearance: number;
}