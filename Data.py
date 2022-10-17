import random
import math
import pygame

BLACK = (0, 0, 0)
randX = lambda: random.randint(10, 790)
randY = lambda: random.randint(10, 590)
ITEMS = 15

class Circulo:
    def __init__(self) -> None:
        self.pos = randX(), randY()
        self.cor = (0, 0, 255)
        self.raio = 10
        self.surface = pygame.display.get_surface()
        self.conectado = False
        self.indice_prox_circulo = -1

    def desenhar(self) -> None:
        pygame.draw.circle(self.surface, self.cor, self.pos, (self.raio / 2))

def checar_intersecao(circulo_1: Circulo, circulo_2: Circulo) -> bool:

    dx = abs(circulo_1.pos[0] - circulo_2.pos[0])
    dy = abs(circulo_1.pos[1] - circulo_2.pos[1])
    distancia = math.hypot(dx, dy)

    if distancia < circulo_1.raio + circulo_2.raio:
        return True
    else:
        return False

def gerar_dados(total_items: int) -> list[Circulo]:

    set = [Circulo()] * total_items

    for i in range(total_items - 1):
        while checar_intersecao(set[i], set[i + 1]):
            set[i] = Circulo()

    return set
