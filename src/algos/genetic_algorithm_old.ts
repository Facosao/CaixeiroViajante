import { Point } from "../data/point.js";
import { Path } from "../data/path.js";
import { Draw } from "../draw.js";
import { randInt } from "../util.js";

const POPULATION_SIZE = 50;

export function geneticAlgorithm(points: Array<Point>, bestPath: Path) {
    const population = initialPopulation(points, POPULATION_SIZE);
    let iter = 0;
    let failCounter = 0;
    let bestIndividual: Path = population[0];

    function step() {
        while (failCounter < 1000) {
            if (population.length !== POPULATION_SIZE) {
                throw new Error("Population size changed!");
            }
    
            // Evaluate fitness
            for (const individual of population) {
                individual.fit();
            }
    
            // Select (POPULATION_SIZE / 2) individuals
            sortPopulation(population);
            for (let i = population.length; i >= (POPULATION_SIZE / 2); i--) {
                population.splice(i, 1);
            }
    
            //if (population.length !== 25) {
            //    throw new Error("Removed too many elements!");
            //}
    
            // Crossover (single-pivot)
            for (let i = 0; i < (POPULATION_SIZE / 2); i++) {
                const first = randInt(POPULATION_SIZE / 2);
                let second = first;
    
                while (first === second) {
                    second = randInt(POPULATION_SIZE / 2);
                }
    
                const pivot = randInt(population[first].raw.length);
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
            if (currentBest.fit() < bestIndividual.fit()) {
                bestIndividual = currentBest;
                failCounter = 0;
            } else {
                failCounter += 1;
            }
    
            iter += 1;
            if ((iter % 100) === 0) {
                //if (iter === 30000) {
                //    console.log("HALT");
                //}
                Draw.log("n = " + iter + "\n Menor distância = " + bestIndividual.fit());
                Draw.path(bestIndividual.points, bestIndividual.raw, "green");
                requestAnimationFrame(step);
                break;
            }
        }

        if (failCounter >= 1000) {
            Draw.log("Distância total = " + bestIndividual.fit());
            Draw.path(bestIndividual.points, bestIndividual.raw, "green");
            bestPath.swap(bestIndividual.raw);
        }
    }

    step();

    
}

function initialPopulation(points: Array<Point>, size: number): Array<Path> {
    const population: Array<Path> = [];
    
    for (let i = 0; i < size; i++) {
        population.push(Path.initialGuess(points));
    }
    
    return population;
}

function sortPopulation(population: Array<Path>) {
    for (let i = 1; i < population.length; i++) {
        if (population[i-1].fit() > population[i].fit()) {
            for (let j = i; j > 0; j--) {
                if (population[j-1].fit() < population[j].fit()) {
                    break;
                }

                const aux = population[j];
                population[j] = population[j-1];
                population[j-1] = aux;
            }
        }
    }
}

function findBestIndividual(population: Array<Path>): Path {
    let bestIndividual: Path = population[0];
    
    for (const individual of population) {
        if (individual.fit() < bestIndividual.fit()) {
            bestIndividual = individual;
        }
    }
    
    return bestIndividual;
}