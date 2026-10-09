Memoization in JavaScript is an **optimization technique** where you cache the result of a function call so that if the function is called again with the same input, you return the cached result instead of recomputing it.

This is especially useful for:

* Expensive calculations
* Recursive algorithms (like Fibonacci)
* Functions that are called repeatedly with the same arguments

### Without memoization

```javascript
function square(n) {
  console.log("Calculating...");
  return n * n;
}

console.log(square(5)); // Calculating... 25
console.log(square(5)); // Calculating... 25
```

The function recalculates every time.

---

### With memoization

```javascript
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log("From cache");
      return cache[key];
    }

    console.log("Calculating...");
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function square(n) {
  return n * n;
}

const memoizedSquare = memoize(square);

console.log(memoizedSquare(5)); // Calculating... 25
console.log(memoizedSquare(5)); // From cache... 25
console.log(memoizedSquare(6)); // Calculating... 36
console.log(memoizedSquare(6)); // From cache... 36
```

---

## Example: Fibonacci (huge performance improvement)

Without memoization:

```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

console.log(fib(40));
```

This performs **millions of repeated calculations**.

With memoization:

```javascript
function memoizedFib() {
  const cache = {};

  function fib(n) {
    if (n in cache) return cache[n];

    if (n <= 1) return n;

    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  }

  return fib;
}

const fib = memoizedFib();

console.log(fib(40));
```

Now each Fibonacci number is calculated **only once**, reducing the time complexity from **O(2ⁿ)** to **O(n)**.

---

## Using `Map` instead of an object

`Map` is often a better choice because it supports any key type.

```javascript
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  };
}
```

---

## When should you use memoization?

Use memoization when:

* ✅ The function is **pure** (same input always produces the same output).
* ✅ The function is expensive to compute.
* ✅ The same inputs occur frequently.

Avoid memoization when:

* ❌ The function depends on external state (e.g., current time or random numbers).
* ❌ Inputs are almost always unique, making the cache ineffective.
* ❌ Memory usage from caching would outweigh the performance benefits.

---

## Memoization vs Caching

They are closely related, but not identical:

| Memoization                               | Caching                                                       |
| ----------------------------------------- | ------------------------------------------------------------- |
| Typically caches function results         | Can cache any type of data                                    |
| Usually local to a function               | Can be global, server-side, browser-side, etc.                |
| Automatically keyed by function arguments | Cache keys can be anything                                    |
| Used for performance optimization         | Used for performance, scalability, and reducing repeated work |

---

### Real-world examples

* **React**: `useMemo` memoizes computed values, and `useCallback` memoizes function references to avoid unnecessary re-renders.
* **API calls**: You can cache responses for repeated requests with the same parameters.
* **Dynamic programming**: Many algorithms (like Fibonacci, knapsack, and pathfinding) use memoization to avoid redundant calculations.

In short, memoization trades **memory for speed** by storing the results of previous computations and reusing them when the same inputs are encountered.




Example 2



const cache = {};

function add(a, b) {
  const key = `${a},${b}`;

  if (cache[key]) {
    return cache[key];
  }

  console.log("Calculating...");

  const result = a + b;

  cache[key] = result;

  return result;
}



Absolutely. Let's dry-run **every single line** of this exact example.

Here is the code:

```javascript
const cache = {};

function add(a, b) {
  const key = `${a},${b}`;

  if (cache[key]) {
    return cache[key];
  }

  console.log("Calculating...");

  const result = a + b;

  cache[key] = result;

  return result;
}
```

We'll call it like this:

```javascript
console.log(add(2, 3));
console.log(add(2, 3));
console.log(add(5, 10));
```

---

# Step 1: `const cache = {};`

```javascript
const cache = {};
```

JavaScript creates an **empty object** called `cache`.

Think:

```text
cache
  ↓
{}
```

Nothing is stored yet.

---

# Step 2: JavaScript creates the function

```javascript
function add(a, b) {
```

JavaScript creates a function named `add`.

The function has two parameters:

```text
a
b
```

At this moment, **the function does NOT run**.

We're just defining it.

So nothing happens inside the `{ }` yet.

---

# Step 3: First function call

Now we execute:

```javascript
add(2, 3)
```

JavaScript enters the function:

```javascript
function add(a, b) {
```

The values are assigned:

```text
a = 2
b = 3
```

So inside the function we effectively have:

```text
a → 2
b → 3
```

---

# Step 4: Create the key

The next line is:

