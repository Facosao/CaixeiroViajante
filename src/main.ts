import { Point, generatePoints } from "./point.js";
import { bruteForce } from "./brute_force.js";
import { nearest_neighbor } from "./nearest_neighbor.js";
import { Draw } from "./draw.js";

let POINTS: Array<Point> | null = null; 

function generatePointsCallback() {
    const inputBox = <HTMLInputElement>document.getElementById("qtd-pontos");
    if (inputBox.value.length > 0) {
        POINTS = generatePoints(parseInt(inputBox.value));
        Draw.clearScreen();
        Draw.points(POINTS);
    }

}

function executeAlgorithm() {
    const method = <HTMLInputElement>document.querySelector('input[name=algoritmo]:checked');
    switch (method.value) {
        case "bf": {
            if (POINTS) {
                bruteForce(POINTS);
            }
            break;
        }
        case "nn": {
            if (POINTS) {
                nearest_neighbor(POINTS);
            }
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

document.getElementById("generate-points")?.addEventListener("click", generatePointsCallback);
document.getElementById("run")?.addEventListener("click", executeAlgorithm);