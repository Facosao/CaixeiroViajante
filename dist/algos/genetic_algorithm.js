import { Path } from "../data/path.js";
import { Draw } from "../draw.js";
import { randInt } from "../util.js";
const POPULATION_SIZE = 50;
export function geneticAlgorithm(points, bestPath) {
    const population = initialPopulation(points, POPULATION_SIZE);
    let failCounter = 0;
    let iter = 0;
    function step() {
        while (failCounter < 500) {
            if (population.length !== POPULATION_SIZE) {
                throw new Error("Population size changed!");
            }
            // Evaluate fitness
            for (const individual of population) {
                individual.fit();
            }
            // Select (POPULATION_SIZE / 2) individuals
            sortPopulation(population);
            for (let i = 0; i < (POPULATION_SIZE / 2); i++) {
                population.pop();
            }
            // Crossover (single-pivot)
            for (let i = 0; i < (POPULATION_SIZE / 2); i++) {
                const first = randInt(POPULATION_SIZE / 2);
                let second = first;
                while (first === second) {
                    second = randInt(POPULATION_SIZE / 2);
                }
                const pivot = randInt(population[first].raw.length - 1);
                const newIndividual = Path.clone(population[first]);
                for (let j = pivot; j < newIndividual.raw.length; j++) {
                    newIndividual.raw[j] = population[second].raw[j];
                }
                newIndividual.fitness = null;
                population.push(newIndividual);
            }
            // Mutation
            for (const individual of population) {
                if (Math.random() < 0.1) {
                    individual.mutate();
                }
            }
            // Termination condition
            const currentBest = findBestIndividual(population);
            if (currentBest.fit() < bestPath.fit()) {
                //bestPath = currentBest;
                bestPath.swap(currentBest.raw);
                failCounter = 0;
            }
            else {
                failCounter += 1;
            }
            iter += 1;
            // Draw (implementation detail)
            if ((iter % 100) === 0) {
                Draw.log("n = " + iter + "\nMenor distância = " + bestPath.fit());
                Draw.path(bestPath.points, bestPath.raw, "black");
                requestAnimationFrame(step);
                break;
            }
        }
        if (failCounter >= 500) {
            Draw.log("Distância total = " + bestPath.fit());
            Draw.path(bestPath.points, bestPath.raw, "green");
        }
    }
    step();
}
function initialPopulation(points, size) {
    const population = [];
    for (let i = 0; i < size; i++) {
        population.push(Path.initialGuess(points));
    }
    return population;
}
function sortPopulation(population) {
    // Insertion sort
    for (let i = 1; i < population.length; i++) {
        if (population[i - 1].fit() > population[i].fit()) {
            for (let j = i; j > 0; j--) {
                if (population[j - 1].fit() < population[j].fit()) {
                    break;
                }
                const aux = population[j];
                population[j] = population[j - 1];
                population[j - 1] = aux;
            }
        }
    }
}
function findBestIndividual(population) {
    let bestIndividual = population[0];
    for (const individual of population) {
        if (individual.fit() < bestIndividual.fit()) {
            bestIndividual = individual;
        }
    }
    return bestIndividual;
}