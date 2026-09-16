console.log("Hello")

const h1 = document.querySelector("h1");
console.log(h1)
console.log(h1.innerHTML)
console.log(h1.innerText)
console.log(h1.textContent)

h1.innerText = "Another text"
h1.innerHTML = "<u>Another</u> text"

const pElements = document.querySelectorAll("p"); // document.querySelectorAll(".paragraph")
const pArray = Array.from(pElements);

console.log(pElements)
console.log(pArray);

for (const p of pElements) {
  p.innerText = "Other text"
}

const secondP = document.querySelector("#second") 
secondP.style.color = "blue"
secondP.style.backgroundColor = "yellow"

console.log( document.getElementById("second") )
console.log( document.getElementsByClassName("paragraph"))

const img = document.querySelector("img");
img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn8d261lfqmUS8M-a3Mm9UBNU8Lp2BnY86FEEY6euL6DiHUBmctQCDdQczTHDLnL342y6YX2sKw1gahSCGzr_EXKHF-QsaQwNPMXV6M8k&s=10"




