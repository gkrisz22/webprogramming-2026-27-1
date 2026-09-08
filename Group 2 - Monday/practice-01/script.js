console.log("Hello world2");

// This is a one line comment
/*
Multiple
lines
of 
comments
 */

// int x = 2;
let name = "Krisztián";
//name = 1;

const neptun = 'MF5M7S';
//neptun = 3



{
  var a = 1;
  let b = 2;
}

console.log("a is " + a + ".");
console.log(`a ${a} is `);

console.log(typeof name)
console.log(typeof 3.14)
console.log(typeof true)
// ==, ===

console.log("2" === 2)

if ("2" === 2) {
  console.log("They are the same");
}
else {
  console.log("They are different.")
}

console.log("2" + 3 * 6);



function sum(x, y) {

  return x + y;
}

const sum2 = function (x, y) {
  return x + y;
}

const sum3 = (x, y) => {
  return x + y;
}

const sum4 = (x, y) => x + y



console.log(sum2(3, 3))

function print() {
  console.log("Printing")
}


console.log(sum(1, 2))

let university = "ELTE";

let z = "10";
let z2 = Number(z); // +z, parseInt(z)
let z3 = +z;
console.log(typeof z3)

console.log("///////")

let data = [1, 2, 3];

for (let i = 0; i < data.length; i++) {
  console.log(`The ${i}-th element is: ${data[i]}`)
  // data.at(i)
}


// Task: sum the data elements

let result = 0;

for (const item of data) {
  console.log(item)
  //result = result + item;
  if (item % 2 === 0)
    result += item;
}

console.log("The sum is: " + result)

// +, -, *, /, %, **

// Task: sum only the even elements

let squared = [];

// https://gkrisz.space/en/playground/s/iye36766iavb26y8
for (const item of data) {
  squared.push(item ** 2)
}

console.log(squared)

function squareThis(x) {
  return x ** 2;
}
// Array functions
const squaredResult = data.map((item) => item ** 2);
console.log(squaredResult)

const squaredResult2 = data.map(squareThis);


// [1,2,3] -> map -> [1, 4, 9]





