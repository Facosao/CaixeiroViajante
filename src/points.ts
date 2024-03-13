import { Point } from "./point.js";

class Points {
    private points: Array<Point>;
    private observers: Array<CallableFunction>;

    constructor(n: number) {
        this.points = [];
        this.observers = [];

        this.generatePoints(n);        
    }

    generatePoints(n: number) {
        for (let i = 0; i < n; i++) {
            this.points.push(new Point());
        }
        
        for (let i = 1; i < n; i++) {
            while (this.points[i].checkOverlap(this.points[i-1])) {
                this.points[i] = new Point();
            }
        }
    }

    attach(callback: CallableFunction) {
        if (!this.observers.includes(callback)) {
            this.observers.push(callback);
        }
    }

    notify() {
        for (const observer of this.observers) {
            observer();
        }
    }
}