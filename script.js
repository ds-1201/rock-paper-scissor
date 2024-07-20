// rules
const rulesBox = document.querySelector(".rules-box");
const rulesBtn = document.querySelector(".rules");
const closeBtn = document.querySelector(".close-button");

// play again
const resultPlayAgain = document.querySelector(".result .play-again");
const winPlayAgain = document.querySelector(".win-screen .play-again");

// next button
const next = document.querySelector(".next");

// user choose
const userChooseScreen = document.querySelector(".user-choose");
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissor = document.querySelector("#scissor");

// result screen
const resultScreen = document.querySelector(".result-screen");
const userRock = document.querySelector("#user-rock");
const userPaper = document.querySelector("#user-paper");
const userScissor = document.querySelector("#user-scissor");
const userChoice = document.querySelector(".user-choice");
const pcChoice = document.querySelector(".pc-choice");
const pcRock = document.querySelector("#pc-rock");
const pcPaper = document.querySelector("#pc-paper");
const pcScissor = document.querySelector("#pc-scissor");
const youWon = document.querySelector("#you-won");
const youLost = document.querySelector("#you-lost");
const tieUp = document.querySelector("#tie-up");
const againstPc = document.querySelector(".against-pc");
const replayBtn = document.querySelector(".replay");

// win screen
const winScreen = document.querySelector(".win-screen");

// game screen
const gameScreen = document.querySelector(".game-screen");

// scoreboard
const scoreComp = document.querySelector(".score-comp");
const scorePlayer = document.querySelector(".score-player");

const updateScoreDisplay = () => {
  let score = localStorage.getItem("score");
  score = score ? JSON.parse(score) : { user: 0, pc: 0 };

  scoreComp.textContent = score.pc;
  scorePlayer.textContent = score.user;
};

updateScoreDisplay();

const updateScore = (winner) => {
  let score = localStorage.getItem("score");
  score = score ? JSON.parse(score) : { user: 0, pc: 0 };
  if (winner === "user") {
    score.user++;
  } else if (winner === "pc") {
    score.pc++;
  }
  localStorage.setItem("score", JSON.stringify(score));

  updateScoreDisplay();
};

const nextHandler = () => {
  gameScreen.classList.add("hide");
  winScreen.classList.remove("hide");
  next.classList.add("hide");
};

const playAgainHandler = () => {
  gameScreen.classList.remove("hide");
  userChooseScreen.classList.remove("hide");
  resultScreen.classList.add("hide");
  winScreen.classList.add("hide");
  next.classList.add("hide");
};

const getUserNumber = (userChoice) => {
  if (userChoice === "rock") {
    return 1;
  } else if (userChoice === "paper") {
    return 2;
  } else {
    return 3;
  }
};

const getComputerNumber = () => {
  return Math.ceil(Math.random() * 3);
};

const updateUserResult = (userNum) => {
  userRock.style.display = "none";
  userPaper.style.display = "none";
  userScissor.style.display = "none";
  if (userNum === 1) {
    userRock.style.display = "flex";
  } else if (userNum === 2) {
    userPaper.style.display = "flex";
  } else {
    userScissor.style.display = "flex";
  }
};

const updatePCResult = (compNum) => {
  pcRock.style.display = "none";
  pcPaper.style.display = "none";
  pcScissor.style.display = "none";
  if (compNum === 1) {
    pcRock.style.display = "flex";
  } else if (compNum === 2) {
    pcPaper.style.display = "flex";
  } else {
    pcScissor.style.display = "flex";
  }
};

const updateWinner = (userNum, compNum) => {
  youWon.style.display = "none";
  tieUp.style.display = "none";
  youLost.style.display = "none";
  againstPc.style.visibility = "hidden";
  replayBtn.style.display = "none";
  resultPlayAgain.style.display = "none";

  userChoice.classList.remove("green-background");
  pcChoice.classList.remove("green-background");
  next.classList.add("hide");

  if (userNum === compNum) {
    replayBtn.style.display = "inline";
    tieUp.style.display = "block";
  } else if (
    (userNum === 1 && compNum === 3) ||
    (userNum === 2 && compNum === 1) ||
    (userNum === 3 && compNum === 2)
  ) {
    youWon.style.display = "block";
    againstPc.style.visibility = "visible";
    resultPlayAgain.style.display = "inline";
    userChoice.classList.add("green-background");
    next.classList.remove("hide");
    updateScore("user");
  } else {
    youLost.style.display = "block";
    againstPc.style.visibility = "visible";
    resultPlayAgain.style.display = "inline";
    pcChoice.classList.add("green-background");
    updateScore("pc");
  }
};

const resultHandler = (userChoice) => {
  resultScreen.classList.remove("hide");
  userChooseScreen.classList.add("hide");
  winScreen.classList.add("hide");

  const compNum = getComputerNumber();
  const userNum = getUserNumber(userChoice);
  updateWinner(userNum, compNum);
  console.log({ userNum, compNum });
  updateUserResult(userNum);
  updatePCResult(compNum);
};

next.addEventListener("click", nextHandler);

rock.addEventListener("click", () => resultHandler("rock"));
paper.addEventListener("click", () => resultHandler("paper"));
scissor.addEventListener("click", () => resultHandler("scissor"));

// rules
rulesBtn.addEventListener("click", () => {
  rulesBox.classList.toggle("hide");
});

closeBtn.addEventListener("click", () => {
  rulesBox.classList.add("hide");
});

winPlayAgain.addEventListener("click", playAgainHandler);
resultPlayAgain.addEventListener("click", playAgainHandler);
replayBtn.addEventListener("click", playAgainHandler);
