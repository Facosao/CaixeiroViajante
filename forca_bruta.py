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
    ultimo_valor = -1
    menor_distancia = 10000000
    menor_permutacao = permutacoes[0] 

    for lista in permutacoes:
        if lista[0] != ultimo_valor:
            ultimo_valor = lista[0]
            print("Testando permutacoes que iniciam com", ultimo_valor)

        print(lista)

        check = False

        pontos_conectados = []
        i = 0

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

        distancia = iteracao_forca_bruta(set, lista)

        if distancia < menor_distancia:
            menor_distancia = distancia
            menor_permutacao = lista

    # Resultado final
    iteracao_forca_bruta(set, menor_permutacao, (0, 255, 0))

    return menor_distancia, menor_permutacao
