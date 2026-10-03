Absolutely. Let's learn **currying from zero**, as if you've never seen it before.

# Currying in JavaScript — Beginner Friendly

Don't try to memorize the definition first. Let's understand **why it exists**.

## Step 1: Start with a normal function

Suppose we have this function:

```javascript
function add(a, b) {
  return a + b;
}

add(2, 3);
```

We give the function **two values at the same time**:

```text
add(2, 3)
  ↓  ↓
  a  b
```

So:

```javascript
add(2, 3); // 5
```

Pretty straightforward.

---

# Step 2: What if we give the values one at a time?

Imagine we want to do this:

```javascript
add(2)(3);
```

At first, this looks strange.

Why are there **two pairs of parentheses**?

The important idea is:

> `add(2)` must return another function.

Let's build it:

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}
```

Now look at what happens:

```javascript
add(2)
```

The function receives `2`.

Instead of calculating immediately, it returns:

```javascript
function (b) {
  return 2 + b;
}
```

So we can then do:

```javascript
add(2)(3);
```

And we get:

```text
add(2)
   ↓
returns a function
   ↓
function(b)
   ↓
give it 3
   ↓
2 + 3
   ↓
5
```

---

# Step 3: This is currying

When we transform:

```javascript
function add(a, b) {
  return a + b;
}
```

into something like:

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}
```

we are **currying** the function.

The normal version is:

```javascript
add(2, 3);
```

The curried version is:

```javascript
add(2)(3);
```

### The main idea

> **Currying means taking a function that accepts multiple arguments and turning it into a sequence of functions that each accept one argument.**

---

# Step 4: Understand the parentheses

This is probably the most important thing for a beginner.

When you see:

```javascript
add(2)(3)
```

don't think of it as one complicated function call.

Read it from left to right:

```javascript
add(2)
```

returns a function.

Then:

```javascript
(3)
```

calls that returned function.

For example:

```javascript
const result = add(2)(3);
```

is conceptually:

```javascript
const step1 = add(2);
const result = step1(3);
```

And that's much easier to understand.

---

# Step 5: Where does `a` go?

You might wonder:

> When `add(2)` finishes, how does the returned function remember `2`?

This is where **closures** come in.

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}
```

When we do:

```javascript
const addTwo = add(2);
```

`addTwo` becomes a function that remembers `a = 2`.

So:

```javascript
addTwo(5); // 7
addTwo(10); // 12
addTwo(100); // 102
```

The `2` is remembered because of a **closure**.

You don't need to master closures before learning currying, but understanding this connection is very useful.

---

# Step 6: Arrow functions make currying shorter

This:

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}
```

can be written as:

```javascript
const add = a => b => a + b;
```

Then:

```javascript
add(2)(3); // 5
```

Let's decode this:

```javascript
const add = a => b => a + b;
```

means:

```text
give me a
   ↓
I'll give you a function
   ↓
give that function b
   ↓
I'll give you a + b
```

So:

```javascript
add(2)(3)
```

means:

```text
a = 2
b = 3

2 + 3 = 5
```

---

# Step 7: Currying with 3 arguments

Suppose we normally have:

```javascript
function sum(a, b, c) {
  return a + b + c;
}

sum(1, 2, 3);
```

We can curry it:

```javascript
const sum = a => b => c => a + b + c;
```

Now:

```javascript
sum(1)(2)(3);
```

Let's follow it:

```text
sum(1)
  ↓
function(b)

(2)
  ↓
function(c)

(3)
  ↓
1 + 2 + 3

  ↓
  6
```

So:

```javascript
sum(1)(2)(3); // 6
```

---

# Step 8: Why would I actually use this?

Here's where currying becomes useful.

Imagine:

```javascript
const multiply = (a, b) => a * b;
```

Suppose you often need to multiply things by `2`.

With currying:

```javascript
const multiply = a => b => a * b;
```

Now:

```javascript
const double = multiply(2);
```

`double` is now a reusable function.

```javascript
double(5);  // 10
double(10); // 20
double(50); // 100
```

You created a specialized function from a general function.

That's one of the big benefits of currying.

---

# Step 9: A real-world style example

Imagine we have:

```javascript
const calculatePrice = tax => price => price + price * tax;
```

We can create a function for 10% tax:

```javascript
const priceWith10PercentTax = calculatePrice(0.10);
```

Now:

```javascript
priceWith10PercentTax(100);
```

gives:

```text
100 + (100 × 0.10)
= 110
```

And:

```javascript
priceWith10PercentTax(500);
```

gives:

```text
550
```

So currying lets us **configure a function once and reuse it**.

---

# The mental model I want you to remember

Don't memorize a complicated definition.

Think:

```text
Normal function

add(a, b)
   ↓
give everything at once


Curried function

add(a)(b)
   ↓
give one value
   ↓
get another function
   ↓
give it another value
   ↓
get the result
```

### In one sentence:

> **Currying = turning multiple arguments into a chain of one-argument function calls.**

