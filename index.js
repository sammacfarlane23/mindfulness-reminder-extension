let isTimerActive = false;
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const timer = document.getElementById('timer');
const intervalInput = document.getElementById('interval');
const intervalForm = document.getElementById('interval-form');
const progressIndicator = document.getElementById('progress-indicator');

intervalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    startTimer(parseInt(intervalInput.value * 60), true);
});

stopButton.addEventListener('click', () => {
    stopTimer();
});

let interval;

const startTimer = (time) => {
    let timeLeft = time;
    progressIndicator.style.width = '100%';
    startButton.disabled = true;
    timer.innerText = (timeLeft) / 60 + ":00";
    isTimerActive = true;
    interval = setInterval(() => {
        if (timeLeft <= 1) {
            clearInterval(interval);
            timer.innerText = "Time is up!";
            const audio = new Audio('./gong-91013.mp3');
            audio.play();
            progressIndicator.style.width = '0%';
            startTimer(time);
        } else {
            timeLeft -= 1;
            progressIndicator.style.width = `${(timeLeft) / time * 100}%`;
            // @TODO: Show minutes and seconds
            timer.innerText = Math.floor(timeLeft / 60) + ":" + timeLeft % 60;
            // timer.innerText = timeLeft + " seconds remaining";
        }
    }, 1000);
}

const stopTimer = () => {
    clearInterval(interval);
    progressIndicator.style.width = '100%';
    startButton.disabled = false;
    isTimerActive = false;
    timer.innerText = "Click the button to start the timer!";
};




