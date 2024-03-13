var _a;
import { Point } from "./point.js";
export class Draw {
    static getContext() {
        const myCanvas = document.getElementById("index-canvas");
        const result = myCanvas.getContext("2d");
        if (result === null) {
            throw new Error("Failed to get canvas element!");
        }
        else {
            return result;
        }
    }
    static circle(p, color = "blue") {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(p.x, p.y, Point.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }
    static points(points) {
        for (const point of points) {
            _a.circle(point);
        }
    }
    static line(p1, p2, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    }
    static clearScreen() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    static path(points, path, color) {
        _a.clearScreen();
        for (let i = 1; i < path.length; i++) {
            _a.line(points[path[i - 1]], points[path[i]], color);
        }
        // Complete path, connect last point to first point
        if (path.length == points.length) {
            _a.line(points[path[path.length - 1]], points[path[0]], color);
        }
        _a.points(points);
    }
}
_a = Draw;
Draw.ctx = _a.getContext();
