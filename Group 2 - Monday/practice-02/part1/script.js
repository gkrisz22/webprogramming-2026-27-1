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
console.log(typeof(true))
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


// filter()
// [1,2,3] -> filter: even -> [2]

const evenNumbers = data.filter((item) => item % 2 === 0);
console.log(`Even numbers in data are: ${evenNumbers}`);


const movie = {
  // "key": "value"
  // "first": "asdasd"

  title: "Alien",
  "year": 1979,
  "rating": 8.5,
  "genre": ["sci-fi"],

  "something-else": "asd"
};

console.log(movie.rating) // This is what we are using
console.log(movie["something-else"]);

movie.title = "Human";
console.log(movie.title); 

const movies = [
  {title: "Inception", year: 2010, rating: 8.8, genres: ["sci-fi", "thriller"]},

  {title: "Up", year: 2009, rating: 8.3, genres: ["animation", "family"]}
];

console.log(movies)

movies.push(movie);
console.log(movies);

// Task: Return all the movies that has year >= 2010.

const recentMovies = movies.filter((item) => item.year >= 2010);
console.log(recentMovies.length);

// Task: Get the first movie that has title of "Up"
// [1,2,3] -> find: 2 -> 2 

const movieUp = movies.find((item) => item.title.toLowerCase() === "UP".toLowerCase());
console.log(movieUp);

// Task: determine whether all the ratings are above 8
// every() -> true: if every element meets the condition
// some() -> true: if at least ONE element meets the condition

movies[0].rating = 7.9;

const allAbove8 = movies.every((item) => item.rating > 8);
console.log("Are all movies above rating 8? " + allAbove8)

const atLeastOneAbove8 = movies.some((item) => item.rating > 8);
console.log("At least one movie is above 8? ", atLeastOneAbove8);

// [1,2,3] -> max() -> 3 (same with min())

console.log(Math.max(1, 2, 3));

// [1, 2, 3], [4, 5, 6]
const arrayA = [1,2,3];
const arrayB = [4, 5, 6];

// spread operator [...yourArray, 1, 2, ...yourOtherArray]
const combinedArrays = [...arrayA, 10, ...arrayB]
console.log(combinedArrays)

// [1,2,3] -> reduce() -> 6
let data2 = [1,2,3];

let total2 = 0;
for (const element of data2) {
  total2 += element;
}
console.log("The total: " + total2);

// reduce:
const totalWithReduce = data2.reduce((total3, item) => total3 + item, 0);

console.log(totalWithReduce)

// flat()
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(matrix)
console.log(matrix[0][1])
console.log(matrix.flat())


