const screenAcount = document.getElementById("ecran3")
const convert = document.getElementById("convert")
const convertBtn = document.getElementById("convertBtn")
const buttonConvert = document.querySelectorAll("#convert button")

const priceFrom = document.getElementById("priceFrom")
const priceTo = document.getElementById("priceTo")

let cpt = 0,
  firstOne = true,
  limiteAcountNumber = 13,
  cptAcountNumber = 0

/* Appel de la fonction getExchangeRate lorsque la page est chargée. */
window.addEventListener("load", getExchangeRate)

/* Ajout d'un écouteur d'événement au document pour chaque touche pressé. */
convert.addEventListener("keydown", updateToucheAcount)

/* Ajout d'un écouteur d'événement à chaque bouton. */
buttonConvert.forEach((button) => {
  button.addEventListener("click", updateToucheAcount)
})

/**
 * Il divise le nombre en une partie entière et une partie décimale, ajoute des espaces à la partie
 * entière, puis remet la partie décimale sur
 * @param numberString - Le nombre à formater.
 * @returns une chaîne avec le nombre séparé par des espaces tous les trois chiffres.
 */
function separateThousands(numberString) {
/* Vérifier si le nombre est un nombre. Si ce n'est pas un nombre, il le convertit en chaîne. */
  if (typeof number !== 'number') {
     numberString = numberString.toString();
  }
  // Séparer la partie entière de la partie décimale
  const [integerPart, decimalPart] = numberString.split(".")

  // Ajouter des espaces aux groupes de trois dans la partie entière
  const separatedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ")

  // Reconstituer la chaîne avec la partie décimale, si elle existe
  return decimalPart
    ? `${separatedIntegerPart}.${decimalPart}`
    : separatedIntegerPart
}

/**
 * Il efface l'écran Acount et remet tous les compteurs à 0.
 */
function clearAcount() {
  screenAcount.classList.add("text-slate-400")
  cpt = 0
  cptAcountNumber = 0
  screenAcount.innerText = "Enter Amount"
}

/**
 * Supprime le dernier nombre de l'écran.
 * Met à jour les compteurs et efface la virgule si nécessaire.
 */
function clearLastNumberAcount() {
  // Si le texte affiché est "Enter Amount", on le vide complètement
  if (screenAcount.innerText === "Enter Amount") {
    cptAcountNumber = 0
    screenAcount.innerText = ""
  }

  // On décrémente le compteur de caractères affichés
  --cptAcountNumber

  // On supprime le dernier caractère du texte affiché
  screenAcount.innerText = screenAcount.innerText.toString().slice(0, -1)

  // Si le texte affiché ne contient plus de virgule et que le compteur de chiffres après la virgule est supérieur à 2, on le remet à 0
  if (!screenAcount.innerText.includes(".") && cpt >= 2) {
    cpt = 0
  }
}

/**
 * Ajoute un nombre ou un point à l'écran.
 * @param {string|number} touche - le numéro ou le point qui a été pressé
 * @returns la valeur de screen.innerText.
 */
function addAcount(touche) {
  // Si le nombre de chiffres dépasse la limite ou si l'utilisateur essaie d'ajouter une deuxième virgule, ne rien faire.
  if (
    cptAcountNumber >= limiteAcountNumber ||
    (touche === "." && cptAcountNumber === limiteAcountNumber - 1)
  ) {
    return
  }

  // Si l'utilisateur a appuyé sur "00", augmenter le compteur de 2.
  // Sinon, augmenter le compteur de 1.
  if (touche === "00") {
    cptAcountNumber += 2
  } else {
    ++cptAcountNumber
  }

  // Si c'est la première touche de l'utilisateur, effacer l'écran.
  if (firstOne) {
    clearAcount()
    firstOne = false
  }

  /* Vérifie si le nombre a un point décimal et si c'est le cas, il vérifie si le nombre de chiffres
 après le point décimal est supérieur ou égal à 2. Si c'est le cas, il retourne rien. */
  const decimalIndex = screenAcount.innerText.indexOf(".")
  const decimalCount =
    decimalIndex !== -1 ? screenAcount.innerText.length - decimalIndex - 1 : 0

  if (decimalIndex !== -1 && decimalCount >= 2) {
    return
  }

  // Si l'écran indique "Enter Amount", effacer le texte.
  if (screenAcount.innerText === "Enter Amount") {
    screenAcount.innerText = ""
  }

  // Si l'écran a la classe "text-slate-400", la retirer.
  if (screenAcount.classList.contains("text-slate-400")) {
    screenAcount.classList.remove("text-slate-400")
  }

  // Ajouter le chiffre ou le point à l'écran.
  screenAcount.innerText += touche
}

