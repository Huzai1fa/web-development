# Template Literals — Advanced Use

You've probably already seen:

```js
const name = "Ali";

console.log(`Hello ${name}`);
```

That's the basic use.

But template literals are much more powerful than just "put a variable inside a string." They allow **expressions, function calls, conditional logic, multiline strings, dynamic HTML, and tagged templates**.

Let's build it step by step.

---

# 1. What is a template literal?

Normal string:

```js
const name = "Ali";

const message = "Hello " + name;
```

Template literal:

```js
const message = `Hello ${name}`;
```

It uses **backticks**:

```text
`
```

instead of:

```text
"
'
```

The important syntax is:

```js
`${expression}`
```

---

# 2. `${}` is not limited to variables

This is where things become interesting.

You can put an **expression** inside `${}`.

For example:

```js
const a = 10;
const b = 20;

console.log(`Total: ${a + b}`);
```

JavaScript evaluates:

```text
a + b
   ↓
30
```

Then constructs:

```text
"Total: 30"
```

So mentally:

```text
Template literal
      │
      ▼
`Total: ${a + b}`
             │
             ▼
        evaluate expression
             │
             ▼
             30
             │
             ▼
      "Total: 30"
```

---

# 3. You can call functions

For example:

```js
function greet() {
    return "Hello";
}

console.log(`${greet()} Ali`);
```

JavaScript evaluates:

```text
greet()
  ↓
"Hello"
```

Then:

```text
"Hello Ali"
```

So `${}` can contain a function call.

---

# 4. You can access object properties

```js
const user = {
    name: "Ali",
    age: 22
};

console.log(`Name: ${user.name}`);
console.log(`Age: ${user.age}`);
```

Output:

```text
Name: Ali
Age: 22
```

You can even access nested properties:

```js
const user = {
    name: "Ali",
    address: {
        city: "Abbottabad"
    }
};

console.log(`City: ${user.address.city}`);
```

---

# 5. You can use conditional expressions

You can put a ternary expression inside a template literal:

```js
const age = 22;

const message = `Status: ${age >= 18 ? "Adult" : "Minor"}`;
```

Result:

```text
Status: Adult
```

Conceptually:

```text
`${age >= 18 ? "Adult" : "Minor"}`
          │
          ▼
       evaluate
          │
          ▼
       "Adult"
```

This becomes particularly useful when generating UI text.

---

# 6. Your Todo app is a good example

Suppose you have:

```js
const task = {
    text: "Study JavaScript",
    completed: true
};
```

You could generate text:

```js
const message = `
Task: ${task.text}
Status: ${task.completed ? "Completed" : "Pending"}
`;
```

Result:

```text
Task: Study JavaScript
Status: Completed
```

Notice how the template literal is combining:

* static text
* object properties
* conditional logic

---

# 7. Template literals can contain calculations

```js
const price = 100;
const quantity = 3;

const result = `Total: ${price * quantity}`;
```

Result:

```text
Total: 300
```

You could also do:

```js
const tax = 20;

const result = `
Price: ${price}
Quantity: ${quantity}
Tax: ${tax}
Total: ${price * quantity + tax}
`;
```

---

# 8. Multiline strings

Before template literals, multiline strings were awkward.

You might have:

```js
const message =
    "Hello\n" +
    "How are you?\n" +
    "Welcome!";
```

With template literals:

```js
const message = `
Hello
How are you?
Welcome!
`;
```

The line breaks are preserved.

This is extremely useful when creating:

* emails
* messages
* HTML strings
* SQL queries
* formatted text

---

# 9. Whitespace matters

Be careful with indentation.

For example:

```js
const message = `
    Hello
    Ali
`;
```

The resulting string contains those line breaks and spaces.

Template literals preserve the text you put inside them.

So don't think:

> "The browser will automatically remove formatting."

It doesn't necessarily do that.

---

# 10. Generating HTML

This is one of the most practical uses.

Suppose:

```js
const task = {
    text: "Learn JavaScript",
    completed: false
};
```

You could create HTML as a string:

```js
const html = `
    <li>
        <span>${task.text}</span>
        <button>Delete</button>
    </li>
`;
```

Now:

```text
html
 │
 ▼
"
<li>
    <span>Learn JavaScript</span>
    <button>Delete</button>
</li>
"
```

You can then insert it into the DOM using appropriate DOM APIs.

This is one reason template literals are popular in frontend development.

---

# 11. Combining HTML with expressions

For example:

```js
const task = {
    text: "Learn JavaScript",
    completed: true
};

const html = `
    <li>
        <span class="${task.completed ? "line-through" : ""}">
            ${task.text}
        </span>
    </li>
`;
```

The expression:

```js
${task.completed ? "line-through" : ""}
```

changes the generated HTML based on the task state.

Conceptually:

```text
task.completed
      │
      ▼
   true?
   /   \
 yes    no
  │      │
  ▼      ▼
line-   ""
through
```

---

# 12. Important security issue: XSS

This is extremely important when using template literals to generate HTML.

Suppose:

```js
const username = userInput;
```

and you do:

```js
const html = `<div>${username}</div>`;
```

If `username` contains malicious HTML/JavaScript, inserting it as HTML can create a **cross-site scripting (XSS)** vulnerability.

For example, untrusted input should not automatically be treated as HTML.

That's one reason your original Todo app used:

```js
span.textContent = task.text;
```

instead of:

```js
span.innerHTML = task.text;
```

`textContent` treats the input as text.

This is a very important distinction when you start using template literals for DOM generation.

---

# 13. Nested expressions

You can make expressions quite complex:

```js
const user = {
    name: "Ali",
    age: 22
};