---

## One small exercise for you

Before moving to advanced currying, try to understand this:

```javascript
const multiply = a => b => a * b;

const multiplyBy5 = multiply(5);

console.log(multiplyBy5(4));
```

Ask yourself:

1. What is `a`?
2. What does `multiply(5)` return?
3. What is `b`?
4. Why is the final answer `20`?

If you can answer those four questions, you've understood the **core idea of currying**.


**Currying** in JavaScript is a functional programming technique where a function that takes multiple arguments is transformed into a sequence of functions, each taking **one argument**.

### Without currying

```javascript
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
```

### With currying

```javascript
function curriedAdd(a) {
  return function (b) {
    return a + b;
  };
}

console.log(curriedAdd(2)(3)); // 5
```

Here:

* `curriedAdd(2)` returns a new function.
* That returned function remembers the value of `a` using a **closure**.
* Calling it with `3` computes `2 + 3`.

---

## Why use currying?

### 1. Partial application

You can create specialized functions.

```javascript
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

Instead of repeatedly passing `2`, you create a reusable `double` function.

---

### 2. Reusability

```javascript
const greet = greeting => name => `${greeting}, ${name}!`;

const sayHello = greet("Hello");
const sayHi = greet("Hi");

console.log(sayHello("Alice")); // Hello, Alice!
console.log(sayHi("Bob"));      // Hi, Bob!
```

---

### 3. Better function composition

Currying is commonly used with array methods and functional programming libraries.

```javascript
const greaterThan = limit => value => value > limit;

const numbers = [5, 12, 18, 3];

const result = numbers.filter(greaterThan(10));

console.log(result); // [12, 18]
```

---

## ES6 arrow function version

```javascript
const add = a => b => a + b;

console.log(add(2)(3)); // 5
```

This is equivalent to:

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}
```

---

## Currying with multiple arguments

For a function with three arguments:

```javascript
const sum = a => b => c => a + b + c;

console.log(sum(1)(2)(3)); // 6
```

---

## Automatic currying

You can write a generic curry function:

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3));   // 6
console.log(curriedAdd(1, 2)(3));   // 6
console.log(curriedAdd(1)(2, 3));   // 6
```

Here, `fn.length` tells us how many parameters the original function expects.

---

## Currying vs. Partial Application

They're related but not identical.

| Currying                                                  | Partial Application                                   |
| --------------------------------------------------------- | ----------------------------------------------------- |
| Converts a function into nested single-argument functions | Fixes some arguments of a function                    |
| `add(1)(2)(3)`                                            | `add(1, 2)(3)`                                        |
| Changes the function's structure                          | Creates a new function with some arguments pre-filled |

Example of partial application:

```javascript
function add(a, b, c) {
  return a + b + c;
}

const addFive = (b, c) => add(5, b, c);

console.log(addFive(2, 3)); // 10
```

---

### Summary

* **Currying** transforms `f(a, b, c)` into `f(a)(b)(c)`.
* It relies on **closures** to remember previously supplied arguments.
* It enables **partial application**, reusable functions, and function composition.
* It's common in functional programming and libraries like Lodash (`_.curry`) and Ramda.

A simple way to think about it is:

```javascript
// Normal
add(2, 3);

// Curried
add(2)(3);
```

The first call supplies **all arguments at once**, while the second supplies them **one at a time**, with each function returning the next function until all required arguments are provided.
 


      Practical Use


      Yes — and this is where currying becomes much more useful. In real applications, you usually **don't curry everything**. You use it when you want to **configure a function once and reuse the configured version many times**.

Let's look at practical examples.

---

# 1. Filtering data

This is one of the easiest real examples.

Suppose your application has users:

```javascript
const users = [
  { name: "Ali", age: 25 },
  { name: "Sara", age: 17 },
  { name: "John", age: 30 },
  { name: "Ahmed", age: 15 }
];
```

You want users older than a certain age.

Without currying:

```javascript
const greaterThan = (age, userAge) => userAge > age;

users.filter(user => greaterThan(18, user.age));
```

With currying:

```javascript
const greaterThan = age => value => value > age;

const isAdult = greaterThan(18);

const adults = users.filter(user => isAdult(user.age));
```

Now `isAdult` is a reusable function.

```javascript
isAdult(20); // true
isAdult(15); // false
isAdult(30); // true
```

This is useful because you've **configured the function once**:

```text
greaterThan(18)
       ↓
   isAdult()
```

---

# 2. Logging in applications

Imagine you're building a large application and want different types of logs:

```javascript
const log = level => message => {
  console.log(`[${level}] ${message}`);
};
```

Now create specialized loggers:

```javascript
const info = log("INFO");
const error = log("ERROR");
const warning = log("WARNING");
```

Then anywhere in your application:

```javascript
info("User logged in");

error("Database connection failed");

