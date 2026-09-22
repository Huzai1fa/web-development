# Modules: `import` / `export` (JavaScript ES6)

A **module** is a JavaScript file that contains code (variables, functions, classes, etc.) that can be **shared** with other JavaScript files.

Using modules helps organize code into smaller, reusable files.

---

# Why use modules?

* Improve code organization.
* Reuse code in multiple files.
* Avoid global variable conflicts.
* Make applications easier to maintain and debug.

---

# 1. `export`

The `export` keyword is used to make variables, functions, or classes available to other modules.

## Named Export

**math.js**

```javascript
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}
```

Now `PI` and `add()` can be imported into another file.

---

## Export at the end

```javascript
const PI = 3.14159;

function add(a, b) {
  return a + b;
}

export { PI, add };
```

---

# 2. `import`

The `import` keyword is used to bring exported members into another file.

**app.js**

```javascript
import { PI, add } from "./math.js";

console.log(PI);
console.log(add(5, 10));
```

Output:

```text
3.14159
15
```

---

# 3. Default Export

A module can have **one default export**.

**greet.js**

```javascript
export default function greet(name) {
  console.log(`Hello, ${name}`);
}
```

Import it like this:

```javascript
import greet from "./greet.js";

greet("Ali");
```

Output:

```text
Hello, Ali
```

Notice that **default imports do not use `{}`**.

---

# 4. Import Everything

You can import all exported members as one object.

```javascript
import * as MathUtils from "./math.js";

console.log(MathUtils.PI);
console.log(MathUtils.add(5, 3));
```

---

# 5. Rename Imports or Exports

### Rename while exporting

```javascript
function add(a, b) {
  return a + b;
}

export { add as sum };
```

### Rename while importing

```javascript
import { sum as addNumbers } from "./math.js";

console.log(addNumbers(5, 10));
```

---

# Types of Exports

| Type           | Syntax                        | Import                                |
| -------------- | ----------------------------- | ------------------------------------- |
| Named Export   | `export const x = 10;`        | `import { x } from "./file.js";`      |
| Default Export | `export default function(){}` | `import myFunction from "./file.js";` |
| Import All     | `export ...`                  | `import * as obj from "./file.js";`   |

---

# Advantages of Modules

* **Code Reusability:** Write code once and use it in multiple files.
* **Better Organization:** Large applications are divided into smaller, manageable modules.
* **Avoids Global Scope Pollution:** Variables and functions remain inside their own modules unless exported.
* **Easier Maintenance:** Changes in one module do not affect unrelated modules.
* **Improved Collaboration:** Multiple developers can work on different modules independently.

---

# Exam Definition

> **Modules** are JavaScript files that encapsulate related code and allow it to be shared between files. The **`export`** keyword makes variables, functions, or classes available to other modules, while the **`import`** keyword is used to access those exported members. Modules improve code organization, reusability, maintainability, and help prevent global namespace conflicts.


Question
on console if i use console.log it shows output on browserbut if i directly write in browser console it give me some errior consol

This usually happens because **the browser console is not running in module mode**, while your JavaScript file is.

For example, if your file contains:

```javascript
// export.js
export const pi = 3.14159;
```

and

```javascript
// main.js
import { pi } from "./export.js";

console.log(pi);
```

and your HTML has:

```html
<script type="module" src="main.js"></script>
```

then:

* ✅ `console.log(pi)` inside `main.js` works because `pi` is imported into that module.
* ❌ Typing `pi` directly in the browser's DevTools console gives an error like:

```text
ReferenceError: pi is not defined
```

### Why?

The browser console is **not inside your module**. Variables imported into a module are **local to that module** and are **not global**.

Think of it like this:

```
Browser Console
     │
     ├── Cannot see pi

main.js (module)
     │
     ├── import { pi } from "./export.js"
     └── Can use pi
```

### If you want to test it in the console

You can expose it to the global object:

```javascript
import { pi } from "./export.js";

window.pi = pi;
```

Now, in the browser console:

