Absolutely. **Shallow copy vs deep copy** is one of the most important concepts in JavaScript because objects and arrays are reference-based.

## 1. The core idea: primitives vs objects

Before understanding copying, you need to understand how JavaScript stores values.

### Primitive values

Examples:

```js
let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20
```

`a` and `b` contain independent values.

Primitives include:

* `string`
* `number`
* `boolean`
* `undefined`
* `null`
* `bigint`
* `symbol`

### Objects

Objects behave differently:

```js
let user1 = {
  name: "Ali"
};

let user2 = user1;

user2.name = "Ahmed";

console.log(user1.name); // "Ahmed"
console.log(user2.name); // "Ahmed"
```

Why?

Because:

```js
let user2 = user1;
```

doesn't create a new object.

Both variables refer to the **same object**.

Conceptually:

```text
user1 ──────┐
            ↓
        ┌─────────────┐
        │ { name: ... }│
        └─────────────┘
            ↑
user2 ──────┘
```

This is where shallow and deep copying become important.

---

# 2. What is a shallow copy?

A **shallow copy** creates a new outer object, but nested objects/arrays are still shared.

Example:

```js
const original = {
  name: "Ali",
  age: 20
};

const copy = { ...original };

copy.name = "Ahmed";

console.log(original.name); // "Ali"
console.log(copy.name);     // "Ahmed"
```

Here, the outer object is different:

```js
console.log(original === copy); // false
```

So changing a top-level property doesn't affect the original.

But things become interesting with nested objects.

---

# 3. Shallow copy with nested objects

Consider:

```js
const original = {
  name: "Ali",
  address: {
    city: "Mansehra",
    country: "Pakistan"
  }
};

const copy = { ...original };
```

You might think everything was copied.

It wasn't.

The structure is approximately:

```text
original ────────→ Object A
                    │
                    ├── name → "Ali"
                    │
                    └── address ─────→ Object B
                                      │
                                      ├── city → "Mansehra"
                                      └── country → "Pakistan"


copy ────────────→ Object C
                    │
                    ├── name → "Ali"
                    │
                    └── address ─────→ Object B
```

Notice:

* `Object A` ≠ `Object C`
* But both point to the same `address` object.

Therefore:

```js
console.log(original === copy);
// false

console.log(original.address === copy.address);
// true
```

Now:

```js
copy.address.city = "Islamabad";

console.log(copy.address.city);
// "Islamabad"

console.log(original.address.city);
// "Islamabad"
```

The original changed too.

That's the defining characteristic of a shallow copy.

---

# 4. Common ways to create shallow copies

## Object spread

```js
const copy = { ...original };
```

Example:

```js
const user = {
  name: "Ali",
  age: 20
};

const copy = { ...user };
```

This is probably the most common approach.

---

## `Object.assign()`

```js
const copy = Object.assign({}, original);
```

Example:

```js
const user = {
  name: "Ali",
  age: 20
};

const copy = Object.assign({}, user);
```

Again, this is a **shallow** copy.

---

# 5. Arrays and shallow copying

Arrays are objects too.

You can make a shallow copy using:

### Spread

```js
const numbers = [1, 2, 3];

const copy = [...numbers];

copy.push(4);

console.log(numbers);
// [1, 2, 3]

console.log(copy);
// [1, 2, 3, 4]
```

The outer arrays are different:

```js
numbers === copy;
// false
```

But nested arrays are still shared:

```js
const original = [
  [1, 2],
  [3, 4]
];

const copy = [...original];

console.log(original === copy);
// false

console.log(original[0] === copy[0]);
// true
```

Therefore:

```js
copy[0].push(99);

console.log(original);
// [[1, 2, 99], [3, 4]]

console.log(copy);
// [[1, 2, 99], [3, 4]]
```

---

# 6. Other array methods that create shallow copies

These generally create a new array:

```js
const copy1 = [...arr];

const copy2 = arr.slice();

const copy3 = Array.from(arr);

const copy4 = arr.concat();
```

For example:

```js
const arr = [1, 2, 3];

const copy = arr.slice();

console.log(arr === copy);
// false
```

But they're still shallow.

---

# 7. What is a deep copy?

A **deep copy** creates a completely independent copy, including nested objects and arrays.

For example:

```js
const original = {
  name: "Ali",
  address: {
    city: "Mansehra"
  }
};
```

A deep copy would conceptually produce:

```text
original ─────→ Object A
                │
                └── address ───→ Object B
                                  │
                                  └── city


copy ─────────→ Object C
                │
                └── address ───→ Object D
                                  │
                                  └── city
```

Now there are **two separate address objects**.

So:

```js
original !== copy

original.address !== copy.address
```

Changing the nested object doesn't affect the original.

---

# 8. `structuredClone()` — modern deep copying

The preferred built-in solution for many ordinary JavaScript data structures is:

```js
const copy = structuredClone(original);
```

Example:

```js
const original = {
  name: "Ali",
  address: {
    city: "Mansehra"
  }
};

const copy = structuredClone(original);

copy.address.city = "Islamabad";

console.log(original.address.city);
// "Mansehra"

console.log(copy.address.city);
// "Islamabad"
```

Now:

```js
console.log(original === copy);
// false

console.log(original.address === copy.address);
// false
```

That's a genuine deep copy for this structure.

---

# 9. Why `JSON.parse(JSON.stringify())` is NOT a perfect deep copy

You'll often see this:

```js
const copy = JSON.parse(JSON.stringify(original));
```

It can work for simple JSON-like data:

```js
const original = {
  name: "Ali",
  age: 20,
  address: {
    city: "Mansehra"
  }
};

const copy = JSON.parse(JSON.stringify(original));
```

But there are important limitations.

For example:

```js
const original = {
  date: new Date(),
  value: undefined,
  func: () => console.log("hello")
};

const copy = JSON.parse(JSON.stringify(original));

console.log(copy);
```

You don't get an equivalent object.

`JSON.stringify()` cannot faithfully represent many JavaScript values.

For example:

| Value              | JSON cloning behavior        |
| ------------------ | ---------------------------- |
| `undefined`        | Usually removed from objects |
| Function           | Removed                      |
| `Date`             | Converted to string          |
| `Map`              | Doesn't preserve as `Map`    |
| `Set`              | Doesn't preserve as `Set`    |
| `BigInt`           | Throws an error              |
| Circular reference | Throws an error              |

So avoid thinking:

```js
JSON.parse(JSON.stringify(x))
```

means "deep clone anything."

It doesn't.

---

# 10. Shallow vs deep copy — the key difference

Consider:

```js
const user = {
  name: "Ali",
  skills: ["JS", "Python"]
};
```

### Shallow copy

```js
const copy = { ...user };
```

Result:

```text
user ─────→ Object A
             │
             ├── name → "Ali"
             │
             └── skills ──→ Array B


copy ─────→ Object C
             │
             ├── name → "Ali"
             │
             └── skills ──→ Array B
```

The array is shared.

Therefore:

```js
copy.skills.push("React");

console.log(user.skills);
// ["JS", "Python", "React"]
```

---

### Deep copy

```js
const copy = structuredClone(user);
```

Result:

```text
user ─────→ Object A
             │
             └── skills ──→ Array B


copy ─────→ Object C
             │
             └── skills ──→ Array D
```

Now:

```js
copy.skills.push("React");

console.log(user.skills);
// ["JS", "Python"]

console.log(copy.skills);
// ["JS", "Python", "React"]
```

---

# 11. A very important interview question

Consider:

```js
const a = {
  x: 10,
  nested: {
    y: 20
  }
};

const b = { ...a };

b.x = 100;
b.nested.y = 200;
```

What is:

```js
console.log(a.x);
console.log(a.nested.y);
```

Answer:

```js
a.x;
// 10

a.nested.y;
// 200
```

Why?

Because:

```js
b.x
```

is a primitive value that was copied.

But:

```js
b.nested
```

is a reference to the same nested object.

So:

```js
a.nested === b.nested;
// true
```

