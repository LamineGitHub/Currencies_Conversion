import { countries } from "./currencies.js"

const divList = document.getElementById("country")
const search = document.getElementById("search")
const selectCountryFrom = document.getElementById("selectCountryFrom")
const selectCountryTo = document.getElementById("selectCountryTo")

const codeFrom = selectCountryFrom.firstElementChild
const codeTo = selectCountryTo.firstElementChild
const selectedFromId = "selectedFrom"
const selectedToId = "selectedTo"

// let selectFromOrTo = true
let selectFromOrTo = { from: true, to: false }

selectCountryFrom.addEventListener("click", () => {
  selectFromOrTo = true
})
selectCountryTo.addEventListener("click", () => {
  selectFromOrTo = false
})

/**
 * Il crée une liste de pays
 * @param {Object[]} countries - un tableau d'objets, chaque objet représentant un pays.
 */
const createListCountry = (countries) => {
  const ul = document.createElement("ul")
  ul.setAttribute("id", "ulListCountry")

  const countryListItems = countries.map((country) => {
    const li = document.createElement("li")
    li.setAttribute("id", country.code)
    // li.setAttribute("symbol", country.symbol)
    // li.setAttribute("data-name", country.name.toLowerCase())

    const name = document.createElement("span")
    const code = document.createElement("span")

    name.textContent = country.name
    // name.innerText += country.symbol_native
    name.classList.add("inline-block", "w-[240px]")

    code.textContent = country.code
    code.classList.add("inline-block", "w-11")

    li.classList.add("liStyle")
    li.appendChild(code)
    li.appendChild(name)

    if (country.code === codeFrom.textContent) {
      const selected = document.createElement("span")
      selected.innerHTML = /* html */ `<img src="./img/coche.svg" class="mb-1" width="20px">`
      selected.setAttribute("id", selectedFromId)

      li.appendChild(selected)
    }
    if (codeTo.textContent === country.code) {
      const selected = document.createElement("span")
      selected.innerHTML = /* html */ `<img src="./img/coche.svg" class="mb-1" width="20px">`
      selected.setAttribute("id", selectedToId)
      li.appendChild(selected)
    }

    return li
  })

  ul.append(...countryListItems)
  // ul.lastChild.classList.remove("border-b")
  ul.lastChild.classList.add("mb-16")

  divList.appendChild(ul)
}
createListCountry(countries)

/* Une fonction qui filtre la liste des pays par la première lettre du nom du pays. */
search.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase()

  const filteredCountries = countries.filter(
    (country) => country.name.toLowerCase().startsWith(searchValue)
    // country.name.toLowerCase().includes(searchValue)
  )

  /* Affichage d'un message lorsque aucun pays n'est trouvé. */
  const errorMessage = document.getElementById("notFoundMsg")
  if (filteredCountries.length === 0 && searchValue.length > 0) {
    errorMessage.classList.remove("hidden")
  } else {
    errorMessage.classList.add("hidden")
  }

  const liList = document.getElementById("ulListCountry").children

  for (let i = 0; i < liList.length; i++) {
    const li = liList[i]
    const code = li.getAttribute("id")

    /* Vérifier si le tableau filteredCountries a un pays avec le même code que le code de l'élément li.
    Si c'est le cas, il affiche l'élément li, sinon il le masque. */
    if (filteredCountries.some((c) => c.code === code)) {
      li.style.display = "block"
    } else {
      li.style.display = "none"
    }
  }
})

/**
 * Il crée un élément span avec un identifiant et une image à l'intérieur, puis l'ajoute à l'élément
 * avec l'identifiant passé en argument
 * @param {string}  countrySelected - l'identifiant du pays que vous souhaitez sélectionner
 * @param {string} selectedId - l'id de l'élément qui sera créé
 */
const UpdateCountrySelect = (countrySelected, selectedId) => {
  if (countrySelected && selectedId) {
    const selected = document.createElement("span")
    selected.setAttribute("id", selectedId)
    selected.innerHTML =
      /* html */
      `<img src="./img/coche.svg" class="mb-1" width="20px">`
    document.getElementById(countrySelected).appendChild(selected)
  }
}

/**
 * Ajoute un événement click à chaque élément "li" de la liste "ul" passée en paramètre.
 * Lorsqu'un élément est cliqué, la classe "right-0" de l'élément "listCountry" est retirée et la classe "right-[100%]" est ajoutée.
 * La valeur de l'élément "search" est remise à zéro et tous les éléments "li" de la liste sont affichés.
 * En fonction de la variable "selectFromOrTo", l'élément "codeFrom" ou "codeTo" est mis à jour avec l'identifiant du pays sélectionné.
 * Le pays sélectionné est récupéré dans le tableau "countries" en fonction de l'identifiant du pays cliqué.
 * Les informations du pays sélectionné (code, nom et symbole) sont affichées dans les éléments "unitySelect1" ou "unitySelect2".
 * L'élément "selectedFromId" ou "selectedToId" est supprimé et la fonction "UpdateCountrySelect" est appelée avec le code du pays sélectionné et l'identifiant de l'élément supprimé.
 * @param {Array} countries - Un tableau contenant les informations des pays.
 *
 */
function listItem(countries) {
  const liListALL = document.querySelectorAll("li")
  const liList = document.getElementById("ulListCountry").childNodes

  let id = ""
  liListALL.forEach((country) => {
    country.addEventListener("click", () => {
      listCountry.classList.remove("right-0")
      listCountry.classList.add("right-[100%]")

      search.value = ""
      liList.forEach((li) => (li.style.display = "block"))
      // for (let i = 0; i < liList.length; i++) {
      //   liList[i].style.display = "block"
      // }

      id = country.id
      if (selectFromOrTo) {
        codeFrom.innerText = country.id
        const selectedCountry = countries.find((country) => country.code === id)
        const { code, name, symbol_native } = selectedCountry

        document.getElementById(
          "unitySelect1"
        ).innerText = `${name} ${symbol_native}`
        document.getElementById(selectedFromId).remove()

        UpdateCountrySelect(code, selectedFromId)
      } else {
        codeTo.innerText = country.id
        const selectedCountry = countries.find((country) => country.code === id)
        const { code, name, symbol_native } = selectedCountry
        // const { code, name, symbol_native } = countries.find(
        //   (country) => country.code === id
        // )
        document.getElementById(
          "unitySelect2"
        ).innerText = `${name} ${symbol_native}`
        document.getElementById(selectedToId).remove()

        UpdateCountrySelect(code, selectedToId)
      }
      getExchangeRate()
    })
  })
}

listItem(countries)
