This statement is commonly used when teaching JavaScript, but it needs a bit of refinement.

> **"JavaScript is a synchronous language. Its default behavior is synchronous. We forcefully make it asynchronous."**

Let's break it down.

## 1. JavaScript is synchronous by default

JavaScript executes **one statement at a time**, in the order they appear.

Example:

```javascript
console.log("A");
console.log("B");
console.log("C");
```

Output:

```
A
B
C
```

JavaScript does not move to the next line until the current line finishes executing.

This is called **synchronous execution**.

---

## 2. JavaScript is single-threaded

JavaScript has **one call stack**, so it can execute only one task at a time.

Imagine a teacher checking exam papers.

* The teacher checks Paper 1.
* Then Paper 2.
* Then Paper 3.

The teacher cannot check two papers at the same time.

JavaScript works in the same way.

---

## 3. Then how does JavaScript become asynchronous?

JavaScript itself **does not become asynchronous**.

Instead, it **uses asynchronous APIs provided by the browser or Node.js**, such as:

* `setTimeout()`
* `fetch()`
* Event listeners
* File system APIs (Node.js)

When JavaScript encounters one of these APIs, it hands the task off to the environment.

Example:

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Hello");
}, 2000);

console.log("End");
```

### What happens?

1. `"Start"` is printed.
2. `setTimeout()` tells the **browser**: "Run this callback after 2 seconds."
3. JavaScript does **not wait**.
4. `"End"` is printed.
5. After 2 seconds, the browser tells JavaScript the timer is complete.
6. JavaScript executes the callback.

Output:

```
Start
End
Hello
```

Notice that JavaScript itself never became asynchronous. It simply **delegated** the timer to the browser.

---

## 4. What does "we forcefully make it asynchronous" mean?

This phrase is **informal**. It means:

> We deliberately use asynchronous APIs instead of writing only synchronous code.

For example, compare these:

### Synchronous

```javascript
console.log("Download file");
console.log("Read file");
console.log("Display file");
```

Everything happens one after another.

### Asynchronous

```javascript
console.log("Download started");

setTimeout(() => {
    console.log("Download completed");
}, 3000);

console.log("User can continue working");
```

Here, we intentionally used `setTimeout()` to avoid blocking the program.

---

## 5. A more accurate statement

Instead of saying:

> **"We forcefully make JavaScript asynchronous."**

It is more accurate to say:

> **"JavaScript is synchronous by nature, but it can perform asynchronous operations by using browser or Node.js APIs together with the event loop."**

This is the explanation you'll often hear in interviews because it accurately describes how JavaScript works.

### Key takeaway

* ✅ JavaScript is **synchronous by default**.
* ✅ JavaScript is **single-threaded**.
* ✅ JavaScript itself **does not become asynchronous**.
* ✅ Asynchronous behavior comes from **Web APIs (in browsers)** or **Node.js APIs**, coordinated by the **event loop**.
* ✅ We **choose to use** these asynchronous APIs when we don't want the program to block while waiting for long-running operations like timers, network requests, or file I/O.




single-threaded.
what does that means

Great question.

When we say **"JavaScript is single-threaded,"** we mean:

> **JavaScript has only one thread (one call stack) to execute code, so it can perform only one operation at a time.**

### What is a thread?

A **thread** is a path of execution that performs instructions.

Think of a thread as a **worker**.

* **Single-threaded** = 1 worker
* **Multi-threaded** = Multiple workers

### Example

Suppose you have three tasks:

1. Print "A"
2. Print "B"
3. Print "C"

JavaScript executes them like this:

```javascript
console.log("A");
console.log("B");
console.log("C");
```

Output:

```
A
B
C
```

It cannot print `"B"` before finishing `"A"` because there is only **one thread** executing the code.

---

## Real-life analogy

Imagine you are the only cashier at a store.

Customers arrive in this order:

```
Customer 1
Customer 2
Customer 3
```

Since you're the only cashier, you serve them one by one:

```
Customer 1 ✅
Customer 2 ✅
Customer 3 ✅
```

You can't serve Customer 2 while you're still serving Customer 1.

That's how JavaScript works—it has one "cashier" (one thread).

---

## Then how does JavaScript handle long tasks?

Consider this code:

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Done");
}, 3000);

console.log("End");
```

If JavaScript had to wait 3 seconds, it would block everything.

Instead:

1. JavaScript starts executing.
2. It sees `setTimeout()`.
3. It asks the **browser** (or Node.js) to handle the timer.
4. JavaScript immediately continues with the next line.
5. After 3 seconds, the browser tells JavaScript, "The timer is finished."
6. JavaScript executes the callback.

Output:

```
Start
End
Done
```

So even though JavaScript is **single-threaded**, it can appear to do multiple things because the browser or Node.js performs certain tasks outside the JavaScript thread and notifies JavaScript when they're complete.

### Key point

People often say:

> "JavaScript does one thing at a time."

That's true.

A more complete statement is:

> **JavaScript executes one piece of JavaScript code at a time on a single thread. Long-running operations (like timers, network requests, or file I/O) are handled by the browser or Node.js, allowing JavaScript to continue executing other code until those operations finish.**

what does mean by web Api ?
This is one of the most important concepts in asynchronous JavaScript.

## What is a Web API?

A **Web API** is a feature provided by the **browser**, **not by JavaScript itself**.

Think of it this way:

* **JavaScript** = The worker who writes instructions.
* **Browser** = The manager who provides extra services (timers, networking, DOM, etc.).

JavaScript asks the browser to perform tasks that take time.

---

## Example

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Hello");
}, 2000);

console.log("End");
```

You might think JavaScript waits for 2 seconds, but it doesn't.

Here's what actually happens.

### Step 1: JavaScript executes

```text
console.log("Start")
```

Output:

```text
Start
```

---

### Step 2: JavaScript sees `setTimeout()`

Instead of handling the timer itself, JavaScript says:

> **"Browser, please start a 2-second timer for me. When it's finished, let me know."**

The browser has a **Timer Web API**.

So the timer starts **inside the browser**, not inside JavaScript.

```text
JavaScript          Browser(Web API)

setTimeout()  --->  Timer starts (2 sec)
```

---

### Step 3: JavaScript continues

Since the browser is handling the timer, JavaScript doesn't wait.

It executes the next line:

```javascript
console.log("End");
```

Output:

```text
Start
End
```

---

### Step 4: Timer finishes

After 2 seconds, the browser says:

> "The timer is finished."

It places the callback into the **Callback Queue**.

```text
Browser
   │
   ▼
Callback Queue
```

---

### Step 5: Event Loop

When JavaScript's **Call Stack** becomes empty, the **Event Loop** moves the callback to the Call Stack.

Then JavaScript executes:

```javascript
console.log("Hello");
```

Final output:

```text
Start
End
Hello
```

---

# Visual Diagram

```text
            JavaScript Engine

          ┌──────────────┐
          │  Call Stack  │
          └──────┬───────┘
                 │
                 ▼
      setTimeout(callback,2000)
                 │
                 ▼
        Browser Web API
        ┌──────────────┐
        │ Timer (2 sec)│
        └──────┬───────┘
               │
               ▼
        Callback Queue
               │
               ▼
          Event Loop
               │
               ▼
          Call Stack
               │
               ▼
        console.log("Hello")
