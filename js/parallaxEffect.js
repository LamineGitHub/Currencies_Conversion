const calculatorSection = document.getElementById("calculator")
const convertSection = document.getElementById("convert")
const iconCalculator = document.getElementById("iconCalculator")
const iconBack = document.getElementById("iconBack")
const selectCountryFrom = document.getElementById("selectCountryFrom")
const selectCountryTo = document.getElementById("selectCountryTo")
const listCountry = document.getElementById("listCountry")

/**
 * Ajoutez la classe calcBoxShadow à la section, puis après un délai, ajoutez la showClass et supprimez
 * la hideClass, et basculez la classe -translate-x-6 sur la convertSection.
 * @param {string} section - la section que vous souhaitez basculer
 * @param {string} hideClass - la classe qui cache la section
 * @param {string} showClass - la classe qui sera ajoutée à la section qui sera affichée
 * @param {number} delay - le temps qu'il faut pour que l'animation démarre
 */
const toggleSection = (section, hideClass, showClass, delay) => {
  section.classList.add("calcBoxShadow")
  setTimeout(() => {
    section.classList.add(showClass)
    section.classList.remove(hideClass)
    convertSection.classList.toggle("-translate-x-6")
  }, delay)
}

/**
 * Ajout d'un écouteur d'événement à l'élément iconCalculator.
 * Lorsque l'élément iconCalculator est cliqué, la fonction toggleSection est appelée.
 * La fonction toggleSection prend quatre arguments : calculatorSection, "right-0", "right-[101%]" et 500.
 * L'argument calculatorSection est l'élément calculatorSection.
 * L'argument "right-0" est la classe qui cache l'élément calculatorSection.
 * L'argument "right-[101%]" est la classe qui affiche l'élément calculatorSection.
 * L'argument 500 est le délai en millisecondes avant que la fonction toggleSection ne soit appelée.
 */
iconCalculator.addEventListener("click", () => {
  toggleSection(calculatorSection, "right-0", "right-[101%]", 500)
})

/**
 *  Ajout d'un écouteur d'événement à l'élément iconBack. Lorsque l'élément iconBack est cliqué, la fonction toggleSection est appelée.
 * La fonction toggleSection prend quatre arguments : calculatorSection, "right-[101%]", "right-0" et 0.
 * L'argument calculatorSection est l'élément calculatorSection.
 * L'argument "right-[101%]" est la classe qui cache l'élément calculatorSection.
 * L'argument "right-0" est la classe qui affiche l'élément calculatorSection.
 * L'argument 0 est le délai en millisecondes avant que la fonction toggleSection ne soit appelée.
 */
iconBack.addEventListener("click", () => {
  toggleSection(calculatorSection, "right-[101%]", "right-0", 0)
  setTimeout(() => {
    calculatorSection.classList.remove("calcBoxShadow")
  }, 500)
})

/**
 * Si la liste de classes de l'élément avec l'id "listCountry" contient la classe "right-0", alors
 * supprimez-la et ajoutez la classe "right-[100%]". Sinon, supprimez la classe "right-[100%]" et
 * ajoutez la classe "right-0".
 */
function toggleListCountry() {
  listCountry.classList.toggle("right-0")
  listCountry.classList.toggle("right-[100%]")
}

selectCountryFrom.addEventListener("click", toggleListCountry)
selectCountryTo.addEventListener("click", toggleListCountry)
