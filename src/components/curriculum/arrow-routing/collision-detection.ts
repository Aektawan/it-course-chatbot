import { Point, Segment, Intersection } from './types';

export class CollisionDetector {
  /**
   * ตรวจสอบว่าสอง segment ตัดกันหรือไม่
   */
  static segmentsIntersect(seg1: Segment, seg2: Segment): Intersection | null {
    // ถ้าเป็น segment เดียวกันหรือเป็นของ arrow เดียวกัน
    if (seg1.id === seg2.id || seg1.arrowId === seg2.arrowId) {
      return null;
    }

    const intersection = this.findIntersectionPoint(seg1, seg2);
    if (!intersection) return null;

    // ตรวจสอบว่าจุดตัดอยู่ที่ endpoint หรือไม่
    const isAtEndpoint = this.isPointAtEndpoint(intersection, seg1) || 
                         this.isPointAtEndpoint(intersection, seg2);

    return {
      point: intersection,
      segment1: seg1,
      segment2: seg2,
      isAtEndpoint
    };
  }

  /**
   * หาจุดตัดของสอง segment
   */
  private static findIntersectionPoint(seg1: Segment, seg2: Segment): Point | null {
    // ถ้าทั้งสองเป็น horizontal หรือ vertical ไม่ตัดกัน (ยกเว้นขนานกัน)
    if (seg1.type === seg2.type) {
      return this.findParallelIntersection(seg1, seg2);
    }

    // กรณี horizontal vs vertical
    const [hSeg, vSeg] = seg1.type === 'horizontal' ? [seg1, seg2] : [seg2, seg1];
    
    const hY = hSeg.start.y;
    const vX = vSeg.start.x;
    
    // ตรวจสอบว่าจุดตัดอยู่ในช่วงของทั้งสอง segment
    const hMinX = Math.min(hSeg.start.x, hSeg.end.x);
    const hMaxX = Math.max(hSeg.start.x, hSeg.end.x);
    const vMinY = Math.min(vSeg.start.y, vSeg.end.y);
    const vMaxY = Math.max(vSeg.start.y, vSeg.end.y);

    if (vX >= hMinX && vX <= hMaxX && hY >= vMinY && hY <= vMaxY) {
      return { x: vX, y: hY };
    }

    return null;
  }

  /**
   * หาจุดตัดของ segment ที่ขนานกัน (overlapping)
   */
  private static findParallelIntersection(seg1: Segment, seg2: Segment): Point | null {
    if (seg1.type === 'horizontal') {
      // ตรวจสอบว่าอยู่ในแถวเดียวกัน
      if (Math.abs(seg1.start.y - seg2.start.y) > 1) return null;

      const seg1MinX = Math.min(seg1.start.x, seg1.end.x);
      const seg1MaxX = Math.max(seg1.start.x, seg1.end.x);
      const seg2MinX = Math.min(seg2.start.x, seg2.end.x);
      const seg2MaxX = Math.max(seg2.start.x, seg2.end.x);

      // หา overlap
      const overlapStart = Math.max(seg1MinX, seg2MinX);
      const overlapEnd = Math.min(seg1MaxX, seg2MaxX);

      if (overlapStart < overlapEnd) {
        // คืนจุดกึ่งกลางของ overlap
        return {
          x: (overlapStart + overlapEnd) / 2,
          y: seg1.start.y
        };
      }
    } else {
      // vertical segments
      if (Math.abs(seg1.start.x - seg2.start.x) > 1) return null;

      const seg1MinY = Math.min(seg1.start.y, seg1.end.y);
      const seg1MaxY = Math.max(seg1.start.y, seg1.end.y);
      const seg2MinY = Math.min(seg2.start.y, seg2.end.y);
      const seg2MaxY = Math.max(seg2.start.y, seg2.end.y);

      const overlapStart = Math.max(seg1MinY, seg2MinY);
      const overlapEnd = Math.min(seg1MaxY, seg2MaxY);

      if (overlapStart < overlapEnd) {
        return {
          x: seg1.start.x,
          y: (overlapStart + overlapEnd) / 2
        };
      }
    }

    return null;
  }

  /**
   * ตรวจสอบว่าจุดอยู่ที่ endpoint ของ segment หรือไม่
   */
  private static isPointAtEndpoint(point: Point, segment: Segment): boolean {
    const tolerance = 1;
    return (
      (Math.abs(point.x - segment.start.x) < tolerance && 
       Math.abs(point.y - segment.start.y) < tolerance) ||
      (Math.abs(point.x - segment.end.x) < tolerance && 
       Math.abs(point.y - segment.end.y) < tolerance)
    );
  }

  /**
   * หาทุกจุดตัดในชุด segments
   */
  static findAllIntersections(segments: Segment[]): Intersection[] {
    const intersections: Intersection[] = [];

    for (let i = 0; i < segments.length; i++) {
      for (let j = i + 1; j < segments.length; j++) {
        const intersection = this.segmentsIntersect(segments[i], segments[j]);
        if (intersection && !intersection.isAtEndpoint) {
          intersections.push(intersection);
        }
      }
    }

    return intersections;
  }

  /**
   * ตรวจสอบว่าจุดอยู่ใกล้ node เกินไปหรือไม่
   */
  static isTooCloseToNode(point: Point, courseRects: any[], minDistance: number): boolean {
    return courseRects.some(rect => {
      const distance = Math.min(
        Math.abs(point.x - rect.left),
        Math.abs(point.x - rect.right),
        Math.abs(point.y - rect.top),
        Math.abs(point.y - rect.bottom)
      );
      return distance < minDistance;
    });
  }
}