```

---

# Common Web APIs

| Web API              | Purpose                                           |
| -------------------- | ------------------------------------------------- |
| `setTimeout()`       | Run code after a delay                            |
| `setInterval()`      | Run code repeatedly                               |
| `fetch()`            | Make HTTP requests                                |
| `addEventListener()` | Listen for user events like clicks or key presses |
| DOM APIs             | Access and modify HTML elements                   |
| `localStorage`       | Store data in the browser                         |

---

# Why are they called **Web** APIs?

Because they are provided by **web browsers** like:

* Chrome
* Firefox
* Edge
* Safari

They are **not part of the JavaScript language (ECMAScript)**.

For example:

```javascript
setTimeout();
fetch();
document.getElementById();
```

These functions exist because the **browser** provides them.

---

## What about Node.js?

Node.js doesn't have browser Web APIs like `document` or `window`.

Instead, Node.js provides its own APIs, such as:

* `setTimeout()`
* File System (`fs`)
* HTTP
* Streams
* Timers

So in Node.js, these are **Node APIs**, not browser Web APIs.

---

## Interview Answer

> **Web APIs are functionalities provided by the browser (or runtime environment) that allow JavaScript to perform operations such as timers, network requests, DOM manipulation, and event handling. JavaScript delegates these tasks to the Web APIs, continues executing other code, and later receives the result through the event loop and callback queue.**

### Key takeaway

* **JavaScript** executes your code.
* **Web APIs** (provided by the browser) perform long-running tasks like timers and network requests.
* **Event Loop** coordinates bringing completed callbacks back to JavaScript when the call stack is empty.

This division of responsibilities is what allows JavaScript to remain **single-threaded** while still supporting **asynchronous programming**.


you mention that after two seconds browser have to remind to js to tun call  back suppose if we so many calls and statment and js takes more then2  sec so what will happen ?

Excellent question! This is exactly where many people misunderstand the event loop.

The answer is:

> **The callback will not interrupt JavaScript. It waits until JavaScript finishes its current work.**

Let's see an example.

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 2000);

// A long synchronous task
for (let i = 0; i < 10000000000; i++) {
    // Do nothing
}

console.log("End");
```

### What happens?

1. `"Start"` is printed.

2. `setTimeout()` starts a 2-second timer in the browser.

3. JavaScript enters the `for` loop.

4. Suppose the loop takes **5 seconds**.

5. After **2 seconds**, the browser says:

   > "The timer is finished."

   **But it cannot force JavaScript to stop.**

6. The browser places the callback in the **Callback Queue**.

7. JavaScript is still busy executing the loop.

8. After 5 seconds, the loop finishes.

9. `"End"` is printed.

10. The call stack is now empty, so the **Event Loop** moves the callback to the call stack.

11. `"Timeout"` is printed.

### Output

```text
Start
End
Timeout
```

Notice that although the timer was **2 seconds**, the callback actually executed after **about 5 seconds**.

---

## Why?

Think of JavaScript as a teacher writing on a whiteboard.

The browser is like a student.

After 2 seconds, the student says:

> "Sir, the timer is over."

The teacher replies:

> "I'm still writing. Wait until I finish."

The student waits.

Only after the teacher finishes does the teacher handle the timer callback.

---

## Very Important Point

Many beginners think:

> `setTimeout(fn, 2000)` means **"execute after exactly 2 seconds."**

That's **not** what it means.

It means:

> **"Execute this callback after at least 2 seconds, as soon as the call stack becomes empty."**

So the delay is a **minimum delay**, not a guarantee.

---

## Event Loop Rule

The event loop checks:

```text
Is the Call Stack empty?
```

* **No** → Wait.
* **Yes** → Take the first callback from the queue and execute it.

It **never interrupts** code that's already running.

That's why JavaScript is called **single-threaded**—only one piece of JavaScript code runs at a time.

This behavior is one of the most frequently asked interview topics because it explains why timers, promises, and callbacks sometimes execute **later than their specified delay** if synchronous code is keeping the call stack busy.



Yes, absolutely. That is a good way to define it. You can make it slightly more precise.

### Simple Definition (Easy to Remember)

> **Web APIs are a collection of functionalities provided by the browser that JavaScript can use to perform tasks such as timers, network requests, DOM manipulation, and event handling.**

---

### Interview Definition

> **Web APIs are built-in interfaces and functionalities provided by web browsers. They extend JavaScript by enabling it to perform operations like `setTimeout()`, `fetch()`, DOM manipulation, local storage, and event handling, which are not part of the JavaScript language itself.**

---

### Why are Web APIs needed?

JavaScript (ECMAScript) doesn't know how to:

* Wait 2 seconds.
* Make an HTTP request.
* Access HTML elements.
* Listen for mouse clicks.

The browser provides these capabilities through Web APIs.

For example:

```javascript
setTimeout(() => {
    console.log("Hello");
}, 2000);
```

* `setTimeout()` is a **Web API**.
* The browser handles the timer.
* JavaScript continues executing other code.
* When the timer finishes, the browser notifies JavaScript via the event loop.

---

### Remember this distinction

| JavaScript (ECMAScript) | Browser (Web APIs)   |
| ----------------------- | -------------------- |
| Variables               | `setTimeout()`       |
| Functions               | `fetch()`            |
| Loops                   | `document`           |
| Objects                 | `localStorage`       |
| Arrays                  | `addEventListener()` |

JavaScript provides the **language**, while the browser provides **extra functionalities** through Web APIs.

### One small improvement to your sentence

Instead of saying:

> **"Web APIs are collection of functionalities provided by browser."**

Say:

> **"Web APIs are a collection of functionalities provided by the browser that JavaScript uses to interact with the web environment."**

This version is grammatically correct, technically accurate, and suitable for interviews.



why there is distinction thay primmitive variable will be in stack while non primitive will be in heap ?


This is one of the best questions you can ask about JavaScript memory.

The distinction exists because of **performance and flexibility**.

## Imagine if everything were stored on the stack

Consider this object:

```javascript
let student = {
    name: "Ali",
    age: 20,
    city: "Lahore",
    marks: [90, 80, 70]
};
```

If this entire object were stored on the stack:

* It could be very large.
* The stack would fill up quickly.
* Copying it every time you assign it to another variable or pass it to a function would be very expensive.

For example:

```javascript
let s1 = student;
let s2 = student;
let s3 = student;
```

If objects were stored on the stack, JavaScript would have to create **three complete copies** of the object.

That wastes both memory and time.

---

## Instead, JavaScript stores objects in the heap

Memory looks like this:

```text
Stack                      Heap

student  ----------->      {
                              name: "Ali",
                              age: 20,
                              marks: [...]
                           }
```

The stack only stores a small **reference (memory address)**.

Suppose that address is:

```text
0x100A
```

Then the stack contains:

```text
student = 0x100A
```

Only the object lives in the heap.

---

## Why primitives stay on the stack

Primitive values are very small and have a fixed size.

For example:

