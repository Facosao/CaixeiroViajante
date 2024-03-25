import { Point } from "./data/point.js";
import { Path } from "./data/path.js";
import { Draw } from "./draw.js";
import { bruteForce } from "./algos/brute_force.js";
import { nearestNeighbor } from "./algos/nearest_neighbor.js";
import { simulatedAnnealing } from "./algos/simulated_annealing.js";
import { geneticAlgorithm } from "./algos/genetic_algorithm.js";
//import { geneticAlgorithm } from "./algos/genetic_algorithm_old.js";

let POINTS: Array<Point> | null = null;

let bestBruteForce: Path | null;
let bestNearestNeighbor: Path | null;
let bestSimulatedAnnealing: Path | null;
let bestGeneticAlgorithm: Path | null;

function generatePointsCallback() {
    const inputBox = <HTMLInputElement>document.getElementById("qtd-pontos");
    if (inputBox.value.length > 0) {
        POINTS = Point.generatePoints(parseInt(inputBox.value));
        Draw.log("-----");
        Draw.clearScreen();
        Draw.points(POINTS);

        bestBruteForce = null;
        bestNearestNeighbor = null;
        bestSimulatedAnnealing = null;
        bestGeneticAlgorithm = null;
    }

}

function executeAlgorithm() {
    const method = <HTMLInputElement>document.querySelector('input[name=algoritmo]:checked');

    switch (method.value) {
        case "bf": {
            if (POINTS) {
                if (POINTS.length > 8) {
                    alert("Limite de pontos para a força bruta: <= 8 pontos");
                    return;
                }

                bestBruteForce = Path.initialGuess(POINTS);
                bruteForce(POINTS, bestBruteForce);
            }
            break;
        }
        case "nn": {
            if (POINTS) {
                bestNearestNeighbor = Path.initialGuess(POINTS);
                nearestNeighbor(POINTS, bestNearestNeighbor);
            }
            break;
        }
        case "sa": {
            if (POINTS) {
                bestSimulatedAnnealing = Path.initialGuess(POINTS);
                simulatedAnnealing(POINTS, bestSimulatedAnnealing);
            }
            break;
        }
        case "ga": {
            if (POINTS) {
                bestGeneticAlgorithm = Path.initialGuess(POINTS);
                geneticAlgorithm(POINTS, bestGeneticAlgorithm);
            }
            break;
        }
    }
}

document.getElementById("generate-points")?.addEventListener("click", generatePointsCallback);
document.getElementById("run")?.addEventListener("click", executeAlgorithm);
addEventListener("input", (evt) => {
    const elRadio = (<HTMLElement>evt.target).closest(`[type="radio"]`);
    if (!elRadio) return; // Not a radio element. Do nothing.
    
    let validPath: Path | null = null;

    switch (elRadio.id) {
        case "op-bf":
            if (bestBruteForce)
                validPath = bestBruteForce;
            break;
        case "op-nn":
            if (bestNearestNeighbor)
                validPath = bestNearestNeighbor;
            break;
        case "op-sa":
            if (bestSimulatedAnnealing)
                validPath = bestSimulatedAnnealing;
            break;
        case "op-ga":
            if (bestGeneticAlgorithm)
                validPath = bestGeneticAlgorithm;
            break;
    }

    if (validPath) {
        Draw.log("Distância total = " + validPath.fit());
        Draw.path(validPath.points, validPath.raw, "green");
    } else {
        Draw.log("-----");
        Draw.clearScreen();
        if (POINTS) {
            Draw.points(POINTS);
        }
    }
});