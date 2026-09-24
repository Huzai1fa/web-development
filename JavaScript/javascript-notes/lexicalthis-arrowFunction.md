**Lexical scope** in JavaScript means that the scope (where variables can be accessed) is determined by **where the code is written**, not where it is executed.

The word **"lexical"** means **related to the text/code structure**. JavaScript looks at the physical location of your code to decide which variables are available.

### Example:

```js
const name = "Ali";

function greet() {
  console.log(name);
}

greet(); // Ali
```

The function `greet()` can access `name` because `name` is written outside the function but in its surrounding scope.

JavaScript says:

> "Where was `greet` created? It was created inside the scope that has `name`, so it can use it."

---

### Nested example:

```js
function outer() {
  const message = "Hello";

  function inner() {
    console.log(message);
  }

  inner();
}

outer(); // Hello
```

`inner()` can access `message` because it was **defined inside `outer()`**.

The structure looks like:

```
Global Scope
 └── outer()
      ├── message
      └── inner()
           └── can access message
```

This is lexical scope.

---

### Important: where you call a function does not matter

Example:

```js
const name = "Global";

function showName() {
  console.log(name);
}

function another() {
  const name = "Local";
  showName();
}

another(); // Global
```

Many beginners expect:

```
another() → name = "Local"
```

But JavaScript does not work that way.

`showName()` was **created in the global scope**, so it looks for `name` there.

Output:

```
Global
```

This is lexical scoping.

---

### Connection with lexical `this`

The same idea applies to arrow functions:

```js
const person = {
  name: "Ali",

  sayHello() {
    const arrow = () => {
      console.log(this.name);
    };

    arrow();
  }
};

person.sayHello(); // Ali
```

The arrow function gets `this` from where it was **created** (`sayHello`), not from how it was called.

So:

* **Lexical scope** → variables come from where the function is written.
* **Lexical `this`** → `this` comes from where the arrow function is written.

A simple way to remember:

> **Lexical = look at the code location, not the execution location.**

Sure. The problem is basically this:

**Regular functions forget who "owned" them when they are used later.**

Imagine `this` means **"the person who called me"**.

### Example:

```js
const person = {
  name: "Ali",

  sayHello: function () {
    console.log(this.name);
  }
};

person.sayHello(); 
```

When we call:

```js
person.sayHello();
```

JavaScript thinks:

> "The person calling this function is `person`, so `this` is `person`."

Output:

```
Ali
```

---

Now look at this:

```js
const person = {
  name: "Ali",

  sayHello: function () {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  }
};

person.sayHello();
```

You might think:

> "The function is inside `person`, so `this` should be `person`."

But JavaScript doesn't care where the function is written. It cares **who calls it**.

After 1 second, `setTimeout` calls the function:

```js
function () {
  console.log(this.name);
}
```

The caller is now the timer, not `person`.

So JavaScript says:

> "The timer called me, so `this` belongs to the timer."

There is no `name` property there.

Output:

```
undefined
```

---

### The problem in one sentence:

You wanted:

```
person → function → this.name
```

but JavaScript did:

```
timer → function → this.name
```

The connection to `person` was lost.

---

### Arrow functions solve it:

```js
const person = {
  name: "Ali",

  sayHello: function () {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};

person.sayHello();
```

The arrow function says:

> "I won't create my own `this`. I will keep the `this` from my parent function."

So:

```
person
  |
  ↓
sayHello()  ← this = person
  |
  ↓
arrow function ← uses the same this
```

Output:

```
Ali
```

A simple analogy:

* **Normal function:** "Who is calling me right now?" decides `this`.
* **Arrow function:** "Who was around when I was created?" decides `this`.


Question 
so arrow function solved problem for setTimeout function.
Yes, exactly. **Arrow functions solved one of the most common `this` problems with functions like `setTimeout`, event handlers, and callbacks.**

But remember: **arrow functions did not fix `setTimeout` itself**. They fixed the problem of **losing `this` inside a callback**.

Let's compare.

