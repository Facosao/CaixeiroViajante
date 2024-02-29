var _a;
import { generatePoints } from "./point.js";
import { Draw } from "./draw.js";
export function execute() {
    const points = generatePoints(50);
    Draw.drawPoints(points);
}
(_a = document.getElementById("run")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", execute);
