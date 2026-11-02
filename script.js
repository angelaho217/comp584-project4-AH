const screen = document.querySelector(".calculator-screen");
const buttons = document.querySelector(".calculator-buttons");

// Calculator memory
let currNumber = "0";   // what is showing on the screen
let prevNumber = null; // the first inputed number
let op = null;       // math symbols
let startNewNumber = false; // true when the next digit should replace the screen

// calculate the result of a math operation
function calculate(a, op, b) {
  if (op === "+") {
    return a + b;
  } else if (op === "-") {
    return a - b;
  } else if (op === "×") {
    return a * b;
  } else {
    // divide
    if (b === 0) {
      return "Error";
    }
    return a / b;
  }
}

// round long decimal and convert to str
function roundResult(result) {
  if (result === "Error") {
    return "Error";
  }
  return String(Math.round(result * 1000000) / 1000000);
}

// run operation and update the screen with the result
function runOperation() {
  if (op !== null) {
    const answer = calculate(Number(prevNumber), op, Number(currNumber));
    currNumber = roundResult(answer);
    op = null;
    prevNumber = null;
  }
}

// event delegation: one listener on the section, check which button was clicked
buttons.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const value = event.target.innerText;

    if (currNumber === "Error") {
      currNumber = "0";
    }

    if (value === "C") {
      // reset calculator to 0
      currNumber = "0";
      prevNumber = null;
      op = null;
      startNewNumber = false;
    } else if (value === "←") {
      // backspace
      if (currNumber.length > 1) {
        currNumber = currNumber.substring(0, currNumber.length - 1);
      } else {
        currNumber = "0";
      }
    } else if (["+", "-", "×", "÷"].includes(value)) {
      // operator: finish any pending math first, then remember this one
      runOperation();
      prevNumber = currNumber;
      op = value;
      startNewNumber = true;
    } else if (value === "=") {
      runOperation();
      startNewNumber = true;
    } else {
      if (startNewNumber || currNumber === "0") {
        currNumber = value;
        startNewNumber = false;
      } else {
        currNumber = currNumber + value;
      }
    }

    screen.innerText = currNumber;
  }
});