console.log("hello")

const heading = document.querySelector("h1");
console.log(heading.innerHTML)
console.log(heading.textContent)
console.log(heading.innerText);

let total = 1 + 3;


heading.innerHTML = "Another <u>text<u>";
heading.innerText = "Third <u>text</u>"

console.log(total);
heading.innerText = total


console.log(typeof heading)
const paragraphs = document.querySelectorAll("p"); // .paragraph

const paragraphArray = Array.from(paragraphs);

console.log(paragraphs);
console.log(paragraphArray)

for (const p of paragraphs) {
  p.innerText = "New text"
}

const secondParagraph = document.querySelector("#second");

secondParagraph.style.color = "blue";
secondParagraph.style.backgroundColor = "yellow"


console.log(document.getElementById("second")) // -> #second
console.log(document.getElementsByClassName("paragraph")) // -> .paragraph

const image = document.querySelector("img");
image.src = "https://blog.scottlogic.com/jsteer/assets/binarytrees/html.png";