```javascript
pi
```

or

```javascript
window.pi
```

will output:

```text
3.14159
```

### Can you tell me the **exact error message** you get in the browser console? For example:

* `ReferenceError: pi is not defined`
* `Cannot use import statement outside a module`
* `Unexpected token 'export'`

The exact error will help identify the issue.

No. **`MathUtils` is not a built-in module.** It is just a **name that you choose**.

For example:

```javascript
import * as MathUtils from "./export.js";
```

Here:

* `*` means "import everything".
* `as MathUtils` means "store all imported exports in an object named `MathUtils`."

You could use **any valid variable name**:

```javascript
import * as MyModule from "./export.js";
```

or

```javascript
import * as abc from "./export.js";
```

or even

```javascript
import * as utils from "./export.js";
```

All of these are valid.

For example:

**export.js**

```javascript
export const pi = 3.14;
export function add(a, b) {
  return a + b;
}
```

**main.js**

```javascript
import * as abc from "./export.js";

console.log(abc.pi);        // 3.14
console.log(abc.add(2, 3)); // 5
```

### Why do people use `MathUtils`?

It's just a **descriptive name** because the module contains math-related functions and constants. It is **not** related to JavaScript's built-in `Math` object.

For example:

```javascript
Math.PI        // Built-in JavaScript Math object
Math.random()  // Built-in method
```

This is completely different from:

```javascript
import * as MathUtils from "./export.js";
```

Here, `MathUtils` is **your own object** that contains whatever you exported from `export.js`.

**In short:** `MathUtils` is **not built in**—it's just an alias (a variable name) that you choose for the imported module.


is there a built in module

Yes, JavaScript does have built-in modules, but it depends on the environment.

* Browser JavaScript: has many built-in global objects (like `Math`, `Date`, `JSON`) and some built-in ES modules provided by the browser.

* Node.js: has many built-in modules such as `fs`, `path`, `http`, `os`, etc.

### Important distinction: `Math` is not a module

This is built-in, but it is a global object, not a module.

JavaScript

```
console.log(Math.PI);
console.log(Math.random());
```

You do not import it.

❌ Wrong:

`import Math from "math";`

### Built-in modules in the browser

Examples:

* `std:kv` ❌ (not standard browser JS)

* Browser APIs like `fetch`, `URL`, `localStorage` are built-in features, but not usually imported as modules.

In normal browser JavaScript, most built-in features are available globally.

### Built-in modules in Node.js

These are true built-in modules and must be imported.

### Example: `fs`

`import fs from "fs"; console.log(fs.readFileSync);`

### Example: `path`

`import path from "path"; console.log(path.basename("/a/b/file.txt"));`

These modules come with Node.js, so you don’t install them.

### Compare all three

| Feature                                  | Type                 | Import needed? |
| ---------------------------------------- | -------------------- | -------------- |
| Math.PI                                  | Global object        | ❌ No           |
| Date                                     | Global object        | ❌ No           |
| fetch()                                  | Built-in browser API | ❌ No           |
| import fs from "fs"                      | Built-in Node module | ✅ Yes          |
| import path from "path"                  | Built-in Node module | ✅ Yes          |
| import * as MathUtils from "./export.js" | Your custom module   | ✅ Yes          |

### In your browser project

If you created `export.js`, then it is a custom module.

`// export.js export const pi = 3.14;`

`// main.js import { pi } from "./export.js";`

This is not built-in.

### A useful mental model

No import

Global / built-in objects

`Math``Date``JSON``fetch`

Import required

Modules

`import fs from "fs"``import path from "path"``import { pi } from "./export.js"`

So when you write:

`import * as MathUtils from "./export.js";`

`MathUtils` is not a built-in module. It is just a name you chose for your own module object.

The built-in thing that looks similar is `Math`, but `Math` is a global object, not a module.


For **JavaScript Modules (`import` / `export`)**, these are the **most important concepts** you should know for exams and interviews.

## 1. What is a module?

