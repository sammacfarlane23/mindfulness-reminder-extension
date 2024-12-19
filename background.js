let timerInterval = null;
let timerState = {
    timeLeft: 0,
    isTimerActive: false,
    totalDuration: 0,
};

// Start the timer
function startTimer(duration) {
    if (timerInterval) clearInterval(timerInterval);

    timerState.isTimerActive = true;
    timerState.totalDuration = duration;
    timerState.timeLeft = duration;

    timerInterval = setInterval(() => {
        if (timerState.timeLeft <= 1) {
            clearInterval(timerInterval);
            timerState.isTimerActive = false;
            chrome.runtime.sendMessage({ action: "timerEnded" });
        } else {
            timerState.timeLeft -= 1;
            chrome.storage.local.set({ timerState });
            chrome.runtime.sendMessage({ action: "updateTimeLeft", timeLeft: timerState.timeLeft, totalTime: timerState.totalDuration });
        }
    }, 1000);

    chrome.storage.local.set({ timerState });
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerState.isTimerActive = false;
    chrome.storage.local.set({ timerState });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startTimer") {
        startTimer(message.duration);
    } 
    else if (message.action === "stopTimer") {
        stopTimer();
    } else if (message.action === "getTimerState") {
        sendResponse(timerState);
    }
});
