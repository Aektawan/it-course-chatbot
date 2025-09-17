import { Point, Segment, Bridge, Intersection, RoutingConfig } from './types';

export class BridgeGenerator {
  private config: RoutingConfig;

  constructor(config: RoutingConfig) {
    this.config = config;
  }

  /**
   * ตัดสินใจว่าจะยกเส้นไหนตามกฎ H over V
   */
  decideLiftedSegment(intersection: Intersection): Segment {
    const { segment1, segment2 } = intersection;

    // กฎ H over V: ยกเส้นแนวนอนเป็นค่าเริ่มต้น
    if (segment1.type === 'horizontal' && segment2.type === 'vertical') {
      return segment1;
    }
    if (segment1.type === 'vertical' && segment2.type === 'horizontal') {
      return segment2;
    }

    // กรณี parallel segments - ยกเส้นที่สั้นกว่า
    const length1 = this.getSegmentLength(segment1);
    const length2 = this.getSegmentLength(segment2);
    
    return length1 <= length2 ? segment1 : segment2;
  }

  /**
   * สร้าง bridge สำหรับจุดตัด
   */
  createBridge(intersection: Intersection): Bridge | null {
    const liftedSegment = this.decideLiftedSegment(intersection);
    const baseSegment = liftedSegment === intersection.segment1 ? 
                       intersection.segment2 : intersection.segment1;

    // ตรวจสอบว่าจุดตัดไม่ใกล้ endpoint เกินไป
    if (this.isTooCloseToEndpoint(intersection.point, liftedSegment)) {
      return null;
    }

    return {
      intersectionPoint: intersection.point,
      radius: this.config.jumpRadius,
      liftedSegment,
      baseSegment
    };
  }

  /**
   * สร้าง SVG path สำหรับ bridge
   */
  generateBridgePath(segment: Segment, bridges: Bridge[]): string {
    if (bridges.length === 0) {
      return this.generateStraightPath(segment);
    }

    // เรียงลำดับ bridges ตามตำแหน่งบน segment
    const sortedBridges = this.sortBridgesAlongSegment(segment, bridges);
    
    let pathParts: string[] = [];
    let currentPoint = segment.start;

    for (const bridge of sortedBridges) {
      // เส้นตรงก่อนถึง bridge
      if (!this.pointsEqual(currentPoint, this.getBridgeStartPoint(bridge))) {
        pathParts.push(`L ${this.getBridgeStartPoint(bridge).x} ${this.getBridgeStartPoint(bridge).y}`);
      }

      // สร้างโค้ง bridge
      const bridgeArch = this.generateBridgeArch(bridge);
      pathParts.push(bridgeArch);

      currentPoint = this.getBridgeEndPoint(bridge);
    }

    // เส้นตรงสุดท้าย
    if (!this.pointsEqual(currentPoint, segment.end)) {
      pathParts.push(`L ${segment.end.x} ${segment.end.y}`);
    }

    return `M ${segment.start.x} ${segment.start.y} ${pathParts.join(' ')}`;
  }

  /**
   * สร้างโค้ง bridge แบบ arc
   */
  private generateBridgeArch(bridge: Bridge): string {
    const { intersectionPoint, radius, liftedSegment } = bridge;
    const isHorizontal = liftedSegment.type === 'horizontal';

    if (isHorizontal) {
      // Bridge แนวนอน - โค้งขึ้นด้านบน
      const startX = intersectionPoint.x - radius;
      const endX = intersectionPoint.x + radius;
      const y = intersectionPoint.y;
      const peakY = y - radius;

      return `L ${startX} ${y} Q ${intersectionPoint.x} ${peakY} ${endX} ${y}`;
    } else {
      // Bridge แนวตั้ง - โค้งไปข้าง
      const startY = intersectionPoint.y - radius;
      const endY = intersectionPoint.y + radius;
      const x = intersectionPoint.x;
      const peakX = x + radius;

      return `L ${x} ${startY} Q ${peakX} ${intersectionPoint.y} ${x} ${endY}`;
    }
  }

  /**
   * เรียงลำดับ bridges ตามตำแหน่งบน segment
   */
  private sortBridgesAlongSegment(segment: Segment, bridges: Bridge[]): Bridge[] {
    return bridges
      .filter(bridge => bridge.liftedSegment.id === segment.id)
      .sort((a, b) => {
        if (segment.type === 'horizontal') {
          return a.intersectionPoint.x - b.intersectionPoint.x;
        } else {
          return a.intersectionPoint.y - b.intersectionPoint.y;
        }
      });
  }

  /**
   * สร้างเส้นตรงปกติ
   */
  private generateStraightPath(segment: Segment): string {
    return `M ${segment.start.x} ${segment.start.y} L ${segment.end.x} ${segment.end.y}`;
  }

  /**
   * หาความยาวของ segment
   */
  private getSegmentLength(segment: Segment): number {
    const dx = segment.end.x - segment.start.x;
    const dy = segment.end.y - segment.start.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * ตรวจสอบว่าจุดตัดใกล้ endpoint เกินไปหรือไม่
   */
  private isTooCloseToEndpoint(point: Point, segment: Segment): boolean {
    const distanceToStart = Math.sqrt(
      Math.pow(point.x - segment.start.x, 2) + Math.pow(point.y - segment.start.y, 2)
    );
    const distanceToEnd = Math.sqrt(
      Math.pow(point.x - segment.end.x, 2) + Math.pow(point.y - segment.end.y, 2)
    );

    return distanceToStart < this.config.minDistanceFromNode || 
           distanceToEnd < this.config.minDistanceFromNode;
  }

  /**
   * หาจุดเริ่มต้นของ bridge
   */
  private getBridgeStartPoint(bridge: Bridge): Point {
    const { intersectionPoint, radius, liftedSegment } = bridge;
    
    if (liftedSegment.type === 'horizontal') {
      return { x: intersectionPoint.x - radius, y: intersectionPoint.y };
    } else {
      return { x: intersectionPoint.x, y: intersectionPoint.y - radius };
    }
  }

  /**
   * หาจุดสิ้นสุดของ bridge
   */
  private getBridgeEndPoint(bridge: Bridge): Point {
    const { intersectionPoint, radius, liftedSegment } = bridge;
    
    if (liftedSegment.type === 'horizontal') {
      return { x: intersectionPoint.x + radius, y: intersectionPoint.y };
    } else {
      return { x: intersectionPoint.x, y: intersectionPoint.y + radius };
    }
  }

  /**
   * เปรียบเทียบ points
   */
  private pointsEqual(p1: Point, p2: Point): boolean {
    return Math.abs(p1.x - p2.x) < 1 && Math.abs(p1.y - p2.y) < 1;
  }
}