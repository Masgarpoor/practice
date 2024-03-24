const MOVES = {
  ROCK: "rock",
  PAPER: "paper",
  SCISSORS: "scissors",
};

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

start();

function start() {
  const buttons = document.querySelectorAll(".js-move-button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      playGame(button.dataset.move);
    });
  });

  document
    .querySelector(".js-reset-score-button")
    .addEventListener("click", resetScore);

  document
    .querySelector(".js-auto-play-button")
    .addEventListener("click", autoPlay);

  document.body.addEventListener("keydown", handleKeyDown);

  document.querySelector(".js-rock-button").addEventListener("click", () => {
    playGame(MOVES.ROCK);
  });

  document.querySelector(".js-paper-button").addEventListener("click", () => {
    playGame(MOVES.PAPER);
  });

  document
    .querySelector(".js-scissors-button")
    .addEventListener("click", () => {
      playGame(MOVES.SCISSORS);
    });
}

function playGame(playerMove) {
  const computerMove = computerMoveFunction();
  let result = "";

  switch (playerMove) {
    case MOVES.ROCK:
      result = getResult(MOVES.ROCK, computerMove);
      break;
    case MOVES.PAPER:
      result = getResult(MOVES.PAPER, computerMove);
      break;
    case MOVES.SCISSORS:
      result = getResult(MOVES.SCISSORS, computerMove);
      break;
  }

  updateScore(result);
  updateResult(result);
  updateMoves(playerMove, computerMove);
  updateScoreElement();
}

function getResult(playerMove, computerMove) {
  if (playerMove === computerMove) {
    return "Tie.";
  } else if (
    (playerMove === MOVES.ROCK && computerMove === MOVES.SCISSORS) ||
    (playerMove === MOVES.PAPER && computerMove === MOVES.ROCK) ||
    (playerMove === MOVES.SCISSORS && computerMove === MOVES.PAPER)
  ) {
    return "You win.";
  } else {
    return "You lose.";
  }
}

function handleKeyDown(event) {
  const keyMap = {
    r: MOVES.ROCK,
    p: MOVES.PAPER,
    s: MOVES.SCISSORS,
    Backspace: resetScore,
  };

  const action = keyMap[event.key];
  if (action) {
    if (typeof action === "function") {
      action();
    } else {
      playGame(action);
    }
  }
}

function computerMoveFunction() {
  const randomValue = Math.random();

  if (randomValue < 1 / 3) {
    return MOVES.ROCK;
  } else if (randomValue < 2 / 3) {
    return MOVES.PAPER;
  } else {
    return MOVES.SCISSORS;
  }
}

function resetScore() {
  if (score.wins !== 0 || score.losses !== 0 || score.ties !== 0) {
    document.querySelector(".js-message-box").innerHTML = `  
      Are you sure you want to reset the score?
      <button class="js-yes-button yes-button">Yes</button>
      <button class="js-no-button no-button">No</button>
      `;

    document.querySelector(".js-yes-button").addEventListener("click", () => {
      score.wins = 0;
      score.ties = 0;
      score.losses = 0;
      localStorage.removeItem("score");
      document.querySelector(".js-result").innerHTML = "";
      document.querySelector(".js-moves").innerHTML = "";
      updateScoreElement();
      hideMessageBox();
    });

    document.querySelector(".js-no-button").addEventListener("click", () => {
      hideMessageBox();
    });
  }
}

function updateScore(result) {
  if (result === "Tie.") {
    score.ties += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else {
    score.wins += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function updateResult(result) {
  document.querySelector(".js-result").innerHTML = result;
}

function updateMoves(playerMove, computerMove) {
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img class="move-icon" src="images/${playerMove}-emoji.png" alt="">
  Computer <img class="move-icon" src="images/${computerMove}-emoji.png" alt="">`;
}

function autoPlay() {
  const autoPlayElement = document.querySelector(".js-auto-play-button");
  const inner = autoPlayElement.innerText;

  if (!autoPlayElement) return;

  if (!autoPlayElement.isPlaying) {
    autoPlayElement.isPlaying = true;
    autoPlayElement.innerHTML = "Stop Play";

    autoPlayElement.intervalId = setInterval(() => {
      const playerMove = computerMoveFunction();
      playGame(playerMove);
    }, 1200);
  } else {
    clearInterval(autoPlayElement.intervalId);
    autoPlayElement.isPlaying = false;
    autoPlayElement.innerHTML = "Auto Play";
  }
}

function hideMessageBox() {
  document.querySelector(".js-message-box").innerHTML = "";
}
