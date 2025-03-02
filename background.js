let countdown;
let timeLeft = 0;
let isPaused = false;

// Function to update the timer
function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(countdown);
        chrome.storage.local.set({ timerState: "finished" }); // Save that timer has finished
    } else if (!isPaused) {
        timeLeft--;
        chrome.storage.local.set({ timeLeft: timeLeft, isPaused: isPaused }); // Save time and paused state
    }
}

// Start the timer
function startTimer(minutes) {
    timeLeft = minutes * 60;
    isPaused = false;

    countdown = setInterval(updateTimer, 1000); // Update every second
    chrome.storage.local.set({ timeLeft: timeLeft, isPaused: isPaused }); // Save initial state
}

// Pause the timer
function pauseTimer() {
    isPaused = !isPaused;
    chrome.storage.local.set({ isPaused: isPaused });
}

// Stop the timer
function stopTimer() {
    clearInterval(countdown);
    timeLeft = 0;
    isPaused = false;
    chrome.storage.local.set({ timeLeft: timeLeft, isPaused: isPaused });
}

// Listeners for timer actions from popup
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "start") {
        startTimer(message.minutes);
    } else if (message.action === "pause") {
        pauseTimer();
    } else if (message.action === "stop") {
        stopTimer();
    }
});
