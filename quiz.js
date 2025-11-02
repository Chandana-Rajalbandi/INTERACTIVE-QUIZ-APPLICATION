const questions = [
  { question: "Capital of India?", options: ["Mumbai", "Delhi", "Kolkata", "Chennai"], answer: 1 },
  { question: "HTML stands for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperLoop Machine Language", "None"], answer: 0 },
  { question: "CSS is used for?", options: ["Styling", "Programming", "Database", "None"], answer: 0 },
  { question: "JavaScript is a ___ language?", options: ["Compiled", "Interpreted", "Markup", "None"], answer: 1 },
  { question: "React is a ___?", options: ["Library", "Framework", "Language", "Tool"], answer: 0 },
  { question: "Node.js runs on?", options: ["Browser", "Server", "Mobile", "None"], answer: 1 },
  { question: "MongoDB is a ___?", options: ["SQL DB", "NoSQL DB", "Spreadsheet", "None"], answer: 1 },
  { question: "Which extension is used for JavaScript?", options: [".html", ".py", ".lsx", ".js"], answer: 3 },
  { question: "Which is a JS framework?", options: ["Laravel", "Django", "Angular", "Flask"], answer: 2 },
  { question: "Which is used for payments?", options: ["Stripe", "React", "Node", "MongoDB"], answer: 0 }
];

document.getElementById("welcome").innerText = `Welcome, ${localStorage.getItem("username")}!`;

const quizSection = document.getElementById("quiz-section");

// Timer setup
let timerSeconds = 0;
const timerDisplay = document.createElement("p");
timerDisplay.id = "timer";
timerDisplay.style.fontWeight = "bold";
timerDisplay.style.marginBottom = "20px";
quizSection.before(timerDisplay);

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

const timerInterval = setInterval(() => {
  timerSeconds++;
  timerDisplay.innerText = `⏱️ Time Elapsed: ${formatTime(timerSeconds)}`;
}, 1000);

// Render questions
questions.forEach((q, index) => {
  const questionBlock = document.createElement("div");
  questionBlock.className = "question-block";
  questionBlock.id = `question-${index}`;

  const questionHTML = `<p><strong>Q${index + 1}:</strong> ${q.question}</p>` +
    q.options.map((opt, i) =>
      `<label class="option-label" id="q${index}-opt${i}">
        <input type="radio" name="q${index}" value="${i}"> ${opt}
      </label>`
    ).join("");

  questionBlock.innerHTML = questionHTML + `<div class="feedback" id="feedback-${index}"></div>`;
  quizSection.appendChild(questionBlock);
});

// Submit handler
document.getElementById("quiz-form").addEventListener("submit", function(e) {
  e.preventDefault();
  clearInterval(timerInterval); // Stop timer
  let score = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const feedback = document.getElementById(`feedback-${index}`);
    let userAnswer = selected ? parseInt(selected.value) : null;

    q.options.forEach((_, i) => {
      const label = document.getElementById(`q${index}-opt${i}`);
      label.classList.remove("correct", "incorrect");
    });

    if (userAnswer === q.answer) {
      score++;
      document.getElementById(`q${index}-opt${userAnswer}`).classList.add("correct");
      feedback.innerText = "✅ Correct";
    } else if (userAnswer !== null) {
      document.getElementById(`q${index}-opt${userAnswer}`).classList.add("incorrect");
      document.getElementById(`q${index}-opt${q.answer}`).classList.add("correct");
      feedback.innerText = `❌ Incorrect. Correct answer: ${q.options[q.answer]}`;
    } else {
      document.getElementById(`q${index}-opt${q.answer}`).classList.add("correct");
      feedback.innerText = `❌ No answer selected. Correct answer: ${q.options[q.answer]}`;
    }

    document.querySelectorAll(`input[name="q${index}"]`).forEach(input => input.disabled = true);
  });

  const results = document.getElementById("results");
  results.innerHTML = `<h3>Your Score: ${score} / ${questions.length}</h3><p>Total Time: ${formatTime(timerSeconds)}</p>`;

  document.getElementById("retake-btn").style.display = "inline-block";
});

// Retake button handler
document.getElementById("retake-btn").addEventListener("click", () => {
  location.reload(); // Reloads the page to reset everything
});