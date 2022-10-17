import random

set = [0, 1, 2, 3, 4, 5, 6]

solucao_atual = []

for i in range(1, (len(set))):
    solucao_atual.append(i)

solucao_atual.append(0)

print("solucao_atual =", solucao_atual)

def verificar_loop(caminho):

    pontos_conectados = []
    i = 0
    valido = True

    while len(pontos_conectados) < len(caminho):

        prox = caminho[i]

        #print("i =", i, "caminho[i] =", prox)

        if prox in pontos_conectados:
            valido = False
            break
        else:
            pontos_conectados.append(prox)

        i = prox

    return valido

#print("Valido =", valido)

def gerar_caminho_aleatorio():

    possiveis = list(range(len(set)))
    aleatorio = []

    j = 0
    while j < len(possiveis):

        num = random.randint(0,(len(set) - 1))

        if num == j or (num in aleatorio):
            continue
        else:
            aleatorio.append(num)
            j += 1

    return aleatorio

total = 0
for i in range(100000):

    novo_caminho = random.sample(set, len(set))
    #print("caminho =", novo_caminho)
    if verificar_loop(novo_caminho) is True:
        total += 1
        print("caminho =", novo_caminho, "----- ACEITO -----")
        print("i =", i, "total   =", total)
    else:
        print("i =", i, "total   =", total)

print("Fim da busca")
#print("aleatorio =", aleatorio)