A **module** is simply a JavaScript file that contains code (variables, functions, classes, etc.) that can be shared with other files.

---

## 2. `export`

Use `export` to make code available to other modules.

```javascript
// math.js
export const pi = 3.14;

export function add(a, b) {
  return a + b;
}
```

---

## 3. Named Import

Import specific exports using curly braces `{}`.

```javascript
import { pi, add } from "./math.js";

console.log(pi);
console.log(add(2, 3));
```

**Remember:**

* Named exports → use `{}`.
* The names must match the exported names (unless you rename them with `as`).

---

## 4. Default Export

A module can have **only one default export**.

```javascript
// greet.js
export default function greet() {
  console.log("Hello");
}
```

Import it **without** `{}`.

```javascript
import greet from "./greet.js";
```

---

## 5. Import Everything

Import all named exports as one object.

```javascript
import * as MathUtils from "./math.js";

console.log(MathUtils.pi);
MathUtils.add(2, 3);
```

`MathUtils` is **just a variable name** that you choose.

---

## 6. Difference between Named and Default Export

| Named Export                      | Default Export                |
| --------------------------------- | ----------------------------- |
| `export const pi = 3.14;`         | `export default pi;`          |
| `import { pi } from "./math.js";` | `import pi from "./math.js";` |
| Use `{}`                          | Don't use `{}`                |
| Multiple allowed                  | Only one per module           |

---

## 7. Module Scope

Variables inside a module are **private** unless exported.

```javascript
// math.js
const secret = 123;
export const pi = 3.14;
```

`secret` cannot be imported because it wasn't exported.

---

## 8. Browser Requirement

If using modules in HTML:

```html
<script type="module" src="main.js"></script>
```

Without `type="module"`, `import` and `export` won't work in the browser.

---

## 9. File Path

Always use the correct relative path.

```javascript
import { pi } from "./math.js";
```

* `./` → current folder
* `../` → parent folder

---

## 10. Why use modules?

* Organize code into separate files.
* Reuse code.
* Avoid global variable conflicts.
* Make projects easier to maintain.

---

# Exam Cheat Sheet

```javascript
// Named Export
export const pi = 3.14;

// Named Import
import { pi } from "./math.js";

// Default Export
export default function greet() {}

// Default Import
import greet from "./greet.js";

// Import Everything
import * as Utils from "./math.js";
```

### The 5 rules to memorize

1. ✅ `export` makes code available to other files.
2. ✅ `import` brings exported code into another file.
3. ✅ **Named export** → `import { name }`.
4. ✅ **Default export** → `import name` (no `{}`).
5. ✅ `import * as Utils` imports **all named exports** into one object.

If you understand these five points and can write the examples from memory, you'll have covered the core of the `import`/`export` topic.





Certainly! **Default export** is one of the most confusing parts of JavaScript modules at first, so let's break it down.

---

## What is a default export?

A **default export** is the **main thing** a module exports.

Each JavaScript module can have **only one** default export.

### Example

**greet.js**

```javascript
export default function greet() {
  console.log("Hello!");
}
```

Here, `greet()` is the default export of `greet.js`.

---

## How do you import it?

Unlike named exports, **you do not use curly braces `{}`**.

```javascript
import greet from "./greet.js";

greet();
```

Output:

```text
Hello!
```

---

## Why no `{}`?

With a default export, JavaScript already knows **there is only one default value** in that file, so it doesn't need you to specify its name.

Think of the file like this:

```text
greet.js
-----------------------
Main Export → greet()
```

So when you write:

```javascript
import greet from "./greet.js";
```

JavaScript says:

> "Import the default export from `greet.js` and call it `greet`."

---

## You can rename it!

This is the biggest difference from named exports.

Suppose `greet.js` contains:

```javascript
export default function greet() {
  console.log("Hello!");
}
```

You can import it as:

```javascript
import hello from "./greet.js";

hello();
```

or

```javascript
import myFunction from "./greet.js";

myFunction();
```

or

```javascript
import abc from "./greet.js";

abc();
```

