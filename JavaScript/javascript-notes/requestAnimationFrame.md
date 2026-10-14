## `requestAnimationFrame()` in JavaScript

`requestAnimationFrame()` (often called **rAF**) is a browser function used to create **smooth animations** and perform visual updates efficiently.

The simple idea is:

> **"Browser, tell me when you're ready to draw the next frame, and I'll update my animation then."**

---

## 1. First, what is a frame?

Your screen doesn't show everything continuously. It updates the picture many times per second.

A common target is **60 frames per second (60 FPS)**.

That means approximately:

```text
1 second = 60 frames

1 frame ≈ 16.67 ms
```

You can imagine:

```text
Frame 1 → Frame 2 → Frame 3 → Frame 4 → ...
```

If we change an object's position slightly on every frame, our eyes see it as movement.

For example:

```text
Frame 1: 🟦
Frame 2:   🟦
Frame 3:     🟦
Frame 4:       🟦
```

Our brain sees this as animation.

---

# 2. What is `requestAnimationFrame()`?

The syntax is:

```js
requestAnimationFrame(callback);
```

For example:

```js
function animate() {
    console.log("Next frame");
    
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

This creates a loop where the browser calls `animate()` before the next screen update.

Conceptually:

```text
requestAnimationFrame()
        ↓
Browser prepares next frame
        ↓
Your function runs
        ↓
Browser renders
        ↓
requestAnimationFrame()
        ↓
Next frame
        ↓
...
```

---

# 3. Why not just use `setInterval()`?

A common beginner approach is:

```js
setInterval(() => {
    // update animation
}, 16);
```

You might think:

> 60 FPS ≈ every 16 milliseconds.

That's roughly true, but `setInterval()` isn't designed specifically for browser rendering.

The browser might be busy doing something else.

For example:

```text
JavaScript
    ↓
Rendering
    ↓
Layout
    ↓
Paint
    ↓
Other browser work
```

Your `setInterval()` callback can happen at an inconvenient time.

`requestAnimationFrame()` is specifically designed to coordinate JavaScript visual updates with the browser's rendering process.

---

# 4. Basic animation example

Suppose we have:

```html
<div id="box"></div>
```

CSS:

```css
#box {
    width: 50px;
    height: 50px;
    background: red;
    position: relative;
}
```

JavaScript:

```js
const box = document.getElementById("box");

let position = 0;

