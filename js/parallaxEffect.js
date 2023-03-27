const calculatorSection = document.getElementById("calculator")
const convertSection = document.getElementById("convert")
const iconCalculator = document.getElementById("iconCalculator")
const iconBack = document.getElementById("iconBack")
const selectCountryFrom = document.getElementById("selectCountryFrom")
const selectCountryTo = document.getElementById("selectCountryTo")
const listCountry = document.getElementById("listCountry")

/* Ajout d'un écouteur d'événement à l'élément iconCalculator. Lorsque l'élément iconCalculator est
cliqué, l'élément calculatorSection aura la classe calcBoxShadow qui lui sera ajoutée. Ensuite,
après 500 millisecondes, la classe right-[101%] sera ajoutée à l'élément calculatorSection et la
classe right-0 sera supprimée de l'élément calculatorSection. La classe -translate-x-6 sera
également ajoutée à l'élément convertSection. */
iconCalculator.addEventListener("click", () => {
  calculatorSection.classList.add("calcBoxShadow")
  setTimeout(() => {
    calculatorSection.classList.add("right-[101%]")
    calculatorSection.classList.remove("right-0")
    convertSection.classList.add("-translate-x-6")
  }, 500)
})

/* Un écouteur d'événement qui écoute un clic sur l'élément iconBack. Lorsque l'élément iconBack est
cliqué, l'élément calculatorSection reçoit la classe right-0 et la classe right-[101%] est
supprimée.La classe -translate-x-6  sera supprimée de l'élément convertSection et la classe calcBoxShadow est
supprimée de l'élément calculatorSection après 500 millisecondes. */
iconBack.addEventListener("click", () => {
  calculatorSection.classList.add("right-0")
  calculatorSection.classList.remove("right-[101%]")
  convertSection.classList.remove("-translate-x-6")
  setTimeout(() => {
    calculatorSection.classList.remove("calcBoxShadow")
  }, 500)
})

/* Ajout d'un écouteur d'événement à l'élément selectCountryFrom. Lorsque l'élément est cliqué, il
ajoute la classe "right-0" à l'élément listCountry et supprime la classe "right-[100%]" de l'élément
listCountry. */
selectCountryFrom.addEventListener("click", () => {
  listCountry.classList.add("right-0")
  listCountry.classList.remove("right-[100%]")
})
