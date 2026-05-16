// Seletores principais
const numberInputs = document.querySelectorAll(".draw-fields input[type='number']");
const toggleNoRepeat = document.getElementById("noRepetitionToggle");
const minInput = document.getElementById("firstInterval");
const maxInput = document.getElementById("secondInterval");
const qtyInput = document.getElementById("number");
const button = document.querySelector(".form button");
const form = document.querySelector(".form");
const toDrawSpan = document.querySelector(".form button .toDraw");
const toDrawAgainSpan = document.querySelector(".form button .toDrawAgain");
const headerWantToDraw = document.querySelector(".wantToDraw");
const headerResults = document.querySelector(".results");
const drawFields = document.querySelector(".draw-fields");
const resultsValues = document.querySelector(".results-values");

// Utilitários
function getNumber(input) {
  return Number(input.value.trim());
}

function allFieldsFilled() {
  return [...numberInputs].every(input => input.value.trim() !== "");
}

function setButtonState() {
  button.disabled = !allFieldsFilled();
}

function setVisibility(elements, hide) {
  (Array.isArray(elements) ? elements : [elements])
    .forEach(el => el.classList.toggle("hidden", hide));
}

function isValidRange(min, max) {
  return max > min;
}

function isValidQuantity(qty, min, max) {
  return qty > 0 && qty <= max - min + 1;
}

function generateNumbers(min, max, qty, noRepeat) {
  if (noRepeat) {
    const set = new Set();
    while (set.size < qty) {
      set.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(set);
  }
  return Array.from(
    { length: qty },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

function showResults(numbers) {
  resultsValues.innerHTML = "";
  button.disabled = true;
  const animationDuration = 3300;

  numbers.forEach((num, idx) => {
    setTimeout(() => {
      const li = document.createElement("li");
      li.classList.add("roll-item");
      li.textContent = num;
      resultsValues.appendChild(li);

      if (idx === numbers.length - 1) {
        setTimeout(() => {
          button.disabled = false;
        }, 3000);
      }
    }, idx * animationDuration);
  });
}

// Eventos
numberInputs.forEach(input => input.addEventListener("input", setButtonState));
setButtonState();

if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();

    const min = getNumber(minInput);
    const max = getNumber(maxInput);
    const qty = getNumber(qtyInput);

    if (!isValidRange(min, max)) {
      alert("O valor máximo deve ser maior que o valor mínimo.");
      return;
    }
    if (!isValidQuantity(qty, min, max)) {
      alert("A quantidade deve ser maior que zero e menor ou igual ao intervalo.");
      return;
    }

    const result = generateNumbers(min, max, qty, toggleNoRepeat?.checked);
    showResults(result);

    setVisibility([toDrawSpan, headerWantToDraw, drawFields], true);
    setVisibility([headerResults, resultsValues, toDrawAgainSpan], false);
  });
}

button.addEventListener("click", event => {
  if (!toDrawAgainSpan.classList.contains("hidden")) {
    event.preventDefault();
    setVisibility([toDrawSpan, headerWantToDraw, drawFields], false);
    setVisibility([headerResults, resultsValues, toDrawAgainSpan], true);
    form.reset();
    setButtonState();
    resultsValues.innerHTML = "";
  }
});