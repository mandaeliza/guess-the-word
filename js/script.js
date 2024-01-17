//Create Global Variables
//unordered list
const guessedLettersElement = document.querySelector(".guessed-letters");
//button with "Guess"
const guessButton = document.querySelector(".guess");
//text input
const letterInput = document.querySelector(".letter");
//empty paragraph - word in progress
const wordProgress = document.querySelector(".word-in-progress");
//remaining guesses paragraph
const remainingGuesses = document.querySelector(".remaining");
//span inside remaining guesses paragraph
const remainingNumber = document.querySelector(".remaining span");
//empty paragraph where message appear
const message = document.querySelector(".message");
//hidden button for "play again"
const againButton = document.querySelector(".play-again");

//test word
const word = "magnolia";
//guess Letters Array
let guessedLetters = [];

//Write a Function to Add Placeholders for Letters
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");
  }
  wordProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = letterInput.value;
    // console.log(guess);
    letterInput.value="";
    message.innerText="";
    const validatedGuess = guessValidator(guess);
    // console.log(validatedGuess);
    makeGuess(validatedGuess);
    
});


const guessValidator = function (guess) {
    const acceptedLetter = /[a-zA-Z]/;
    if (guess == "") {
        message.innerText = "Please enter your guess.";
        
    }
    else if (guess.length > 1) {
        message.innerText = "Please enter only one letter.";
    }
    else if (guess != guess.match(acceptedLetter)){
        message.innerText = `"${guess}" isn't a letter, try again.`;
    }
    else  {
        message.innerHTML = `You guessed "${guess.toUpperCase()}"!`
        
        return guess.toUpperCase();
    }
    };

const makeGuess = function(letter) {
    if (guessedLetters.includes(letter)) {
        message.innerText = `You already guessed that.`
    } else if (typeof letter !== 'undefined') {
        guessedLetters.push(letter);
        console.log(guessedLetters);
    }};



