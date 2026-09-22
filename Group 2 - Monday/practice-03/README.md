# Practice 3

Build a small attendance register from an array of student objects. The array is the source of truth: event handlers change the objects, then `render()` updates the page.

Download the starter and open the folder in VS Code (on Windows: extract the ZIP, then double-click `open-in-vscode.bat`). Open `example.html` with Live Server first: it contains the final rendered HTML so you can see what you are building. Then open `index.html` and write all JavaScript in `script.js`. The data and the DOM selections are already provided; you will declare the functions and attach the event listeners yourself.

## Tasks

### a. Render the attendance list

Declare a function named `studentHtml(student)` that returns the HTML for one student.

Each student must become an `li` containing:

- a `data-neptun` attribute with the student's Neptun code;
- the class `present` when `student.attendance` is `true`, otherwise no class;
- a checkbox that has the `checked` attribute when the student is present;
- the student's name and Neptun code.

For Charlie, the generated HTML should have this structure:

```html
<li data-neptun="M9N3PQ" class="present">
  <label>
    <input type="checkbox" checked>
    Charlie (M9N3PQ)
  </label>
</li>
```

Use the ternary operator for the conditional class and `checked` attribute.

Declare `render()`. It must:

1. transform every student with `map(studentHtml)`;
2. join the HTML strings with `join("")`;
3. write the result into `list.innerHTML`;
4. count the present students with `filter(...).length`;
5. display text such as `2 of 5 present` in `summary`.

Call `render()` once so the initial list appears when the page loads.

### b. Mark everyone present

The **Everyone is present** button uses a normal, direct event handler.

Declare `handleAllPresent()`. Inside it:

1. use `forEach` to set every student's `attendance` property to `true`;
2. call `render()`.

Attach the function to the button's `click` event with `addEventListener`. Pass the function itself without parentheses so the browser calls it when the click happens.

Expected result: clicking the button checks every checkbox, colors every item green, and updates the summary.

### c. Change attendance with event delegation

Do not attach a separate listener to every checkbox. Attach one `input` listener to the shared parent, `list`.

Declare `handleAttendance(event)`. Inside it:

1. use `event.target.matches("input")` to make sure the event came from a checkbox;
2. use `event.target.closest("li")` to find the student's list item;
3. read the Neptun code from `li.dataset.neptun`;
4. use `find` to locate the corresponding object in `students`;
5. copy `event.target.checked` into the object's `attendance` property;
6. call `render()`.

Attach `handleAttendance` to the `input` event of `list`.

Here `event.target` is the checkbox that changed, while `event.currentTarget` is the `ul` that owns the listener. The event reaches the `ul` because it bubbles upward through the checkbox's parents.

Expected result: changing any checkbox updates the object, the item color, and the summary.

### d. Add a student

Declare `handleSubmit(event)` and attach it to the form's `submit` event.

Inside the handler:

1. call `event.preventDefault()` so the browser does not reload the page;
2. read `neptunInput.value` and `nameInput.value`;
3. stop the function if either value is empty;
4. push a new object into `students` with the entered Neptun code and name, and `attendance: false`;
5. clear both input fields;
6. call `render()`.

Expected result: the new student appears as absent. Its checkbox must work immediately without registering another listener. This works because the `input` listener belongs to the parent `ul`, which stays on the page when `render()` creates new list items.

## Requirements

- Change only `script.js`.
- Keep `students` as the source of truth: change the objects first, then call `render()`.
- Generate the student list from the array; do not write student `li` elements into `index.html`.
- Use one delegated `input` listener on `list`, not one listener per checkbox.
- Attach events with `addEventListener`; do not use inline HTML event attributes.
- The initial render, the button, every checkbox, and the add form must all work without Console errors.
