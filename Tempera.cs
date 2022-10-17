using System;
using System.Linq;
 
namespace TspSA.Domain
{
    public class Planner
    {
        private readonly City[] _cities;
 
        public Planner(
            params City[] cities
            )
        {
            _cities = cities;
 
            CurrentTemperature = 100000d;
            CoolingRate = 0.0005;
            Generation = 0;
 
            CurrentSolution = new Tour(_cities);
            BestSolution = CurrentSolution;
 
            picker = new Random();
        }
 
        public int Generation { get; private set; }
 
        public double CoolingRate { get; set; }
        public double CurrentTemperature { get; set; }
        public Tour CurrentSolution { get; set; }
        public Tour BestSolution { get; set; }
 
        private Random picker;
 
        public bool IsCompleted { get { return CurrentTemperature < 1; } }

        public void Iterate()
        {
            if (CurrentTemperature < 1) // CurrentTemperature Inicial -> 0
            {
                return;
            }
 
            Generation ++; // Inicial -> 0
 
            var indexToSwap1 = (int)Math.Round((CurrentSolution.Route.Count() - 1) * picker.NextDouble());
            var indexToSwap2 = (int)Math.Round((CurrentSolution.Route.Count() - 1) * picker.NextDouble());
 
            var newSolution = CurrentSolution.Swap(indexToSwap1, indexToSwap2);
 
            if (ShouldUse(newSolution))
            // Decide aleatóriamente se deve usar a nova solução
            {
                Console.WriteLine("{2} - Replacing {0} with {1}", CurrentSolution.TotalDistance, newSolution.TotalDistance, Generation);
                CurrentSolution = newSolution;
            }
 
            if (newSolution.IsBestThan(BestSolution))
            // Comparação se a distância de newSolution é menor que a melhor solução atual
            {
                Console.WriteLine("Reducing distance from {0} to {1}", BestSolution.TotalDistance, newSolution.TotalDistance);
                BestSolution = newSolution;
            }
 
            CurrentTemperature *= (1 - CoolingRate);
        }
 
        public void Complete() // Driver das iterações
        {
            CurrentTemperature = 100000d;
            Console.Clear();
            while (!IsCompleted)
            {
                Iterate();
            }
        }
 
        private bool ShouldUse(Tour tour)
        {
            return ComputeAcceptanceProbability(tour) > picker.NextDouble();
            // Comparação se ComputeAcceptanceProbability é maior que um número aleatório entre 0 e 1.
        }
 
        private double ComputeAcceptanceProbability(Tour tour)
        {
            // bool IsBestThan -> Compara se a distância é menor que a melhor solução atual
            return tour.IsBestThan(CurrentSolution) ? 
                1.0 : 
                Math.Exp((CurrentSolution.TotalDistance - tour.TotalDistance) / CurrentTemperature);

            /*
                3 Soluções:
                ---> newSolution -----> Nova iteração da solução atual
                ---> CurrentSolution -> Solução base para comparação e novas soluções
                ---> bestSolution ----> Valor guardado da melhor solução encontrada

                Temperatura -> É sempre decrementada, de maneira incondicional

                Ternário

                if tour.IsBestThan(CurrentSolution) {
                    return 1.0;
                }
                else {
                    resultado = melhor_solucao.distancia_total - atual.distancia_total
                    resultado /= temperatura_atual
                    resultado = euler ^ resultado
                    return resultado;
                }

                Devo usar a solução gerada?
                |
                |---> Decisão aleatória
                |---> Sempre será usada se for melhor que a melhor solução atual
                |---> DIFERENCIAL DA TÊMPERA SIMULADA
                |------> Caso o resultado da fórmula seja maior que o valor gerado de maneira aleatória,
                |------> o algoritmo decide usar uma solução pior que a solução atual.

            */
        }
    }
}