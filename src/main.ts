import { generatePoints } from "./point.js";
import { bruteForce } from "./brute_force.js";

export function execute() {
    const points = generatePoints(7);
    bruteForce(points);
}

document.getElementById("run")?.addEventListener("click", execute);