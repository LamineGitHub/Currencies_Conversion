import { countries } from "./currencies.js"

const divList = document.getElementById("country")
const codeFrom = document.getElementById("codeFrom")
const codeTo = document.getElementById("codeTo")
const search = document.getElementById("search")

/**
 * Il prend un tableau de pays et crée une liste de pays
 * @param {Array} countries - un tableau d'objets
 */
const createListCountry = (countries) => {
  const ul = document.createElement("ul")
  ul.setAttribute("id", "ulListCountry")

  const countryListItems = countries.map((country) => {
    const li = document.createElement("li")
    li.setAttribute("id", country.code)
    // li.setAttribute("data-name", country.name.toLowerCase())
    const name = document.createElement("span")
    const code = document.createElement("span")
    code.innerText = country.code
    name.innerText = country.name
    name.classList.add("inline-block", "w-[234px]")
    code.classList.add("inline-block", "w-11")
    li.classList.add("liStyle")
    li.appendChild(code)
    li.appendChild(name)
    return li
  })
  ul.append(...countryListItems)

  ul.lastChild.classList.remove("border-b")
  divList.appendChild(ul)
}
createListCountry(countries)

/**
 * Il ajoute une petite icône au pays sélectionné dans la list des pays
 * @param {Array} countries - un tableau d'objets contenant le code et le nom de tous les pays
 */
const countrySelect = (countries) => {
  const codeFromCountry = countries.find(
    (country) => country.code === codeFrom.innerText
  )
  const codeToCountry = countries.find(
    (country) => country.code === codeTo.innerText
  )

  if (codeFromCountry) {
    const selected = document.createElement("span")
    selected.innerHTML =
      /* html */
      `<img src="./img/coche.svg" class="mb-1" width="20px">`
    document.getElementById(codeFrom.innerText).appendChild(selected)
  }

  if (codeToCountry) {
    const selected = document.createElement("span")
    selected.innerHTML =
      /* html */
      `<img src="./img/coche.svg" class="mb-1" width="20px">`
    document.getElementById(codeTo.innerText).appendChild(selected)
  }
}
countrySelect(countries)

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

    if (filteredCountries.some((c) => c.code === code)) {
      li.style.display = "block"
    } else {
      li.style.display = "none"
    }
  }
})
