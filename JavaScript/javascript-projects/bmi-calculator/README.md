# BMI Calculator

A simple, responsive, and attractive **BMI (Body Mass Index) Calculator** built using **HTML, Tailwind CSS, and JavaScript**.

The application allows users to enter their height and weight and calculates their BMI. It also displays a BMI classification guide to help users understand their result.

## Features

- Calculate BMI using height and weight
- Clean and modern user interface
- Responsive design for different screen sizes
- Gradient background
- Interactive input fields
- Animated calculate button
- BMI result display
- BMI classification guide:
  - Underweight
  - Normal
  - Overweight
  - Obese
- No external CSS file required
- Uses Tailwind CSS through CDN

## Technologies Used

- **HTML5** — Structure of the webpage
- **Tailwind CSS** — Styling and responsive design
- **JavaScript** — BMI calculation and functionality

## Project Structure

```text
BMI-Calculator/
│
├── index.html
├── script.js
└── README.md
```

## How BMI Is Calculated

The BMI formula used by the calculator is:

```text
BMI = Weight (kg) / Height² (m)
```

For example, if a person weighs **70 kg** and is **1.75 m** tall:

```text
BMI = 70 / (1.75 × 1.75)
BMI = 22.86
```

## BMI Categories

| BMI Range | Category |
|---|---|
| Below 18.5 | Underweight |
| 18.5 – 24.9 | Normal |
| 25 – 29.9 | Overweight |
| 30 or above | Obese |

## Getting Started

### 1. Clone the Repository

```bash
git clone 
```

### 2. Open the Project

Navigate into the project folder:

```bash
cd bmi-calculator
```

### 3. Run the Project

Simply open `index.html` in your web browser.

You can also use **Live Server** in Visual Studio Code for a better development experience.

## Tailwind CSS

This project uses Tailwind CSS through the browser CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

Therefore, you don't need to install Tailwind CSS or Node.js to run the basic project.

## JavaScript

The JavaScript functionality is stored in:

```text
myProject4.js
```

The HTML uses the following IDs so that JavaScript can access the form elements:

```text
form
height
weight
result
```

## Future Improvements

Some possible improvements for future versions:

- Add BMI calculation history
- Add reset button
- Add animations for the result
- Add dark mode
- Add age and gender information
- Add health recommendations
- Improve accessibility
- Add local storage for previous results

## Screenshots
preview.png
## License

This project is open source and available for educational and personal use.

## Author

Created as a frontend practice project using HTML, Tailwind CSS, and JavaScript.