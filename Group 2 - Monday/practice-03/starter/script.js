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

if(1 == 1)
{
  console.log("True")
}
else {
  console.log("False");
}

// Ternary operator: condition ? true : false
console.log( 1 == 1 ? "True" : "False");

// student = { neptun: "ABCDEF", name: "Alice", attendance: false }
function studentHtml(student) { // class="" | class="present"

  // <input type="checkbox" checked> | <input type="checkbox">
  return `
  <li data-neptun="${student.neptun}" class="${student.attendance ? "present" : ""}">
    <label>
      <input type="checkbox" ${student.attendance ? "checked" : ""} >
      ${student.name} (${student.neptun})
    </label>
  </li>
  `;
}

console.log(studentHtml(students[2]))
console.log(students.map(studentHtml).join(""))

function render() {
  // list.innerHTML = student.map((student) => studentHtml(student));

  list.innerHTML = students.map(studentHtml).join("");

  const present = students.filter((student) => student.attendance).length;
  summary.innerText = `${present} of ${students.length} students are present`
}


function handleAttendance(event) {
  console.log("Event", event)
  console.log(event.target)
  if(!event.target.matches("input")) {
    return;
  }

  const li = event.target.closest("li");
  console.log(li.dataset.neptun);

  const neptun = li.dataset.neptun;
  const student = students.find((student) => student.neptun === neptun);

  student.attendance = event.target.checked; // !student.attendance

  render();
  
}

function handleSubmit(event) {
  event.preventDefault();
  console.log(event);

  const neptun = neptunInput.value;
  const name = nameInput.value;

  if(neptun === "" || name === "") {
    return;
  }

  const student = {
    name: name,
    neptun, // short syntax for neptun: neptun (only works if key's name == variable's name)

    attendance: false
  }

  students.push(student);
  // if students was declared with let students = [] -> students = [...students, { name: name, neptun, attendance: false}]

  neptunInput.value = "";
  nameInput.value = "";



  render();

}


allPresentButton.addEventListener("click", () => {
  console.log("I clicked the everyone is present button")
  students.forEach((student) => {
    student.attendance = true;
  });

  render();

})

// Delegation
list.addEventListener("input", handleAttendance);

// This is not delegation:
form.addEventListener("submit", handleSubmit)

render();

const h1 = document.querySelector("h1");

console.log(h1.textContent)

const otherList = document.querySelector("#some-list");
const item1 = document.querySelector("#item1");

otherList.addEventListener("click", () => {
  console.log("I clicked the list");
})

item1.addEventListener("click", () => {
  console.log("I clicked the item1");
  item1.classList.toggle("present")
})

document.addEventListener("click", () => {
  console.log("I clicked anywhere on the webpage")
})

item1.classList.add("present")
item1.classList.remove("present")

const li3 = document.createElement("li");
li3.classList.add("present");
li3.innerText = "List item 3"

otherList.appendChild(li3);

students.map((student, index, array) => {
  //console.log(`The ${index}th student: `, student);
  console.log(array)
})