warning("Password will expire soon");
```

Output:

```text
[INFO] User logged in
[ERROR] Database connection failed
[WARNING] Password will expire soon
```

Instead of repeatedly doing:

```javascript
log("ERROR")("Something went wrong");
log("ERROR")("Database failed");
log("ERROR")("API failed");
```

you configure it once:

```javascript
const error = log("ERROR");
```

and reuse it.

---

# 3. API requests

This is another practical example.

Imagine your application calls different API endpoints.

You could create:

```javascript
const request = baseURL => endpoint => {
  return fetch(`${baseURL}${endpoint}`);
};
```

Configure your API once:

```javascript
const api = request("https://example.com/api");
```

Now:

```javascript
api("/users");
api("/products");
api("/orders");
```

The base URL is already configured.

Conceptually:

```text
request(baseURL)
       ↓
      api
       ↓
api("/users")
api("/products")
api("/orders")
```

In larger applications, this idea can be useful for creating configured API clients.

---

# 4. React applications

Currying can appear in React code, particularly when creating event handlers.

Imagine:

```javascript
const handleChange = field => event => {
  console.log(field, event.target.value);
};
```

Then:

```javascript
<input onChange={handleChange("username")} />
<input onChange={handleChange("email")} />
```

What's happening?

First:

```javascript
handleChange("username")
```

creates a function specifically for the username field.

Then React calls that function with the event:

```text
handleChange("username")
        ↓
   function(event)
        ↓
event happens
        ↓
username + event
```

This pattern is particularly useful when you need to pass **some information now** and receive the remaining information later.

---

# 5. Permission checking

Imagine an application with different user roles.

```javascript
const hasPermission = role => permission => {
  // imagine checking permissions
  return role === "admin" || permission === "read";
};
```

Create a function for an admin:

```javascript
const adminCan = hasPermission("admin");
```

Then:

```javascript
adminCan("read");
adminCan("delete");
adminCan("update");
```

Again:

```text
hasPermission("admin")
          ↓
      adminCan
          ↓
    adminCan("read")
    adminCan("delete")
```

The first argument configures the behavior.

---

# 6. Formatting data

Suppose your application needs different currency formats.

```javascript
const formatCurrency = currency => amount => {
  return `${currency} ${amount}`;
};
```

Create specialized functions:

```javascript
const formatUSD = formatCurrency("$");
const formatEUR = formatCurrency("€");
const formatPKR = formatCurrency("Rs");
```

Then:

```javascript
formatUSD(100); // "$ 100"
formatEUR(100); // "€ 100"
formatPKR(100); // "Rs 100"
```

This is much more reusable than repeatedly specifying the currency.

---

# 7. Database queries

In backend applications, you may have functions that build queries.

For example:

```javascript
const findBy = field => value => {
  // pretend this queries a database
  return `Find where ${field} = ${value}`;
};
```

Create reusable query functions:

```javascript
const findByEmail = findBy("email");
const findByUsername = findBy("username");
```

Then:

```javascript
findByEmail("ali@gmail.com");

findByUsername("ali123");
```

The idea is:

```text
findBy("email")
      ↓
findByEmail
      ↓
findByEmail("ali@gmail.com")
```

---

# 8. Middleware / configuration

This is especially common in backend JavaScript.

You might have something like:

```javascript
const authorize = role => request => {
  if (request.user.role === role) {
    return true;
  }

  return false;
};
```

Configure it:

```javascript
const adminOnly = authorize("admin");
```

Then use:

```javascript
adminOnly(request);
```

Again, you're separating:

**configuration**

```javascript
authorize("admin")
```

from

**execution**

```javascript
adminOnly(request)
```

This is a very important pattern.

---

# 🧠 The common pattern

Look at all these examples:

```javascript
greaterThan(18)
```

```javascript
log("ERROR")
```

```javascript
request("/api")
```

```javascript
formatCurrency("$")
```

```javascript
authorize("admin")
```

They all follow the same idea:

```text
                 CONFIGURATION
                       ↓
                function(config)
                       ↓
                 new function
                       ↓
                  use it many times
```

For example:

```javascript
const error = log("ERROR");

error("Database failed");
error("API failed");
error("Login failed");
```

---

# Is currying used everywhere?

**No.**

This is important.

You shouldn't turn every function into:

```javascript
something(a)(b)(c)
```

For simple operations, this:

```javascript
add(10, 20, 30);
```

is often clearer than:

```javascript
add(10)(20)(30);
```

Currying is useful when **one part of the information is known now, while another part will be supplied later**.

Think of it as:

> **"Configure now, use later."**

That's probably the most practical way to understand currying as a JavaScript developer.

### A good learning progression

Since you're learning this for the first time, I'd learn it in this order:

```text
1. Functions
      ↓
2. Functions returning functions
      ↓
3. Closures
      ↓
4. Currying
      ↓
5. Partial application
      ↓
6. Function composition
      ↓
7. Practical use with map/filter/reduce
```

If you understand **functions returning functions + closures**, currying becomes much easier rather than something you just memorize.
      
      