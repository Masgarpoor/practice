const BUTTON = {
  START: "Start",
  PAUSE: "Pause",
  RESET: "Reset",
};

let second = 0;
let minute = 0;
let hour = 0;
const secondElement = document.querySelector(".second");
const minuteElement = document.querySelector(".minute");
const hourElement = document.querySelector(".hour");
let intervalId;
let isRunning = false;

document
  .querySelector(".button-container")
  .addEventListener("click", handleClick);

function handleClick(event) {
  const btnElement = event.target;
  const btnTagName = btnElement.tagName;

  if (btnTagName === "BUTTON") {
    const buttonName = btnElement.textContent;

    switch (buttonName) {
      case BUTTON.START:
        if (!intervalId) {
          intervalId = setInterval(startTimer, 1000);
        }
        break;
      case BUTTON.PAUSE:
        pauseTimer();
        console.log(intervalId);
        break;
      case BUTTON.RESET:
        resetTimer();
        break;
    }
  }
}

function startTimer() {
  second++;
  secondElement.innerHTML = second.toString().padStart(2, "0");

  if (second > 59) {
    second = 0;
    minute++;
    minuteElement.innerHTML = minute.toString().padStart(2, "0");
  }

  if (minute > 59) {
    minute = 0;
    hour++;
    hourElement.innerHTML = hour.toString().padStart(2, "0");
  }
}

function pauseTimer() {
  clearInterval(intervalId);
  intervalId = undefined;
}

function resetTimer() {
  second = 0;
  minute = 0;
  hour = 0;
  secondElement.innerHTML = "00";
  minuteElement.innerHTML = "00";
  hourElement.innerHTML = "00";
  clearInterval(intervalId);
  intervalId = undefined;
}

function disableStartButton() {
  document.getElementById.disable = true;
}

function enableStartButton() {
  document.getElementById.disable = false;
}
