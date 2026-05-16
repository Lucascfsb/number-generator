// Seleciona todos os inputs numéricos do formulário
const numberInputs = document.querySelectorAll(".draw-fields input[type='number']");
const toggleOn = document.getElementById("noRepetitionToggle");
// Seleciona o input do valor mínimo
const minInput = document.querySelector("#firstInterval");
// Seleciona o input do valor máximo
const maxInput = document.querySelector("#secondInterval");
// Seleciona o input da quantidade de números
const quantityInput = document.querySelector("#number");
// Seleciona o botão de submit do formulário
const button = document.querySelector(".form button");
// Seleciona o formulário
const form = document.querySelector(".form");
// Seleciona os spans para alterar o texto do botão
const toDrawSpan = button.querySelector(".toDraw");
// Seleciona o span para alterar o texto do botão "SORTEAR NOVAMENTE"
const toDrawAgainSpan = button.querySelector(".toDrawAgain");

// Retorna o valor numérico de um input
function getNumberValue(input) {
  return Number(input.value.trim());
}

// Verifica se todos os campos numéricos estão preenchidos
function areFieldsFilled() {
  return Array.from(numberInputs).every((input) => input.value.trim() !== "");
}

// Habilita ou desabilita o botão conforme os campos estejam preenchidos
function setButtonState() {
  button.disabled = !areFieldsFilled();
}

// Adiciona evento para atualizar o estado do botão ao digitar
numberInputs.forEach((input) => {
  input.addEventListener("input", setButtonState);
});

// Inicializa o estado do botão ao carregar a página
setButtonState();

// Verifica se o valor máximo é maior que o mínimo
function isMaxGreaterThanMin(minValue, maxValue) {
  return maxValue > minValue;
}

// Verifica se a quantidade está dentro do intervalo permitido
function isQuantityWithinRange(quantityValue, minValue, maxValue) {
  const rangeSize = maxValue - minValue + 1;
  return quantityValue > 0 && quantityValue <= rangeSize;
}

// Função para gerar números aleatórios com repetições
function generateRandomNumbersWithRepetitions(min, max, quantity) {
  const numbers = [];
  for (let i = 0; i < quantity; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return numbers;
}

// Função para gerar números aleatórios sem repetições
function generateRandomNumbersWithoutRepetitions(min, max, quantity) {
  const numbers = new Set();
  while (numbers.size < quantity) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(randomNum);
  }
  return Array.from(numbers);
}

// Evento de submit do formulário
if (form) {
  form.addEventListener("submit", function(event) {
    const minValue = getNumberValue(minInput);
    const maxValue = getNumberValue(maxInput);
    const quantityValue = getNumberValue(quantityInput);

    // Validação dos campos
    if (!isMaxGreaterThanMin(minValue, maxValue)) {
      event.preventDefault();
      alert("O valor máximo deve ser maior que o valor mínimo. Por favor, corrija os valores para realizar o sorteio.");
      return;
    }

    if (!isQuantityWithinRange(quantityValue, minValue, maxValue)) {
      event.preventDefault();
      alert(`A quantidade de números a serem sorteados deve ser maior que ${minValue} e menor ou igual ao intervalo definido. Por favor, corrija os valores para realizar o sorteio.`);
      return;
    }

    // Sorteio dos números
    let result;
    if (toggleOn && toggleOn.checked) {
      result = generateRandomNumbersWithoutRepetitions(minValue, maxValue, quantityValue);
    } else {
      result = generateRandomNumbersWithRepetitions(minValue, maxValue, quantityValue);
    }

    console.log("Números sorteados:", result);

    // Impede o envio do formulário (caso não tenha backend)
    event.preventDefault();
  });
}


