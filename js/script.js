//Create Global Variables
//unordered list
const guessedLetters = document.querySelector(".guessed-letters");
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
    console.log(guess);
    letterInput.value="";

});