### Before arrow functions (problem)

```js
const user = {
  name: "Ali",

  sayHello: function () {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  }
};

user.sayHello();
```

What we expect:

```
Ali
```

But we get:

```
undefined
```

Why?

Step by step:

1. `user.sayHello()` runs.
2. Inside it, `setTimeout` receives a function.
3. After 1 second, `setTimeout` calls that function.
4. The function is called by the timer, not by `user`.
5. So `this` is no longer `user`.

The connection is lost.

---

### Arrow function solution

```js
const user = {
  name: "Ali",

  sayHello: function () {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};

user.sayHello();
```

Now:

1. `user.sayHello()` runs.
2. Inside `sayHello`, `this` is `user`.
3. The arrow function says:

   > "I don't create my own `this`; I will use my parent's `this`."
4. It remembers `user`.

Output:

```
Ali
```

---

A simple picture:

### Normal function:

```
user
 |
sayHello()
 |
setTimeout()
 |
normal function
 |
this = timer ❌
```

### Arrow function:

```
user
 |
sayHello()
 |
this = user
 |
arrow function
 |
uses same this ✅
```

---

This is why you often see:

```js
setTimeout(() => {
  this.doSomething();
}, 1000);
```

instead of:

```js
setTimeout(function () {
  this.doSomething();
}, 1000);
```

because the arrow function keeps the `this` from the surrounding code.



**Regular functions forget who "owned" them when they are used later.**  what does mean by use letter
eska kya matlab hai zara achey sey mesal sy wazeh krein

Is jumlay mein **"used later"** ka matlab hai function ko **baad mein kisi doosri jagah execute (chalaana)** — jaise kisi variable mein store karke baad mein call karna, ya `setTimeout` / Event Listener mein as a callback pass kar dena.

JavaScript mein regular functions ko yeh yaad nahi rehta ke unka original "owner" (kaunsa object) tha. Unka `this` keyword is baat par depend karta hai ke unhein **kall kaise kiya gaya hai**, na ke is baat par ke wo **kahan bane the**.

---

### Misal (Example)

Maan lijiye hamare paas ek object hai:

```javascript
const user = {
  name: "Ali",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};

```

#### 1. Jab hum isey direct call karte hain:

```javascript
user.greet(); 
// Output: Hello, Ali
// Yahan `this` -> `user` hai kyunki humne direct `user.greet()` call kiya.

```

#### 2. Jab hum isey "Use Later" karte hain (Khabar/Problem):

Jab hum function ko object se alag karke baad mein chalate hain, toh yeh apna owner bhool jata hai:

```javascript
// Case A: Variable mein store karke baad mein chalana
const myFunc = user.greet; // Function reference ko alag kar liya

myFunc(); 
// Output: Hello, undefined ❌
// Kyunki `myFunc()` ko call karte waqt aage `user.` nahi tha, isne apna owner bhool diya!

```

```javascript
// Case B: setTimeout mein baad mein chalana
setTimeout(user.greet, 1000);
// Output (1 sec baad): Hello, undefined ❌
// `setTimeout` ne function ko baad mein chalaya, lekin function ko nahi pata ke `this.name` kis ka hai.

```

---

### Iska Solution Kya Hai?

1. **Arrow Functions Use Karein:** Arrow functions ka apna `this` nahi hota, wo apne surrounding (parent) scope se `this` le lete hain aur kabhi owner nahi bhooltay.
2. **`.bind()` Method Use Karein:** Function ke saath `.bind(user)` laga kar usko uska owner zabardasti yaad dila diya jata hai:

```javascript
const myFunc = user.greet.bind(user); // Forcefully owner set kar diya
myFunc(); // Output: Hello, Ali ✅

```




Arrow functions aur regular functions mein `this` ko handle karne ka tareeqa bilkul mukhtalif hai.

---

### 1. Regular Function (Dynamic `this`)

Regular function mein `this` is baat par depend karta hai ke function **chala (call) kaise gaya hai**.

