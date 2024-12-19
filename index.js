const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const timer = document.getElementById('timer');
const intervalInput = document.getElementById('interval');
const intervalForm = document.getElementById('interval-form');
let circle = document.querySelector( '.circle_animation' ).style;

const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
const finalOffset = 660;// the length of strokedasharray ( pixel circumference of the circle -> css )

incrementButton.addEventListener('click', () => {
    intervalInput.value = Math.ceil(parseInt(intervalInput.value) / 5) * 5 + 5;
    chrome.runtime.sendMessage({ action: "getTimerState" }, (state) => {
        if (!state.isTimerActive) {
            timer.innerText = `${parseInt(intervalInput.value)} minutes`;
        } 
    });
});

decrementButton.addEventListener('click', () => {
    intervalInput.value = Math.max(1, Math.floor(parseInt(intervalInput.value) / 5) * 5 - 5);
    chrome.runtime.sendMessage({ action: "getTimerState" }, (state) => {
        if (!state.isTimerActive) {
            timer.innerText = `${parseInt(intervalInput.value)} minutes`;
        } 
    });
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function updateTimerUI(state) {
    if (state.isTimerActive) {
        const { timeLeft, totalDuration } = state;
        let step = finalOffset / totalDuration;
        timer.innerText = formatTime(timeLeft);
        circle.strokeDashoffset = step * (totalDuration - timeLeft);
    } else {
        timer.innerText = `${parseInt(intervalInput.value)} minutes`;
        circle.strokeDashoffset = 0;
    }
}

function getTimerState() {
    chrome.runtime.sendMessage({ action: "getTimerState" }, (state) => {
        updateTimerUI(state);
    });
}

startButton.addEventListener('click', (e) => {
    e.preventDefault();
    const duration = parseInt(intervalInput.value) * 60;
    circle.strokeDashoffset = 0;
    incrementButton.style.display = 'none';
    decrementButton.style.display = 'none';
    chrome.runtime.sendMessage({ action: "startTimer", duration });
});

stopButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "stopTimer" });
    incrementButton.style.display = 'block';
    decrementButton.style.display = 'block';
    getTimerState();
});

// Update the UI when the popup is opened
document.addEventListener("DOMContentLoaded", () => {
    getTimerState();
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "timerEnded") {
        timer.innerText = "Time is up!";
        const audio = new Audio('./gong-91013.mp3');
        audio.play();
        const duration = parseInt(intervalInput.value) * 60;
        chrome.runtime.sendMessage({ action: "startTimer", duration });
        getTimerState();
    }
    if (message.action === "updateTimeLeft") {
        // Get the updated timer state
        getTimerState();
    }
});
