# Enhanced Object Literals

Enhanced object literals are a set of JavaScript features that make creating objects **shorter and cleaner**.

The important thing is that they don't introduce a completely new type of object. They give you **convenient syntax for creating normal JavaScript objects**.

We'll build this from the basic object syntax.

---

# 1. Normal object creation

Suppose you have:

```js
const name = "Ali";
const age = 22;
```

And you want:

```js
const user = {
    name: name,
    age: age
};
```

Notice something repetitive:

```text
property name     variable name
      ↓                 ↓
    name:              name
     age:               age
```

JavaScript allows you to shorten this.

---

# 2. Property shorthand

You can write:

```js
const name = "Ali";
const age = 22;

const user = {
    name,
    age
};
```

This means exactly:

```js
const user = {
    name: name,
    age: age
};
```

So:

```text
name
```

on its own inside the object means:

```text
name: name
```

provided there is a variable named `name`.

### Mental model

```text
const name = "Ali";

        ↓

{
    name
}

        ↓ interpreted as

{
    name: "Ali"
}
```

This is called **property shorthand**.

---

# 3. Why is this useful?

Imagine your Todo app.

You create:

```js
const id = Date.now();
const text = input.value;
const completed = false;
```

The old syntax would be:

```js
const task = {
    id: id,
    text: text,
    completed: completed
};
```

With shorthand:

```js
const task = {
    id,
    text,
    completed
};
```

Much cleaner.

And importantly:

> The resulting object is the same. Only the syntax is shorter.

---

# 4. Method shorthand

Another enhanced object literal feature is **method shorthand**.

Normally you might write:

```js
const user = {
    greet: function() {
        console.log("Hello");
    }
};
```

You can write:

```js
const user = {
    greet() {
        console.log("Hello");
    }
};
```

Both create an object with a `greet` method.

So:

```text
Old:

greet: function() {
    ...
}


Enhanced:

greet() {
    ...
}
```

---

# 5. Calling the method

Nothing changes about how you call it:

```js
user.greet();
```

The enhanced syntax only makes the object definition shorter.

---

# 6. Methods can access the object using `this`

For example:

```js
const user = {
    name: "Ali",

    greet() {
        console.log(this.name);
    }
};
```

Calling:

```js
user.greet();
```

gives:

```text
Ali
```

Conceptually:

```text
user
 │
 ▼
┌─────────────────────┐
│ name: "Ali"         │
│                     │
│ greet()             │
│   │                 │
│   └── this → user   │
└─────────────────────┘
```

The method shorthand is particularly nice when defining object methods.

---

# 7. Computed property names

Now suppose you don't know the property name until runtime.

For example:

```js
const property = "name";
```

You want:

```js
{
    name: "Ali"
}
```

You could write:

```js
const user = {};

user[property] = "Ali";
```

But object literals provide a cleaner syntax:

```js
const user = {
    [property]: "Ali"
};
```

Result:

```js
{
    name: "Ali"
}
```

The square brackets mean:

> "Evaluate this expression and use its result as the property name."

---

# 8. Why are square brackets important?

Compare:

```js
const property = "name";

const user = {
    property: "Ali"
};
```

This creates:

```js
{
    property: "Ali"
}
```

It does **not** create:

```js
{
    name: "Ali"
}
```

Because without brackets, `property` is treated as the literal property name.

With:

```js
const user = {
    [property]: "Ali"
};
```

JavaScript evaluates:

```text
property
   ↓
"name"
   ↓
property name = "name"
```

---

# 9. Computed property names can use expressions

You can do:

```js
const prefix = "user";
const user = {
    [prefix + "Name"]: "Ali"
};
```

Result:

```js
{
    userName: "Ali"
}
```

Because:

```text
prefix + "Name"
      ↓
"user" + "Name"
      ↓
"userName"
```

---

# 10. This is useful with dynamic data

Imagine:

```js
const field = "completed";
const value = true;
```

You can create:

```js
const task = {
    [field]: value
};
```

Result:

```js
{
    completed: true
}
```

This becomes especially useful when working with:

* forms
* APIs
* dynamic object updates
* configuration objects
* state management

---

# 11. Combining shorthand + methods + computed properties

You can combine several enhanced object literal features:

```js
const name = "Ali";
const property = "age";
const age = 22;

const user = {

    name,

    [property]: age,

    greet() {
        console.log("Hello");
    }
};
```

Result conceptually:

```js
{
    name: "Ali",

    age: 22,

    greet() {
        console.log("Hello");
    }
}
```

Three enhancements are happening:

```text
name
 ↓
property shorthand


[property]
 ↓
computed property name


greet()
 ↓
method shorthand
```

---

# 12. Spread with object literals

You already learned spread:

```js
const user = {
    name: "Ali",
    age: 22
};
```

You can create another object:

```js
const updatedUser = {
    ...user,
    age: 23
};
```

This is also commonly discussed alongside enhanced object literal syntax because object literals support the spread property syntax.

Think:

```text
user
 │
 ▼
{
 name: "Ali",
 age: 22
}

        ↓ ...user

{
 name: "Ali",
 age: 22
}

        ↓ age: 23

{
 name: "Ali",
 age: 23
}
```

---

# 13. Property shorthand + spread in your Todo app

Suppose you have:

```js
const id = Date.now();
const text = input.value.trim();
const completed = false;
```

You can create:

```js
const task = {
    id,
    text,
    completed
};
```

Then later, suppose you want an updated version:

```js
const updatedTask = {
    ...task,
    completed: true
};
```

This is a very common JavaScript pattern.

---

# 14. Another useful feature: property names can be strings

JavaScript lets you write:

```js
const user = {
    "first-name": "Ali"
};
```

Because `first-name` isn't a valid normal identifier.

You access it with:

```js
user["first-name"];
```

This connects with computed property names:

```js
const key = "first-name";

const user = {
    [key]: "Ali"
};
```

Result:

```js
{
    "first-name": "Ali"
}
```

---

# 15. The big picture

Enhanced object literals mainly give you these useful features:

```text
Enhanced Object Literals
        │
        ├── Property shorthand
        │      { name }
        │
        ├── Method shorthand
        │      { greet() {} }
        │
        ├── Computed property names
        │      { [key]: value }
        │
        └── Spread properties
               { ...obj }
```

---

# 16. Before vs after

### Property shorthand

```js
// Old
const user = {
    name: name,
    age: age
};

// Enhanced
const user = {
    name,
    age
};
```

---

### Method shorthand

```js
// Old
const user = {
    greet: function() {
        console.log("Hello");
    }
};

// Enhanced
const user = {
    greet() {
        console.log("Hello");
    }
};
```

---

### Computed property

```js
// Dynamic property
const key = "name";

const user = {
    [key]: "Ali"
};
```

---

### Spread

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

---

## ⭐ What you should remember

Don't memorize the term "enhanced object literals" as one complicated feature.

Think of it as:

```text
"JavaScript gave us shorter and more powerful syntax
for writing object literals."
```

The four pieces worth mastering are:

```text
1. { name }
       ↓
   name: name

2. { greet() {} }
       ↓
   shorter method syntax

3. { [key]: value }
       ↓
   dynamic property name

4. { ...obj }
       ↓
   copy/spread object properties
```

And this ties directly into the previous topics:

```text
Default
Rest
Spread
   │
   ▼
Objects
   │
   ▼
Enhanced Object Literals
   │
   ▼
Destructuring
```

**Destructuring is the natural next concept**, because it essentially lets you go in the opposite direction: instead of *building* objects/arrays from values, you **extract values from them**.
