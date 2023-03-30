const screen = document.getElementById("ecran1")
const calculator = document.getElementById("calculator")
const button = document.querySelectorAll("#calculator button")

/* Ajout d'un écouteur d'événement au document pour chaque touche pressé. */
calculator.addEventListener("keydown", updateTouche)

/* Ajout d'un écouteur d'événement à chaque bouton. */
button.forEach((button) => {
  button.addEventListener("click", updateTouche)
})

let equals = false,
  hasDecimal = false

/**
 * Il ajoute la valeur du bouton cliqué à l'écran.
 * @param {string} operateur - l'opérateur qui sera ajouté à l'écran
 */
function addOperator(operateur) {
  let expression = screen.innerText.trim()
  let lastChar = expression[expression.length - 1]

  if (expression === "ERREUR SYNTAX") {
    clear()
    return
  }

  if (lastChar) {
    // si le dernier caractère n'est pas un nombre, remplacer l'opérateur existant
    if (!lastChar.match(/[0-9]/)) {
      // si le dernier caractère est (*) et celui d'après est (-)
      // Si c'est le cas, il ajoute l'opérateur à l'écran et définit égal à faux.

      if (lastChar === "*" && operateur === "-") {
        screen.innerText += operateur
        equals = false
      } else {
        // sinon il remplace l'opérateur
        screen.innerText =
          expression.slice(0, expression.length - 1) + operateur
      }
    } else {
      screen.innerText += operateur
      equals = false
    }
  }
  // réinitialiser hasDecimal quand on une operateur de calcul est saisi
  hasDecimal = false
}

/**
 * Il efface l'écran.
 */
function clear() {
  if (screen.innerText === "ERREUR SYNTAX")
    screen.classList.remove("text-red-600")

  screen.innerText = ""
}

/**
 * Il prend la valeur actuelle de l'écran, la convertit en chaîne, puis supprime le dernier caractère
 * de la chaîne
 */
function clearLastNumber() {
  if (screen.innerText === "ERREUR SYNTAX")
    screen.classList.remove("text-red-600")

  screen.innerText = screen.innerText.toString().slice(0, -1)
}

/**
 * Il ajoute un numéro à l'écran
 * @param {string|number} touche - le numéro ou l'opérateur qui a été pressé
 * @returns la valeur de screen.innerText.
 */
function addNumber(touche) {
  if (equals) {
    clear()
    // réinitialiser hasDecimal quand on commence un nouveau calcul
    hasDecimal = false
  }

  // ne pas ajouter une virgule si le nombre en a déjà une
  if (touche === "." && hasDecimal) {
    return
  }
  // marquer le nombre comme ayant une virgule si on en ajoute une
  if (touche === "." && !hasDecimal) {
    hasDecimal = true
  }

  equals = false
  screen.innerText += touche
}

/**
 * Il prend le texte de l'écran, l'évalue comme une expression mathématique, puis affiche le résultat à
 * l'écran
 */
function calculate() {
  const expression = screen.innerText
  equals = true

  if (expression) {
    try {
      const resultat = eval(expression)
      screen.innerText = resultat
    } catch (error) {
      screen.classList.add("text-red-600")
      screen.innerText = "ERREUR SYNTAX"
    }
  }
}

/**
 * Il prend la valeur du bouton cliqué ou de la touche enfoncée et la transmet à la fonction appropriée
 * @param {Event} e - l'objet événement
 */
function updateTouche(e) {
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
    "+",
    "-",
    "*",
    "/",
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
      clear()
      break

    case "Backspace":
    case "Delete":
    case "DEL":
      clearLastNumber()
      break

    case "+":
    case "-":
    case "*":
    case "/":
      addOperator(touche)
      break

    case "Enter":
    case "=":
      calculate()
      break

    default:
      addNumber(touche)
  }
}
