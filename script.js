const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sDescricao = document.querySelector('#m-descricao')
const sPreco = document.querySelector('#m-preco')
const sCodigo = document.querySelector('#m-codigo')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sDescricao.value = itens[index].descricao
    sPreco.value = itens[index].preco
    sCodigo.value = itens[index].codigo
    id = index
  } else {
    sNome.value = ''
    sDescricao.value = ''
    sPreco.value = ''
    sCodigo.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = getInnerHtml(item, index); 
  tbody.appendChild(tr)
}

function getInnerHtml(item, index){
    return (`
    <td>${item.nome}</td>
    <td>${item.descricao}</td>
    <td>R$ ${item.preco}</td>
    <td>${item.codigo}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sDescricao.value == '' || sPreco.value == '' || sCodigo.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].descricao = sDescricao.value
    itens[id].preco = sPreco.value
    itens[id].codigo = sCodigo.value
  } else {
    itens.push({'nome': sNome.value, 'descricao': sDescricao.value, 'preco': sPreco.value, 'codigo': sCodigo.value })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()