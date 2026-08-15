# 🖼️ Beautiful Image Slider

A modern and responsive **Image Slider / Carousel** built using **HTML, JavaScript, and Tailwind CSS**.

The project features a glassmorphism-style interface, smooth hover animations, responsive design, and Previous/Next navigation buttons.

## ✨ Features

- 🖼️ Dynamic image slider
- ⬅️ Previous image button
- ➡️ Next image button
- 🎨 Modern glassmorphism UI
- 🌌 Gradient background
- ✨ Smooth hover animations
- 🔍 Image zoom effect on hover
- 📱 Fully responsive design
- 💜 Beautiful purple accent effects
- ⚡ Tailwind CSS for styling
- 🧩 Simple JavaScript implementation

## 🛠️ Technologies Used

- **HTML5** — Page structure
- **CSS / Tailwind CSS** — Styling and responsive design
- **JavaScript** — Image slider functionality

## 📁 Project Structure

```text
image-slider/
│
├── index.html
├── imageSlider.js
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone 
```

### 2. Open the project

Navigate into the project folder:

```bash
cd image-slider
```

### 3. Run the project

You don't need to install any dependencies.

Simply open:

```text
index.html
```

in your browser.

You can also use the **Live Server** extension in VS Code for a better development experience.

## 🎯 How It Works

The HTML file contains the slider structure:

- Previous button
- Image container
- Next button

The JavaScript file controls which image is displayed.

For example:

```javascript
const images = [
    "images/image1.jpg",
    "images/image2.jpg",
    "images/image3.jpg"
];
```

The Previous and Next buttons update the current image.

## 🖼️ Adding Your Own Images

Add your images to an `images` folder:

```text
image-slider/
│

├── image1.jpg
├── image2.jpg
└── image3.jpg
│
├── index.html
├── imageSlider.js
└── README.md
```

Then add their paths to your JavaScript file:

```javascript
const images = [
    "images/image1.jpg",
    "images/image2.jpg",
    "images/image3.jpg"
];
```

## 🎨 UI Design

The interface uses:

- Glassmorphism
- Gradient backgrounds
- Rounded cards
- Soft shadows
- Blur effects
- Hover animations
- Responsive sizing

The Tailwind CSS CDN is included directly in `index.html`, so no Tailwind installation is required.

## 📱 Responsive Design

The slider is designed to work across different screen sizes:

| Device | Support |
|---|---|
| 📱 Mobile | ✅ |
| 📲 Tablet | ✅ |
| 💻 Desktop | ✅ |
| 🖥️ Large Screens | ✅ |

## 🔮 Future Improvements

Some features that could be added in the future:

- [ ] Automatic slideshow
- [ ] Play/Pause button
- [ ] Image counter
- [ ] Dots navigation
- [ ] Keyboard navigation
- [ ] Touch/swipe support
- [ ] Smooth image transition animations
- [ ] Fullscreen image preview
- [ ] Loading animation

## 👨‍💻 Author

Created with ❤️ using HTML, Tailwind CSS, and JavaScript.

## 📄 License

This project is open source and available for personal and educational use.