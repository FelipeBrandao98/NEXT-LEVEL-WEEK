function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
    .then(res => res.json())
    .then(states => {
      for( const state of states ){
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  stateInput.value = event.target.options[event.target.selectedIndex].text

  citySelect.innerHTML = "<option>Selecione a cidade</option>" 
  citySelect.disabled = true

  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`)
    .then(res => res.json())
    .then(cities => {
      for( const city of cities ){
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false
    })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

const itemsToCollect = document.querySelectorAll(".items-grid li")

for( const item of itemsToCollect ){
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
  event.target.classList.toggle("selected")
  const itemId = event.target.dataset.id

  const alredySelected = selectedItems.findIndex(item => {
    const itemFound = item == itemId
    return itemFound
  })

  if (alredySelected >= 0 ){
    const filteredItems = selectedItems.filter( item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })
    selectedItems = filteredItems
  } else {
    selectedItems.push(itemId)
  }
  collectedItems.value = selectedItems
}
