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
