import copy
from itertools import permutations

resultado = []


def gerar_permutacoes(caixa, temp=[], index=0):
    for numero in caixa:
        nova_lista = copy.deepcopy(temp)
        nova_lista.append(numero)

        nova_caixa: list = copy.deepcopy(caixa)

        for i in range(len(caixa)):
            if caixa[i] == numero:
                nova_caixa.pop(i)

        gerar_permutacoes(nova_caixa, temp=nova_lista, index=(index + 1))

    if len(caixa) == 0:
        resultado.append(temp)
    else:
        return


gerar_permutacoes([0, 1, 2, 3])
print(resultado)
