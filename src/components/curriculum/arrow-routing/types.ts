export interface Point {
  x: number;
  y: number;
}

export interface Segment {
  start: Point;
  end: Point;
  direction: 'horizontal' | 'vertical';
}

export interface PathSegment extends Segment {
  edgeId: string;
  segmentIndex: number;
}

export interface Intersection {
  point: Point;
  segment1: PathSegment;
  segment2: PathSegment;
  canBridge: boolean;
  bridgeDirection: 'horizontal' | 'vertical';
}

export interface Bridge {
  center: Point;
  radius: number;
  direction: 'horizontal' | 'vertical';
  edgeId: string;
  segmentIndex: number;
}

export interface ArrowPath {
  id: string;
  originalPoints: Point[];
  finalPoints: Point[];
  bridges: Bridge[];
}