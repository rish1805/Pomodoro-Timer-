document.addEventListener("DOMContentLoaded", function () {
    // References for DOM elements
    let timerDisplay = document.querySelector(".timer");
    let minuteInput = document.getElementById("minuteInput");
    let startButton = document.getElementById("startBtn");
    let giveUpButton = document.querySelector(".give-up-btn");
    let pauseButton = document.getElementById("pauseBtn");

    // Variable to store the timer interval and time left
    let countdown;
    let timeLeft;
    let isPaused = false; // To track whether the timer is paused or running

    // Ensure elements exist before adding event listeners
    if (!startButton || !timerDisplay || !minuteInput || !giveUpButton || !pauseButton) {
        console.error("One or more elements not found!");
        return;
    }

    // Start button click event
    startButton.addEventListener("click", function () {
        // Get user input and convert to integer
        const minutes = parseInt(minuteInput.value);

        // Validate input (must be > 0)
        if (isNaN(minutes) || minutes <= 0) {
            alert("Please enter a valid number of intervals!");
            return;
        }

        // Show timer and "Give Up" button when the timer starts
        timerDisplay.style.display = "block";
        giveUpButton.style.display = "block";
        pauseButton.style.display = "inline-block"; // Show pause button when timer starts

        // Hide input field and start button after the timer starts
        minuteInput.style.display = "none";
        startButton.style.display = "none";

        // Clear any existing timer before starting a new one
        clearInterval(countdown);

        // Convert minutes to seconds
        timeLeft = minutes * 60;

        // Function to update the timer display
        function updateTimerDisplay() {
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            // Update the timer text in "MM:SS" format
            timerDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
        }

        // Initial display
        updateTimerDisplay();

        // Start the countdown timer
        countdown = setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(countdown); // Stop the timer when time reaches 0
                timerDisplay.textContent = "Time's up!"; // Display end message
            } else if (!isPaused) { // Only decrease time if not paused
                timeLeft--; // Decrease time left
                updateTimerDisplay(); // Update display
            }
        }, 1000); // Update every second (1000ms)
    });

    // Pause/Resume button click event
    pauseButton.addEventListener("click", function () {
        if (isPaused) {
            // Resume the timer
            isPaused = false;
            pauseButton.textContent = "Pause"; // Change text back to "Pause"
        } else {
            // Pause the timer
            isPaused = true;
            pauseButton.textContent = "Resume"; // Change text to "Resume"
        }
    });

    // Give up button click event
    giveUpButton.addEventListener("click", function () {
        clearInterval(countdown); // Stop timer
        timerDisplay.textContent = "Timer stopped!";

        // Show input field and start button again after giving up
        minuteInput.style.display = "block";  
        startButton.style.display = "block";  
        pauseButton.style.display = "none"; // Hide pause button again
        giveUpButton.style.display = "none"; // Hide the "Give Up" button again
    });
});
