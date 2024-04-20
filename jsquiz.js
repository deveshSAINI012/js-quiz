const quizData = [
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Canberra", "Melbourne", "Brisbane"],
        answer: "Canberra"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Ernest Hemingway", "J.K. Rowling", "Harper Lee", "Stephen King"],
        answer: "Harper Lee"
    },
    {
        question: "What is the chemical symbol for silver?",
        options: ["Si", "Ag", "Sl", "Sv"],
        answer: "Ag"
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Who painted the 'Starry Night'?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Vincent van Gogh"
    }
];

const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitBtn = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectAnswer(option));
        optionsElement.appendChild(optionElement);
    });
}

function selectAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    userAnswers.push(selectedOption);
    if (selectedOption === currentQuestion.answer) {
        resultElement.textContent = 'Correct!';
        resultElement.classList.add('correct');
        score++;
    } else {
        resultElement.textContent = 'Incorrect!';
        resultElement.classList.add('incorrect');
    }
    scoreElement.textContent = `Score: ${score} / 5`;
    submitBtn.disabled = true;
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        resultElement.textContent = '';
        resultElement.classList.remove('correct', 'incorrect');
        submitBtn.disabled = false;
    } else {
        endQuiz();
    }
}

function endQuiz() {
    let resultsHTML = "<h2>Results</h2>";
    quizData.forEach((question, index) => {
        resultsHTML += `<p>Question ${index + 1}: ${question.question}</p>
                        <p>Correct Answer: ${question.answer}</p>
                        <p>Your Answer: <span class="${question.answer === userAnswers[index] ? 'correct' : 'incorrect'}">${userAnswers[index]}</span></p>`;
    });
    quizContainer.innerHTML = resultsHTML;
}

submitBtn.addEventListener('click', nextQuestion);

loadQuestion();