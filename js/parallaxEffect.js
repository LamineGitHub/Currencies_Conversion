const calculatorSection = document.getElementById("calculator")
const convertSection = document.getElementById("convert")
const iconCalculator = document.getElementById("iconCalculator")
const iconBack = document.getElementById("iconBack")

/* Ajout d'un écouteur d'événement à l'élément iconCalculator. Lorsque l'élément iconCalculator est
cliqué, il ajoutera la classe "right-0" et "calcBoxShadow" à l'élément calculatorSection. Après 500
millisecondes, il supprimera la classe "right-[-100%]" de l'élément calculatorSection et ajoutera la
classe "-translate-x-6" à l'élément convertSection. */
iconCalculator.addEventListener("click", () => {
  calculatorSection.classList.add("right-0", "calcBoxShadow")
  setTimeout(() => {
    calculatorSection.classList.remove("right-[-100%]")
    convertSection.classList.add("-translate-x-6")
  }, 500)
})

/* Ajout d'un écouteur d'événement click à l'élément iconBack. Lorsque l'élément iconBack est cliqué,
il ajoutera la classe "right-[-100%]" à l'élément calculatorSection, supprimera la classe "right-0"
de l'élément calculatorSection, supprimera la classe "-translate-x-6" de l'élément convertSection,
et après 500 millisecondes, supprimez la classe "calcBoxShadow" de l'élément calculatorSection. */
iconBack.addEventListener("click", () => {
  calculatorSection.classList.add("right-[-100%]")
  calculatorSection.classList.remove("right-0")
  convertSection.classList.remove("-translate-x-6")
  setTimeout(() => {
    calculatorSection.classList.remove("calcBoxShadow")
  }, 500)
})
