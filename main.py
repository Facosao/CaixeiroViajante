import pygame
import menu
import Data
import forca_bruta
from nearest_neighbour import nearest_neighbour
from tempera_simulada import TemperaSimulada

if __name__ == "__main__":

    pygame.init()
    surface = pygame.display.set_mode((800, 600))
    pygame.display.set_caption("Caixeiro Viajante")
    surface.fill((255, 255, 255))

    clock = pygame.time.Clock()

    # ----- Objetos -----
    pontos = []
    distancias = Data.MelhoresDistancias()
    melhor_forca_bruta = []
    melhor_vizinho_prox = []
    melhor_tempera_sim = []

    # ----- Variáveis de controle -----
    delay = 0.1
    estado = menu.IMPRIMIR_MENU

    while True:

        confirmacao = False
        event = pygame.event.poll()

        match event.type:  # ----- Entrada -----

            case pygame.QUIT:
                break

            case pygame.MOUSEBUTTONDOWN:
                proceed = True

            case pygame.KEYDOWN:
                
                if pygame.K_0 <=  event.key <= pygame.K_9 or\
                   pygame.K_KP0 <= event.key <= pygame.K_KP9:
                    
                    estado = event.key
                    estado %= 48

        match estado:  # ----- Gerenciar Estados -----

            case menu.IMPRIMIR_MENU:
                menu.imprimir_menu(distancias, len(pontos), delay)
                estado = menu.NENHUMA_ENTRADA

            case menu.ALTERAR_DELAY:
                delay = menu.alterar_delay()
                estado = menu.IMPRIMIR_MENU

            case menu.GERAR_DADOS:

                estado, pontos = menu.gerar_dados()
                tempera = TemperaSimulada(pontos)
                distancias = Data.MelhoresDistancias()
                melhor_forca_bruta = []
                melhor_vizinho_prox = []
                melhor_tempera_sim = []
                Data.imprimir_pontos(pontos)
                
            case menu.FORCA_BRUTA:

                if distancias.forca_bruta == (-1):
                    distancias.forca_bruta, melhor_forca_bruta = forca_bruta.forca_bruta(pontos)
                
                forca_bruta.iteracao_forca_bruta(pontos, melhor_forca_bruta, (0, 255, 0))
                estado = menu.IMPRIMIR_MENU

            case menu.VIZINHO_MAIS_PROXIMO:
                
                if distancias.vizinho_mais_prox == (-1):
                    distancias.vizinho_mais_prox, melhor_vizinho_prox = nearest_neighbour(pontos, delay)

                forca_bruta.iteracao_forca_bruta(pontos, melhor_vizinho_prox, (0, 255, 0))
                estado = menu.IMPRIMIR_MENU

            case menu.TEMPERA_SIMULADA:
                
                if distancias.tempera_simulada == (-1):
                    distancias.tempera_simulada, melhor_tempera_sim = tempera.executar()
                
                tempera.imprimir_solucao_custom(tempera.melhor_solucao, (0, 255, 0))
                estado = menu.IMPRIMIR_MENU

            case menu.NENHUMA_ENTRADA:
                pass

        pygame.display.flip()  # ----- Manter janela atualizada -----
        clock.tick(60)

    pygame.quit()
