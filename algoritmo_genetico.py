import random
import copy
from typing import TypeAlias

POPULACAO = 50
Populacao: TypeAlias = list[list[int]]



class AlgoritmoGenetico:
    def __init__(self, pontos: list[int]) -> None:
        self.pontos: list[int] = pontos
        self.melhor_solucao: float | None = None

    def calcular_distancia(self) -> float:
        return 0.1

    def popular(self) -> list[list[int]]: # Gerar N permutações
        populacao: list[list[int]] = []

        for _ in range(POPULACAO):
            permutacao = list(range(POPULACAO))
            random.shuffle(permutacao)
            populacao.append(permutacao)

        return populacao

    def fitness(self, populacao: Populacao) -> Populacao: # Verificar se são soluções válidas
        return [[1]]

    def selecao(self, populacao: Populacao) -> Populacao: # Selecionar as melhores N/2 permutações
        return []

    def cruzamento(self, populacao: Populacao) -> Populacao: # Gerar N/2 novas permutações
        return []

    def mutacao(self, populacao: Populacao) -> Populacao: # Randomizar as permutações geradas pelo cruzamento
        return []

    def encontrar_melhor_solucao(self, populacao: Populacao) -> int:
        return 1

    def loop(self):
        populacao = self.popular()
        melhor_atual: int  = 1 # Indice de populacao[]
        melhor_anterior: int = 0

        while melhor_atual != melhor_anterior: # Condição de parada
            melhor_anterior = melhor_atual
            
            validos = self.fitness(populacao)
            melhores = self.selecao(validos)
            antigos_e_novos = self.cruzamento(melhores)
            antigos_e_randomizados = self.mutacao(antigos_e_novos)

            melhor_atual = self.encontrar_melhor_solucao(antigos_e_randomizados)

        return melhor_atual