Jb aap kisi regular function ko callback (jaise `setTimeout` ya array methods) ke andar use karte hain, toh wo apna `this` kho deta hai:

```javascript
const user = {
  name: "Ali",
  hobbies: ["Coding", "Gaming"],
  showHobbies: function() {
    // Yahan tak `this` -> `user` hai
    this.hobbies.forEach(function(hobby) {
      // ❌ Regular inner function ka apna alag `this` hota hai!
      console.log(this.name + " loves " + hobby);
    });
  }
};

user.showHobbies();
// Output: 
// undefined loves Coding ❌
// undefined loves Gaming ❌

```

---

### 2. Arrow Function (Lexical `this`)

Arrow function ka **apna koi `this` nahi hota**. Yeh apne bilkul bahar wale (parent) scope se `this` borrow kar leta hai. Isey **Lexical Binding** kehte hain.

```javascript
const user = {
  name: "Ali",
  hobbies: ["Coding", "Gaming"],
  showHobbies: function() {
    // ✅ Arrow function ne showHobbies() ka `this` (jo ke `user` hai) inherit kar liya
    this.hobbies.forEach((hobby) => {
      console.log(this.name + " loves " + hobby);
    });
  }
};

user.showHobbies();
// Output: 
// Ali loves Coding ✅
// Ali loves Gaming ✅

```

---

### Mukhtasir Muqabla (Comparison Table)

| Feature | Regular Function | Arrow Function |
| --- | --- | --- |
| **`this` Behavior** | **Dynamic** (kisne call kiya us par depend karta hai) | **Lexical** (parent scope se milta hai) |
| **Callbacks mein** | Owner bhool jata hai (`undefined` ho jata hai) | Parent ka `this` yaad rakhta hai |
| **`.bind() / .call()`** | `this` ko change kar sakte hain | `this` fix rehta hai, change nahi ho sakta |
| **`new` Keyword** | Constructor ke tor par use ho sakta hai | Constructor nahi ban sakta |

---

### ⚠️ Ek Aam Galti (Common Mistake)

Directly object ka main method Arrow function se na banayein:

```javascript
const user = {
  name: "Ali",
  // ❌ Galti: Directly object method ko arrow function banana
  greet: () => {
    console.log("Hello, " + this.name);
  }
};

user.greet(); 
// Output: Hello, undefined ❌
// Yahan Arrow function ka parent scope Object nahi balke Global (Window) Scope hai!

```

**Asaan Usool (Rule of Thumb):**

* **Object ke Main Methods** banane ke liye: **Regular Function** use karein.
* **Callbacks** (jaise `setTimeout`, `.map()`, `.forEach()`) ke liye: **Arrow Function** use karein.



Quesuion *****
const user = {
  name: "Ali",
  // ❌ Galti: Directly object method ko arrow function banana
  greet: () => {
    console.log("Hello, " + this.name);
  }
};

user.greet();

kya within object this us object to refer nhey krta hota ?

**Nahi, Object literal (`{}`) apne aap mein koi scope nahi banata.** Is wajah se object ke andar direct Arrow function likhne par `this` us object ko refer nahi karta.

JavaScript mein `this` aur scope sirf **Functions** (aur Global Context) se tay hote hain, Object ki curly braces `{}` se nahi.

---

### Iski Wajah (Why this happens)

Jab aap object banate hain:

```javascript
// 1. Yahan Global Scope hai (jahan 'this' -> Window / Global Object hai)

const user = { // ❌ Object literal koi scope create nahi karta!
  name: "Ali",
  greet: () => {
    // 2. Arrow function apne parent scope ko dhoondta hai.
    // Kyunki 'user' object koi scope nahi hai, yeh seedha Global Scope se 'this' utha leta hai.
    console.log(this.name); 
  }
};

```

Arrow function ka asool hai: **"Mere sab se nazdeeki Function ya Global Scope ka `this` mera `this` hoga."**

Kyunki object ke paas apna koi scope nahi hota, Arrow function object ko cross karke seedha **Global Scope** mein chala jata hai.