```javascript
let age = 25;
```

The number `25` occupies only a few bytes.

It is much faster to keep it directly on the stack.

```text
Stack

age = 25
```

Accessing it is extremely fast.

---

## Why objects cannot stay on the stack

Objects are **dynamic**.

Example:

```javascript
let person = {};
```

Initially:

```text
{}
```

Then you add properties:

```javascript
person.name = "Ali";
person.age = 20;
person.city = "Lahore";
person.phone = "12345";
```

Tomorrow you add:

```javascript
person.email = "abc@gmail.com";
```

The object keeps growing.

The stack is **not designed for memory that keeps changing size**.

The heap is.

---

## Another reason: Function calls

The stack grows and shrinks very quickly.

```javascript
function test() {
    let a = 10;
}

test();
```

After `test()` finishes, its stack frame disappears immediately.

If a huge object were stored in that stack frame, it would disappear too—even if another variable still needed it.

Instead:

```javascript
let person = {
    name: "Ali"
};

function print() {
    console.log(person.name);
}
```

The object remains safely in the heap until nothing references it anymore.

---

## Real-life analogy

Imagine a desk and a warehouse.

### Stack = Your Desk

Your desk is:

* Small
* Very fast to access
* Used for things you're working on right now

You keep:

* Pens
* Notes
* Calculator

These are like **primitive values**.

---

### Heap = Warehouse

The warehouse stores:

* Large boxes
* Furniture
* Equipment

On your desk, you keep only the **warehouse location**.

For example:

```text
Desk

Warehouse Box #25
```

When you need the furniture, you go to Box #25.

The furniture stays in the warehouse.

---

## Why not keep everything in the heap?

Because heap memory is slower to access.

If this code:

```javascript
let a = 10;
let b = 20;
let c = a + b;
```

had to look up every number in the heap, JavaScript would be slower.

Keeping small primitive values on the stack makes execution much faster.

---

## Summary

| Stack                                       | Heap                              |
| ------------------------------------------- | --------------------------------- |
| Fast access                                 | Slightly slower                   |
| Small memory                                | Large memory                      |
| Stores primitive values and references      | Stores objects, arrays, functions |
| Fixed-size values                           | Dynamic-size values               |
| Automatically cleaned when functions return | Managed by the garbage collector  |

### The main reason for the distinction is:

* **Primitive values** are **small, fixed-size, and frequently accessed**, so storing them directly on the stack is fast and efficient.
* **Objects, arrays, and functions** can be **large and change size**, so they are stored in the heap. The stack stores only a small reference to them, making assignments and function calls efficient without copying the entire object.

Question
if it is outside function still it will disapear . i am talking about the context that object store in stack ?

Excellent observation. You've actually found a weakness in the common explanation.

You're asking:

> **"If an object were stored on the stack and declared outside any function (global scope), it wouldn't disappear when a function returns. So why can't objects be stored on the stack?"**

You're right. **The reason is NOT simply that the stack frame disappears.** Global variables live for the lifetime of the program, so that explanation is incomplete.

The real reasons are these:

### 1. Objects are dynamic in size

Consider:

```javascript
let person = {};
```

Initially, the object is tiny.

Then:

```javascript
person.name = "Ali";
person.age = 20;
person.city = "Lahore";
person.phone = "12345";
```

The object keeps growing.

The **stack is designed for fixed-size memory**. Each stack frame has a predictable layout.

Objects don't have a fixed size, so they are much better suited to the **heap**, which is designed for dynamic allocation.

---

### 2. Copying large objects would be expensive

Suppose:

```javascript
let student = {
    name: "Ali",
    marks: [90, 80, 70]
};

let s2 = student;
```

If the object were on the stack, JavaScript would have to copy the **entire object** every time you assign it to another variable or pass it to a function.

Instead, JavaScript copies only a small reference (an address), which is much faster.

---

### 3. Objects can be shared

Example:

```javascript
let obj1 = { name: "Ali" };
let obj2 = obj1;
```

Both variables refer to the same object.

Memory conceptually looks like:

```text
Stack                 Heap

obj1 ----\
           -----> { name: "Ali" }
obj2 ----/
```

If the object itself lived on the stack, sharing it between different variables, functions, and closures would be much more complicated.

---

### Your question about global variables

Suppose:

```javascript
let person = {
    name: "Ali"
};
```

This variable is in the **global scope**, so its reference exists as long as the program runs.

Conceptually:

```text
Global Environment (reference)

person  ---------> Heap Object
```

The object is **still in the heap**.

The **reference** remains because `person` still exists.

If later you do:

```javascript
person = null;
```

Now:

```text
person -----> null
```

The object has no references pointing to it anymore, so the **garbage collector** can eventually free that heap memory.

---

## The key idea

Many beginners hear:

> "Objects are in the heap because stack frames disappear."

That explanation is **only part of the story**.

The more fundamental reasons are:

* The **stack** is optimized for **small, fixed-size, short-lived data** and fast function calls.
* The **heap** is optimized for **large, variable-size, shareable data** that can outlive individual function calls.

So even if an object is global and never disappears during the program's execution, it is **still stored in the heap** because the heap is the appropriate memory area for dynamic objects. The global variable simply holds a reference to that object.



      setTime() ?



Great! `setTimeout()` is one of the most important APIs to understand because it introduces almost every asynchronous JavaScript concept: **Web APIs, Call Stack, Callback Queue, and the Event Loop**.

---

# What is `setTimeout()`?

`setTimeout()` is a **Web API** (provided by the browser, or a similar API provided by Node.js) that executes a callback function **after at least a specified delay**.

**Syntax:**

```javascript
setTimeout(callbackFunction, delayInMilliseconds);
```

Example:

```javascript
setTimeout(() => {
    console.log("Hello");
}, 2000);
```

This means:

> "Run this callback after **at least** 2 seconds."

Notice I said **at least**, not **exactly**.

---

# Is `setTimeout()` a JavaScript function?

This is a common interview question.

The answer is:

* ❌ `setTimeout()` is **not part of the JavaScript language (ECMAScript)**.
* ✅ It is provided by the **browser** (or by **Node.js** in a Node environment).

JavaScript simply knows how to call it.

---

# Step-by-Step Execution

Consider:

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Hello");
}, 3000);

console.log("End");
```

Let's see exactly what happens.

---

## Step 1

JavaScript executes:

```javascript
console.log("Start");
```

Output:

```
Start
```

Call Stack:

```
Call Stack

console.log()
Global Execution Context
```

---

## Step 2

JavaScript encounters:

```javascript
setTimeout(callback, 3000);
```

JavaScript **does not** start the timer itself.

Instead it tells the browser:

> "Please start a 3-second timer. When it's over, let me know."

The browser's Timer Web API starts counting.

```
JavaScript        Browser

setTimeout() ---> Timer (3 sec)
```

---

## Step 3

JavaScript immediately continues.

It executes:

```javascript
console.log("End");
```

Output:

```
Start
End
```

Notice JavaScript never waited.

---

## Step 4

After 3 seconds...

The browser finishes the timer.

Does it immediately execute the callback?

**No.**

It places the callback into the **Callback Queue**.

```
Browser
   │
   ▼
