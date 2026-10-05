const wordList = ["javascript", "programming"];
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const visualElements = [
    `<line x1="0" y1="99%" x2="100%" y2="99%" />`,
    `<line x1="20%" y1="99%" x2="20%" y2="5%" />`,
    `<line x1="20%" y1="5%" x2="60%" y2="5%" />`,
    `<line x1="60%" y1="5%" x2="60%" y2="20%" />`,
    `<circle cx="60%" cy="30%" r="10%" />`,
    `<line x1="60%" y1="30%" x2="60%" y2="70%" />`,
    `<line x1="40%" y1="50%" x2="80%" y2="50%" />`,
    `<line x1="60%" y1="70%" x2="50%" y2="90%" />`,
    `<line x1="60%" y1="70%" x2="70%" y2="90%" />`
];

const controlsDiv = document.querySelector("#controls");
const startButton = document.querySelector("#start");
const resultDiv = document.querySelector("#result");
const gameDiv = document.querySelector("#game");
const tr = document.querySelector("tr");
const buttonsDiv = document.querySelector("#buttons");
const svg = document.querySelector("svg");


let targetWord = "";
let guessedLetters = [];
let gameOver = false;



// ["a", "b", "c"].join("") -> "abc".split("") -> ["a", "b", "c"]
function render() {


    const wrongGuesses = guessedLetters.filter((letter) => !targetWord.includes(letter)).length;

    const won = targetWord.split("").every((letter) =>
        guessedLetters.includes(letter))

    const lost = wrongGuesses >= visualElements.length;
    gameOver = won || lost;

    console.log("Guessed letters:", guessedLetters)
    tr.innerHTML = targetWord.split("").map((letter) => 
        `<td>${guessedLetters.includes(letter) ? letter : "_"}</td>`
    ).join("")

    buttonsDiv.innerHTML = alphabet.split("").map((letter) =>
        `<button type="button" ${guessedLetters.includes(letter) ? "disabled" : ""}>

    ${letter}
    </button>`
    ).join("")

    svg.innerHTML = visualElements.slice(0, wrongGuesses).join("");


    resultDiv.innerText = won ? "You won!" : (lost ? "You lost! Target word was " + targetWord : "")


}

function startGame() {
    targetWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log("The current targetWord: ", targetWord)
    guessedLetters = [];
    gameOver = false;
    gameDiv.style.display = "block";
    render();

    console.log(targetWord.split("").map((letter) => 
        `<td>
        ${guessedLetters.includes(letter) ? letter : "_"}
    </td>`
    ).join(""))
}


function handleLetterClick(event) {
    if(gameOver || !event.target.matches("button")) {
        return;
    }

    const letter = event.target.textContent.trim();
    if(guessedLetters.includes(letter)) {
        return;
    }
    guessedLetters.push(letter);
    render();
    console.log(guessedLetters)
    console.log(letter)

}


startButton.addEventListener("click", startGame)
buttonsDiv.addEventListener("click", handleLetterClick)