---

### Comparison: Regular vs Arrow Function in Object

| Code Type | Scope / Call Mechanism | `this` Ka Matlab |
| --- | --- | --- |
| **Regular Function** `greet: function() {}` | Jab aap `user.greet()` call karte hain, toh dot (`.`) ke baayein (left) taraf wala object `this` ban jata hai. | `user` Object |
| **Arrow Function** `greet: () => {}` | Iska `this` definition ke waqt tay hota hai. Isne dekha ke mere bahar sab se nazdeeki scope Global hai. | `Window` / Global Object |

---

### Phir Arrow Function Object ke andar kab kaam karta hai?

Agar Arrow function kisi **doosray function ke andar** mojood ho, tab wo apne parent function ka `this` le sakta hai:

```javascript
const user = {
  name: "Ali",
  hobbies: ["Coding", "Gaming"],
  
  // Regular Function (Iska 'this' -> user hai)
  showHobbies: function() {
    
    // Arrow Function (Yeh apne parent function 'showHobbies' ka 'this' lega)
    this.hobbies.forEach((hobby) => {
      console.log(this.name + " loves " + hobby); // ✅ Ali loves Coding
    });
  }
};

user.showHobbies();

```

### Khulasa (Summary)

* `{}` (Object literal) scope nahi hota, is liye Arrow function object par rukne ki bajaye us se bahar nikal jata hai.
* Directly object methods ke liye hamesha **Regular Function** (ya ES6 shorthand `greet() {}`) ka istemal karein.




***When used inside an object method, this refers to the object.
esko wazeh  krein***



Is jumlay ka matlab hai: **Jab kisi object ke method (regular function) ke andar `this` likha jata hai, toh `this` us pure object ki taraf ishara karta hai.**

Pehle samajhte hain ke **Method** kya hota hai:
Jab koi function kisi object ke andar ek property ke tor par rakha jaye, toh us function ko hum **Method** kehte hain.

---

### Code ki madad se samajhte hain:

```javascript
const student = {
  name: "Sara",
  age: 20,
  
  // Yeh 'getDetails' ek Method hai
  getDetails: function() {
    // Yahan 'this' ka matlab poora 'student' object hai
    console.log("Name:", this.name);
    console.log("Age:", this.age);
  }
};

student.getDetails();

```

**Is code mein kya ho raha hai?**

1. Jab humne `student.getDetails()` ko call kiya, toh JavaScript ne dekha ke `getDetails` method kis object ke saath call ho raha hai.
2. Kyunki dot (`.`) ke pehle `student` likha tha, is liye method ke andar `this` **`student` object** ban gaya.
3. `this.name` ka wahi matlab ban gaya jo `student.name` ka hai (yani `"Sara"`).
4. `this.age` ka wahi matlab ban gaya jo `student.age` ka hai (yani `20`).

---

### `this` Use Karne Ka Fayedah Kya Hai?

Aap soch rahe honge ke hum direct `student.name` bhi toh likh sakte the, phir `this.name` kyun likha?

1. **Flexible Reusability:**
Agar hum object ka naam badal dein, ya object ko kisi aur variable ko assign kar dein, toh `this` khud-ba-khud naye naam ke saath set ho jaye ga.
2. **Dusre Methods ko Call karna:**
Aap object ke andar se hi apne doosray methods ko bhi `this` ki madad se call kar sakte hain:

```javascript
const calculator = {
  num1: 10,
  num2: 5,

  add: function() {
    return this.num1 + this.num2;
  },

  showResult: function() {
    // Apne hi doosre method 'add()' ko call karna
    const sum = this.add(); 
    console.log("Total is:", sum);
  }
};

calculator.showResult(); // Output: Total is: 15

```

---

### Asaan Usool (Golden Rule)

Jab bhi aap Regular Method call karte hain:


$$\text{object}.\text{method}()$$

Dot (`.`) ke **left-side** par jo bhi object likha hoga, method ke andar `this` hamesha **wahi object** hoga.