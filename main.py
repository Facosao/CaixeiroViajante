import pygame
import Data
import forca_bruta
from nearest_neighbour import nearest_neighbour
from tempera_simulada import TemperaSimulada

WHITE = (255, 255, 255)

if __name__ == "__main__":

    pygame.init()
    surface = pygame.display.set_mode((800, 600), (pygame.SCALED | pygame.RESIZABLE))
    pygame.display.set_caption("Têmpera Simulada")
    surface.fill(WHITE)

    set = Data.gerar_dados(8)
    #blitter.prepare_display()
    clock = pygame.time.Clock()
    proceed = False

    for circulo in set:
        circulo.desenhar()
    pygame.display.flip()

    #forca_bruta.forca_bruta(set)
    #nearest_neighbour(set)
    tempera = TemperaSimulada(set)
    tempera.executar()

    for circulo in set:
        print("coord =", circulo.pos)

    while True:

        event = pygame.event.poll()

        match event.type:

            case pygame.QUIT:
                break

            case pygame.MOUSEBUTTONDOWN:
                proceed = True

        #forca_bruta.forca_bruta(set)

        #if proceed is True:
        #    blitter.prepare_display()

        proceed = False

        pygame.display.flip()
        clock.tick(60)

    pygame.quit()
