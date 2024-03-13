export function totalDistance(points, path) {
    let totalDistance = 0;
    for (let i = 0; i < path.length; i++) {
        const dx = Math.abs(points[path[i]].x - points[path[(i + 1) % path.length]].x);
        const dy = Math.abs(points[path[i]].y - points[path[(i + 1) % path.length]].y);
        const dist = Math.abs(Math.hypot(dx, dy)); // Unnecessary abs()?
        totalDistance += dist;
    }
    return totalDistance;
}
class Path {
    constructor(points, pathArray = []) {
        this.path = pathArray;
        this.points = points;
    }
    push(value) {
        this.path.push(value);
    }
    remove(atIndex) {
        this.path.splice(atIndex, 1);
    }
    totalDistance() {
        let totalDistance = 0;
        for (let i = 0; i < this.path.length; i++) {
            const dx = Math.abs(this.points[this.path[i]].x - this.points[this.path[(i + 1) % this.path.length]].x);
            const dy = Math.abs(this.points[this.path[i]].y - this.points[this.path[(i + 1) % this.path.length]].y);
            const dist = Math.abs(Math.hypot(dx, dy)); // Unnecessary abs()?
            totalDistance += dist;
        }
        return totalDistance;
    }
    isShorterThan(path) {
        const hostDistance = this.totalDistance();
        const guestDistance = path.totalDistance();
        return hostDistance < guestDistance;
    }
}
