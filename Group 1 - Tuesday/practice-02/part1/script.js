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


// filter 
// [1, 2, 3] -> filter: even -> [2]

const evenNumbers = data.filter((item) => item % 2 == 0);
console.log(evenNumbers);


const dictionary = {
  "first": "első"
};
// JSON

console.log(dictionary["first"])

// objects
const movie = {
  title: "Alien",
  year: 1979,
  rating: 8.5,
  genre: ["sci-fi"],

  "something-else": "asd"
};

console.log(movie.title)
console.log(movie["title"])

movie.title = "Human"

const movies = [
  { title: "Inception", year: 2010, rating: 8.8, genres: ["sci-fi", "thriller"], award: true},

  { title: "Up", year: 2009, rating: 8.3, genres: ["animation", "family"]}
];


console.log(movie)
console.log(movies)
console.log(movies[0])

// Task: Return all the movies that has been published in/or after 2010 

const recentMovies = movies.filter((item) => item.year >= 2010 );
console.log(recentMovies);

// find: movie with title "Up"
const upMovie = movies.find((item) =>  item.title.toLowerCase() === "UP".toLowerCase());
console.log(upMovie.title)

// Task: let's determine whether all the ratings are above 8
// every(): true if every element meets a given condition
// some(): true: if there is at least one element that meets a given condition

movies[0].rating = 7.5;
const isEveryRatingAbove8 = movies.every((item) => item.rating > 8);

console.log(isEveryRatingAbove8);

const atLeastOneAbove8 = movies.some((item) => item.rating > 8)
console.log(atLeastOneAbove8)

console.log(movies.filter((item) => item.award))

// Math: min(), max()
console.log(Math.min(1, 2))
console.log(Math.max(1, 2))

let arrayA = [1, 2, 3];
let arrayB = [4, 5, 6];

let arrayMerged = [-1, ...arrayA, 10, ...arrayB];

console.log(arrayMerged)

// reduce()
let total2 = 0;
for (const element of data) {
  total += element;
}
console.log("Sum: " + total)

// data = [1,2,3]
const totalWithReduce = data.reduce((total3, item) => total3+=item, 0);
console.log(totalWithReduce)

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(matrix[0][1])
console.log(matrix.flat())