/**
 * Récupère les taux de change pour les devises sélectionnées et affiche le résultat de la conversion.
 * Désactive le bouton de conversion pendant la requête pour éviter les requêtes en double.
 * Réactive le bouton de conversion une fois la conversion terminée.
 */
function getExchangeRate() {
  // Récupère le code de la devise de conversion depuis le DOM
  const codeFromConverte = document.getElementById("codeFrom").innerText
  const codeToConverte = document.getElementById("codeTo").innerText

  // Récupère la valeur du montant à convertir depuis le DOM
  let amountVal = parseFloat(screenAcount.innerText)

  // Si la valeur du montant n'est pas un nombre ou est vide, définit la valeur par défaut à 1
  amountVal =
    isNaN(amountVal) || amountVal === "Enter Acount" || amountVal === ""
      ? 1
      : amountVal
  /*   if (isNaN(amountVal) || amountVal === "Enter Acount" || amountVal == "") {
      amountVal = 1
    } */

  // Désactive le bouton de conversion pendant la requête pour éviter les requêtes en double
  convertBtn.disabled = true
  convertBtn.classList.remove("hover:tracking-widest", "hover:shadow-lg")

  // Affiche la valeur à convertir dans l'interface
  priceFrom.innerText = separateThousands(amountVal)
  priceTo.innerText = "Getting exchange rate . . ."

  // Récupère le taux de change à partir d'une API
  const url = `https://v6.exchangerate-api.com/v6/650d75f53f2810edfb265f21/latest/${codeFromConverte}`
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[codeToConverte]

      // Affiche la valeur convertie dans l'interface
      priceTo.innerText = separateThousands((amountVal * exchangeRate).toFixed(2))

      // let exchangeRate = result.conversion_rates[codeToConverte]
      // let totalExRate = (amountVal * exchangeRate).toFixed(2)
      // priceTo.innerText = totalExRate
    })
    .catch(() => {
      // Affiche un message d'erreur si la requête a échoué
      priceTo.innerText = "Something went wrong"
    })

  // Efface le montant à convertir de l'interface
  clearAcount()

  // Réactive le bouton de conversion une fois la conversion terminée
  convertBtn.disabled = false
  convertBtn.classList.add("hover:tracking-widest", "hover:shadow-lg")
}

/**
 * Il prend la valeur du bouton cliqué ou de la touche enfoncée et la transmet à la fonction appropriée
 * @param {Event} e - l'objet événement
 */
function updateToucheAcount(e) {
  const validekey = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    ".",
    "Delete",
    "Enter",
    "Escape",
    "Backspace",
  ]

  if (e.type === "keydown" && !validekey.includes(e.key)) {
    return
  }
  /* Vérifier si le type d'événement est keydown et si c'est le cas, il définit la valeur de touche sur
   * la touche qui a été enfoncée. Si le type d'événement n'est pas keydown, il définit la valeur de
   * touche sur le innerText du bouton qui a été cliqué. */
  const touche = e.type === "keydown" ? e.key : this.innerText

  switch (touche) {
    case "Escape":
    case "C":
      clearAcount()
      break

    case "Backspace":
    case "Delete":
    case "DEL":
      clearLastNumberAcount()
      break

    case "Enter":
    case "Convert":
      getExchangeRate()
      break

    default:
      addAcount(touche)
  }
}
