import { words } from "./words.js";

const gameFigure = document.querySelectorAll(".game__figure--man"),
  inputField = document.querySelector(".game__textarea--input"),
  letterBox = document.querySelector(".game__textarea--letterbox"),
  buttons = document.querySelectorAll(".btn"),
  wordField = document.querySelector(".game__figure--canvas.man-word"),
  eyes = document.querySelector(".man-eyes");

let newWord,
  secretWord,
  step = 0;

inputField.addEventListener("keyup", (kPress) => {
  if (numericInput(inputField.value)) {
    if (kPress.key === "Enter") {
      tryLetter();
    }
  } else {
    resetInput();
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (numericInput(inputField.value)) {
      if (button.classList.contains("btn-proceed")) {
        tryLetter();
      } else if (button.classList.contains("btn-play")) {
        hideFigure();
        const [newWord, secretWord] = randomWord(words);
        wordField.textContent = secretWord;
        return [newWord, secretWord];
      } else if (button.classList.contains("btn-reset")) {
        hideFigure();
      }
    }
  });
});

const tryLetter = () => {
  checkLetter(inputField.value.toUpperCase(), wordField.textContent, newWord);

  resetInput(inputField.value);
  wordCheck();
};

const showFigure = (step) => {
  gameFigure[step].classList.remove("hidden");
  if (step === 5) {
    eyes.classList.add("busted");
    eyes.textContent = "XX";
    wordField.textContent = `Word: ${newWord}`;
    wordField.style.fontSize = "30px";
  }
};

const hideFigure = () => {
  gameFigure.forEach((fig) => {
    fig.classList.add("hidden");
  });
  wordField.textContent = "";
  letterBox.value = "";
  step = 0;
  eyes.classList.remove("busted");
  eyes.textContent = "..";
  wordField.style.fontSize = "40px";
};

const numericInput = (value) => {
  return isNaN(parseInt(value));
};

const resetInput = () => {
  inputField.value = "";
};

const randomWord = (words) => {
  newWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

  const secretArray = [];

  for (let word of newWord.split(" ")) {
    const secret = "_".repeat(word.length);
    secretArray.push(secret);
  }

  secretWord = secretArray.join(" ");
  return [newWord, secretWord];
};

const checkLetter = (letter, secret, base) => {
  const positions = [];
  for (let i = 0; i < base.length; i++) {
    if (base[i] === letter) {
      positions.push(i);
    }
  }

  if (positions.length) {
    const resultArray = secret.split("");
    positions.forEach((position) => {
      if (position < resultArray.length) {
        resultArray[position] = letter;
      }
    });

    const resultString = resultArray.join("");
    wordField.textContent = resultString;
    return;
  }
  if (!letterBox.value.includes(letter)) {
    letterBox.value += ` ${letter}`;
    showFigure(step);
    step++;
    return step;
  }
};

const wordCheck = () => {
  if (!wordField.textContent.includes("_")) {
    letterBox.value = "You won!!";
    return;
  }
};
