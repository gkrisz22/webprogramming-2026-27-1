const students = [
  { neptun: "ABCDEF", name: "Alice", attendance: false },
  { neptun: "G7H2KL", name: "Bob", attendance: false },
  { neptun: "M9N3PQ", name: "Charlie", attendance: true },
  { neptun: "R4S5TU", name: "David", attendance: false },
  { neptun: "V6W7XY", name: "Eve", attendance: true },
];

const list = document.querySelector("#student-list");
const summary = document.querySelector("#summary");
const allPresentButton = document.querySelector("#all-present");
const form = document.querySelector("#add-form");
const neptunInput = document.querySelector("#neptun");
const nameInput = document.querySelector("#name");


if(1 === 1) {
  console.log("It's true")
}
else {
  console.log("It's false")
}

// condition ? true : false 
console.log( 1 === 1 ? "true" : "false" );

// student: { neptun: "ABCDEF", name: "Alice", attendance: false }
function studentHtml(student) {
  return `
    <li data-neptun="${student.neptun}" class="${ student.attendance ? "present" : ""}">
      <label>
        <input type="checkbox" ${student.attendance ? "checked" : ""}>
        ${student.name} (${student.neptun})
      </label>
    </li>
  `
}

console.log(studentHtml(students[2]));

function render() {
  // list.innerHTML = students.map((student) => studentHtml(student))
  list.innerHTML = students.map(studentHtml).join("");

  const present = students.filter((student) => student.attendance).length;

  summary.innerText = `${present} of ${students.length} present`
}

function handleAllPresent() {
  students.forEach((student) => {
    student.attendance = true;
  })

  render();
}

function handleAttendance(event) {
  console.log("Event", event)
  console.log(event.target)

  if(!event.target.matches("input")) {
    return;
  }

  // If the event target is an li:
  const li = event.target.closest("li");
  console.log(li.dataset.neptun)

  const neptun = li.dataset.neptun;
  const student = students.find((student) => student.neptun === neptun);
  student.attendance = event.target.checked; // !student.attendance

  render();
}

function handleSubmit(event) {
  console.log("Form submitted");
  event.preventDefault();

  const neptun = neptunInput.value;
  const name = nameInput.value;

  if(neptun === "" || name === "") {
    return;
  }

  // student: { neptun: "ABCDEF", name: "Alice", attendance: false }

  const student = {
    neptun,
    name: name, // you can also use just "name,"
    attendance: false
  }

  students.push(student);

  neptunInput.value = ""
  nameInput.value = ""

  render();
}

// htmlElement.addEventListener(event, handler)
allPresentButton.addEventListener("click", () => handleAllPresent())

// delegation
list.addEventListener("input", handleAttendance)

form.addEventListener("submit", handleSubmit)


// f(g(x))
console.log(students.map(studentHtml).join(""))

render();



// Other stuff
const otherList = document.querySelector("#some-list");
const item1 = document.querySelector("#item1");

otherList.addEventListener("click", () => {
  console.log("I clicked inside the list");
})

item1.addEventListener("click", () => {
  console.log("I clicked on List Item 1");
  item1.classList.toggle("present")

  console.log(item1.classList.contains("present"))
})

document.addEventListener("click", () => {
  console.log("I clicked somewhere on the webpage.")
})

item1.style.color = "red"
item1.classList.add("present")

const li3 = document.createElement("li");
li3.classList.add("present");
li3.innerText = "li 3";

otherList.appendChild(li3)

// For array functions
students.map((student, index, array) => {
  console.log(student, index, array)
})