Callback Queue

[ callback ]
```

---

## Step 5

The Event Loop keeps asking:

```
Is the Call Stack empty?
```

If the answer is **No**, it waits.

If **Yes**, it moves the callback to the Call Stack.

```
Callback Queue
      │
      ▼
Call Stack
```

---

## Step 6

Now JavaScript executes:

```javascript
console.log("Hello");
```

Final output:

```
Start
End
Hello
```

---

# Why doesn't it execute after exactly 3 seconds?

Consider this:

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 2000);

for (let i = 0; i < 1e10; i++) {}

console.log("End");
```

Suppose the loop takes **6 seconds**.

Timeline:

```
0 sec   Start
0 sec   Timer starts
2 sec   Browser finishes timer
2 sec   Callback enters queue
2-6 sec JavaScript still busy
6 sec   End
6 sec   Callback executes
```

Output:

```
Start
End
Timer
```

The timer finished at 2 seconds, but the callback had to wait until JavaScript was free.

---

# Common Misconception

Many people think:

```javascript
setTimeout(fn, 2000);
```

means:

> "Execute after exactly 2 seconds."

Wrong.

It means:

> "Wait at least 2 seconds, then execute the callback **when the call stack is empty**."

---

# Delay of 0 ms

```javascript
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");
```

Output:

```
A
C
B
```

Even though the delay is `0`, the callback is still asynchronous because it is queued and waits until the current synchronous code has finished.

---

# Interview Definition

> **`setTimeout()` is a browser (or Node.js) API that schedules a callback function to be executed after a minimum specified delay. Once the delay expires, the callback is placed into the callback (task) queue. The event loop moves it to the call stack only when the call stack is empty.**

---

## Key Points to Remember

* `setTimeout()` is a **Web API**, not part of the JavaScript language itself.
* It is **asynchronous**.
* The timer runs in the browser (or Node.js runtime), not in the JavaScript engine.
* When the timer expires, the callback goes to the **Callback Queue**.
* The **Event Loop** moves the callback to the **Call Stack** only when the stack is empty.
* The delay is a **minimum delay**, not a guarantee of exact execution time.

This understanding forms the foundation for learning the JavaScript event loop and asynchronous programming.






 
    Promise.all()  

    Now you're ready for `Promise.all()`, because you understand:

* ✅ How Promises work
* ✅ `.then()`, `.catch()`, `.finally()`
* ✅ Promise chaining
* ✅ The event loop and microtask queue

Let's build `Promise.all()` from scratch.

---

# What problem does `Promise.all()` solve?

Suppose you need to fetch three independent pieces of data:

* User information
* User posts
* User comments

Each request takes 2 seconds.

If you do them one after another:

```javascript
getUser()
    .then(user => {
        return getPosts();
    })
    .then(posts => {
        return getComments();
    })
    .then(comments => {
        console.log("Everything loaded");
    });
```

Timeline:

```text
User --------2s--------

                 Posts --------2s--------

                                Comments --------2s--------
```

Total time:

```text
2 + 2 + 2 = 6 seconds
```

But these requests don't depend on each other.

Why wait?

They can all start together.

---

# That's why `Promise.all()` exists

Instead of:

```javascript
await getUser();
await getPosts();
await getComments();
```

we do

```javascript
Promise.all([
    getUser(),
    getPosts(),
    getComments()
]);
```

All three start immediately.

Timeline:

```text
User --------2s--------

Posts -------2s--------

Comments ----2s--------
```

Total time:

```text
≈ 2 seconds
```

---

# Syntax

```javascript
Promise.all([
    promise1,
    promise2,
    promise3
]);
```

It accepts

```text
An array of Promises
```

and returns

```text
A NEW Promise
```

This is very important.

It **doesn't return an array**.

It returns **one Promise** whose result will eventually be an array.

---

# Example 1

```javascript
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = Promise.resolve(30);

const combined = Promise.all([p1, p2, p3]);
```

Let's dry-run it.

---

## Step 1

`p1`

```text
Fulfilled
Value = 10
```

`p2`

```text
Fulfilled
Value = 20
```

`p3`

```text
Fulfilled
Value = 30
```

---

## Step 2

JavaScript executes

```javascript
Promise.all([p1, p2, p3]);
```

It creates another Promise.

Initially

```text
combined

State = Pending
```

Think of it like this:

```text
combined

Waiting for

✔ p1
✔ p2
✔ p3
```

---

## Step 3

JavaScript checks:

Has p1 finished?

```text
Yes
```

Has p2 finished?

```text
Yes
```

Has p3 finished?

```text
Yes
```

Since **every Promise** is fulfilled,

the combined Promise becomes

```text
Fulfilled

Value

[
   10,
   20,
   30
]
```

Notice

The value is **one array**.

---

## Step 4

```javascript
combined.then(result => {
    console.log(result);
});
```

Conceptually JavaScript executes

```javascript
callback([
   10,
   20,
   30
]);
```

Therefore

```text
result = [10,20,30]
```

Output

```text
[10,20,30]
```

---

# Visual

```text
P1 → 10
P2 → 20
P3 → 30
  │
  │
  ▼
Promise.all()
  │
  ▼
[
   10,
   20,
   30
]
```

---

# Does it wait?

Yes.

Imagine

```javascript
const p1 = new Promise(resolve => {
    setTimeout(() => resolve("One"),3000);
});

const p2 = new Promise(resolve => {
    setTimeout(() => resolve("Two"),1000);
});
```

Timeline

```text
0s

p1 -------------------3s

p2 -----1s
```

At

```text
1 second
```

only p2 is complete.

Will `Promise.all()` resolve?

**No.**

It is still waiting for p1.

At

```text
3 seconds
```

both are complete.

Now the combined Promise resolves.

Output

```text
["One","Two"]
```

---

# Why is the output in this order?

Notice:

```javascript
Promise.all([p1, p2]);
```

Even though

```text
p2
```

finished first,

output is

```text
[
   "One",
   "Two"
]
```

because JavaScript preserves the **array order**, not the completion order.

Think of it as assigning slots:

```text
Index 0 ← p1

Index 1 ← p2
```

Whenever each Promise finishes, its value is stored in its assigned slot.

---

# What if one Promise rejects?

```javascript
const p1 = Promise.resolve(10);

const p2 = Promise.reject("Database Error");

const p3 = Promise.resolve(30);

Promise.all([p1,p2,p3])
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
```

Dry run

p1

```text
Resolved
```

p2

```text
Rejected
```

The moment p2 rejects,

the combined Promise also rejects.

It does **not** produce

```text
[10, ?, 30]
```

Instead

```text
Combined Promise

Rejected

Reason

"Database Error"
```

Output

```text
Database Error
```

This behavior is called **fail fast**.

> The returned Promise rejects as soon as **any** input Promise rejects.

---

# Destructuring the result

Instead of:

```javascript
Promise.all([p1,p2,p3])
    .then(result => {

        console.log(result[0]);
        console.log(result[1]);
        console.log(result[2]);

    });
```

you'll often see:

