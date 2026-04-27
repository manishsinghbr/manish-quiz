// Global Variables
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let questions = [];
let timeLeft = 60;
let timerInterval;
let totalTime = 60;
let selectedCategory = 9; // Default: General Knowledge
let selectedDifficulty = "medium";

// Category names mapping
const categoryNames = {
  9: "General Knowledge",
  23: "History",
  21: "Sports",
  22: "Geography",
  18: "Computers",
  17: "Science",
};

// LocalStorage Functions
function saveQuizResult(score, total, category, difficulty) {
  const percentage = Math.round((score / total) * 100);
  const quizData = {
    score: score,
    total: total,
    percentage: percentage,
    category: categoryNames[category] || "General Knowledge",
    difficulty: difficulty,
    date: new Date().toLocaleDateString(),
    timestamp: Date.now(),
  };

  // Get existing history
  let history = JSON.parse(localStorage.getItem("quizHistory")) || [];

  // Add new quiz to history
  history.unshift(quizData); // Add to beginning

  // Keep only last 10 quizzes
  if (history.length > 10) {
    history = history.slice(0, 10);
  }

  // Save to localStorage
  localStorage.setItem("quizHistory", JSON.stringify(history));

  // Update statistics
  updateStatistics();
}

function getQuizHistory() {
  return JSON.parse(localStorage.getItem("quizHistory")) || [];
}

function clearHistory() {
  if (confirm("Are you sure you want to clear all quiz history?")) {
    localStorage.removeItem("quizHistory");
    updateStatistics();
    displayHistory();
  }
}

function updateStatistics() {
  const history = getQuizHistory();

  if (history.length === 0) {
    document.getElementById("total-quizzes").textContent = "0";
    document.getElementById("avg-score").textContent = "0%";
    document.getElementById("best-score").textContent = "0%";
    document.getElementById("total-correct").textContent = "0";
    return;
  }

  // Total quizzes
  document.getElementById("total-quizzes").textContent = history.length;

  // Average score
  const avgPercentage =
    history.reduce((sum, quiz) => sum + quiz.percentage, 0) / history.length;
  document.getElementById("avg-score").textContent =
    Math.round(avgPercentage) + "%";

  // Best score
  const bestPercentage = Math.max(...history.map((quiz) => quiz.percentage));
  document.getElementById("best-score").textContent = bestPercentage + "%";

  // Total correct answers
  const totalCorrect = history.reduce((sum, quiz) => sum + quiz.score, 0);
  document.getElementById("total-correct").textContent = totalCorrect;
}

function displayHistory() {
  const history = getQuizHistory();
  const historyList = document.getElementById("history-list");

  if (history.length === 0) {
    historyList.innerHTML =
      '<p style="text-align: center; color: #999;">No quiz history yet</p>';
    return;
  }

  historyList.innerHTML = "";

  history.forEach((quiz) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";

    const scoreClass =
      quiz.percentage >= 70
        ? "#11998e"
        : quiz.percentage >= 50
        ? "#667eea"
        : "#ee0979";

    historyItem.innerHTML = `
                    <div>
                        <div class="history-category">${quiz.category} (${quiz.difficulty})</div>
                        <div class="history-date">${quiz.date}</div>
                    </div>
                    <div class="history-score" style="color: ${scoreClass}">${quiz.score}/${quiz.total} (${quiz.percentage}%)</div>
                `;

    historyList.appendChild(historyItem);
  });
}

// Decode HTML entities
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Select Category
function selectCategory(categoryId) {
  selectedCategory = categoryId;
  const cards = document.querySelectorAll(".category-card");
  cards.forEach((card) => {
    card.classList.remove("selected");
    if (parseInt(card.dataset.id) === categoryId) {
      card.classList.add("selected");
    }
  });
}

// Select Difficulty
function selectDifficulty(difficulty) {
  selectedDifficulty = difficulty;
  const buttons = document.querySelectorAll(".difficulty-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("selected");
    if (btn.dataset.level === difficulty) {
      btn.classList.add("selected");
    }
  });
}

// Fetch Questions from API
async function fetchQuestions() {
  try {
    showScreen("loading-screen");

    const url = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.response_code !== 0) {
      throw new Error("Failed to fetch questions");
    }

    // Transform API data to our format
    questions = data.results.map((q) => {
      const allOptions = [...q.incorrect_answers, q.correct_answer];
      const shuffledOptions = shuffleArray(allOptions);
      const correctIndex = shuffledOptions.indexOf(q.correct_answer);

      return {
        text: decodeHTML(q.question),
        options: shuffledOptions.map((opt) => decodeHTML(opt)),
        correct: correctIndex,
      };
    });

    return true;
  } catch (error) {
    console.error("Error fetching questions:", error);
    alert("Failed to load questions. Please try again.");
    showScreen("home-screen");
    return false;
  }
}

