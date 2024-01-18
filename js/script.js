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
const remainingGuessesElement = document.querySelector(".remaining");
//span inside remaining guesses paragraph
let remainingNumber = document.querySelector(".remaining span");
//empty paragraph where message appear
const message = document.querySelector(".message");
//hidden button for "play again"
const againButton = document.querySelector(".play-again");

//test word
let word = "magnolia";
//guess Letters Array
let guessedLetters = [];

let remainingGuesses = 8;

// add async function
const getWord = async function () {
  const wordRequest = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await wordRequest.text();
  //   console.log(words);
  const wordArray = words.split("\n");
  //   console.log(wordArray);
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  //   console.log(randomIndex);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

//Write a Function to Add Placeholders for Letters
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");
  }
  wordProgress.innerText = placeholderLetters.join("");
};

getWord();

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
    countGuesses(letter);
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
  //   console.log(wordArray);
  const updateWord = [];
  for (letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      updateWord.push(letter);
    } else {
      updateWord.push("●");
    }
    wordProgress.innerText = updateWord.join("");
    didPlayerWin();
  }
  //   console.log(updateWord);
};

// function to count guesses remaining
const countGuesses = function (guess) {
  if (word.toUpperCase().includes(guess)) {
    message.innerText = `The word contains the letter "${guess}"!`;
  } else {
    // message.innerText = `The word does not contain the letter "${guess}".`;
    remainingGuesses -= 1;
  }
  if (remainingGuesses === 0) {
    message.innerHTML = `Game Over. The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingNumber.innerText = `ONLY ${remainingGuesses} guess`;
  } else {
    remainingNumber.innerText = `${remainingGuesses} guesses`;
  }
};

// function to check if player has won
const didPlayerWin = function () {
  if (word.toUpperCase() === wordProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the word! Congrats!</p>`;
    startOver();
  }
};

// function to show and hide elements
const startOver = function () {
  guessButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  againButton.classList.remove("hide");
};

// click event for play again button
againButton.addEventListener("click", function () {
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingNumber.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerText = "";
  message.innerText = "";
  getWord();

  guessButton.classList.remove("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
  againButton.classList.add("hide");
});