```javascript
Promise.all([p1,p2,p3])
    .then(([a,b,c]) => {

        console.log(a);
        console.log(b);
        console.log(c);

    });
```

Here,

```text
result

↓

[
   a,
   b,
   c
]
```

It's just array destructuring.

---

# Mental model

Think of three friends working on different parts of a group project:

```text
Ali     ✔

Sara    ✔

Ahmed   ✔
```

The teacher (`Promise.all`) says:

> "I will wait until **everyone** has finished."

If everyone finishes:

```text
[
   Ali's work,
   Sara's work,
   Ahmed's work
]
```

If even one student doesn't submit:

```text
Rejected
```

No final submission is produced.

---

## Summary

* `Promise.all()` takes **an array of Promises**.
* It starts waiting for **all of them** at the same time.
* It returns **a new Promise**.
* If **all** input Promises fulfill, the new Promise fulfills with an **array of results** in the **same order** as the input array.
* If **any one** input Promise rejects, the new Promise rejects immediately with that error.

A key point is that `Promise.all()` **doesn't make Promises run in parallel**. The Promises start when they're created (or when the functions returning them are called). `Promise.all()` simply waits for all of those already-started asynchronous operations and combines their results into a single Promise.



         promsie.allSettled()


Excellent. Now let's discuss **`Promise.allSettled()`**.

It's very similar to `Promise.all()`, but it solves a different problem.

---

# The Problem

Suppose you have three Promises:

```text
P1 → Success

P2 → Failed

P3 → Success
```

With `Promise.all()`:

```javascript
Promise.all([p1, p2, p3])
```

The result is:

```text
Rejected
```

You **lose the successful results** because one Promise failed.

But sometimes that's not what you want.

For example:

* Upload 10 images.
* Even if 2 uploads fail, you still want to know which 8 succeeded.
* You don't want the entire operation to fail.

That's where `Promise.allSettled()` comes in.

---

# Syntax

```javascript
Promise.allSettled([
    promise1,
    promise2,
    promise3
]);
```

It accepts

```text
An array of Promises
```

and returns

```text
One new Promise
```

---

# Important Difference

`Promise.allSettled()`

**never rejects because one Promise failed.**

Instead,

it waits for **every Promise** to finish.

Then it returns information about each one.

---

# Example 1

```javascript
const p1 = Promise.resolve(10);

const p2 = Promise.resolve(20);

Promise.allSettled([p1, p2])
    .then(result => {
        console.log(result);
    });
```

---

## Dry Run

p1

```text
Resolved
Value = 10
```

p2

```text
Resolved
Value = 20
```

After both finish

JavaScript returns

```javascript
[
    {
        status: "fulfilled",
        value: 10
    },
    {
        status: "fulfilled",
        value: 20
    }
]
```

Output

```text
[
  { status: 'fulfilled', value: 10 },
  { status: 'fulfilled', value: 20 }
]
```

Notice

It **doesn't return**

```javascript
[10,20]
```

Instead it returns **objects** describing each Promise.

---

# Example 2 (One Promise Fails)

```javascript
const p1 = Promise.resolve(10);

const p2 = Promise.reject("Database Error");

const p3 = Promise.resolve(30);

Promise.allSettled([p1,p2,p3])
.then(result=>{
    console.log(result);
});
```

---

## Dry Run

p1

```text
Fulfilled
```

p2

```text
Rejected
```

p3

```text
Fulfilled
```

`Promise.allSettled()` waits for **all three**.

Then returns

```javascript
[
    {
        status: "fulfilled",
        value: 10
    },
    {
        status: "rejected",
        reason: "Database Error"
    },
    {
        status: "fulfilled",
        value: 30
    }
]
```

Notice

It **doesn't call `.catch()`** because the Promise returned by `Promise.allSettled()` itself fulfills with the summary of all results.

---

# Why are there `value` and `reason`?

Remember:

```
resolve(value)
```

stores a **value**.

```
reject(reason)
```

stores a **reason**.

`Promise.allSettled()` reports whichever one exists:

Successful Promise

```javascript
{
    status: "fulfilled",
    value: ...
}
```

Failed Promise

```javascript
{
    status: "rejected",
    reason: ...
}
```

---

# Visual

```text
P1 ✔

P2 ✖

P3 ✔

     │
     ▼
Promise.allSettled()

     ▼

[
   ✔ fulfilled
   ✖ rejected
   ✔ fulfilled
]
```

Unlike `Promise.all()`, nothing is discarded.

---

# Real-world Example

Suppose you're uploading files.

```javascript
Promise.allSettled([
    uploadPhoto(),
    uploadResume(),
    uploadVideo()
])
.then(results => {

    results.forEach(result => {

        if(result.status === "fulfilled"){
            console.log("Uploaded:", result.value);
        }else{
            console.log("Failed:", result.reason);
        }

    });

});
```

Output might be

```text
Uploaded: photo.jpg

Failed: Network Error

Uploaded: video.mp4
```

You get a complete report.

---

# Comparison

Suppose

```text
P1 ✔

P2 ✖

P3 ✔
```

### Promise.all()

```text
↓

Rejected

"Error"
```

Everything stops as soon as one Promise rejects.

---

### Promise.allSettled()

```text
↓

[
  fulfilled,
  rejected,
  fulfilled
]
```

Every Promise is allowed to finish.

---

# Summary Table

| Method                 | Waits for all? | Rejects if one fails? | Result                  |
| ---------------------- | -------------- | --------------------- | ----------------------- |
| `Promise.all()`        | ✅ Yes          | ✅ Yes                 | Array of values         |
| `Promise.race()`       | ❌ No           | First to settle wins  | First value or error    |
| `Promise.allSettled()` | ✅ Yes          | ❌ No                  | Array of status objects |

---

# Mental Model

Imagine three students taking an exam.

```text
Ali      Pass

Sara     Fail

Ahmed    Pass
```

* **`Promise.all()`** is like saying: "If anyone fails, I won't publish the group result."
* **`Promise.race()`** is like saying: "I'll announce the result of whoever finishes first."
* **`Promise.allSettled()`** is like saying: "I'll wait until everyone finishes, then publish each student's result—pass or fail."

---

## Rule to Remember

```text
Promise.all()
        ↓
Need every Promise to succeed

Promise.race()
        ↓
Need the first Promise to finish

Promise.allSettled()
        ↓
Need every Promise's final outcome,
whether it succeeded or failed
```

This makes `Promise.allSettled()` the right choice when you care about **every outcome**, not just whether the entire group succeeded.


      Promise.allSettled
so this gives array of status object to .then



**Yes, exactly!** ✅

`Promise.allSettled()` resolves with **an array of status objects**, and that array is passed to the `.then()` callback.

For example:

```javascript
const p1 = Promise.resolve(10);
const p2 = Promise.reject("Error");
const p3 = Promise.resolve(30);

Promise.allSettled([p1, p2, p3])
    .then(results => {
        console.log(results);
    });
```

When all three Promises have settled, JavaScript conceptually does:

```javascript
callback([
    {
        status: "fulfilled",
        value: 10
    },
    {
        status: "rejected",
        reason: "Error"
    },
    {
        status: "fulfilled",
        value: 30
    }
]);
```

