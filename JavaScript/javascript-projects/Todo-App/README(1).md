# My Todo List

## Overview

My Todo List is a responsive, interactive task-management web application built with HTML, CSS, JavaScript, and Tailwind CSS.

The project focuses on practicing core JavaScript concepts by building a CRUD-style application where users can add, edit, complete, and delete tasks.

A key feature is browser-based data persistence using `localStorage`, allowing tasks to remain available after refreshing the page.

## Features

- Add new tasks
- Edit existing tasks
- Mark tasks as completed/incomplete
- Delete individual tasks
- Automatically save tasks to `localStorage`
- Restore saved tasks when the application loads
- Empty-state UI when there are no tasks
- Scrollable task list
- Responsive dark-themed interface
- Keyboard-based task editing
- Dynamic task rendering

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Tailwind CSS
- Browser Local Storage API

## How It Works

Each task is stored as a JavaScript object:

```javascript
{
    id: Date.now(),
    text: "Learn JavaScript",
    completed: false
}
```

Tasks are maintained inside an array and dynamically rendered into the DOM through the `renderTasks()` function.

## Local Storage

The application uses `localStorage` to persist tasks between browser refreshes.

### Saving tasks

```javascript
localStorage.setItem("task", JSON.stringify(arr));
```

### Loading tasks

```javascript
const savedTasks = localStorage.getItem("task");

if (savedTasks) {
    arr = JSON.parse(savedTasks);
}
```

`JSON.stringify()` converts the task array into a storable string, while `JSON.parse()` converts the stored value back into a JavaScript array.

This provides client-side persistence without requiring a backend or database.

## CRUD Operations

| Operation | Implementation |
|---|---|
| Create | Add a new task |
| Read | Load and render saved tasks |
| Update | Edit task text or completion state |
| Delete | Remove a task |

## JavaScript Concepts Practiced

- Arrays and objects
- Functions
- `forEach()`
- `filter()`
- Conditional statements
- DOM manipulation
- `createElement()`
- `appendChild()`
- Event listeners
- Click events
- Keyboard events
- `classList`
- `contentEditable`
- JSON serialization/deserialization
- `localStorage`
- Dynamic rendering
- State management

## Editing Tasks

Tasks can be edited directly from the interface. Clicking Edit enables `contentEditable`, and pressing Enter saves the updated text.

## Completing Tasks

Each task has an interactive checkbox. Changing the checkbox updates the task's `completed` state and saves the updated array to local storage. Completed tasks receive a line-through visual style.

## Deleting Tasks

The Delete button removes the selected task using JavaScript's `filter()` method, then saves the updated task array and re-renders the UI.

## UI & Design

The application includes:

- Responsive layout
- Dark interface
- Custom checkboxes
- Interactive buttons
- Scrollable task container
- Empty-state screen
- Responsive typography
- Hover effects
- Completed-task styling

## Project Structure

```text
Todo-List/
├── index.html
├── TodoAppL2.js
└── README.md
```

## Running the Project

1. Clone or download the repository.
2. Open the project folder in your code editor.
3. Open `index.html` in a browser.

No backend or build process is required.

## What I Learned

This project helped me connect individual JavaScript concepts into a functional application:

**State → User Interaction → DOM Update → Data Persistence**

The most important concept was understanding how `localStorage` can maintain application data between browser refreshes, allowing a simple JavaScript application to provide persistent user data.

## Future Improvements

- [ ] Filter tasks by All / Active / Completed
- [ ] Add task search
- [ ] Add task counter
- [ ] Add priority levels
- [ ] Add due dates
- [ ] Add Clear Completed functionality
- [ ] Add drag-and-drop task ordering
- [ ] Add dark/light theme switching
- [ ] Improve keyboard accessibility
- [ ] Add backend/database support
- [ ] Synchronize tasks across devices

## Project Purpose

This project was created as a practical exercise in Vanilla JavaScript and frontend development, with a focus on DOM manipulation, event handling, CRUD operations, state management, and client-side persistence.

**Built with JavaScript ❤️**
