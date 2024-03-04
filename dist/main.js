var _a;
import { generatePoints } from "./point.js";
import { bruteForce } from "./brute_force.js";
export function execute() {
    const points = generatePoints(7);
    bruteForce(points);
}
(_a = document.getElementById("run")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", execute);