So the parameter:

```javascript
.then(results => {
```

receives:

```javascript
results = [
    {
        status: "fulfilled",
        value: 10
    },
    {
        status: "rejected",
        reason: "Error"
    },
    {
        status: "fulfilled",
        value: 30
    }
]
```

Now you can inspect each result:

```javascript
results.forEach(result => {
    console.log(result.status);

    if (result.status === "fulfilled") {
        console.log(result.value);
    } else {
        console.log(result.reason);
    }
});
```

Output:

```text
fulfilled
10

rejected
Error

fulfilled
30
```

---

### Think of it like this

You already know:

```javascript
resolve(100);
```

↓

```javascript
.then(result => {
    // result = 100
});
```

Now extend that idea:

`Promise.allSettled()` itself is just another Promise. When it finishes, it **resolves** with an array.

Conceptually, it's like it does:

```javascript
resolve([
    { status: "fulfilled", value: 10 },
    { status: "rejected", reason: "Error" },
    { status: "fulfilled", value: 30 }
]);
```

Then JavaScript calls your callback:

```javascript
.then(results => {
    // results is that array
});
```

So yes—the `.then()` parameter receives the **array of status objects**, just like a normal Promise's `.then()` receives whatever value was passed to `resolve()`.



    promise.any()

    Excellent! `Promise.any()` is the last major Promise combinator, and it's often confused with `Promise.race()`. Let's understand it carefully.

---

# What problem does `Promise.any()` solve?

Suppose you have three servers:

```text
Server A
Server B
Server C
```

You only need **one successful response**.

You **don't care if some servers fail**.

You only want the **first successful result**.

That's exactly what `Promise.any()` does.

---

# Syntax

```javascript
Promise.any([
    promise1,
    promise2,
    promise3
]);
```

It takes:

```text
An array of Promises
```

and returns:

```text
One new Promise
```

---

# Example 1

```javascript
const p1 = Promise.reject("Error 1");

const p2 = new Promise(resolve => {
    setTimeout(() => resolve("Success"), 1000);
});

const p3 = Promise.reject("Error 3");

Promise.any([p1, p2, p3])
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
```

---

## Dry Run

Initially

```text
P1 → Rejected

P2 → Pending

P3 → Rejected
```

After 1 second

```javascript
resolve("Success");
```

Now `Promise.any()` resolves.

Output

```text
Success
```

Notice something important:

It **ignored** the failures.

---

# Visual

```text
P1 ❌

P2 ✔

P3 ❌

     │
     ▼

Promise.any()

     ▼

Success
```

---

# Example 2

Suppose

```javascript
const p1 = Promise.reject("Database Error");

const p2 = Promise.reject("Network Error");

const p3 = Promise.resolve(100);

Promise.any([p1,p2,p3])
.then(result=>{
    console.log(result);
});
```

Dry run

P1

```text
Rejected
```

P2

```text
Rejected
```

P3

```text
Fulfilled
Value = 100
```

`Promise.any()` keeps waiting because a success is still possible.

When p3 succeeds

Output

```text
100
```

---

# What if every Promise fails?

```javascript
const p1 = Promise.reject("A");

const p2 = Promise.reject("B");

const p3 = Promise.reject("C");

Promise.any([p1,p2,p3])
.then(result=>{
    console.log(result);
})
.catch(error=>{
    console.log(error);
});
```

Now there are **no successful Promises**.

Only then does `Promise.any()` reject.

The rejection reason is an **AggregateError**, which contains all rejection reasons.

Conceptually:

```javascript
AggregateError([
    "A",
    "B",
    "C"
])
```

You can inspect it:

```javascript
.catch(error => {
    console.log(error.errors);
});
```

Output:

```text
["A", "B", "C"]
```

---

# Why an AggregateError?

Imagine:

```text
P1 ❌ "Database"

P2 ❌ "Timeout"

P3 ❌ "Server Busy"
```

Which error should JavaScript choose?

There are three.

So it wraps them together into one `AggregateError`.

---

# Comparison with `Promise.race()`

This is where many people get confused.

Suppose

```text
P1 → Reject after 1 second

P2 → Resolve after 2 seconds
```

---

### `Promise.race()`

```javascript
Promise.race([p1,p2]);
```

After 1 second

P1 rejects.

The race ends immediately.

Output

```text
Error
```

---

### `Promise.any()`

```javascript
Promise.any([p1,p2]);
```

After 1 second

P1 rejects.

Does it stop?

❌ No.

It keeps waiting because another Promise might still succeed.

After 2 seconds

P2 resolves.

Output

```text
Success
```

This is the biggest difference.

---

# Visual Comparison

Suppose

```text
P1 ❌

P2 ✔

P3 ✔
```

### Promise.race()

```text
First settles

↓

P1

↓

Reject
```

---

### Promise.any()

```text
Ignore failures

↓

First success

↓

P2

↓

Resolve
```

---

# Real-world Example

Suppose your app fetches the same image from multiple CDNs:

```javascript
Promise.any([
    fetchFromCDN1(),
    fetchFromCDN2(),
    fetchFromCDN3()
])
.then(image => {
    display(image);
});
```

If:

* CDN1 fails ❌
* CDN2 fails ❌
* CDN3 succeeds ✅

You still get the image.

You don't care which CDN served it.

---

# Summary Table

| Method                 | Waits for                | Rejects when                                    |
| ---------------------- | ------------------------ | ----------------------------------------------- |
| `Promise.all()`        | All Promises             | Any Promise rejects                             |
| `Promise.race()`       | First Promise to settle  | First settled Promise rejects                   |
| `Promise.allSettled()` | All Promises             | Never rejects because of input Promise failures |
| `Promise.any()`        | First successful Promise | **All** Promises reject                         |

---

# Mental Model

Imagine four job applicants.

```text
Ali     ❌

Sara    ❌

Ahmed   ✅

John    ✅
```

* **`Promise.all()`**: "Everyone must pass."
* **`Promise.race()`**: "I'll pick whoever finishes first, even if they fail."
* **`Promise.allSettled()`**: "I'll wait for everyone and record every outcome."
* **`Promise.any()`**: "I only need the **first person who passes**. I'll ignore failures unless everyone fails."

---

## One-line rule to remember

```text
Promise.all()        → Everyone must succeed.
Promise.race()       → First to settle wins (success or failure).
Promise.allSettled() → Wait for everyone, report every outcome.
Promise.any()        → First success wins; reject only if everyone fails.
```

A useful way to distinguish the last two is:

* **`race()`** asks: **"Who finishes first?"**
* **`any()`** asks: **"Who succeeds first?"**


Promise.race() its is used to check only first promise in Array of promiises ?
Not exactly. That's a very common misunderstanding.

`Promise.race()` **does not check only the first Promise in the array**.

It starts watching **all** the Promises in the array at the same time and settles with **whichever Promise settles first** (whether it resolves or rejects).

### Example

```javascript
const p1 = new Promise(resolve => {
    setTimeout(() => resolve("P1"), 3000);
});

const p2 = new Promise(resolve => {
    setTimeout(() => resolve("P2"), 1000);
});

Promise.race([p1, p2])
    .then(result => {
        console.log(result);
    });
```

