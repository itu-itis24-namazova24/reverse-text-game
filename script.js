const challengeInput = document.getElementById("challenge");
const userInput = document.getElementById("user-input");
const timerElement = document.getElementById("timer");
const messageElement = document.getElementById("message");
const levelElement = document.getElementById("level");
const restartBtn = document.getElementById("restart-btn");
const submitBtn = document.getElementById("submit-btn");


const levels = [
    "January",       // Level 1 text
    "February 2"     // Level 2 text
  ];
  let level = 0;      // Keeps track of the current level
  let timeLeft = 45;  // Starting time
  let timerInterval;  // Timer variable


  function startGame() {
    level = 0; // Start at level 1
    timeLeft = 45; // Reset timer
    timerElement.textContent = timeLeft; // Update timer display
    userInput.value = ""; // Clear input field
    messageElement.textContent = ""; // Clear messages
    restartBtn.classList.add("hidden"); // Hide Restart button
    submitBtn.classList.remove("hidden"); // Show Submit button
    updateLevel(); // Show level 1 text
    startTimer(); // Start the countdown
  }

  


  function updateLevel() {
    levelElement.textContent = level + 1; // Update level number
    challengeInput.value = levels[level]; // Set challenge text
  }

  


  function startTimer() {
    clearInterval(timerInterval); // Stop any existing timer
    timerInterval = setInterval(() => {
      timeLeft--; // Decrease timer
      timerElement.textContent = timeLeft; // Update timer display
      if (timeLeft <= 0) {
        endGame(false); // End the game if time runs out
      }
    }, 1000);
  }

  



  function endGame(won) {
    clearInterval(timerInterval); // Stop the timer
    if (won) {
      if (level === levels.length - 1) {
        messageElement.textContent = "Congratulations! You won the game!";
        submitBtn.classList.add("hidden");
      } else {
        messageElement.textContent = "Correct! Moving to the next level.";
        level++; // Move to the next level
        timeLeft = 45; // Reset timer
        startTimer();
        updateLevel();
      }
    } else {
      messageElement.textContent =
        timeLeft <= 0 ? "Time's up! You lost the game." : "Incorrect! Try again.";
      restartBtn.classList.remove("hidden");
      submitBtn.classList.add("hidden");
    }
  }
  


  submitBtn.addEventListener("click", () => {
    const reversedInput = userInput.value; // Get user input
    const correctReversedText = challengeInput.value.split("").reverse().join(""); // Reverse challenge text
    if (reversedInput === correctReversedText) {
      endGame(true); // Correct input
    } else {
      messageElement.textContent = "Incorrect! Try again.";
    }
  });
  
  restartBtn.addEventListener("click", startGame); // Restart the game


  startGame();







