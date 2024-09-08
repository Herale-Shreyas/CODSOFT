const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");
let currentInput = "0";
let operator = null;
let firstOperand = null;
let shouldResetDisplay = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("clear")) {
      resetCalculator();
    } else if (button.classList.contains("operator")) {
      handleOperator(value);
    } else if (button.classList.contains("equals")) {
      evaluate();
    } else if (button.classList.contains("backspace")) {
      backspace();
    } else if (button.classList.contains("decimal")) {
      inputDecimal();
    } else {
      inputNumber(value);
    }
    updateDisplay();
  });
});

function resetCalculator() {
  currentInput = "0";
  firstOperand = null;
  operator = null;
  shouldResetDisplay = false;
}

function handleOperator(nextOperator) {
  if (firstOperand === null) {
    firstOperand = currentInput;
  } else if (operator) {
    const result = calculate(firstOperand, operator, currentInput);
    currentInput = `${parseFloat(result.toFixed(7))}`;
    firstOperand = currentInput;
  }
  operator = nextOperator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (operator === null || shouldResetDisplay) return;
  if (operator === "/" && currentInput === "0") {
    alert("Cannot divide by zero");
    return;
  }
  currentInput = `${parseFloat(
    calculate(firstOperand, operator, currentInput).toFixed(7)
  )}`;
  operator = null;
  firstOperand = null;
  shouldResetDisplay = true;
}

function backspace() {
  if (shouldResetDisplay) return;
  currentInput = currentInput.slice(0, -1) || "0";
}

function inputDecimal() {
  if (shouldResetDisplay) {
    currentInput = "0";
    shouldResetDisplay = false;
  }
  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
}

function inputNumber(number) {
  if (shouldResetDisplay) {
    currentInput = number;
    shouldResetDisplay = false;
  } else {
    currentInput = currentInput === "0" ? number : currentInput + number;
  }
}

function updateDisplay() {
  display.textContent = currentInput;
}

function calculate(first, operator, second) {
  const num1 = parseFloat(first);
  const num2 = parseFloat(second);
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return second;
  }
}