Even though `p1` is the **first element** in the array:

```javascript
[p1, p2]
```

the output is:

```text
P2
```

because `p2` **finished first**.

---

### Another example

```javascript
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => reject("P1 Error"), 1000);
});

const p2 = new Promise(resolve => {
    setTimeout(() => resolve("P2 Success"), 3000);
});

Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(error => console.log(error));
```

Output:

```text
P1 Error
```

Why?

Because `p1` **settled first**, and it rejected.

`Promise.race()` doesn't care whether the first settled Promise **resolved** or **rejected**. It simply adopts that result.

---

### Think of it like a real race

Imagine three runners:

```text
Runner A → finishes in 10 seconds

Runner B → finishes in 6 seconds

Runner C → finishes in 8 seconds
```

You write:

```javascript
Promise.race([A, B, C]);
```

Does JavaScript pick **A** because it's first in the array?

❌ No.

It picks **B**, because B crossed the finish line first.

---

### Correct definition

> **`Promise.race()` returns a new Promise that settles with the same value or error as the first Promise in the iterable to settle (resolve or reject).**

The key word is **settle**, not **first in the array**.

So:

* ❌ "It checks only the first Promise in the array."
* ✅ "It watches all the Promises and settles as soon as the first one settles."


**Yes, exactly!** ✅ That's the correct intuition.

`Promise.any()` **keeps waiting until it finds the first fulfilled (resolved) Promise**.

It **ignores rejected Promises** unless **every Promise rejects**.

### Example 1

```javascript
const p1 = Promise.reject("Error 1");

const p2 = new Promise(resolve => {
    setTimeout(() => resolve("Success"), 2000);
});

const p3 = Promise.reject("Error 3");

Promise.any([p1, p2, p3])
    .then(result => {
        console.log(result);
    });
```

### Dry Run

```
P1 → Rejected ❌ (ignored)

P2 → Pending ⏳

P3 → Rejected ❌ (ignored)
```

After 2 seconds:

```
P2 → Fulfilled ✅
```

Now `Promise.any()` resolves.

Output:

```
Success
```

---

## Example 2

```javascript
const p1 = Promise.reject("A");
const p2 = Promise.reject("B");
const p3 = Promise.reject("C");

Promise.any([p1, p2, p3])
    .catch(error => {
        console.log(error.errors);
    });
```

Every Promise rejects.

Now `Promise.any()` has no successful Promise to return, so it rejects with an `AggregateError`.

Output:

```
["A", "B", "C"]
```

---

## Compare `race()` and `any()`

Suppose:

```
P1 → Reject after 1 second ❌

P2 → Resolve after 2 seconds ✅
```

### `Promise.race()`

```
1 second
↓
P1 rejects
↓
race() rejects immediately
```

Output:

```
Error
```

---

### `Promise.any()`

```
1 second
↓
P1 rejects
↓
Ignore it

2 seconds
↓
P2 resolves
↓
any() resolves
```

Output:

```
Success
```

---

## Easy way to remember

* **`Promise.race()`** → **First to settle wins** (resolve **or** reject).
* **`Promise.any()`** → **First to fulfill wins** (ignores rejections until all fail).

So your statement is correct with one small refinement:

> ✅ **`Promise.any()` keeps waiting until it finds the first fulfilled Promise. It ignores rejected Promises unless all of them reject.**



if it finds first fulfilled promise will it check other promisese to

**No.** Once `Promise.any()` finds the **first fulfilled Promise**, the Promise returned by `Promise.any()` is **immediately resolved**. It does **not wait** for the remaining Promises.

Example:

```javascript
const p1 = new Promise(resolve => {
    setTimeout(() => resolve("A"), 3000);
});

const p2 = new Promise(resolve => {
    setTimeout(() => resolve("B"), 1000);
});

const p3 = new Promise(resolve => {
    setTimeout(() => resolve("C"), 2000);
});

Promise.any([p1, p2, p3])
    .then(result => {
        console.log(result);
    });
```

### Timeline

```text
0s

P1 --------3s--------

P2 ----1s----

P3 ------2s------
```

After **1 second**:

```text
P2 fulfills with "B"
```

`Promise.any()` immediately resolves with:

```text
B
```

It **doesn't wait** for `P3` or `P1`.

---

### Do the other Promises stop running?

**No.**

This is an important distinction.

The other Promises **continue executing** because JavaScript Promises **cannot be cancelled** by `Promise.any()`.

Timeline:

```text
1s → P2 fulfills ✅ → Promise.any() resolves

2s → P3 fulfills (ignored)

3s → P1 fulfills (ignored)
```

The results of `P3` and `P1` are simply ignored by `Promise.any()` because it has already settled.

---

### Think of it like a job interview

Three candidates are being interviewed.

```text
Ali    ❌

Sara   ✅

Ahmed  ⏳
```

As soon as **Sara passes**, the company hires her.

Do they wait to see Ahmed's result?

**No.** The hiring decision has already been made.

Ahmed may still finish his interview, but it no longer affects the outcome.

---

### Rule to remember

* `Promise.any()` → **First fulfilled Promise wins.**
* After that, the returned Promise is settled.
* The remaining Promises **keep running**, but their results are ignored.


 Async and Await

 JavaScript async and await
"async and await make promises easier"

The async and await keywords make Promise-based code easier to read.

They let asynchronous code look much like ordinary synchronous code.

Behind the scenes, async and await still use Promises.

The async Keyword
The async keyword before a function makes the function return a promise.

This is true even if you return a normal value.

If the function returns a value, JavaScript automatically wraps that value in a Promise.

// Create an async function
async function hello() {
  return "Hello World!";
}

// Call the async function
hello().then(function(value) {
  myDisplayer(value);
});


The await Keyword
The await keyword waits for a Promise to settle.

It can only be used inside an async function or at the top level of a JavaScript module.

While the async function is waiting, the rest of the program can continue running.

async function getData() {
  let response = await fetch("fetch.txt");
  let text = await response.text();
  myDisplayer(text);
}

// Call the async function
getData();


What Happens During await?
The await keyword pauses only the current async function.

It does not pause JavaScript.

Other code, timers, events, and user interactions can continue while the Promise is pending.

`async` and `await` are JavaScript features that make it easier to work with asynchronous operations, such as fetching data from an API, reading files, or waiting for timers. They are built on top of **Promises**, but provide a cleaner, more readable syntax.

## What is Asynchronous Programming?

JavaScript is single-threaded, but it can perform tasks asynchronously. This means it doesn't have to wait for a long-running task (like an API request) to finish before continuing with other code.

Example without async:

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Done");
}, 2000);

console.log("End");
```

**Output:**

```
Start
End
Done
```

---

## What is `async`?

The `async` keyword is used before a function declaration. It makes the function always return a Promise.

Example:

```javascript
async function greet() {
  return "Hello!";
}

greet().then(message => console.log(message));
```

**Output:**

```
Hello!
```

This is equivalent to:

```javascript
function greet() {
  return Promise.resolve("Hello!");
}
```

---

## What is `await`?

The `await` keyword pauses the execution of an `async` function until a Promise is resolved or rejected.

Example:

```javascript
function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
}

