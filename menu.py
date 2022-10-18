import os
import Data

NENHUMA_ENTRADA = -4
IMPRIMIR_MENU = -2
GERAR_DADOS = 0
ALTERAR_DELAY = 1
FORCA_BRUTA = 2
VIZINHO_MAIS_PROXIMO = 3
TEMPERA_SIMULADA = 4

dado_entrada = "0"

def alterar_delay() -> int:

    os.system("clear")
    delay = input("Digite um novo valor para o delay do vizinho mais proximo: ")
    return delay

def imprimir_menu(distancias: Data.MelhoresDistancias, qtd_pontos: int, delay) -> None:

    os.system("clear")

    print("Escolha uma opcao:")
    print("0 - Gerar novo conjunto de dados      - Tamanho atual:", qtd_pontos)
    print("1 - Alterar delay (vizinho mais prox) - Delay:", delay)
    print("2 - Forca bruta          - Melhor solucao:", distancias.forca_bruta)
    print("3 - Vizinho mais proximo - Melhor solucao:", distancias.vizinho_mais_prox)
    print("4 - Tempera Simulada     - Melhor solucao:", distancias.tempera_simulada)

def gerar_dados():

    os.system("clear")

    print("----- Gerar dados -----")
    qtd_pontos = input("Digite a quantidade de pontos para ser gerada: ")
    novo_set = Data.gerar_dados(int(qtd_pontos))
    return IMPRIMIR_MENU, novo_set