All of these work because the imported name is **your choice**.

---

## Compare with named export

### Named export

**math.js**

```javascript
export const pi = 3.14;
```

Import:

```javascript
import { pi } from "./math.js";
```

This works because the exported name is `pi`.

But this **does not**:

```javascript
import { radius } from "./math.js";
```

❌ Error! There is no export named `radius`.

---

### Default export

**greet.js**

```javascript
export default function greet() {
  console.log("Hello");
}
```

Import:

```javascript
import anything from "./greet.js";
```

or

```javascript
import greet from "./greet.js";
```

or

```javascript
import xyz from "./greet.js";
```

All are valid because you're importing the module's **single default export**.

---

## Visual comparison

### Named export

```javascript
// math.js
export const pi = 3.14;
export const e = 2.71;
```

Import:

```javascript
import { pi, e } from "./math.js";
```

You must use the exact exported names.

---

### Default export

```javascript
// greet.js
export default function greet() {}
```

Import:

```javascript
import myFunction from "./greet.js";
```

There is only one default export, so you choose its local name.

---

## Can a module have both?

Yes!

```javascript
// math.js
export const pi = 3.14;

export default function add(a, b) {
  return a + b;
}
```

Import both:

```javascript
import add, { pi } from "./math.js";

console.log(pi);
console.log(add(2, 3));
```

Here:

* `add` is the **default export**.
* `pi` is a **named export**.

---

## Easy way to remember

Imagine a module is a school:

* **Named exports** are students. You must ask for them by name:

  ```javascript
  import { Ali, Sara } from "./school.js";
  ```

* **Default export** is the principal. There is only one principal, so you can call them whatever you like:

  ```javascript
  import Principal from "./school.js";
  ```

The actual name inside the module doesn't matter when importing the default export.

### Summary

| Named Export                                     | Default Export                       |
| ------------------------------------------------ | ------------------------------------ |
| `export const pi = 3.14;`                        | `export default function greet() {}` |
| `import { pi } from "./math.js";`                | `import greet from "./greet.js";`    |
| Uses `{}`                                        | No `{}`                              |
| Must use the exported name (or rename with `as`) | You can choose any local name        |
| Multiple named exports allowed                   | Only one default export per module   |


what was motive behind default export


That's a great question. The **motive behind default exports** is to make it easy to export the **single main thing** from a module.

### Imagine a module has one primary purpose

Suppose you have a file called `calculator.js`.

Its main purpose is to provide a calculator class.

```javascript
export default class Calculator {
  add(a, b) {
    return a + b;
  }
}
```

When another file uses it:

```javascript
import Calculator from "./calculator.js";
```

You don't have to remember the exact exported name or write `{ Calculator }`.

---

### Why not just use named exports?

You could write:

```javascript
export class Calculator {
  // ...
}
```

and import it as:

```javascript
import { Calculator } from "./calculator.js";
```

This works perfectly.

However, if the module has **one obvious main export**, forcing users to remember its exact name is unnecessary.

With a default export, the user can write:

```javascript
import MyCalculator from "./calculator.js";
```

or

```javascript
import Calc from "./calculator.js";
```

or

```javascript
import C from "./calculator.js";
```

All of these refer to the same default export.

---

### Real-world analogy

Think of a **book**.

* The **book title** is the main thing (default export).
* The **chapters** are additional things (named exports).

When someone borrows the book, they ask for:

> "The JavaScript Book"

They don't need to list every chapter.

Similarly, when a module mainly exists for one class or function, you import that single main export directly.

---

### Common use cases

Default exports are often used for:

* A main class
* A main function
* A main component (especially in React)

For example:

```javascript
// Button.js
export default function Button() {
  // ...
}
```

Then:

```javascript
import Button from "./Button.js";
```

The file name (`Button.js`) already tells you what the main export is.

---

### Why do many developers prefer named exports today?

Although default exports are useful, many developers prefer named exports because:

* They make it clear **what** is being imported.
* IDEs can auto-complete named exports more easily.
* Refactoring is often simpler.
* You can't accidentally import the wrong thing under a misleading name.

For example:

```javascript
import { add } from "./math.js";
```

is immediately clear.

Whereas:

```javascript
import abc from "./math.js";
```

doesn't tell you what `abc` actually is unless you inspect the module.

---

### In short

The original motivation for **default exports** was:

* ✅ A module often has **one primary export**.
* ✅ Make importing that main export simpler (no `{}`).
* ✅ Allow the importer to choose a convenient local name.

So, **default exports exist for modules whose main purpose is to provide one primary value**, while **named exports are better when a module exposes multiple related values**.

That's a great question. The **motive behind default exports** is to make it easy to export the **single main thing** from a module.

### Imagine a module has one primary purpose

Suppose you have a file called `calculator.js`.

Its main purpose is to provide a calculator class.

```javascript
export default class Calculator {
  add(a, b) {
    return a + b;
  }
}
```

When another file uses it:

```javascript
import Calculator from "./calculator.js";
```

You don't have to remember the exact exported name or write `{ Calculator }`.

---

### Why not just use named exports?

You could write:

```javascript
export class Calculator {
  // ...
}
```

and import it as:

```javascript
import { Calculator } from "./calculator.js";
```

This works perfectly.

However, if the module has **one obvious main export**, forcing users to remember its exact name is unnecessary.

With a default export, the user can write:

```javascript
import MyCalculator from "./calculator.js";
```

or

```javascript
import Calc from "./calculator.js";
```

or

```javascript
import C from "./calculator.js";
```

All of these refer to the same default export.

---

### Real-world analogy

Think of a **book**.

* The **book title** is the main thing (default export).
* The **chapters** are additional things (named exports).

When someone borrows the book, they ask for:

> "The JavaScript Book"

They don't need to list every chapter.

Similarly, when a module mainly exists for one class or function, you import that single main export directly.

---

### Common use cases

Default exports are often used for:

* A main class
* A main function
* A main component (especially in React)

For example:

```javascript
// Button.js
export default function Button() {
  // ...
}
```

Then:

```javascript
import Button from "./Button.js";
```

The file name (`Button.js`) already tells you what the main export is.

---

### Why do many developers prefer named exports today?

Although default exports are useful, many developers prefer named exports because:

* They make it clear **what** is being imported.
* IDEs can auto-complete named exports more easily.
* Refactoring is often simpler.
* You can't accidentally import the wrong thing under a misleading name.

For example:

```javascript
import { add } from "./math.js";
```

is immediately clear.

Whereas:

```javascript
import abc from "./math.js";
```

doesn't tell you what `abc` actually is unless you inspect the module.

---

### In short

The original motivation for **default exports** was:

* ✅ A module often has **one primary export**.
* ✅ Make importing that main export simpler (no `{}`).
* ✅ Allow the importer to choose a convenient local name.

So, **default exports exist for modules whose main purpose is to provide one primary value**, while **named exports are better when a module exposes multiple related values**.

suppose if var x is in function and we  change its value from outsisde function and print it then how does it is function scope if we can access it from outside function



Actually, **you cannot change a function-scoped `var` from outside the function directly**. If it seems like you can, you're probably working with a different variable.

Let's look at examples.

### Example 1: Function-scoped `var`

```javascript
function test() {
  var x = 10;
  console.log(x);
}

test();

x = 20;          // Trying to access x outside
console.log(x);
```

Output:

```text
10
20
```

**What happened?**

The `x` inside `test()` and the `x` outside are **two different variables**.

* Inside `test()`: `var x = 10;` (function-scoped)
* Outside: `x = 20;` creates or assigns a different variable (in non-strict mode; in strict mode it would throw an error if undeclared).

The function's `x` is **not** changed.

---

### Example 2: Calling the function again

```javascript
function test() {
  var x = 10;
  console.log(x);
}

test();

x = 20;

test();
```

Output:

```text
10
10
```

Notice that the second call still prints `10`. The outside `x` did not affect the inside `x`.

