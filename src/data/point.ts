const WIDTH = 800;
const HEIGHT = 600;
const MARGIN = 10;
const RADIUS = 7;

export class Point {
    x: number;
    y: number;
    static radius: number = RADIUS;

    constructor() {
        this.x = this.generateRandom(WIDTH - MARGIN);
        this.y = this.generateRandom(HEIGHT - MARGIN);
    }

    generateRandom(limit: number): number {
        let attempt = Math.floor(Math.random() * limit);
        while (attempt < MARGIN) {
            attempt = Math.floor(Math.random() * limit);
        }
        return attempt;
    }

    checkOverlap(p: Point): boolean {
        if (this.distanceTo(p) <= (Point.radius * 2)) {
            return true;
        } else {
            return false;
        }
    }

    distanceTo(p: Point): number {
        const dx = Math.abs(this.x - p.x);
        const dy = Math.abs(this.y - p.y);
        return Math.abs(Math.hypot(dx, dy));
    }

    static generatePoints(n: number): Array<Point> {
        const points: Array<Point> = [];
        for (let i = 0; i < n; i++) {
            points.push(new Point());
        }
        
        for (let i = 1; i < n; i++) {
            while (points[i].checkOverlap(points[i-1])) {
                points[i] = new Point();
            }
        }
    
        return points;
    }
}

