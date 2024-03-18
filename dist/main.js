var _a, _b;
import { generatePoints } from "./point.js";
import { Draw } from "./draw.js";
import { bruteForce } from "./brute_force.js";
import { nearestNeighbor } from "./nearest_neighbor.js";
import { simulatedAnnealing } from "./simulated_annealing.js";
import { geneticAlgorithm } from "./genetic_algorithm.js";
let POINTS = null;
function generatePointsCallback() {
    const inputBox = document.getElementById("qtd-pontos");
    if (inputBox.value.length > 0) {
        POINTS = generatePoints(parseInt(inputBox.value));
        Draw.clearScreen();
        Draw.points(POINTS);
    }
}
function executeAlgorithm() {
    const method = document.querySelector('input[name=algoritmo]:checked');
    switch (method.value) {
        case "bf": {
            if (POINTS) {
                if (POINTS.length > 10) {
                    alert("Too many points!");
                    return;
                }
                bruteForce(POINTS);
            }
            break;
        }
        case "nn": {
            if (POINTS) {
                nearestNeighbor(POINTS);
            }
            break;
        }
        case "sa": {
            if (POINTS) {
                simulatedAnnealing(POINTS);
            }
            break;
        }
        case "ga": {
            if (POINTS) {
                geneticAlgorithm(POINTS);
            }
            break;
        }
    }
}
(_a = document.getElementById("generate-points")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", generatePointsCallback);
(_b = document.getElementById("run")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", executeAlgorithm);
