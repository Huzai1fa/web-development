# Default, Rest, and Spread in JavaScript

These three concepts are related because they all deal with **function parameters, arrays, and objects**, but they solve different problems.

The easiest way to remember them:

```text
DEFAULT → "What should I use if nothing was provided?"

REST    → "Collect the remaining values."

SPREAD  → "Take these values apart and spread them out."
```

---

# 1. Default Parameters

Suppose you have:

```js
function greet(name) {
    console.log(name);
}

greet();
```

What is `name`?

```text
undefined
```

You can provide a fallback:

```js
function greet(name = "Guest") {
    console.log(name);
}
```

Now:

```js
greet();
```

produces:

```text
Guest
```

But:

```js
greet("Ali");
```

produces:

```text
Ali
```

### Mental model

```text
greet()
   │
   ▼
Was an argument provided?
   │
   ├── YES → use provided value
   │
   └── NO → use default value
```

---

## Important: default is triggered by `undefined`

This:

```js
function greet(name = "Guest") {
    console.log(name);
}
```

means:

```js
greet(undefined);
```

uses:

```text
Guest
```

But:

```js
greet(null);
```

uses:

```text
null
```

because `null` was actually provided.

So:

```text
undefined → default applies
null      → default does NOT apply
```

---

# 2. Default values can be expressions

You aren't restricted to strings.

```js
function calculate(price, tax = 10) {
    console.log(price + tax);
}
```

Or:

```js
function createUser(name = "Guest", age = 18) {
    // ...
}
```

You can even use another parameter:

```js
function multiply(a, b = a) {
    return a * b;
}
```

So:

```js
multiply(5);
```

becomes conceptually:

```text
a = 5
b = a = 5

5 × 5 = 25
```

---

# 3. Rest Parameter

Now imagine:

```js
function add(a, b, c) {
    console.log(a, b, c);
}
```

What if you want to accept **any number of arguments**?

You can use `...`.

```js
function add(...numbers) {
    console.log(numbers);
}
```

Now:

```js
add(10, 20, 30, 40);
```

`numbers` becomes:

```js
[10, 20, 30, 40]
```

This is called a **rest parameter**.

---

# 4. Why is it called "rest"?

Because it means:

> "Collect the rest of the arguments."

For example:

```js
function test(first, ...rest) {
    console.log(first);
    console.log(rest);
}
```

Call:

```js
test(10, 20, 30, 40);
```

Conceptually:

```text
Arguments:

10   20   30   40
│    └─────────────┐
│                  │
▼                  ▼
first             rest
10             [20,30,40]
```

So:

```js
console.log(first);
```

gives:

```text
10
```

and:

```js
console.log(rest);
```

gives:

```text
[20, 30, 40]
```

---

# 5. Rest parameter must be last

This is valid:

```js
function test(a, b, ...rest) {
}
```

This is not valid:

```js
function test(...rest, a) {
}
```

Why?

Because JavaScript needs to know:

```text
a → ?
b → ?
rest → everything remaining
```

If `rest` appeared before another parameter, there would be no clear boundary.

So:

> **Rest parameter must be the last parameter.**

---

# 6. Rest is very useful with functions

For example:

```js
function sum(...numbers) {
    let total = 0;

    for (let number of numbers) {
        total += number;
    }

    return total;
}
```

Now:

```js
sum(10, 20);
```

gives:

```text
30
```

And:

```js
sum(10, 20, 30, 40);
```

gives:

```text
100
```

Because:

```text
sum(10,20,30,40)

        ↓

numbers = [10,20,30,40]
```

The rest parameter **collects** arguments into an array.

---

# 7. Spread Operator

Now comes the confusing part.

It also uses:

```js
...
```

But it does the **opposite** of rest.

### Rest:

```text
many values
    ↓
one array
```

### Spread:

```text
one array
    ↓
many individual values
```

That's the key.

---

# 8. Spread with arrays

Suppose:

```js
const numbers = [10, 20, 30];
```

And:

```js
console.log(...numbers);
```

Conceptually:

```text
numbers

[10, 20, 30]

      ↓ spread

10, 20, 30
```

So:

```js
console.log(...numbers);
```

is similar to:

```js
console.log(10, 20, 30);
```

---

# 9. Why is spread useful?

Look at:

```js
const numbers = [10, 20, 30];
```

Suppose you want to pass them to:

```js
Math.max()
```

You can do:

```js
Math.max(...numbers);
```

Conceptually:

```text
numbers
[10,20,30]

      ↓

Math.max(10,20,30)
```

Result:

```text
30
```

Without spread, you're passing the array as one argument.

---

# 10. Spread for copying arrays

This is extremely common:

```js
const arr1 = [10, 20, 30];

const arr2 = [...arr1];
```

Conceptually:

```text
arr1
 │
 ▼
[10,20,30]

       spread
         ↓

[10,20,30]
 │
 ▼
arr2
```

Now `arr1` and `arr2` are separate arrays.

```js
arr2.push(40);
```

doesn't change `arr1`.

```text
arr1 → [10,20,30]

arr2 → [10,20,30,40]
```

This is a **shallow copy**.

---

# 11. Spread can combine arrays

```js
const a = [1, 2];
const b = [3, 4];

const c = [...a, ...b];
```

Result:

```text
c = [1, 2, 3, 4]
```

Diagram:

```text
a → [1,2]
       │
       └── spread ──┐
                    ▼
                  [1,2,3,4]
                    ▲
                    │
b → [3,4] ──────────┘
```

---

# 12. Spread with objects

Spread isn't only for arrays.

You can do:

```js
const user = {
    name: "Ali",
    age: 22
};

const copy = {
    ...user
};
```

Conceptually:

```text
user
 │
 ▼
{
 name: "Ali",
 age: 22
}

       ↓ spread

copy
 │
 ▼
{
 name: "Ali",
 age: 22
}
```

Again, this creates a **shallow copy**.

---

# 13. Adding properties while spreading

This is extremely useful.

```js
const user = {
    name: "Ali",
    age: 22
};

const updatedUser = {
    ...user,
    age: 23
};
```

Result:

```js
{
    name: "Ali",
    age: 23
}
```

What happened?

```text
...user
   ↓
name: "Ali"
age: 22

then:

age: 23
```

The later property overrides the earlier one.

---

# 14. This is extremely useful in your Todo app

You had task objects:

```js
const task = {
    id: Date.now(),
    text: "Study",
    completed: false
};
```

Suppose you want a new task based on an existing task:

```js
const updatedTask = {
    ...task,
    completed: true
};
```

Conceptually:

```text
OLD TASK

{
 id: 1,
 text: "Study",
 completed: false
}

          ↓ spread

{
 id: 1,
 text: "Study",
 completed: false
}

          ↓ override

{
 id: 1,
 text: "Study",
 completed: true
}
```

This pattern becomes extremely important when you start learning **React state management**.

---

# 15. Rest and Spread look identical

This is where beginners get confused.

Both use:

```js
...
```

But look at **where they are used**.

### Rest

Usually in a parameter position:

```js
function test(...args) {
}
```

Meaning:

```text
collect
```

### Spread

Usually when constructing or calling something:

```js
const arr2 = [...arr1];

Math.max(...numbers);

const obj2 = {...obj1};
```

Meaning:

```text
expand
```

---

# 16. The easiest way to remember

Think about a suitcase.

### Rest

Imagine many things:

```text
👕 👖 👟 🧢
```

You put them into one suitcase:

```text
[👕 👖 👟 🧢]
```

That's **REST**:

```text
many → one
```

### Spread

Now open the suitcase:

```text
[👕 👖 👟 🧢]
```

and spread everything out:

```text
👕 👖 👟 🧢
```

That's **SPREAD**:

```text
one → many
```

---

# 17. All three together

Consider:

```js
function createUser(name = "Guest", ...skills) {

    const user = {
        name: name,
        skills: [...skills]
    };

    return user;
}
```

Call:

```js
createUser("Ali", "JS", "HTML", "CSS");
```

Let's dry-run it.

### Step 1 — Default

```text
name = "Ali"
```

Because a value was provided, `"Guest"` isn't used.

### Step 2 — Rest

```text
skills
   ↓
["JS", "HTML", "CSS"]
```

The remaining arguments are collected.

### Step 3 — Spread

```js
skills: [...skills]
```

takes:

```text
["JS", "HTML", "CSS"]
```

and creates a new array containing those elements.

Final:

```js
{
    name: "Ali",
    skills: ["JS", "HTML", "CSS"]
}
```

So:

```text
DEFAULT
   ↓
fallback value


REST
   ↓
collect remaining values


SPREAD
   ↓
expand/copy values
```

---

# 18. One final comparison

| Feature         | Default              | Rest                     | Spread                          |
| --------------- | -------------------- | ------------------------ | ------------------------------- |
| Syntax          | `=`                  | `...`                    | `...`                           |
| Main purpose    | Fallback value       | Collect values           | Expand values                   |
| Direction       | One value if missing | Many → one               | One → many                      |
| Common location | Function parameter   | Function parameter       | Arrays, objects, function calls |
| Produces array? | No                   | Yes, for rest parameters | No; expands an iterable/object  |
| Example         | `x = 10`             | `...args`                | `...arr`                        |

### Memorize this:

```text
DEFAULT
"What if the value isn't provided?"

REST
"Give me the remaining values."

SPREAD
"Open this collection and give me its contents."
```

The most important thing to understand next is **destructuring**, because destructuring and rest/spread are very closely connected.
