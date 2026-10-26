In JavaScript, **`Promise.prototype.finally()`** is used when you want some code to run **after a Promise has finished**, regardless of whether the Promise was **fulfilled (success)** or **rejected (failure)**.

Think of it as:

> **“No matter what happens, do this at the end.”**

---

# 1. Basic idea

A Promise normally has:

```javascript
promise
  .then(...)
  .catch(...)
```

For example:

```javascript
fetch("/users")
  .then(response => {
    console.log("Success");
  })
  .catch(error => {
    console.log("Error");
  });
```

If you want some code to execute in **both cases**, you can use `finally()`:

```javascript
fetch("/users")
  .then(response => {
    console.log("Success");
  })
  .catch(error => {
    console.log("Error");
  })
  .finally(() => {
    console.log("Request finished");
  });
```

Whether the request succeeds or fails:

```text
Success
   ↓
finally()

OR

Error
   ↓
finally()
```

---

# 2. Why do we need `finally()`?

Suppose you're showing a loading spinner while an API request is running.

```javascript
showLoading();

fetch("/users")
  .then(response => {
    console.log("Data received");
  })
  .catch(error => {
    console.log("Something went wrong");
  })
  .finally(() => {
    hideLoading();
  });
```

The important point is:

* If request succeeds → hide loading
* If request fails → hide loading
* We don't want to write `hideLoading()` twice.

Without `finally()`:

```javascript
showLoading();

fetch("/users")
  .then(response => {
    console.log("Success");
    hideLoading();
  })
  .catch(error => {
    console.log("Error");
    hideLoading();
  });
```

There is duplicate code.

With `finally()`:

```javascript
showLoading();

fetch("/users")
  .then(response => {
    console.log("Success");
  })
  .catch(error => {
    console.log("Error");
  })
  .finally(() => {
    hideLoading();
  });
```

Much cleaner.

---

# 3. `finally()` runs for both success and failure

Consider:

```javascript
Promise.resolve("Hello")
  .then(value => {
    console.log(value);
  })
  .finally(() => {
    console.log("Finally");
  });
```

Output:

```text
Hello
Finally
```

Now rejection:

```javascript
Promise.reject("Something went wrong")
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    console.log("Finally");
  });
```

Output:

```text
Something went wrong
Finally
```

So:

```text
Promise fulfilled ──→ then() ──→ finally()
                         │
                         ↓
                      continue

Promise rejected ──→ catch() ──→ finally()
                          │
                          ↓
                       continue
```

---

# 4. `finally()` doesn't receive the result

This is an important difference.

With `then()`:

```javascript
Promise.resolve("Hello")
  .then(value => {
    console.log(value);
  });
```

`then()` receives:

```javascript
"Hello"
```

With `catch()`:

```javascript
Promise.reject("Error")
  .catch(error => {
    console.log(error);
  });
```

`catch()` receives:

```javascript
"Error"
```

But `finally()` doesn't normally receive either one:

```javascript
Promise.resolve("Hello")
  .finally(value => {
    console.log(value);
  });
```

Output:

```text
undefined
```

Why?

Because `finally()` is intended for **cleanup**, not for processing the result.

For example:

```javascript
fetch("/users")
  .then(data => {
    // Process successful result
  })
  .catch(error => {
    // Process error
  })
  .finally(() => {
    // Cleanup
  });
```

---

# 5. Real-world example: loading indicator

This is one of the most common uses.

```javascript
async function getUsers() {
  showLoading();

  fetch("/api/users")
    .then(response => response.json())
    .then(users => {
      console.log(users);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      hideLoading();
    });
}
```

The loading indicator should disappear whether the API succeeds or fails.

That's exactly what `finally()` is designed for.

---

# 6. `finally()` does not mean "the Promise succeeded"

This is a very common misunderstanding.

Consider:

```javascript
Promise.reject("Failed")
  .finally(() => {
    console.log("Finished");
  });
```

`finally()` runs, but the Promise is still rejected.

So:

```text
finally() ≠ success
```

It means:

```text
finally() = the previous Promise has settled
```

A Promise can be in three conceptual states:

```text
             Promise
                |
        ┌───────┴────────┐
        ↓                ↓
   Fulfilled          Rejected
        |                |
       then            catch
        \                /
         \              /
          ── finally ──
```

Technically, `finally()` runs when the Promise becomes **settled**, meaning it is either fulfilled or rejected.

---

# 7. `finally()` doesn't change the original result by itself

This is another important concept.

```javascript
Promise.resolve(10)
  .finally(() => {
    console.log("Cleanup");
  })
  .then(value => {
    console.log(value);
  });
```

Output:

```text
Cleanup
10
```

The value `10` passes through `finally()`.

Similarly:

```javascript
Promise.reject("Error")
  .finally(() => {
    console.log("Cleanup");
  })
  .catch(error => {
    console.log(error);
  });
```

Output:

```text
Cleanup
Error
```

So normally:

```text
value → finally → same value
error → finally → same error
```

---

# 8. Very important: throwing an error inside `finally()`

Here's where `finally()` becomes more interesting.

```javascript
Promise.resolve("Hello")
  .finally(() => {
    throw new Error("Something went wrong in finally");
  })
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    console.log(error.message);
  });
```

Output:

```text
Something went wrong in finally
```

Why?