---

### Example 3: Global `var`

```javascript
var x = 10;

function test() {
  console.log(x);
}

test();

x = 20;

test();
```

Output:

```text
10
20
```

Here, `x` is **global**, not function-scoped. The function is using the global variable, so changing it outside changes what the function sees.

---

### Why is `var` called "function-scoped"?

Because a variable declared with `var` **inside a function** only exists within that function.

```javascript
function demo() {
  var x = 100;
}

console.log(x); // ReferenceError
```

You cannot access that `x` directly from outside the function.

---

### Rule to remember

* `var` **inside a function** → only accessible inside that function (**function scope**).
* `var` **outside all functions** → global (or module-scoped if in an ES module).
* If you appear to change it from outside, you're usually changing a **different variable**, not the function's local `var`.




so varhave function or global scope






The answer is **both**, depending on **where you declare it**.

### 1. `var` declared outside a function → Global scope (in a regular script)

```javascript
var x = 10;

function test() {
  console.log(x);
}

test();          // 10
console.log(x);  // 10
```

Here, `x` is **global** because it was declared outside any function.

---

### 2. `var` declared inside a function → Function scope

```javascript
function test() {
  var x = 10;
  console.log(x);
}

test();          // 10

console.log(x);  // ReferenceError
```

Here, `x` exists only inside `test()`.

---

### 3. `var` inside a block (`if`, `for`, `while`)

`var` **does not** have block scope.

```javascript
if (true) {
  var x = 10;
}

console.log(x); // 10
```

`x` is still accessible outside the `if` block.

---

### 4. `var` in an ES module

```javascript
// module.js
var x = 10;
```

Here, `x` is **module-scoped**, not global. Other modules and the browser console cannot access it unless you export it.

---

## Easy rule to memorize

| Where `var` is declared               | Scope                                                   |
| ------------------------------------- | ------------------------------------------------------- |
| Outside any function (regular script) | **Global**                                              |
| Inside a function                     | **Function**                                            |
| Inside an `if`, `for`, or `while`     | Still **Function** (or Global if not inside a function) |
| Top level of an ES module             | **Module**                                              |

### One sentence for exams

> **`var` has function scope and global scope. If declared inside a function, it is function-scoped. If declared outside all functions (in a regular script), it is global-scoped. In ES modules, top-level `var` is module-scoped.**




const and let can be reassigned in their block but cant be redeclared




You're very close, but there's one important correction.

### Correct statement

* **`let`** can be **reassigned**, but **cannot be redeclared** in the same scope.
* **`const`** **cannot be reassigned** and **cannot be redeclared** in the same scope.

### `let`

✅ Can be reassigned

```javascript
let x = 10;
x = 20;      // ✔ Allowed

console.log(x); // 20
```

❌ Cannot be redeclared in the same scope

```javascript
let x = 10;
let x = 20;   // ❌ SyntaxError
```

---

### `const`

❌ Cannot be reassigned

```javascript
const x = 10;

x = 20;      // ❌ TypeError
```

❌ Cannot be redeclared in the same scope

```javascript
const x = 10;
const x = 20; // ❌ SyntaxError
```

---

### They are block-scoped

```javascript
let a = 10;

if (true) {
  let a = 20;   // ✔ Different variable
  console.log(a);
}

console.log(a);
```

Output:

```
20
10
```

This is **not redeclaration** because each `a` is in a **different block**.

---

### Summary

| Keyword | Reassign? | Redeclare (same scope)? | Scope           |
| ------- | --------- | ----------------------- | --------------- |
| `var`   | ✅ Yes     | ✅ Yes                   | Function/Global |
| `let`   | ✅ Yes     | ❌ No                    | Block           |
| `const` | ❌ No      | ❌ No                    | Block           |

### Easy way to remember

* **`var`** → Reassign ✅, Redeclare ✅
* **`let`** → Reassign ✅, Redeclare ❌
* **`const`** → Reassign ❌, Redeclare ❌


