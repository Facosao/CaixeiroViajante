var _a, _b;
import { generatePoints } from "./point.js";
import { bruteForce } from "./brute_force.js";
import { Draw } from "./draw.js";
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
                bruteForce(POINTS);
            }
            break;
        }
        case "nn": {
            alert("Not implemented!");
            break;
        }
        case "sa": {
            alert("Not implemented!");
            break;
        }
        case "ga": {
            alert("Not implemented!");
            break;
        }
    }
}
(_a = document.getElementById("generate-points")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", generatePointsCallback);
(_b = document.getElementById("run")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", executeAlgorithm);