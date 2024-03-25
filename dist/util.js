export function clone(arr) {
    return JSON.parse(JSON.stringify(arr));
}
export function range(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(i);
    }
    return arr;
}
export function randInt(n) {
    return Math.floor(Math.random() * n);
}
