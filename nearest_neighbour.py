from asyncio import events
import math
import time
import pygame
import Data
import forca_bruta


def nearest_neighbour(set: list[Data.Circulo], delay) -> float:
    
    surface = pygame.display.get_surface()
    surface.fill((255, 255, 255))
    Data.imprimir_pontos(set)
    delay = float(delay)

    distancia_total = 0
    conexoes = len(set)
    pontos_conectdos = [-1] * conexoes
    pontos_desconectados: list[int] = []
    for i in range(conexoes):
        pontos_desconectados.append(i)

    nova_conexao = 0

    while conexoes > 0:
      
        menor_distancia = 100000000
        indice_ponto_mais_prox = 0
        
        for j in range(len(pontos_desconectados)):

            if (pontos_desconectados[j] == (-1)) or (pontos_desconectados[j] == nova_conexao):
                continue  # Ponto conectado

            ponto_candidato = j

            dx = abs(set[nova_conexao].pos[0] - set[ponto_candidato].pos[0])
            dy = abs(set[nova_conexao].pos[1] - set[ponto_candidato].pos[1])
            distancia = math.hypot(dx, dy)

            pygame.draw.aaline(surface, (255, 0, 0), set[nova_conexao].pos, set[ponto_candidato].pos)
            set[nova_conexao].desenhar()
            set[ponto_candidato].desenhar()
            pygame.display.flip()
            pygame.event.pump()
            time.sleep(delay)

            if distancia < menor_distancia:
                menor_distancia = distancia
                indice_ponto_mais_prox = ponto_candidato

        # Ponto conectado
        pontos_conectdos[nova_conexao] = indice_ponto_mais_prox

        pontos_desconectados[nova_conexao] = -1

        if menor_distancia == 100000000:
            dx = abs(set[nova_conexao].pos[0] - set[indice_ponto_mais_prox].pos[0])
            dy = abs(set[nova_conexao].pos[1] - set[indice_ponto_mais_prox].pos[1])
            distancia = math.hypot(dx, dy)
            distancia_total += distancia
        else:
            distancia_total += menor_distancia

        surface.fill((255, 255, 255))
        for circulo in set:
            circulo.desenhar()

        for i in range(len(pontos_conectdos)):

            prox_ponto = pontos_conectdos[i]
            if prox_ponto == (-1):
                continue

            pygame.draw.aaline(surface, (0, 255, 0), set[i].pos, set[prox_ponto].pos)
            set[i].desenhar()
            set[prox_ponto].desenhar()

        pygame.display.flip()
        pygame.event.pump()
        time.sleep(delay)

        nova_conexao = indice_ponto_mais_prox
        conexoes -= 1

    
    forca_bruta.iteracao_forca_bruta(set, pontos_conectdos, (0, 255, 0))  # type: ignore
    
    return distancia_total, pontos_conectdos
