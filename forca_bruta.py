import time
import math
import random
import pygame
import Data
import itertools

#pygame.draw.aaline(surface, color, start_pos, end_pos blend=1)

def iteracao_forca_bruta(set: list[Data.Circulo], permutacao: tuple[int, ...], cor: tuple[int, int, int]=(0, 0, 0)) -> float:
    
    surface = pygame.display.get_surface()
    distancia_total = 0

    surface.fill((255, 255, 255))

    for i in range(len(permutacao)):
        dx = abs(set[i].pos[0] - set[permutacao[i]].pos[0])
        dy = abs(set[i].pos[1] - set[permutacao[i]].pos[1])
        distancia = math.hypot(dx, dy)
        distancia_total += distancia

        pygame.draw.aaline(surface, cor, set[i].pos, set[permutacao[i]].pos)
        set[i].desenhar()
        set[permutacao[i]].desenhar()
        #print("----- Iteracao completa -----")

    pygame.display.flip()
    pygame.event.pump()
    #time.sleep(0.25)

    return distancia_total


def forca_bruta(set: list[Data.Circulo]):

    permutacoes = list(itertools.permutations(range(len(set))))
    permutacoes_aceitas = 0
    menor_distancia = 10000000
    menor_permutacao = permutacoes[0] 

    print("total permutacoes =", len(permutacoes))

    for lista in permutacoes:
        print(lista)

        check = False

        '''
        for i in range(len(lista)):

            indice = lista[i]

            if (indice == i) or (lista[indice] == i):
                check = True
        '''

        pontos_conectados = []
        i = 0
        #valido = True
        #print("lista =", lista)

        while len(pontos_conectados) < len(lista):

            prox = lista[i]

            if pontos_conectados.count(prox) > 0:
                check = True
                break
            else:
                pontos_conectados.append(prox)

            i = prox
            
        if check is True:
            continue

        #if lista[len(lista) - 1] != 0:
        #    continue

        permutacoes_aceitas += 1

        print(lista, "--> Aceita")

        distancia = iteracao_forca_bruta(set, lista)
        print("Distancia =", distancia)

        if distancia < menor_distancia:
            menor_distancia = distancia
            menor_permutacao = lista

    print("aceitos =", permutacoes_aceitas)

    # Resultado final
    print("Menor distancia =", menor_distancia)
    print("set final =", menor_permutacao)
    iteracao_forca_bruta(set, menor_permutacao, (0, 255, 0))
