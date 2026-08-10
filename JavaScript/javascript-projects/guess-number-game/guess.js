// Generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Select DOM elements
const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHigh = document.querySelector(".lowOrHigh");
const startOver = document.querySelector(".resultParas");

// Create new game button container
const p = document.createElement("p");

// Game variables
let previousGuesses = [];
let guessCount = 1;
let playGame = true;

// Start game
if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();

    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

// Validate user's guess
function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number.");
  } else if (guess < 1) {
    alert("Please enter a number greater than or equal to 1.");
  } else if (guess > 100) {
    alert("Please enter a number less than or equal to 100.");
  } else {
    previousGuesses.push(guess);

    if (guessCount === 11) {
      displayGuess(guess);
      displayMessage(`Game Over! The random number was ${randomNumber}.`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

// Check if guess is correct
function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage("🎉 Congratulations! You guessed it correctly.");
    endGame();
  } else if (guess < randomNumber) {
    displayMessage("📉 Your guess is too low.");
  } else {
    displayMessage("📈 Your guess is too high.");
  }
}

// Display guess history
function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess}, `;
  guessCount++;
  remaining.innerHTML = `${11 - guessCount}`;
}

// Display message
function displayMessage(message) {
  lowOrHigh.innerHTML = `<h2>${message}</h2>`;
}

// End the game
function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");

  p.classList.add("button");
  p.innerHTML = `<h2 id="newGame" style="cursor:pointer;">Start New Game</h2>`;

  startOver.appendChild(p);

  playGame = false;

  newGame();
}

// Restart the game
function newGame() {
  const newGameButton = document.querySelector("#newGame");

  newGameButton.addEventListener("click", function () {
    randomNumber = Math.floor(Math.random() * 100) + 1;

    previousGuesses = [];
    guessCount = 1;

    guessSlot.innerHTML = "";
    remaining.innerHTML = "10";
    lowOrHigh.innerHTML = "";

    userInput.value = "";
    userInput.removeAttribute("disabled");

    startOver.removeChild(p);

    playGame = true;
  });
}