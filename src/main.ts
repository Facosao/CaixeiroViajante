import { Point, generatePoints } from "./point.js";
import { Draw } from "./draw.js";
import { bruteForce } from "./brute_force.js";
import { nearestNeighbor } from "./nearest_neighbor.js";
import { simulatedAnnealing } from "./simulated_annealing.js";

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
            alert("Not implemented!");
            break;
        }
    }
}

document.getElementById("generate-points")?.addEventListener("click", generatePointsCallback);
document.getElementById("run")?.addEventListener("click", executeAlgorithm);