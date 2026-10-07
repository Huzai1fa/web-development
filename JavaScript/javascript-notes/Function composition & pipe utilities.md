## Function Composition & Pipe Utilities

These are common functional-programming techniques, especially in JavaScript/TypeScript.

### 1. Function composition

**Function composition** means combining multiple functions so that the output of one function becomes the input of another.

Suppose we have:

```js
const double = x => x * 2;
const addOne = x => x + 1;
```

We can compose them:

```js
const doubleThenAddOne = x => addOne(double(x));

doubleThenAddOne(5); // 11
```

Mathematically:

[
(addOne \circ double)(x) = addOne(double(x))
]

So the functions execute **right to left** when using mathematical composition.

---

### 2. A reusable `compose` utility

Instead of manually nesting functions, we can create a utility:

```js
const compose = (...fns) =>
  value => fns.reduceRight((acc, fn) => fn(acc), value);

const doubleThenAddOne = compose(addOne, double);

doubleThenAddOne(5); // 11
```

Here:

```text
5 → double → 10 → addOne → 11
```

`compose` is particularly useful when building transformations from small, reusable functions.

---

### 3. Pipe utility

A **pipe** does essentially the same thing, but functions are executed **left to right**.

```js
const pipe = (...fns) =>
  value => fns.reduce((acc, fn) => fn(acc), value);

const doubleThenAddOne = pipe(double, addOne);

doubleThenAddOne(5); // 11
```

The flow is easier to read:

```text
5 → double → addOne → 11
```

So the main distinction is:

| Utility   | Execution order |
| --------- | --------------- |
| `compose` | Right → Left    |
| `pipe`    | Left → Right    |

---

### 4. Why pipes are useful

Consider a data-processing operation:

```js
const trim = s => s.trim();
const toLowerCase = s => s.toLowerCase();
const removeSpaces = s => s.replace(/\s/g, "-");

const slugify = pipe(
  trim,
  toLowerCase,
  removeSpaces
);

slugify("  Hello World  ");
// "hello-world"
```

This is often easier to understand than deeply nested calls:

```js
removeSpaces(toLowerCase(trim("  Hello World  ")));
```

The pipe describes the **sequence of transformations** directly.

---

### 5. Real-world example

A pipe can be useful for processing API data:

```js
const getUsers = data => data.users;
const activeUsers = users => users.filter(user => user.active);
const getNames = users => users.map(user => user.name);

const processUsers = pipe(
  getUsers,
  activeUsers,
  getNames
);

const result = processUsers(data);
```

Conceptually:

```text
API response
     ↓
extract users
     ↓
filter active users
     ↓
extract names
     ↓
result
```

### Key idea

**Function composition and pipes turn complex operations into a sequence of small transformations.**

* **Composition:** `compose(f, g)(x)` → `f(g(x))`
* **Pipe:** `pipe(f, g)(x)` → `g(f(x))`
* Both encourage **small, reusable, pure functions**.
* `pipe` is often preferred when you want code that reads naturally from **left to right**.

## Function Composition & Pipe Utilities

These are common functional-programming techniques, especially in JavaScript/TypeScript.

### 1. Function composition

**Function composition** means combining multiple functions so that the output of one function becomes the input of another.

Suppose we have:

```js
const double = x => x * 2;
const addOne = x => x + 1;
```

We can compose them:

```js
const doubleThenAddOne = x => addOne(double(x));

doubleThenAddOne(5); // 11
```

Mathematically:

[
(addOne \circ double)(x) = addOne(double(x))
]

So the functions execute **right to left** when using mathematical composition.

---

### 2. A reusable `compose` utility

Instead of manually nesting functions, we can create a utility:

```js
const compose = (...fns) =>
  value => fns.reduceRight((acc, fn) => fn(acc), value);

const doubleThenAddOne = compose(addOne, double);

doubleThenAddOne(5); // 11
```

Here:

```text
5 → double → 10 → addOne → 11
```

`compose` is particularly useful when building transformations from small, reusable functions.

---

### 3. Pipe utility

A **pipe** does essentially the same thing, but functions are executed **left to right**.

```js
const pipe = (...fns) =>
  value => fns.reduce((acc, fn) => fn(acc), value);

const doubleThenAddOne = pipe(double, addOne);

doubleThenAddOne(5); // 11
```

The flow is easier to read:

```text
5 → double → addOne → 11
```

So the main distinction is:

| Utility   | Execution order |
| --------- | --------------- |
| `compose` | Right → Left    |
| `pipe`    | Left → Right    |

---

### 4. Why pipes are useful

Consider a data-processing operation:

```js
const trim = s => s.trim();
const toLowerCase = s => s.toLowerCase();
const removeSpaces = s => s.replace(/\s/g, "-");

const slugify = pipe(
  trim,
  toLowerCase,
  removeSpaces
);

slugify("  Hello World  ");
// "hello-world"
```

This is often easier to understand than deeply nested calls:

```js
removeSpaces(toLowerCase(trim("  Hello World  ")));
```

The pipe describes the **sequence of transformations** directly.

---

### 5. Real-world example

A pipe can be useful for processing API data:

```js
const getUsers = data => data.users;
const activeUsers = users => users.filter(user => user.active);
const getNames = users => users.map(user => user.name);

const processUsers = pipe(
  getUsers,
  activeUsers,
  getNames
);

const result = processUsers(data);
```

Conceptually:

```text
API response
     ↓
extract users
     ↓
filter active users
     ↓
extract names
     ↓
result
```

### Key idea

**Function composition and pipes turn complex operations into a sequence of small transformations.**

* **Composition:** `compose(f, g)(x)` → `f(g(x))`
* **Pipe:** `pipe(f, g)(x)` → `g(f(x))`
* Both encourage **small, reusable, pure functions**.
* `pipe` is often preferred when you want code that reads naturally from **left to right**.
