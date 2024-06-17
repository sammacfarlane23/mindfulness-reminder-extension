let timeLeft = 20 * 60;
let isTimerActive = false;
const startButton = document.getElementById('ring');
const timer = document.getElementById('timer');
let interval;

const startTimer = () => {
    startButton.innerText = 'Stop';
    timer.innerText = timeLeft + " seconds remaining";
    isTimerActive = true;
    interval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(interval);
            timeLeft = 20;
            timer.innerText = "Time is up!";
        } else {
            timeLeft -= 1;
            // @TODO: Show minutes and seconds
            timer.innerText = timeLeft + " seconds remaining";
        }
    }, 1000);
}

const stopTimer = () => {
    clearInterval(interval);
    isTimerActive = false;
    timeLeft = 20;
    timer.innerText = "Click the button to start the timer!";
    startButton.innerText = 'Start';
};

startButton.addEventListener('click', () => {
    // const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
    // audio.play();
    isTimerActive ? stopTimer() : startTimer();
});

