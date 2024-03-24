/* let calculation = localStorage.getItem("calculation") || "";
const buttonList = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "*",
  "+",
  "/",
  ".",
  "-",
];

updateDisplay(calculation);

document.body.addEventListener("keyup", (event) => {
  const eventKey = event.key;

  if (buttonList.includes(eventKey)) {
    updateCalculation(eventKey);
    console.log(calculation);
  } else if (eventKey === "Enter") {
    displayResult();
    console.log(calculation);
  } else if (eventKey === "Delete") {
    resetCalculator();
  } else if (eventKey === "Backspace") {
    calculation = calculation.slice(0, -1);
    console.log(calculation);
    display.value = calculation;
    console.log(calculation);
    saveCalculation();
    console.log(calculation);
  }
});

document.querySelectorAll(".number-button").forEach((buttonObject) => {
  buttonObject.addEventListener("click", () => {
    updateCalculation(buttonObject.textContent);
  });
});

document.querySelectorAll(".operator-button").forEach((buttonObject) => {
  buttonObject.addEventListener("click", () => {
    updateCalculation(buttonObject.textContent);
  });
});

document.querySelector(".clear-button").addEventListener("click", () => {
  resetCalculator();
});

function updateCalculation(value) {
  calculation += value;
  display.value = calculation;

  saveCalculation();
}

function displayResult() {
  let result = eval(calculation);
  updateDisplay(result);

  calculation = result.toString();
  saveCalculation();
}

function resetCalculator() {
  calculation = "";
  saveCalculation();

  updateDisplay("0");
}

function saveCalculation() {
  localStorage.setItem("calculation", calculation);
}

function updateDisplay(result) {
  display.value = result;
}
*/
const display = document.getElementById("display");
let calculation = localStorage.getItem("calculation") || "";
const buttonList = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "*",
  "+",
  "/",
  ".",
  "-",
];

document.body.addEventListener("keydown", handleKeyPress);
document
  .querySelector(".container")
  .addEventListener("click", handleButtonClick);

function handleKeyPress(event) {
  const eventKey = event.key;
  console.log(eventKey);
  console.log(typeof eventKey);

  if (buttonList.includes(eventKey)) {
    updateCalculation(eventKey);
  } else if (eventKey === "Delete") {
    resetCalculator();
  } else if (eventKey === "Backspace") {
    removeLastCharacter();
  } else if (eventKey === "Enter") {
    displayResult();
  }
}

function handleButtonClick(event) {
  const clickedButton = event.target;

  if (clickedButton.tagName === "BUTTON") {
    const buttonValue = clickedButton.textContent;

    if (buttonValue === "Clear") {
      resetCalculator();
    } else if (buttonValue === "=") {
      displayResult();
    } else {
      updateCalculation(buttonValue);
    }
  }
}

function updateCalculation(value) {
  calculation += value;
  display.value = calculation;
  saveCalculation();
}

function displayResult() {
  try {
    if (calculation.trim() !== "") {
      const result = eval(calculation);
      updateDisplay(result);
      calculation = result.toString();
      saveCalculation();
    }
  } catch (error) {
    console.error("Error during calculation:", error.message);
    updateDisplay("Error during calculation");
  }
}

function resetCalculator() {
  calculation = "";
  saveCalculation();
  updateDisplay("0");
}

function removeLastCharacter() {
  calculation = calculation.slice(0, -1);
  display.value = calculation;
  saveCalculation();
}

function saveCalculation() {
  localStorage.setItem("calculation", calculation);
}

function updateDisplay(result) {
  display.value = result;
}