---

# 12. Another common interview example

```js
const user1 = {
  name: "Ali",
  skills: ["JS", "React"]
};

const user2 = { ...user1 };

user2.name = "Ahmed";
user2.skills.push("Node");

console.log(user1);
```

Result:

```js
{
  name: "Ali",
  skills: ["JS", "React", "Node"]
}
```

Why?

`name` is a primitive:

```text
user1.name → "Ali"
user2.name → "Ali"
```

Changing `user2.name` doesn't affect `user1.name`.

But `skills` is an array:

```text
user1.skills ──┐
               ↓
           ["JS", "React"]
               ↑
user2.skills ──┘
```

Both point to the same array.

---

# 13. Shallow copy doesn't mean "only one level of data"

This is an important terminology point.

People sometimes say:

> "Shallow copy copies only the first level."

That's a useful simplification, but the more precise explanation is:

**A shallow copy creates a new outer container while preserving references to nested objects.**

For example:

```js
const obj = {
  a: {
    b: {
      c: 10
    }
  }
};

const copy = { ...obj };
```

Here:

```js
copy !== obj
```

but:

```js
copy.a === obj.a
```

and therefore:

```js
copy.a.b === obj.a.b
```

because both paths eventually reach the same nested objects.

---

# 14. Deep copying recursively

Conceptually, a deep copy means:

```text
Copy outer object
    ↓
Copy nested object
    ↓
Copy nested object's nested object
    ↓
Continue recursively
```

For example:

```js
const original = {
  a: {
    b: {
      c: 10
    }
  }
};
```

A deep clone creates separate objects at every level:

```text
original
   ↓
 Object A
   ↓
 Object B
   ↓
 Object C


copy
   ↓
 Object D
   ↓
 Object E
   ↓
 Object F
```

Thus:

```js
original !== copy
original.a !== copy.a
original.a.b !== copy.a.b
```

---

# 15. What about `const`?

This often confuses beginners.

Consider:

```js
const user = {
  name: "Ali"
};

user.name = "Ahmed";
```

This is allowed.

`const` prevents reassignment of the variable, not modification of the object.

This is not allowed:

```js
const user = {
  name: "Ali"
};

user = {
  name: "Ahmed"
};
```

Because you're trying to make `user` refer to another object.

Think:

```text
const user ─────→ Object A
```

You can't change the arrow:

```text
user ─────→ Object B
```

But you can modify Object A:

```js
user.name = "Ahmed";
```

---

# 16. Copying isn't the same as immutability

This distinction is especially important in React and modern JavaScript.

Suppose:

```js
const user = {
  name: "Ali",
  address: {
    city: "Mansehra"
  }
};

const copy = { ...user };
```

You created a new object, but you haven't completely separated the data.

This:

```js
copy.address.city = "Islamabad";
```

still modifies the shared nested object.

If you want to update nested data immutably, you can create new objects along the path:

```js
const updatedUser = {
  ...user,
  address: {
    ...user.address,
    city: "Islamabad"
  }
};
```

Now:

```js
console.log(user.address.city);
// "Mansehra"

console.log(updatedUser.address.city);
// "Islamabad"
```

And:

```js
console.log(user === updatedUser);
// false

console.log(user.address === updatedUser.address);
// false
```

This technique is extremely important in **React state management**.

---

# 17. Partial copying

You don't always need a full deep clone.

Suppose:

```js
const user = {
  name: "Ali",
  address: {
    city: "Mansehra",
    zip: 21300
  },
  preferences: {
    theme: "dark"
  }
};
```

You only want to change `address.city`.

Instead of:

```js
const copy = structuredClone(user);
```

you can do:

```js
const copy = {
  ...user,
  address: {
    ...user.address,
    city: "Islamabad"
  }
};
```

This is often better because you only create new objects where changes occur.

Conceptually:

```text
             user
              │
       ┌──────┼──────────┐
       ↓      ↓          ↓
     name   address   preferences
              ↓
           new object
```

This is called **structural sharing**.

The unchanged parts can continue to be shared safely.