// Shuffle array function
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Start Quiz
async function startQuiz() {
  // Reset variables
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  timeLeft = totalTime;

  // Fetch questions from API
  const success = await fetchQuestions();
  if (!success) return;

  // Show quiz screen
  showScreen("quiz-screen");

  // Display first question
  displayQuestion();

  // Start timer
  startTimer();
}

// Display Question
function displayQuestion() {
  const question = questions[currentQuestionIndex];
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const questionCounter = document.getElementById("question-counter");
  const nextBtn = document.getElementById("next-btn");

  // Update question counter
  questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${
    questions.length
  }`;

  // Update progress bar
  const progress = (currentQuestionIndex / questions.length) * 100;
  document.getElementById("progress-fill").style.width = progress + "%";

  // Display question
  questionText.textContent = question.text;

  // Clear options
  optionsContainer.innerHTML = "";

  // Display options
  question.options.forEach((option, index) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = "option";
    optionDiv.textContent = option;
    optionDiv.onclick = () => selectOption(index);
    optionsContainer.appendChild(optionDiv);
  });

  // Disable next button
  nextBtn.disabled = true;

  // Trigger animation
  document.getElementById("question-container").style.animation = "none";
  setTimeout(() => {
    document.getElementById("question-container").style.animation =
      "questionFadeIn 0.5s ease-out";
  }, 10);
}

// Select Option
function selectOption(selectedIndex) {
  const options = document.querySelectorAll(".option");
  const question = questions[currentQuestionIndex];

  // Remove previous selection
  options.forEach((opt) => opt.classList.remove("selected"));

  // Add selection
  options[selectedIndex].classList.add("selected");

  // Store answer
  userAnswers[currentQuestionIndex] = selectedIndex;

  // Enable next button
  document.getElementById("next-btn").disabled = false;
}

// Next Question
function nextQuestion() {
  const question = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];
  const options = document.querySelectorAll(".option");

  // Show correct/incorrect
  if (selectedAnswer === question.correct) {
    options[selectedAnswer].classList.add("correct");
    score++;
  } else {
    options[selectedAnswer].classList.add("incorrect");
    options[question.correct].classList.add("correct");
  }

  // Disable all options
  options.forEach((opt) => opt.classList.add("disabled"));

  // Wait for animation then move to next
  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      finishQuiz();
    }
  }, 1500);
}

// Start Timer
function startTimer() {
  const timerText = document.getElementById("timer-text");
  const timerCircle = document.querySelector(".timer-circle");

  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft;

    // Update timer circle
    const degrees = (timeLeft / totalTime) * 360;
    timerCircle.style.background = `conic-gradient(#667eea ${degrees}deg, #e0e0e0 ${degrees}deg)`;

    // Change color when time is low
    if (timeLeft <= 10) {
      timerCircle.style.background = `conic-gradient(#ee0979 ${degrees}deg, #e0e0e0 ${degrees}deg)`;
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      finishQuiz();
    }
  }, 1000);
}

// Finish Quiz
function finishQuiz() {
  clearInterval(timerInterval);

  const percentage = Math.round((score / questions.length) * 100);

  // Save quiz result to localStorage
  saveQuizResult(score, questions.length, selectedCategory, selectedDifficulty);

  // Update result screen
  document.getElementById(
    "score-display"
  ).textContent = `${score}/${questions.length}`;
  document.getElementById("percentage").textContent = `${percentage}%`;

  // Set result icon and message
  let icon, title, message;
  if (percentage >= 80) {
    icon = "🏆";
    title = "Outstanding!";
    message = "You're a quiz master! Excellent performance!";
  } else if (percentage >= 60) {
    icon = "🎉";
    title = "Great Job!";
    message = "Well done! You have a good grasp of the material!";
  } else if (percentage >= 40) {
    icon = "👍";
    title = "Good Effort!";
    message = "Not bad! Keep practicing to improve your score!";
  } else {
    icon = "📚";
    title = "Keep Learning!";
    message = "Don't give up! Review the material and try again!";
  }

  document.getElementById("result-icon").textContent = icon;
  document.getElementById("result-title").textContent = title;
  document.getElementById("result-message").textContent = message;

  // Update statistics and history
  updateStatistics();
  displayHistory();

  // Show result screen
  showScreen("result-screen");
}

// Restart Quiz
function restartQuiz() {
  showScreen("home-screen");
}

// Show Screen
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach((screen) => screen.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

// Initialize statistics on page load
window.addEventListener("load", () => {
  updateStatistics();
  displayHistory();
});