```javascript
const key = `${a},${b}`;
```

Remember:

```text
a = 2
b = 3
```

So:

```javascript
`${a},${b}`
```

becomes:

```javascript
"2,3"
```

Therefore:

```text
key → "2,3"
```

Our memory now looks like:

```text
cache → {}
key   → "2,3"
```

---

# Step 5: The `if`

Next:

```javascript
if (cache[key]) {
```

This is probably the most important line to understand.

We know:

```text
key = "2,3"
```

So JavaScript replaces `key`:

```javascript
cache["2,3"]
```

Now ask:

> Does `cache` have a value stored under `"2,3"`?

Our cache is currently:

```javascript
{}
```

There is nothing inside.

So:

```javascript
cache["2,3"]
```

is:

```text
undefined
```

Therefore:

```javascript
if (undefined)
```

is **false**.

So JavaScript skips:

```javascript
return cache[key];
```

and continues.

---

# Step 6: Print "Calculating..."

Now:

```javascript
console.log("Calculating...");
```

Output:

```text
Calculating...
```

---

# Step 7: Calculate the result

Next:

```javascript
const result = a + b;
```

We know:

```text
a = 2
b = 3
```

Therefore:

```text
result = 2 + 3
```

So:

```text
result = 5
```

Our current variables:

```text
a      → 2
b      → 3
key    → "2,3"
result → 5
```

---

# Step 8: Store the result in cache

This line is extremely important:

```javascript
cache[key] = result;
```

We know:

```text
key = "2,3"
result = 5
```

So JavaScript effectively sees:

```javascript
cache["2,3"] = 5;
```

Remember our cache was:

```javascript
{}
```

Now it becomes:

```javascript
{
  "2,3": 5
}
```

Think of it as:

```text
          cache
            ↓
       ┌───────────┐
       │ "2,3" → 5 │
       └───────────┘
```

We have now **remembered the answer**.

---

# Step 9: Return the result

Next:

```javascript
return result;
```

`result` is:

```text
5
```

So the function returns:

```text
5
```

Then this:

```javascript
console.log(add(2, 3));
```

prints:

```text
5
```

So after the **first call**, we have:

```text
Output:
Calculating...
5

Cache:
{
  "2,3": 5
}
```

---

# Now comes the interesting part 🚀

We call the function again:

```javascript
add(2, 3)
```

This is the **second call**.

---

# Step 10: Parameters again

The function receives:

```text
a = 2
b = 3
```

Then:

```javascript
const key = `${a},${b}`;
```

becomes:

```text
key = "2,3"
```

So:

```text
a   → 2
b   → 3
key → "2,3"
```

---

# Step 11: Check the cache

Now:

```javascript
if (cache[key]) {
```

becomes:

```javascript
if (cache["2,3"]) {
```

Look at our cache:

```javascript
{
  "2,3": 5
}
```

So:

```javascript
cache["2,3"]
```

is:

```text
5
```

And `5` is truthy.

Therefore:

```javascript
if (5)
```

is **true**.

So JavaScript enters the `if`:

```javascript
return cache[key];
```

Which is effectively:

```javascript
return cache["2,3"];
```

And that is:

```text
5
```

So the function immediately returns `5`.

---

# Notice what DIDN'T happen

On the second call, JavaScript **doesn't execute**:

```javascript
console.log("Calculating...");
```

It doesn't execute:

```javascript
const result = a + b;
```

It doesn't execute:

```javascript
cache[key] = result;
```

It immediately returns the cached answer.

That's the whole point of memoization.

---

# Full dry run

Let's put everything together.

We start:

```javascript
const cache = {};
```

Cache:

```javascript
{}
```

### First call

```javascript
add(2, 3)
```

Parameters:

```text
a = 2
b = 3
```

Create key:

```text
key = "2,3"
```

Check:

```javascript
cache["2,3"]
```

Result:

```text
undefined
```

So calculate:

```text
2 + 3 = 5
```

Store:

```javascript
cache["2,3"] = 5;
```

Cache becomes:

```javascript
{
  "2,3": 5
}
```

Return:

```text
5
```

---

### Second call

```javascript
add(2, 3)
```

Parameters:

```text
a = 2
b = 3
```

Create key:

```text
key = "2,3"
```

Check:

```javascript
cache["2,3"]
```

We already have:

```text
5
```

So:

```javascript
return cache["2,3"];
```

Returns:

```text
5
```

**No calculation happens.**

---

# Now let's add another call

Suppose we do:

```javascript
console.log(add(5, 10));
```

What happens?

### Parameters

```text
a = 5
b = 10
```

### Create key

```text
key = "5,10"
```

### Check cache

```javascript
cache["5,10"]
```

Our cache currently is:

```javascript
{
  "2,3": 5
}
```

There is no `"5,10"`.

So:

```text
cache["5,10"] → undefined
```

Therefore we calculate:

```text
5 + 10 = 15
```

Then store:

```javascript
cache["5,10"] = 15;
```

Cache becomes:

```javascript
{
  "2,3": 5,
  "5,10": 15
}
```

Then return:

```text
15
```

---

# Final cache

After these calls:

```javascript
add(2, 3);
add(2, 3);
add(5, 10);
```

our cache is:

```javascript
{
  "2,3": 5,
  "5,10": 15
}
```

Think of the cache as a little **answer book**:

```text
┌───────────────┐
│     CACHE     │
├───────────────┤
│ "2,3"  →  5   │
│ "5,10" → 15   │
└───────────────┘
```

Whenever someone asks:

```text
add(2, 3)
```

we look in the answer book:

```text
"2,3" → 5
```

**Found it → return 5.**

When someone asks:

```text
add(7, 8)
```

we look:

```text
"7,8" → ??? 
```

**Not found → calculate → save → return.**

---

## The most important 3 lines

If you understand these three lines, you've basically understood the core of memoization:

```javascript
const key = `${a},${b}`;
```

**Create a unique name for this particular input.**

```javascript
if (cache[key]) {
  return cache[key];
}
```

**Have I already calculated this input? If yes, give me the saved answer.**

```javascript
cache[key] = result;
```

**If I calculated it for the first time, save the answer so I can reuse it later.**

So the entire concept is:

```text
             add(2, 3)
                 ↓
          Create key "2,3"
                 ↓
        Is "2,3" in cache?
           ↙             ↘
         YES              NO
          ↓                ↓
     Return 5          Calculate
                           ↓
                        Result = 5
                           ↓
                    Save "2,3" → 5
                           ↓
                       Return 5
```

That's **memoization**.






At this stage, **you don't need to know much more**. If you're learning JavaScript, I'd consider you good on the basics if you understand these 5 things:

### 1. What memoization is

You should be able to say:

> **Memoization is storing a function's previous result so we can reuse it instead of calculating it again.**

### 2. Why we use it

You should understand:

```text
Same input
   ↓
Have we calculated it before?
   ↓
YES → use cached result
NO  → calculate → save result
```

It's mainly about **improving performance**.

### 3. What the cache is

You now understand:

```javascript
const cache = {};
```

is simply an **object** being used to store previous results.

For example:

```javascript
cache["2,3"] = 5;
```

means:

```text
input 2,3 → result 5
```

### 4. You should understand the basic implementation

You don't need to memorize it, but you should understand what each part does:

```javascript
function memoize(fn) {
  const cache = {};

  return function (n) {
    if (cache[n]) {
      return cache[n];
    }

    const result = fn(n);

    cache[n] = result;

    return result;
  };
}
```

You should be able to explain:

* `cache` → stores old results
* `cache[n]` → checks whether we already have an answer
* `fn(n)` → calculates the answer if we don't have it
* `cache[n] = result` → saves the answer
* `return cache[n]` → reuses the saved answer

### 5. You should be able to dry-run it

For example, given:

```javascript
const square = memoize(n => n * n);

square(5);
square(5);
```

You should understand:

```text
First square(5)
       ↓
Cache doesn't have 5
       ↓
Calculate 5 × 5
       ↓
Save 5 → 25
       ↓
Return 25


Second square(5)
       ↓
Cache has 5
       ↓
Return 25
       ↓
No calculation
```

---

### What you DON'T need to learn yet

Don't worry about these right now:

* `Map` vs object for caching
* WeakMap
* Complex argument handling
* Memoizing asynchronous functions
* React's `useMemo`
* Advanced functional programming
* Cache invalidation
* LRU caches
* Libraries that provide memoization

Those are **later topics**.

### A good checkpoint

If I asked you:

> "Explain memoization to me using a simple example."

and you could explain the **cache → check → calculate → store → reuse** process in your own words, **you're ready to move on.**

One thing I would recommend next, though, is learning **closures**, because the line:

```javascript
const cache = {};
```

inside `memoize()` remains available to the returned function. **That behavior comes from closures**, and understanding it will make the `memoize()` example much easier to fully understand.