---

# 18. What does `structuredClone()` support?

`structuredClone()` handles many built-in JavaScript data types much better than JSON cloning.

For example:

```js
const original = {
  date: new Date(),
  numbers: new Set([1, 2, 3]),
  mapping: new Map([
    ["name", "Ali"]
  ])
};

const copy = structuredClone(original);
```

The cloned values retain their appropriate types.

For example:

```js
copy.date instanceof Date;
// true

copy.numbers instanceof Set;
// true

copy.mapping instanceof Map;
// true
```

However, `structuredClone()` doesn't clone absolutely everything. For example, functions cannot be cloned with it.

---

# 19. Circular references

Consider:

```js
const user = {
  name: "Ali"
};

user.self = user;
```

Now:

```text
user ──→ Object
          │
          └── self ──→ same Object
```

This is a circular reference.

JSON cloning fails:

```js
JSON.stringify(user);
// TypeError: Converting circular structure to JSON
```

But:

```js
const copy = structuredClone(user);
```

can handle circular object graphs.

---

# 20. Shallow copy methods — quick reference

### Objects

```js
const copy = { ...obj };
```

or:

```js
const copy = Object.assign({}, obj);
```

### Arrays

```js
const copy = [...arr];
```

or:

```js
const copy = arr.slice();
```

or:

```js
const copy = Array.from(arr);
```

All of these are **shallow copies**.

---

# 21. Deep copy methods — quick reference

### Recommended general-purpose option

```js
const copy = structuredClone(original);
```

### JSON technique

```js
const copy = JSON.parse(JSON.stringify(original));
```

Useful only for restricted JSON-compatible data.

### Libraries

Libraries such as Lodash provide deep cloning:

```js
_.cloneDeep(original);
```

This can be useful in projects with more specialized requirements.

---

# 22. Comparison

| Feature                           | Shallow Copy | Deep Copy                |
| --------------------------------- | ------------ | ------------------------ |
| New outer object                  | ✅            | ✅                        |
| New nested objects                | ❌            | ✅                        |
| Nested references shared          | ✅            | ❌                        |
| Faster generally                  | ✅            | Usually slower           |
| Uses less memory                  | ✅            | Usually more             |
| `{...obj}`                        | ✅            | ❌                        |
| `Object.assign()`                 | ✅            | ❌                        |
| `[...array]`                      | ✅            | ❌                        |
| `structuredClone()`               | ❌            | ✅                        |
| Good for immutable nested updates | Sometimes    | Yes                      |
| Handles circular references       | N/A          | `structuredClone()` does |

---

# 23. The easiest way to remember it

Think about a box containing smaller boxes.

### Shallow copy

You make a **new outer box**, but put the same inner boxes inside it.

```text
Original                 Copy

┌───────────┐            ┌───────────┐
│           │            │           │
│ ┌───────┐ │            │ ┌───────┐ │
│ │ Inner │←┼────────────┼→│ Inner │ │
│ └───────┘ │            │ └───────┘ │
└───────────┘            └───────────┘
```

### Deep copy

You make a new outer box **and new inner boxes**.

```text
Original                 Copy

┌───────────┐            ┌───────────┐
│           │            │           │
│ ┌───────┐ │            │ ┌───────┐ │
│ │ Inner │ │            │ │ Inner │ │
│ └───────┘ │            │ └───────┘ │
└───────────┘            └───────────┘
```

Nothing nested is shared.

---

## The most important rule

When you see:

```js
const copy = { ...original };
```

**do not automatically think "everything has been copied."**

Think:

> **"The outer object is new, but nested objects/arrays are still references."**

And when you see:

```js
const copy = structuredClone(original);
```

think:

> **"Create an independent clone of the supported data structure, including nested objects."**

Once you understand **references + shallow copying + deep copying**, you'll also understand a lot of behavior in **React state, Redux, object mutation, array manipulation, function arguments, and JavaScript memory/reference behavior**.


https://chatgpt.com/share/6aaa5ebf-1748-83ee-88d9-4c0c1db855e4

    