function animate() {
    position += 2;

    box.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

What's happening?

```text
Start
 ↓
position = 0
 ↓
requestAnimationFrame()
 ↓
position = 2
 ↓
requestAnimationFrame()
 ↓
position = 4
 ↓
requestAnimationFrame()
 ↓
position = 6
 ↓
...
```

The box appears to move smoothly.

---

# 5. Why is it called "request"?

Because you're basically telling the browser:

> "Please call my function before you render the next frame."

You're **requesting** an animation frame.

```js
requestAnimationFrame(animate);
```

The browser decides the appropriate time to call your function.

---

# 6. The callback receives a timestamp

`requestAnimationFrame()` gives your callback a timestamp.

Example:

```js
function animate(timestamp) {
    console.log(timestamp);

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

The `timestamp` tells you the approximate time at which the frame is scheduled.

This is very useful for creating animations that move at the correct speed regardless of frame rate.

---

# 7. Why use the timestamp?

Consider this animation:

```js
position += 2;
```

You might assume:

```text
Frame 1 → +2
Frame 2 → +2
Frame 3 → +2
```

But what if the computer only manages 30 FPS?

Then the animation could appear slower.

Instead, we can calculate movement based on **time**.

For example:

```js
let position = 0;
let previousTime = 0;

function animate(currentTime) {
    const deltaTime = currentTime - previousTime;
    previousTime = currentTime;

    position += 0.1 * deltaTime;

    box.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

Now movement is based on elapsed time rather than simply assuming every frame takes the same amount of time.

---

# 8. `requestAnimationFrame()` and 60 FPS

A common misunderstanding is:

> "`requestAnimationFrame()` always runs exactly 60 times per second."

**No.**

The browser generally tries to synchronize it with the display's refresh rate.

For example, a display might run at:

```text
60 Hz  → roughly 60 frames/sec
120 Hz → roughly 120 frames/sec
144 Hz → roughly 144 frames/sec
```

But actual execution can vary depending on:

* CPU workload
* GPU workload
* Browser workload
* Background tabs
* Device performance

So don't think:

```text
rAF = exactly 60 FPS
```

Think:

```text
rAF = "run my visual update at an appropriate time for the next frame"
```

---

# 9. What happens when a tab is inactive?

Browsers can reduce or pause animation callbacks for pages that aren't visible.

For example:

```text
User looking at page
       ↓
requestAnimationFrame runs normally


User switches to another tab
       ↓
Browser can slow down/pause callbacks
```

This is useful because the browser doesn't need to waste CPU/GPU resources animating something the user can't see.

This is another advantage over continuously running timers.

---

# 10. `requestAnimationFrame()` vs `setInterval()`

| `requestAnimationFrame()`           | `setInterval()`                        |
| ----------------------------------- | -------------------------------------- |
| Designed for visual updates         | General-purpose timer                  |
| Synchronizes with browser rendering | Runs based on timer interval           |
| Good for animations                 | Good for repeated tasks                |
| Browser can optimize/pause it       | Doesn't have rendering synchronization |
| Usually preferred for animations    | Usually not ideal for animations       |

For example:

### Animation

Use:

```js
requestAnimationFrame(animate);
```

### Repeating background task

You might use:

```js
setInterval(doSomething, 1000);
```

---

# 11. Important: don't create multiple animation loops accidentally

Consider:

```js
function animate() {
    // animation

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

That's one loop.

But if you repeatedly do:

```js
requestAnimationFrame(animate);
requestAnimationFrame(animate);
requestAnimationFrame(animate);
```

you can accidentally create multiple loops.

You could end up with:

```text
Loop 1 ────────────────→
Loop 2 ────────────────→
Loop 3 ────────────────→
```

Now you're doing unnecessary work.

---

# 12. How to stop an animation

`requestAnimationFrame()` returns an ID.

```js
const animationId = requestAnimationFrame(animate);
```

You can cancel it with:

```js
cancelAnimationFrame(animationId);
```

For example:

```js
let animationId;

function animate() {
    // animation work

    animationId = requestAnimationFrame(animate);
}

animationId = requestAnimationFrame(animate);

// Stop animation
cancelAnimationFrame(animationId);
```

---

# 13. `requestAnimationFrame()` and Reflow/Repaint

This connects directly to what we discussed earlier.

Suppose you're animating:

```js
box.style.width = "500px";
```

The browser may need to perform layout work.

But if you're moving an element, a common approach is:

```js
box.style.transform = `translateX(${position}px)`;
```

Then:

```text
requestAnimationFrame()
       ↓
Update transform
       ↓
Browser rendering
       ↓
Next frame
```

Using `rAF` doesn't magically eliminate reflow or repaint.

**It simply schedules your visual JavaScript work at an appropriate point in the browser's rendering cycle.**

That's an important distinction.

---

# 14. A practical example

Imagine a game character:

```text
Frame 1

🧍
```

Then:

```text
Frame 2

  🧍
```

Then:

```text
Frame 3

    🧍
```

JavaScript can update the character's position:

```js
let x = 0;

function gameLoop() {
    x += 5;

    player.style.transform = `translateX(${x}px)`;

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
```

The browser keeps calling `gameLoop()` for the animation.

---

# 15. Common mistake

Don't use `requestAnimationFrame()` when you don't need animation.

For example:

```js
requestAnimationFrame(() => {
    console.log("Hello");
});
```

There's no real benefit if you're just trying to print something.

Use it when your code is connected to **visual updates**, such as:

* Animations
* Games
* Dragging
* Scrolling effects
* Canvas drawing
* Visual transitions
* Frequently changing UI

---

# 16. The easiest way to remember it

Think of the browser as a movie projector 🎥.

A movie is made from many individual pictures:

```text
🖼️ → 🖼️ → 🖼️ → 🖼️ → 🖼️
```

Each picture is a **frame**.

`requestAnimationFrame()` is like telling the browser:

> **"Before you show the next picture, let me update my animation."**

So:

```text
requestAnimationFrame()
        ↓
Update animation
        ↓
Browser renders frame
        ↓
requestAnimationFrame()
        ↓
Update animation
        ↓
Browser renders next frame
        ↓
...
```

### In one sentence:

> **`requestAnimationFrame()` is a browser API that schedules a function to run before the browser's next repaint, making it the standard tool for smooth JavaScript-driven animations.**

And in terms of the performance topics you're learning:

```text
Performance
    ↓
Rendering performance
    ↓
Reflow / Repaint / Composite
    ↓
requestAnimationFrame()
    ↓
Efficiently schedule visual updates
```

Exactly — this is the part that is confusing at first. Think of your screen like a **flipbook**.

![Image](https://images.openai.com/static-rsc-4/mW834l9rGw7gVZkJ687EIAiw08CQ_THJqvb1qnzQI63vm0pOAAA_W07F3p5FrC95mjVSVTq5MgnBZRtC2MlvTtncjefy0YYrxafQdf0i2b3xLpSKYOftM5XkD8TcxdIe_2FD7rpbyPMImQy5O0sCuiqHidyKQ0ZC3uBzEE0euIoCTZC4Shs0fh5C9UWNXdPC?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/35WlO1Wudnna33JQRjAzNZDKuHcRzQ8pIdGGneqPyRTleZfyvjTC7k61LonME3lGd2RqCKdKSQlW_TuW7g49Sydk9JD0TkkTkJRavjnyC1Gyoc5h6jPtFmUroJUI7J1r7zyMiQEjzqZVkF3Em1kt4udPQ8Twbfz2TMw1hhmg9kVj7u53A61cYhqT87rMesst?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/dn7FekuMZ3AU7vNVeBw4orrTIqqNOIZuW5wXh5IQEdNcGJJ0wZgmK6FvXZjuUqphoiN1wcvg779evA2vxtwgT4MXaU_mKbBSPI41kG2BBdvAHFe8RAZti1cFNuDVR3C9WqqMV8giN8v8MWUv_nVFDBLtEvVWmHNNPTpjrmz0W_uyirVQbw4--J4rMumJ9VGU?purpose=fullsize)

Imagine you draw a ball on 5 pieces of paper:

```text
Paper 1       Paper 2       Paper 3       Paper 4

  🔴            🔴              🔴              🔴
                 →              →→             →→→
```

The ball is in a slightly different position on every paper.

Now flip the papers **very quickly**:

```text
🔴 →  🔴 →   🔴 →    🔴 →     🔴
```

Your eyes don't see:

> "Oh, that's 5 separate pictures."

Instead, you see:

> **"The ball is moving!"** 🏃

That's basically what happens on your computer screen.

### What does 60 FPS mean?

If your screen is running at **60 Hz**, it can display about **60 frames in one second**:

```text
1 second
│
├─ Frame 1
├─ Frame 2
├─ Frame 3
├─ Frame 4
├─ ...
└─ Frame 60
```

Each frame is a slightly updated picture.

So if JavaScript moves a box:

```js
let x = 0;

function animate() {
    x += 2;
    box.style.transform = `translateX(${x}px)`;

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

You can imagine:

```text
Frame 1: 🔵
Frame 2:   🔵
Frame 3:     🔵
Frame 4:       🔵
Frame 5:         🔵
Frame 6:           🔵
...
```

The browser displays those frames quickly, and **you perceive smooth movement**.

### So what does `requestAnimationFrame()` actually do?

It basically tells the browser:

> **"Hey browser, before you show the next frame, let me update my animation."**

So:

```text
JavaScript
    ↓
Move the ball a little
    ↓
Browser prepares next frame
    ↓
Screen shows it
    ↓
Move the ball a little more
    ↓
Browser prepares next frame
    ↓
Screen shows it
    ↓
...
```

That's why the name is:

**request + animation + frame**

You're requesting:

> **"Give me a chance to update my animation for the next frame."**

And that's the main idea behind `requestAnimationFrame()`.