Because `finally()` itself can cause the resulting Promise to become rejected.

Conceptually:

```text
Original Promise
      ↓
  "Hello"
      ↓
 finally()
      ↓
 throws error
      ↓
 resulting Promise = rejected
```

So `finally()` normally preserves the previous result, **unless the `finally()` callback throws or returns a rejected Promise**.

---

# 9. Returning a normal value from `finally()`

This is another important detail.

```javascript
Promise.resolve("Hello")
  .finally(() => {
    return "Something else";
  })
  .then(value => {
    console.log(value);
  });
```

Output:

```text
Hello
```

Not:

```text
Something else
```

This surprises many beginners.

Normally, the value returned by `finally()` is ignored.

```javascript
Promise.resolve("A")
  .finally(() => {
    return "B";
  })
  .then(value => console.log(value));
```

Output:

```text
A
```

The original value passes through.

---

# 10. But returning a rejected Promise from `finally()` is different

For example:

```javascript
Promise.resolve("Hello")
  .finally(() => {
    return Promise.reject("New error");
  })
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    console.log(error);
  });
```

Output:

```text
New error
```

The rejected Promise returned by `finally()` replaces the previous outcome.

So there are three useful cases:

### Normal return

```javascript
.finally(() => {
  return "anything";
})
```

Original result normally continues.

### Throwing

```javascript
.finally(() => {
  throw new Error("Error");
})
```

The resulting Promise becomes rejected.

### Returning rejected Promise

```javascript
.finally(() => {
  return Promise.reject("Error");
})
```

The resulting Promise becomes rejected.

---

# 11. `finally()` and `then()` are different

Compare:

```javascript
promise.then(() => {
  console.log("Done");
});
```

and:

```javascript
promise.finally(() => {
  console.log("Done");
});
```

`then()` is generally used for **handling a successful result**.

`finally()` is generally used for **cleanup that should happen regardless of success/failure**.

For example:

```javascript
fetch("/api/users")
  .then(response => {
    console.log("Process data");
  })
  .catch(error => {
    console.log("Handle error");
  })
  .finally(() => {
    console.log("Stop loading");
  });
```

Think:

```text
then()     → What should I do if successful?
catch()    → What should I do if there is an error?
finally()  → What should I do either way?
```

---

# 12. `finally()` with `async/await`

You can use `finally()` with normal Promise chains **and** with `try/catch/finally`.

For `async/await`, you usually write:

```javascript
async function getData() {
  try {
    const response = await fetch("/api/users");
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Request finished");
  }
}
```

This `finally` belongs to JavaScript's `try/catch/finally` syntax, but it serves a very similar cleanup purpose.

The structure is:

```javascript
try {
    // Try something
}
catch (error) {
    // Handle error
}
finally {
    // Always execute
}
```

---

# 13. Promise `.finally()` vs `try...finally`

These are related but not exactly the same syntax.

### Promise version

```javascript
fetch("/users")
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    console.log("Finished");
  });
```

### `async/await` version

```javascript
async function getUsers() {
  try {
    const data = await fetch("/users");
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Finished");
  }
}
```

Both are useful for cleanup.

---

# 14. Common practical uses

`finally()` is particularly useful for:

### Loading states

```javascript
setLoading(true);

fetch("/api/data")
  .then(response => response.json())
  .then(data => {
    displayData(data);
  })
  .catch(error => {
    showError(error);
  })
  .finally(() => {
    setLoading(false);
  });
```

### Closing a connection

```javascript
connect()
  .then(() => {
    console.log("Connected");
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    closeConnection();
  });
```

### Cleaning resources

```javascript
doSomething()
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    cleanup();
  });
```

### Removing temporary UI

```javascript
showModal();

saveData()
  .then(() => {
    console.log("Saved");
  })
  .catch(() => {
    console.log("Failed");
  })
  .finally(() => {
    hideModal();
  });
```

---

# 15. A complete example

Let's say we're downloading a file:

```javascript
function downloadFile() {
  showLoading();

  fetch("/file.pdf")
    .then(response => {
      if (!response.ok) {
        throw new Error("Download failed");
      }

      return response.blob();
    })
    .then(file => {
      console.log("File downloaded");
    })
    .catch(error => {
      console.log("Error:", error.message);
    })
    .finally(() => {
      hideLoading();
      console.log("Download operation finished");
    });
}
```

Possible success:

```text
File downloaded
Download operation finished
```

Possible failure:

```text
Error: Download failed
Download operation finished
```

Notice that:

```javascript
hideLoading();
```

doesn't need to appear in both `.then()` and `.catch()`.

That's the main purpose of `finally()`.

---

# 16. The easiest way to remember it

Imagine you are making tea:

```text
Start making tea
      ↓
   Success?
    /    \
  Yes     No
   ↓       ↓
Drink    Handle problem
   \       /
    \     /
     ↓   ↓
   Clean the kitchen
```

The cleaning happens **regardless of whether the tea-making succeeded**.

That's `finally()`.

In programming terms:

```javascript
promise
  .then(success)
  .catch(error)
  .finally(cleanup);
```

### Remember this rule:

> **`.then()` → success handling**
> **`.catch()` → error handling**
> **`.finally()` → cleanup / code that should run either way**

And one especially important point:

> **`finally()` does not mean the Promise succeeded. It means the Promise has finished settling, and the cleanup code should run.**
