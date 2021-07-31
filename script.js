const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdown-form");
const dateElement = document.getElementById("date-picker");

const countdownElement = document.getElementById("countdown");
const countdownElementTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeElement = document.getElementById("complete");
const completeElementInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let counter;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with today's date
const today = new Date().toISOString().split("T")[0];
dateElement.setAttribute("min", today);

// Populate Countdown / Complete UI
function updateDOM() {
  counter = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    inputContainer.hidden = true;

    // If Countdown has ended, show complete
    if (distance < 0) {
      countdownElement.hidden = true;
      clearInterval(counter);
      completeElementInfo.textContent = `${countdownTitle} finished on ${countdownDate}.`;
      completeElement.hidden = false;
    } else {
      // Else show the countdown in progress
      // Populate Countdown
      countdownElementTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeElement.hidden = true;
      countdownElement.hidden = false;
    }
  }, second);
}

// Take Values from Form Input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  // Get number version of current Date, updateDOM
  countdownValue = new Date(countdownDate).getTime();
  updateDOM();
}

function reset() {
  // Hide Countdown and Show Input
  countdownElement.hidden = true;
  completeElement.hidden = true;
  inputContainer.hidden = false;
  clearInterval(counter);
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
}

// Check localstorage for existing countdown
function restoreExistingCountdown() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Event Listener
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeElement.addEventListener("click", reset);

// On Load, check localStorage
restoreExistingCountdown();
