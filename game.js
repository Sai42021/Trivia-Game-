const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progress-text");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [

{
    question: "The university’s vision is to be a premier technological university known for knowledge creation, innovation, and entrepreneurship.",
    choice1: "TRUE",
        choice2: "FLASE",
        choice3: "TRUE",
    answer: 1,
    },

    {
        question: "The university’s values are to be an engaged and responsive university, meeting the needs of stakeholders through excellent education, applied research, innovation, and service.",
        choice1: "TRUE",
        choice2: "FALSE",
        answer: 2,
    },
    
    {
        question: "How many thematic areas are in the strategic plan?",
        choice1: "3",
        choice2: "6",
        choice3: "4",
        choice4: "NONE",
        answer: 1,
    },
    
    {
        question: "There are 20 Addendums in the strategic plan?",
        choice1: "FALSE",
        choice2: "TRUE",
        answer: 2,
    },

    {
        question: "GOAL three (3) of the strategic plan is Securing institutional efficiency and sustainability.",
        choice1: "TRUE",
        choice2: "FALSE",
        answer: 1,
    },

    {
        question: "GOAL one (1) of the strategic plan is Driving human-centric digital transformation for Industry 4.0 and beyond.",
        choice1: "FALSE",
        choice2: "TRUE",
        answer: 1,
    },

    {
        question: "Systems is one of the thematic areas of the strategic plan.",
        choice1: "TRUE",
        choice2: "FALSE",
        answer: 1,
    },

    {
        question: "NUST intends on projecting it’s competitive advantage through a robust and supportive learning environment.",
        choice1: "FALSE",
        choice2: "TRUE",
        answer: 2,
    },

    {
        question: "Which of the following is not a way NUST will project its competitive advantage?",
        choice1: "Signature programmes, projects, and services.",
        choice2: "Strengthened leadership in modern pedagogy.",
        choice3: "Ensuring institutional growth and operational sustainability.",
        choice4: "Vigorous partnerships and networks.",
        answer: 3,
    },
    
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 9;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion()  
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign("end.html")
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice', number]
    })
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();

        }, 1000)
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame()