import { generatePoints } from "./point.js";
import { Draw } from "./draw.js";

export function execute() {
    const points = generatePoints(50);
    Draw.drawPoints(points);
}

document.getElementById("run")?.addEventListener("click", execute);