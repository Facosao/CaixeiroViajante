import copy
from itertools import permutations

resultado = []

def gerar_permutacoes(caixa, temp=[], index=0):
    #print("----- inicio funcao %d -----" % index)

    #print("resultado =", resultado)
    #print("temp      =", temp)
    #print("caixa     =", caixa)

    for numero in caixa:
        #print("------- laco funcao %d -------" % index)
        nova_lista = copy.deepcopy(temp)
        nova_lista.append(numero)

        nova_caixa: list = copy.deepcopy(caixa)

        for i in range(len(caixa)):
            if caixa[i] == numero:
                nova_caixa.pop(i)

        #print("nova_lista =", nova_lista)
        #print("nova_caixa =", nova_caixa)

        gerar_permutacoes(nova_caixa, temp=nova_lista, index=(index+1))

    #print("----- final index %d -----" % index)
    #print("resultado atual =", resultado)
    #print("temp  final     =", temp)
    #print("caixa final     =", caixa)

    if len(caixa) == 0:
        resultado.append(temp)
    else:
        return

gerar_permutacoes([0, 1, 2, 3])

print("Permutações geradas:", len(resultado))

aceito = []

for i in range(len(resultado)):

    permutacao = resultado[i]
    check = False

    for j in range(len(permutacao)):

        indice = permutacao[j]

        if (indice == j) or (permutacao[indice] == j):
            check = True
        
    if check is False:
        aceito.append(permutacao)

print("resultado len =", len(resultado))
print("resultado =", resultado)
            
print("Permutações aceitas:", len(aceito))
print("Permutações =", aceito)
