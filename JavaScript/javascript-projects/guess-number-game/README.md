# Number Guessing Game

A simple and attractive **Number Guessing Game** built with HTML, CSS, and JavaScript.

The player has **10 attempts** to guess a randomly generated number between **1 and 100**. After every guess, the game tells the player whether the guess is too high or too low. When the correct number is guessed, or all attempts are used, the game ends and the player can start a new game.

## Features

- Random number generated between 1 and 100
- 10 attempts per game
- Input validation
- Previous guesses displayed
- Remaining attempts displayed
- Helpful "too high" / "too low" feedback
- Congratulations message for a correct guess
- Game-over message showing the correct number
- Start New Game functionality
- Responsive frontend
- Modern dark/glass-style interface
- Gradient buttons and interactive hover/focus effects
- No horizontal or vertical page scrollbar
- Works on desktop and mobile screens

## Technologies Used

- **HTML5** — page structure
- **CSS3** — styling, responsive layout, gradients, animations, and UI effects
- **JavaScript** — game logic and DOM manipulation

## Project Structure

```text
number-guessing-game/
│
├── index.html
├── style.css
├── project3.js
└── README.md
```

> The JavaScript file in the original project is named `project3.js`. If your HTML file uses a different CSS filename, update the stylesheet reference accordingly.

## How the Game Works

1. When the page loads, JavaScript generates a random number between 1 and 100.
2. The player enters a number in the input field.
3. The game validates the entered value.
4. A valid guess is added to the previous-guesses list.
5. The game compares the guess with the random number.
6. The player receives one of these results:
   - **Too low**
   - **Too high**
   - **Correct**
7. The number of remaining attempts is updated.
8. The game ends when:
   - The player guesses the correct number, or
   - The player uses all 10 attempts.
9. A **Start New Game** option appears after the game ends.

## Input Validation

The game checks that:

- The input is a number.
- The number is not less than 1.
- The number is not greater than 100.

Invalid values produce an alert asking the player to enter a valid number.

## User Interface

The frontend uses a dark modern design with:

- A centered game card
- Rounded corners
- Subtle shadows and glow
- Dark gradient background
- Cyan/blue accent colors
- Animated feedback messages
- Interactive submit button
- Focus effect on the input field
- Responsive sizing for smaller screens

The page also prevents unwanted horizontal and vertical scrolling so the game remains contained within the viewport.

## JavaScript Logic

The main game variables are:

```javascript
let randomNumber = Math.floor(Math.random() * 100) + 1;

let previousGuesses = [];
let guessCount = 1;
let playGame = true;
```

The main functions are:

### `validateGuess(guess)`

Validates the player's input and sends valid guesses to the game logic.

### `checkGuess(guess)`

Checks whether the guess is:

- Correct
- Too low
- Too high

### `displayGuess(guess)`

Updates the previous guesses and remaining attempts.

### `displayMessage(message)`

Displays feedback to the player.

### `endGame()`

Disables the input and displays the option to start a new game.

### `newGame()`

Resets the game state and generates a new random number.

## Running the Project

No framework or build tool is required.

### Option 1 — Open directly

Open `index.html` in a web browser.

### Option 2 — Use VS Code Live Server

If you use Visual Studio Code:

1. Open the project folder.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

## Example Gameplay

```text
Number Guessing Game

Try and guess a random number between 1 and 100.
You have 10 attempts to guess the right number.

Guess a Number
[     50     ]
[ Submit Guess ]

Previous Guesses: 50, 75, 62
Guesses Remaining: 7

Your guess is too low.
```

## Future Improvements

Possible improvements for future versions include:

- Add difficulty levels
- Add a score system
- Add a timer
- Add sound effects
- Store high scores using `localStorage`
- Add a game statistics section
- Add light/dark theme switching
- Add keyboard-friendly controls
- Add a reset/restart icon
- Add more animations

## License

This project is free to use for learning and personal projects.

---

## Author

Built as a beginner-friendly JavaScript project to practice:

- DOM manipulation
- Event listeners
- Functions
- Conditional statements
- Arrays
- Random number generation
- Form handling
- CSS styling and responsive design