const message = `
    ${user.name} is
    ${user.age >= 18 ? "an adult" : "a minor"}.
`;
```

This is valid, but there's a practical rule:

> If your `${}` expression becomes complicated, move the logic outside the template.

For example, instead of:

```js
const message = `
    Status: ${
        user.active
            ? user.admin
                ? "Admin"
                : "User"
            : "Inactive"
    }
`;
```

prefer:

```js
const status = user.active
    ? user.admin
        ? "Admin"
        : "User"
    : "Inactive";

const message = `Status: ${status}`;
```

This is easier to read.

---

# 14. Template literals return strings

This is important.

Consider:

```js
const result = `10 + 20`;
```

The result is:

```text
"10 + 20"
```

It's a string.

But:

```js
const result = `${10 + 20}`;
```

JavaScript evaluates:

```text
10 + 20
  ↓
30
```

and then converts it into the template literal's string result:

```text
"30"
```

So:

```js
typeof result
```

is:

```text
"string"
```

---

# 15. What happens with objects?

Consider:

```js
const user = {
    name: "Ali"
};

console.log(`User: ${user}`);
```

You may get:

```text
User: [object Object]
```

Why?

Because JavaScript converts the object to a string.

If you want JSON:

```js
console.log(`User: ${JSON.stringify(user)}`);
```

Result:

```text
User: {"name":"Ali"}
```

This connects directly with your LocalStorage project, because you already used:

```js
JSON.stringify(arr)
```

---

# 16. Expressions are evaluated immediately

Suppose:

```js
let name = "Ali";

const message = `Hello ${name}`;

name = "Ahmed";

console.log(message);
```

What is printed?

```text
Hello Ali
```

Why?

Because when this line executed:

```js
const message = `Hello ${name}`;
```

JavaScript evaluated `${name}` immediately.

It created the string:

```text
"Hello Ali"
```

Changing `name` afterward doesn't change the already-created string.

---

# 17. Template literals vs normal concatenation

Old style:

```js
const name = "Ali";
const age = 22;

const message =
    "My name is " + name +
    " and I am " + age + " years old.";
```

Template literal:

```js
const message =
    `My name is ${name} and I am ${age} years old.`;
```

The second is usually much easier to read.

---

# 18. Advanced: Tagged Template Literals

Now we're getting into the genuinely advanced feature.

You can put a function before a template literal:

```js
tag`Hello ${name}`;
```

This is called a **tagged template**.

The function receives the template's pieces.

For example:

```js
function tag(strings, ...values) {
    console.log(strings);
    console.log(values);
}
```

Then:

```js
const name = "Ali";
const age = 22;

tag`Hello ${name}, you are ${age} years old.`;
```

Conceptually, JavaScript separates the template into:

```text
strings:

[
    "Hello ",
    ", you are ",
    " years old."
]
```

and:

```text
values:

[
    "Ali",
    22
]
```

So:

```text
Template
   │
   ├───────────────┐
   ▼               ▼
static strings   expressions
   │               │
   ▼               ▼
["Hello ", ...] ["Ali", 22]
```

The tag function can then decide how to process them.

---

# 19. Why would anyone use tagged templates?

Tagged templates can be used to build specialized template-processing systems.

For example:

* escaping HTML
* localization
* formatting
* SQL query libraries
* CSS-in-JS systems
* custom string processing

The important concept is:

> **A tagged template lets a function control how a template literal is processed.**

---

# 20. A simple tagged-template dry run

Consider:

```js
function tag(strings, ...values) {
    return "DONE";
}

const name = "Ali";

const result = tag`Hello ${name}`;
```

The template:

```text
Hello ${name}
```

is broken conceptually into:

```text
strings = ["Hello ", ""]

values = ["Ali"]
```

Then:

```text
tag(strings, values)
        │
        ▼
     "DONE"
```

So `result` becomes:

```text
"DONE"
```

The tag function controls the final result.

---

# 21. The big picture

Template literals have several levels.

```text
Template Literals
       │
       ├── Basic interpolation
       │      `Hello ${name}`
       │
       ├── Expressions
       │      `${a + b}`
       │
       ├── Function calls
       │      `${getName()}`
       │
       ├── Conditional logic
       │      `${age >= 18 ? "Adult" : "Minor"}`
       │
       ├── Multiline strings
       │
       ├── Dynamic HTML
       │
       └── Tagged templates
              tag`Hello ${name}`
```

---

# ⭐ What you should remember

The most important mental model is:

```text
`normal text ${expression} more text`
                    │
                    ▼
             JavaScript evaluates
                    │
                    ▼
              converts to string
                    │
                    ▼
              final string
```

And remember these three distinctions:

### `${}`

Means:

> **Evaluate this JavaScript expression and insert its result.**

### Backticks

Allow:

> **Interpolation + multiline strings.**

### Tagged templates

Allow:

> **A function to process the template and its interpolated values.**

For your level right now, make sure you are very comfortable with **`${expression}` + dynamic HTML + multiline strings** before spending much time on tagged templates.
