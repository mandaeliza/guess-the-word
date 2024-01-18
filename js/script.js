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
const guessedLetters = [];

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

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  // Let's grab what was entered in the input
  const guess = letterInput.value;
  // Empty message paragraph
  message.innerText = "";
  // Let's make sure the guess is one letter
  const validatedGuess = guessValidator(guess);
  // console.log(validatedGuess);
  makeGuess(validatedGuess);
  //Empty input box
  letterInput.value = "";
});

const guessValidator = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    //is the input empty?
    message.innerText = "Please enter your guess.";
  } else if (input.length > 1) {
    // did you type more than one letter?
    message.innerText = "Please enter only one letter.";
  } else if (input != input.match(acceptedLetter)) {
    // are you sure this is a letter?
    message.innerText = `"${input}" isn't a letter, try again.`;
  } else {
    message.innerHTML = `You guessed "${input.toUpperCase()}"!`;
    // finally one letter!
    return input.toUpperCase();
  }
};

const makeGuess = function (letter) {
  if (guessedLetters.includes(letter)) {
    message.innerText = `You already guessed that.`;
  } else if (typeof letter !== "undefined") {
    guessedLetters.push(letter);
    // console.log(guessedLetters);
    lettersGuessed();
    wordProgressUpdate(guessedLetters);
  }
};

// function that shows guessed letters
const lettersGuessed = function () {
  guessedLettersElement.innerHTML = "";
  for (let listItem of guessedLetters) {
    document.createElement("li");
    guessedLettersElement.append(listItem);
  }
};

// function to update the word in progress
const wordProgressUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);
    const updateWord = [];
    for (letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updateWord.push(letter.toUpperCase());
        } else {
            updateWord.push("●");
        }
    wordProgress.innerText = updateWord.join("");   
    }
    
    // console.log(updateWord);
    };


