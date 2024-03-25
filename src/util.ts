export function clone(arr: Array<number>): Array<number> {
    return JSON.parse(JSON.stringify(arr));
}

export function range(n: number): Array<number> {
    const arr: Array<number> = [];
    for (let i = 0; i < n; i++) {
        arr.push(i);
    }
    return arr;
}

export function randInt(n: number): number {
    return Math.floor(Math.random() * n);
}