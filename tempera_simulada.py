import math
import copy
import itertools
import random
import pygame
import Data
import forca_bruta
from nearest_neighbour import nearest_neighbour

class TemperaSimulada:


    def __init__(self, set: list[Data.Circulo], swap=True) -> None:
        self.set = set
        self.temperatura = 100000
        self.resfriamento = 0.0005
        self.distancia_atual = 1000000000
        self.solucao_atual = []
        self.melhor_solucao = []
        self.menor_distancia = 1000000000
        self.swap = swap
        self.permutacoes = []
        self.iteracoes = 0
        self.nada_feito = 0

        self.chute_inicial()  # Implementar Nearest Neighbour como alternativa
        
        self.distancia_atual = self.calcular_distancia_total(self.solucao_atual)

        self.melhor_solucao = self.solucao_atual
        self.menor_distancia = self.distancia_atual

        if swap is False:
            self.permutacoes = list(itertools.permutations(range(len(self.set))))


    def chute_inicial(self):

        '''
        possiveis = list(range(len(self.set)))
        j = 0

        while j < len(possiveis):

            num = random.randint(0, (len(self.set) - 1))

            if num == j or (num in self.solucao_atual):
                continue
            else:
                self.solucao_atual.append(num)
                j += 1
        '''

        self.solucao_atual = nearest_neighbour(self.set)


    def gerar_nova_solucao(self):
        
        if self.swap is True:

            while True:

                
                #indice1 = random.randint(0, (len(self.set) - 1))
                #indice2 = random.randint(0, (len(self.set) - 1))

                # Índices gerados não podem ser iguais
                #if indice1 == indice2:
                #    continue

                '''
                # Um nó não pode apontar para si mesmo
                #print("len set =", len(self.set), "len solucao_atual =", len(self.solucao_atual), "indice1 =", indice1, "indice2 =", indice2)
                if self.solucao_atual[indice1] == indice1 or self.solucao_atual[indice2] == indice2:
                    continue

                # O valor em um indice não pode ser atribuido a outro indice igual a este valor
                if indice1 == self.solucao_atual[indice2] or indice2 == self.solucao_atual[indice1]:
                    continue

                valor_indice1 = self.solucao_atual[indice1]
                valor_indice2 = self.solucao_atual[indice2]

                # Dois nós não podem apontar um para o outro
                if valor_indice1 == indice1 or valor_indice2 == indice2:
                    continue
                '''
                
                '''
                solucao_valida = copy.deepcopy(self.solucao_atual)
                valor1 = solucao_valida[indice1]
                valor2 = solucao_valida[indice2]
                solucao_valida[indice1] = valor2
                solucao_valida[indice2] = valor1
                '''
                solucao_valida = random.sample(self.solucao_atual, len(self.solucao_atual))

                #check = False
                check = True

                '''
                for j in range(len(solucao_valida)):

                    indice = solucao_valida[j]

                    if (indice == j) or (solucao_valida[indice] == j):
                        check = True
                        break
                '''

                
                pontos_conectados = []
                i = 0
                #valido = True
                #print("solucao_atual  =", self.solucao_atual)
                #print("solucao_valida =", solucao_valida)

                while len(pontos_conectados) < len(solucao_valida):

                    prox = solucao_valida[i]

                    if pontos_conectados.count(prox) > 0:
                        check = False
                        break
                    else:
                        pontos_conectados.append(prox)

                    i = prox
                        
                if check is False:
                    continue
                
                '''
                TENTATIVA
                Trocar dois numeros entre 1 e limite, e colocar 0 no final

                TENTATIVA 2
                Iterar sobre a lista N vezes tentando achar um começo em que o laço se feche
                -> Alterar o começo da lista em cada iteração
                '''

                return solucao_valida

        else:

            # Gerar permutações
            return self.solucao_atual
                            

    def calcular_distancia_total(self, solucao) -> float:

        distancia_total = 0

        for i in range(len(solucao)):
            dx = abs(self.set[i].pos[0] - self.set[solucao[i]].pos[0])
            dy = abs(self.set[i].pos[1] - self.set[solucao[i]].pos[1])
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

        #print("nova_solucao   =", nova_solucao)
        #print("nova_distancia =", nova_distancia)

        # Decisão

        if self.devo_usar_solucao(nova_distancia):

            print("Troca de", self.distancia_atual, "para", nova_distancia)

            self.solucao_atual = nova_solucao
            self.distancia_atual = nova_distancia
            self.nada_feito = 0
        else:

            self.nada_feito += 1
            print("Nada feito")

        if nova_distancia < self.menor_distancia:

            print("Melhora de", self.menor_distancia, "para", nova_distancia)

            self.melhor_solucao = nova_solucao
            self.menor_distancia = nova_distancia

        self.temperatura *= (1 - self.resfriamento)

        self.iteracoes += 1
        print("iteracoes =", self.iteracoes)

    
    def executar(self):

        while self.temperatura > 1 and self.nada_feito < 50:
            self.iteracao_tempera_simulada()
            forca_bruta.iteracao_forca_bruta(self.set, self.solucao_atual)

        if self.distancia_atual < self.menor_distancia:
            self.menor_distancia = self.distancia_atual
            self.melhor_solucao = self.solucao_atual

        print("melhor_solucao =", self.melhor_solucao)
        forca_bruta.iteracao_forca_bruta(self.set, self.melhor_solucao, (0, 255, 0))
