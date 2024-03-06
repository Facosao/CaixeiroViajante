import { Point } from "./point.js";

export class Draw {
    private static getContext(): CanvasRenderingContext2D {
        const myCanvas = <HTMLCanvasElement> document.getElementById("index-canvas");
        const result = myCanvas.getContext("2d");
        if (result === null) {
            throw new Error("Failed to get canvas element!");
        } else {
            return result;
        }
    }

    static circle(p: Point, color: string = "blue") {
        const ctx = Draw.getContext();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(p.x, p.y, Point.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    static points(points: Array<Point>) {
        for (const point of points) {
            Draw.circle(point);
        }
    }

    static line(p1: Point, p2: Point, color: string) {
        const ctx = Draw.getContext();
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }

    static clearScreen() {
        const ctx = Draw.getContext();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        //ctx.fillStyle = "transparent";
        //ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        //ctx.stroke();
        //ctx.reset();
    }

    static path(points: Array<Point>, path: Array<number>, color: string) {
        Draw.clearScreen();
        for (let i = 0; i < path.length; i++) {
            Draw.line(points[path[i]], points[path[(i+1) % path.length]], color);
        }
        Draw.points(points);
    }
}
