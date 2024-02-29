import { Point } from "./point.js";

export class Draw {
    private static getContext(): CanvasRenderingContext2D {
        const myCanvas = <HTMLCanvasElement> document.getElementById("index-canvas");
        const result = myCanvas.getContext("2d", {
            willReadFrequently: true
        });
        if (result === null) {
            throw new Error("Failed to get canvas element!");
        } else {
            return result;
        }
    }

    static drawCircle(p: Point) {
        const ctx = Draw.getContext();
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(p.x, p.y, Point.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    static drawPoints(points: Array<Point>) {
        for (const point of points) {
            Draw.drawCircle(point);
        }
    }

    static drawLine(p1: Point, p2: Point, color: string) {
        const ctx = Draw.getContext();
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
}
