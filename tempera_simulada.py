import math
import copy
import random
import pygame
import Data
from nearest_neighbour import nearest_neighbour

class TemperaSimulada:


    def __init__(self, set: list[Data.Circulo]) -> None:
        self.set = set
        self.temperatura = 100000
        self.resfriamento = 0.0005
        self.distancia_atual = 1000000000
        self.solucao_atual = []
        self.melhor_solucao = []
        self.menor_distancia = 1000000000
        self.iteracoes = 0
        self.falhas_consecutivas = 0

        self.chute_inicial()
        
        self.distancia_atual = self.calcular_distancia_total(self.solucao_atual)

        self.melhor_solucao = self.solucao_atual
        self.menor_distancia = self.distancia_atual


    def chute_inicial(self):

        _, self.solucao_atual = nearest_neighbour(self.set, 0)


    def gerar_nova_solucao(self):

        while True:

            solucao_valida = copy.deepcopy(self.solucao_atual)

            inicio_segmento = random.randint(0, (len(self.set) - 1))
            fim_segmento = random.randint(inicio_segmento, (len(self.set) - 1))

            reverso = []
            for i in range(inicio_segmento, (fim_segmento + 1)):
                reverso.append(solucao_valida[i])

            reverso.reverse()
            for i in range(len(reverso)):
                solucao_valida[inicio_segmento + i] = reverso[i]

            return solucao_valida
                            

    def calcular_distancia_total(self, solucao) -> float:

        distancia_total = 0

        for i in range(len(solucao)):

            if i != (len(solucao) - 1):
                dx = abs(self.set[solucao[i]].pos[0] - self.set[solucao[i+1]].pos[0])
                dy = abs(self.set[solucao[i]].pos[1] - self.set[solucao[i+1]].pos[1])
            else:
                dx = abs(self.set[solucao[i]].pos[0] - self.set[solucao[0]].pos[0])
                dy = abs(self.set[solucao[i]].pos[1] - self.set[solucao[0]].pos[1])
          
            distancia = math.hypot(dx, dy)
            distancia_total += distancia

        return distancia_total


    def devo_usar_solucao(self, distancia_solucao) -> False:

        valor_aleatorio = random.random()
        probabilidade_aceitacao = self.distancia_atual - distancia_solucao
        probabilidade_aceitacao /= self.temperatura
        probabilidade_aceitacao = math.exp(probabilidade_aceitacao)

        if distancia_solucao < self.distancia_atual:
            return True

        elif probabilidade_aceitacao > valor_aleatorio:
            return True

        else:
            return False
              

    def iteracao_tempera_simulada(self):
        
        if self.temperatura < 1:
            return

        nova_solucao = self.gerar_nova_solucao()
        nova_distancia = self.calcular_distancia_total(nova_solucao)

        # Decisão

        if self.devo_usar_solucao(nova_distancia):

            self.solucao_atual = nova_solucao
            self.distancia_atual = nova_distancia
            self.falhas_consecutivas = 0
        else:

            self.falhas_consecutivas += 1

        if nova_distancia < self.menor_distancia:

            self.melhor_solucao = nova_solucao
            self.menor_distancia = nova_distancia

        self.temperatura *= (1 - self.resfriamento)

        self.iteracoes += 1
        
        if (self.iteracoes % 1000) == 0:
            print("iteracoes =", self.iteracoes, "melhor_distancia =", self.menor_distancia)

    def imprimir_solucao_custom(self, solucao, cor=(0, 0, 0)):

        surface = pygame.display.get_surface()
        surface.fill((255, 255, 255))

        for i in range(len(solucao)):

            if i != (len(solucao) - 1):
                pygame.draw.aaline(surface, cor, self.set[solucao[i]].pos, self.set[solucao[i+1]].pos)
                self.set[solucao[i]].desenhar()
                self.set[solucao[i+1]].desenhar()
            else:
                pygame.draw.aaline(surface, cor, self.set[solucao[i]].pos, self.set[solucao[0]].pos)
                self.set[solucao[i]].desenhar()
                self.set[solucao[0]].desenhar()
            
        pygame.display.flip()
        pygame.event.pump()

    def executar(self):

        while self.temperatura > 1 and self.falhas_consecutivas < 50:
            self.iteracao_tempera_simulada()
            self.imprimir_solucao_custom(self.solucao_atual)

        if self.distancia_atual < self.menor_distancia:
            self.menor_distancia = self.distancia_atual
            self.melhor_solucao = self.solucao_atual

        self.imprimir_solucao_custom(self.melhor_solucao, (0, 255, 0))

        return self.menor_distancia, self.melhor_solucao
