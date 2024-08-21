// @TODO: Need to move all of this into a background script so it can run in the background
// Will then need it to communicate with this script to update the UI
let isTimerActive = false;
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const timer = document.getElementById('timer');
const intervalInput = document.getElementById('interval');
const intervalForm = document.getElementById('interval-form');
let circle = document.querySelector( '.circle_animation' ).style;

intervalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    startTimer(parseInt(intervalInput.value * 60), true);
});

stopButton.addEventListener('click', () => {
    stopTimer();
});

const startTimer = (time) => {
    let finalOffset = 440;// the length of strokedasharray ( pixel circumference of the circle -> css )
    let step = finalOffset/time;
    circle.strokeDashoffset = 0;
    let timeLeft = time;
    startButton.disabled = true;
    timer.innerText = (timeLeft) / 60 + ":00";
    isTimerActive = true;
    interval = setInterval(() => {
        if (timeLeft <= 1) {
            clearInterval(interval);
            timer.innerText = "Time is up!";
            const audio = new Audio('./gong-91013.mp3');
            audio.play();
            startTimer(time);
        } else {
            timeLeft -= 1;
            circle.strokeDashoffset = step * (time - timeLeft);
            timer.innerText = Math.floor(timeLeft / 60) + ":" + timeLeft % 60;
        }
    }, 1000);
}

const stopTimer = () => {
    clearInterval(interval);
    startButton.disabled = false;
    isTimerActive = false;
    timer.innerText = "Click start!";
};




