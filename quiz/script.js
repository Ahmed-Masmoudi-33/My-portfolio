const questions = [
    {
        question: "What comes next in the series? 1, 1, 2, 3, 5, 8, ...",
        options: ["10", "12", "13", "15"],
        answer: 2
    },
    {
        question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
        options: ["0°", "7.5°", "15°", "30°"],
        answer: 0
    },
    {
        question: "Find the missing number: 6, 11, 21, 36, 56, ...",
        options: ["71", "91", "81", "86"],
        answer: 2
    },
     {
        question: "If a cat and a half catch a rat and a half in a minute and a half, how many cats are needed to catch 100 rats in 50 minutes?",
        options: ["50", "75", "100", "150"],
        answer: 3
    },
    {
        question: "You are in a dark room with a box of matches. You have a candle, a lantern, and a fireplace. Which do you light first?",
        options: ["Candle", "Lantern", "Fireplace", "The match"],
        answer: 3
    },
    {
        question: "What comes next in the pattern: A, B, D, G, K, ...",
        options: ["P", "O", "N", "M"],
        answer: 0
    },
    {
        question: "A farmer has 17 sheep, and all but 9 run away. How many sheep does the farmer have left?",
        options: ["0", "8", "9", "17"],
        answer: 2
    },
    {
        question: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
        options: ["$0.05 ", "$0.10", "$0.15", "$0.20"],
        answer: 0
    },
    {
        question: "What comes next in the pattern: 2, 6, 12, 20, 30, ...?",
        options: ["40", "42", "45", "48"],
        answer: 1
    },
    {
        question: "A clock takes 12 seconds to strike 6. How long does it take to strike 12?",
        options: ["22 seconds", "24 seconds ", "26 seconds", "28 seconds"],
        answer: 1
    },
    {
        question: "If a cube has a side length of 3, what is the total surface area of the cube?",
        options: ["9", "18", "27", "54"],
        answer: 3
    },
    {
        question: "A man has 6 sons. Each son has 1 sister. How many children does the man have?",
        options: ["6", "7", "12", "13"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 120;
let timerInterval;
let progress = 0;

const questionElem = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer');
const scoreElem = document.getElementById('score');
const highScoreElem = document.getElementById('high-score');
const timeElem = document.getElementById('time');
const progressElem = document.getElementById('progress');
const startButton = document.getElementById('start');
let userAnswers = [];

function startGame() {
    score = 0;
    answerButtons.forEach(btn => btn.disabled = false);
    currentQuestionIndex = 0;
    userAnswers = [];
    scoreElem.innerText = score;
    startButton.disabled = true;
    timeLeft = 120;
    timeElem.innerText = timeLeft;
    timerInterval = setInterval(updateTimer, 1000);
    loadQuestion();
    hideResults();
}

function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    questionElem.innerText = questionData.question;

    const answers = questionData.options;

    answerButtons.forEach((btn, index) => {
        btn.innerText = answers[index];
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    });

    progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressElem.style.width =`${progress}%`; //progress+"%"
}

function updateTimer() {
    timeLeft--;
    timeElem.innerText = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        endGame();
    }
}

function checkAnswer(selectedIndex) {
    const questionData = questions[currentQuestionIndex];

    if (selectedIndex === questionData.answer) {
        answerButtons[selectedIndex].classList.add('correct');
        score++;
    } else {
        answerButtons[selectedIndex].classList.add('incorrect');
    }

    scoreElem.innerText = score;
    answerButtons.forEach(btn => btn.disabled = true);
    userAnswers.push(selectedIndex);
    setTimeout(nextQuestion, 1000);

  
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    alert(`Game Over! Your score: ${score}`);
    const highScore = localStorage.getItem('highScore') || 0;
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        highScoreElem.innerText = score;
    }
    startButton.disabled = false;
    showResults();
}
function showResults() {
  const resultsContainer = document.getElementById("results");
  // Populate the results container with content
  let resultsHTML = `<h2>Quiz Results</h2><p>Your Score: ${score}/${questions.length}</p>`;
  resultsHTML += "<ol>";

  questions.forEach((question, index) => {
    const isCorrect = userAnswers[index] === question.answer;
    resultsHTML += `
      <li>
        <strong>${question.question}</strong><br>
        Your Answer: <span style="color: ${isCorrect ? 'green' : 'red'}">
          ${question.options[userAnswers[index]] || "No answer"}
        </span><br>
        Correct Answer: <span style="color: green">${question.options[question.answer]}</span>
      </li>`;
  });

  resultsHTML += "</ol>";
  resultsContainer.innerHTML = resultsHTML;

  // Show the results container
  resultsContainer.style.visibility = "visible"; // Make it visible
  resultsContainer.style.display = "block";     // Ensure it takes up space
}

function hideResults() {
  const resultsContainer = document.getElementById("results");

/*   Hide the results container */
  resultsContainer.style.visibility = "hidden"; // Hide it
  resultsContainer.style.display = "none";      // Remove it from layout
} 
// main()
answerButtons.forEach(btn => btn.disabled = true);

if (localStorage.getItem('highScore')) {
  highScoreElem.innerText = localStorage.getItem('highScore');
}
startButton.addEventListener('click', startGame);
answerButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => checkAnswer(index));
});