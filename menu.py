import os
import Data

NENHUMA_ENTRADA = -4
IMPRIMIR_MENU = -2
GERAR_DADOS = 1
ALTERAR_DELAY = 2
FORCA_BRUTA = 3
VIZINHO_MAIS_PROXIMO = 4
TEMPERA_SIMULADA = 5
SUBIDA_ENCOSTA = 6
ALGORITMO_GENETICO = 7

dado_entrada = "0"

def alterar_delay() -> float:

    os.system("clear")
    delay = input("Digite um novo valor para o delay do vizinho mais proximo: ")
    return float(delay)

def imprimir_menu(distancias: Data.MelhoresDistancias, qtd_pontos: int, delay) -> None:

    os.system("clear")

    print("Escolha uma opcao:")
    print("1 - Gerar novo conjunto de dados      - Tamanho atual:", qtd_pontos)
    print("2 - Alterar delay (vizinho mais prox) - Delay:", delay)
    print("3 - Forca bruta          - Melhor solucao:", distancias.forca_bruta)
    print("4 - Vizinho mais proximo - Melhor solucao:", distancias.vizinho_mais_prox)
    print("5 - Tempera Simulada     - Melhor solucao:", distancias.tempera_simulada)
    print("6 - Subida da encosta    - Melhor solucao:", distancias.subida_encosta)
    print("7 - Algoritmo genetico   - Melhor solucao:", distancias.algoritmo_genetico)

def gerar_dados():

    os.system("clear")

    print("----- Gerar dados -----")
    qtd_pontos = input("Digite a quantidade de pontos para ser gerada: ")
    novo_set = Data.gerar_dados(int(qtd_pontos))
    return IMPRIMIR_MENU, novo_set