async function getData() {
  console.log("Fetching...");
  const result = await fetchData();
  console.log(result);
}

getData();
```

**Output:**

```
Fetching...
(wait 2 seconds)
Data received
```

---

## Example with `fetch()`

```javascript
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    const users = await response.json();

    console.log(users);
  } catch (error) {
    console.log("Error:", error);
  }
}

getUsers();
```

Here:

* `await fetch(...)` waits for the HTTP response.
* `await response.json()` waits for the JSON conversion.
* `try...catch` handles any errors.

---

## Error Handling

Use `try...catch` inside `async` functions.

```javascript
async function example() {
  try {
    throw new Error("Something went wrong");
  } catch (error) {
    console.log(error.message);
  }
}

example();
```

**Output:**

```
Something went wrong
```

---

## Running Multiple Async Operations

Sequential execution:

```javascript
const a = await fetch(url1);
const b = await fetch(url2);
```

Parallel execution (faster when tasks are independent):

```javascript
const [a, b] = await Promise.all([
  fetch(url1),
  fetch(url2)
]);
```

`Promise.all()` starts both requests at the same time and waits until both finish.

---

## Advantages of `async`/`await`

* Cleaner and more readable code.
* Avoids deeply nested callbacks ("callback hell").
* Makes asynchronous code look like synchronous code.
* Easier error handling with `try...catch`.
* Works seamlessly with Promises.

---

## Key Points

* `async` makes a function return a Promise.
* `await` can only be used inside an `async` function (or at the top level in ES modules).
* `await` pauses only the current `async` function, **not** the entire JavaScript program.
* Use `try...catch` to handle errors.
* Use `Promise.all()` when multiple independent asynchronous tasks can run in parallel.

### Summary Table

| Keyword       | Purpose                                                                     |
| ------------- | --------------------------------------------------------------------------- |
| `async`       | Declares a function that returns a Promise.                                 |
| `await`       | Waits for a Promise to settle before continuing execution.                  |
| `Promise`     | Represents the eventual completion or failure of an asynchronous operation. |
| `try...catch` | Handles errors from awaited Promises.                                       |

`async`/`await` is the modern and recommended way to write asynchronous JavaScript because it makes code easier to read, maintain, and debug compared to using chained `.then()` and `.catch()` calls.



function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
}

async function getData() {
  console.log("Fetching...");
  const result = await fetchData();
  console.log(result);
}

getData();
VM81:10 Fetching...
Promise {<pending>}
VM81:12 Data received
function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
}

async function getData() {
  console.log("Fetching...");
  const result = await fetchData();
  console.log(result);
}

getData();
VM83:10 Fetching...
Promise {<pending>}
VM83:12 Data received
function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
}

async function getData() {
  console.log("Fetching...");
  const result = await fetchData();
  console.log(result);
}

getData();
VM85:10 Fetching...
Promise {<pending>}
VM85:12 Data received
function fetchData() {
  return new Promise(resolve,reject) => {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
}

async function getData() {
  console.log("Fetching...");
  const result = await fetchData();
  console.log(result);
}

getData();
VM96:2 Uncaught SyntaxError: Malformed arrow function parameter list
function fetchData() {
  return new Promise(() => {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
}

async function getData() {
  console.log("Fetching...");
  const result = await fetchData();
  console.log(result);
}

getData();
VM104:10 Fetching...
Promise {<pending>}
VM104:4 Uncaught ReferenceError: resolve is not defined
    at <anonymous>:4:7
(anonymous) @ VM104:4
setTimeout
(anonymous) @ VM104:3
fetchData @ VM104:2
getData @ VM104:11
(anonymous) @ VM104:15
function fetchData() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
}

async function getData() {
  console.log("Fetching...");
  const result = await fetchData();
  console.log(result);
}

getData();
VM131:10 Fetching...
Promise {<pending>}
VM131:12 Data received
function fetchData() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
}

async function getData() {
  console.log("Fetching...");
  const result = await fetchData();
  console.log(result);
}
console.log("Huzaifa")
getData();
VM178:14 Huzaifa
VM178:10 Fetching...
Promise {<pending>}
VM178:12 Data received
function fetchData() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
}

async function getData() {
  console.log("Fetching...");
  const result = await fetchData();
    console.log("Huzaifa")
  console.log(result);
}

getData();

VM187:10 Fetching...
Promise {<pending>}
VM187:12 Huzaifa
VM187:13 Data received




Yes, **most of the time `await` is used inside an `async` function**.

Here's the relationship:

* **`async`** marks a function as asynchronous.
* **`await`** pauses execution inside that `async` function until a Promise is resolved.

Example:

```javascript
async function getMessage() {
  const result = await Promise.resolve("Hello");
  console.log(result);
}

getMessage();
```

In this example:

* `async` is written before `getMessage()`.
* `await` is written inside `getMessage()`.

### Can `async` exist without `await`?

Yes.

```javascript
async function greet() {
  return "Hello";
}
```

This is valid. The function still returns a Promise even though it doesn't use `await`.

### Can `await` exist without `async`?

Usually **no**.

This will cause an error:

```javascript
function greet() {
  const result = await Promise.resolve("Hello"); // ❌ Error
}
```

`await` can only be used:

* Inside an `async` function, or
* At the top level of an ES module (a more advanced JavaScript feature).

### Simple rule to remember

* ✅ `async` → can be used **with or without** `await`.
* ✅ `await` → normally **must be inside** an `async` function.

Think of it like this: **`async` creates a room where `await` is allowed to work.**





**do both async and await arewritten in same function**

Great question.

When an `async` function returns a Promise, it returns it **to the code that called the function**.

For example:

```javascript
async function greet() {
  return "Hello";
}

const result = greet();

console.log(result);
```

**Output:**

```text
Promise { "Hello" }
```

Here:

* `greet()` is called.
* Instead of returning `"Hello"` directly, it returns a **Promise** to the caller (`result`).

The caller can receive the value in two ways.

### Using `.then()`

```javascript
async function greet() {
  return "Hello";
}

greet().then(message => {
  console.log(message);
});
```

**Output:**

```text
Hello
```

---

### Using `await`

```javascript
async function greet() {
  return "Hello";
}

async function main() {
  const message = await greet();
  console.log(message);
}

main();
```

**Output:**

```text
Hello
```

### Flow of execution

```text
Caller
   │
   │ calls greet()
   ▼
async function greet()
   │
   │ return "Hello"
   ▼
JavaScript automatically wraps it into
Promise.resolve("Hello")
   │
   ▼
Promise is returned to the caller
```

So, **`async` does not return the Promise to `await`**. It returns the Promise to **whoever called the function**. Then the caller can either:

* use `.then()` to get the value, or
* use `await` (inside another `async` function) to wait for the Promise to resolve.

This automatic wrapping is why these two functions are equivalent:

```javascript
async function greet() {
  return "Hello";
}
```

and

```javascript
function greet() {
  return Promise.resolve("Hello");
}
```

Both return a Promise to the calling code.
