const modal = document.querySelector(".node-container");
const tbody = document.querySelector("tbody");
const sNome = document.querySelector("#m-nome");
const sFuncao = document.querySelector("#m-funcao");
const sSalario = document.querySelector("#m-salario");
const btnSalvar = document.querySelector("#btnSalvar");

/* Variável para armazenar itens do nosso banco*/
let itens

/* Variável para armazenar os index para edição */
let id


/* Função para pegar os itens do banco através do getItem do nosso banco dbfunc e caso não tiver nada, vai retornar um array vazio */
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
/* Função para setar os items da nossa variável itens pra dentro do nosso banco */
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(items));

/* Função pra quando a tela for carregada e vai pegar os itens do nosso banco de dados e será feito um for em cada dado
pra que seja criada cada linha através do insertItem  que será criado abaixo dessa função */

function loadItens(){
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}

loadItens()

/* Nessa função irei passar o item do nosso banco e tb o index, criar um elemtno tr e através do innerHTML
eu vou criar as td de nome, função e salário, criar as colunas de edição e exclusão e por fim, incluindo cada item 
pra dentro do nosso body */

function insertItem(item , index) {
    let tr = document.createElement("tr")

    tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>${item.salario}</td>
    <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit'> </i></button>
    </td>
    <td class="acao">
        <button onclick="deleteItem(${index})"<i class='bx bx-trash'> </i></button>
    </td>
    `
    tbody.appendChild(tr)
}

/* Funções de edição e deleção */

/*Função de edição, primeiro passamos o index e em seguida uma outra função que iremos criar e com o index passado pra ela tb*/

function editItem(index) {
    openModal(true, index)
}

/*Função de deleção, que passamos o index, no nosso array itens será feito um splice do index e será removido 1 
após isso iremos atualizar nosso banco e carregar a página novamente*/

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

/* Função pra abrirmos nosso modal pra quando for clicar em incluir, iremos adicionar a classe active pro modal ficar ativo em tela 
e cada clique fora do modal, será removido o active, adicionamos uma condição pra quando for pra edição
ele vai carregar os itens e caso nao for uma edição, ele vai carregar os itens vazios para adiocionarmos  */

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if(e.target.className.indexOf('modal-container') === -1) {
            modal.classList.remove('ative')
        }
    }
    if(edit) {
        sNome.value = itens[index].nome
        sFuncao.value = itens[index].funcao
        sSalario.value = itens[index].salario
        id = index
    } else {
        sNome.value = ''
        sFuncao.value = ''
        sSalario.value = ''
    }
}

/* Incluir o salvamento dos dados no btn salvar*/





