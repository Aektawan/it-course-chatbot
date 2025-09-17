import { Point, Segment, ArrowPath, Bridge, RoutingConfig } from './types';
import { CollisionDetector } from './collision-detection';
import { BridgeGenerator } from './bridge-generator';

export class PathOptimizer {
  private config: RoutingConfig;
  private bridgeGenerator: BridgeGenerator;
  private placedPaths: ArrowPath[] = [];

  constructor(config: RoutingConfig) {
    this.config = config;
    this.bridgeGenerator = new BridgeGenerator(config);
  }

  /**
   * แปลง path points เป็น segments
   */
  pathPointsToSegments(pathPoints: Point[], arrowId: string): Segment[] {
    const segments: Segment[] = [];

    for (let i = 0; i < pathPoints.length - 1; i++) {
      const start = pathPoints[i];
      const end = pathPoints[i + 1];
      
      // ข้าม segment ที่เป็นจุดเดียวกัน
      if (Math.abs(start.x - end.x) < 1 && Math.abs(start.y - end.y) < 1) {
        continue;
      }

      const type = Math.abs(start.x - end.x) > Math.abs(start.y - end.y) ? 
                  'horizontal' : 'vertical';

      segments.push({
        start,
        end,
        type,
        id: `${arrowId}-seg-${i}`,
        arrowId
      });
    }

    return segments;
  }

  /**
   * หา path ที่ดีที่สุดพร้อม bridge
   */
  optimizePath(pathPoints: Point[], arrowId: string): ArrowPath {
    const segments = this.pathPointsToSegments(pathPoints, arrowId);
    
    // หาจุดตัดกับ paths ที่วางไปแล้ว
    const allExistingSegments = this.placedPaths.flatMap(path => path.segments);
    const intersections = segments.flatMap(segment => 
      allExistingSegments.map(existingSegment => 
        CollisionDetector.segmentsIntersect(segment, existingSegment)
      ).filter(Boolean)
    );

    // สร้าง bridges สำหรับจุดตัดที่จำเป็น
    const bridges: Bridge[] = [];
    for (const intersection of intersections) {
      if (intersection && !intersection.isAtEndpoint) {
        const bridge = this.bridgeGenerator.createBridge(intersection);
        if (bridge && !this.bridgeConflictsWithExisting(bridge)) {
          bridges.push(bridge);
        }
      }
    }

    // สร้าง path string พร้อม bridges
    const pathString = this.generatePathStringWithBridges(segments, bridges);
    
    // คำนวณ metrics
    const totalLength = this.calculatePathLength(segments);
    const turns = this.countTurns(pathPoints);
    const penalty = this.calculatePenalty(segments, bridges);

    const optimizedPath: ArrowPath = {
      id: arrowId,
      segments,
      bridges,
      pathString,
      totalLength,
      turns,
      penalty
    };

    // เก็บ path ที่วางแล้ว
    this.placedPaths.push(optimizedPath);

    return optimizedPath;
  }

  /**
   * สร้าง SVG path string พร้อม bridges
   */
  private generatePathStringWithBridges(segments: Segment[], bridges: Bridge[]): string {
    if (segments.length === 0) return '';

    let pathParts: string[] = [];
    let currentPoint = segments[0].start;

    pathParts.push(`M ${currentPoint.x} ${currentPoint.y}`);

    for (const segment of segments) {
      const segmentBridges = bridges.filter(bridge => 
        bridge.liftedSegment.id === segment.id
      );

      if (segmentBridges.length === 0) {
        // เส้นตรงปกติ
        pathParts.push(`L ${segment.end.x} ${segment.end.y}`);
      } else {
        // เส้นที่มี bridges
        const bridgePath = this.bridgeGenerator.generateBridgePath(segment, segmentBridges);
        // ตัด M ออกเพราะเรามี M แล้ว
        pathParts.push(bridgePath.replace(/^M[^L]*/, ''));
      }

      currentPoint = segment.end;
    }

    return pathParts.join(' ');
  }

  /**
   * ตรวจสอบว่า bridge ชนกับที่มีอยู่หรือไม่
   */
  private bridgeConflictsWithExisting(newBridge: Bridge): boolean {
    return this.placedPaths.some(path => 
      path.bridges.some(existingBridge => {
        const distance = Math.sqrt(
          Math.pow(newBridge.intersectionPoint.x - existingBridge.intersectionPoint.x, 2) +
          Math.pow(newBridge.intersectionPoint.y - existingBridge.intersectionPoint.y, 2)
        );
        return distance < this.config.minDistanceBetweenJumps;
      })
    );
  }

  /**
   * คำนวณความยาวรวมของ path
   */
  private calculatePathLength(segments: Segment[]): number {
    return segments.reduce((total, segment) => {
      const dx = segment.end.x - segment.start.x;
      const dy = segment.end.y - segment.start.y;
      return total + Math.sqrt(dx * dx + dy * dy);
    }, 0);
  }

  /**
   * นับจำนวนครั้งที่เลี้ยว
   */
  private countTurns(pathPoints: Point[]): number {
    let turns = 0;
    for (let i = 1; i < pathPoints.length - 1; i++) {
      const prev = pathPoints[i - 1];
      const curr = pathPoints[i];
      const next = pathPoints[i + 1];

      const dir1 = this.getDirection(prev, curr);
      const dir2 = this.getDirection(curr, next);

      if (dir1 !== dir2) {
        turns++;
      }
    }
    return turns;
  }

  /**
   * หาทิศทางของ segment
   */
  private getDirection(p1: Point, p2: Point): 'horizontal' | 'vertical' {
    return Math.abs(p2.x - p1.x) > Math.abs(p2.y - p1.y) ? 'horizontal' : 'vertical';
  }

  /**
   * คำนวณ penalty score
   */
  private calculatePenalty(segments: Segment[], bridges: Bridge[]): number {
    let penalty = 0;

    // penalty สำหรับ bridges
    penalty += bridges.length * 10;

    // penalty สำหรับ segments ที่ใกล้ node เกินไป
    segments.forEach(segment => {
      // ตรวจสอบระยะห่างจาก course boxes (ต้องได้ courseRects จากข้างนอก)
      // penalty += this.checkProximityPenalty(segment);
    });

    return penalty;
  }

  /**
   * รีเซ็ต optimizer สำหรับการวาดใหม่
   */
  reset(): void {
    this.placedPaths = [];
  }

  /**
   * ดึง paths ที่วางแล้วทั้งหมด
   */
  getPlacedPaths(): ArrowPath[] {
    return [...this.placedPaths];
  }
}