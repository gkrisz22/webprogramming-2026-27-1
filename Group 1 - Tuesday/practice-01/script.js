console.log("Hello world");
console.log('Hello world with single');

let name2 = "Krisztián";

// asd
/*
*/

// Hello, Krisztián
console.log("Hello, " + name2);
// Console.WriteLine($"hello {name2}")
console.log(`Hello, ${name2} ...`);

const university = "ELTE";
// university = "BME"

let age;
console.log(age)

var x = 14;

{
  let y = 1;
  var z = 2;
}

console.log(z)
//console.log(y)

// string, number, boolean, undefined
console.log( typeof(university) ) 

let aNumber = "10";
// 1: Number(aNumber)

console.log(typeof Number(aNumber))
// 2: parseInt()

// +
console.log(typeof +aNumber)

console.log("2"+3)
console.log("2"*3+2*"abc")
console.log(Number("hello"))

console.log(typeof 3.14)

console.log("////////")

// ==: loose equality, ===: strict equility
console.log("1" === 1)

if("1" === 1) {
  console.log("")
}
else {

}

console.log("////////")

let data = [1, 2, 3]; // let data = [];

for (let i = 0; i < data.length; i++) {
  console.log("element: " + data[i])
}

let total = 0;

for (const item of data) {
  console.log(item)
  total = total + item;
  // sum += item;
}

console.log("Total is " + total)

// Functions


function sum(x, y) {
  return x+y;
}

const sum2 = function (x,y) {
  return x + y;
}

console.log(sum(1, 2))
console.log(sum2(1,2))

const sum3 = (x, y) => {
  return x + y;
}

const sum4 = (x, y) => x+y;


function sumEven(data) {
  let result = 0;
  // Sum the even numbers in data
  // +, -, /, *, **, %

  for (const item of data) {
    if(item % 2 === 0) result += item;
  }

  return result;
}

console.log(sumEven([2,3,4]));


let squaredResult = [];

for (const item of data) {
  squaredResult.push(item**2);
}

console.log(squaredResult)

// [1,2,3] -> [1, 4, 9]
// data.at(0) == data[0]

// map: [1,2,3] -> [1, 4, 9]
const resultMap = data.map((item) => item ** 2);

const squareThis = (item) => item ** 2;

const resultMap2 = data.map(squareThis);




