// Define all UI elements needed here
var startButton = document.getElementById('startTest');
var questionContainer = document.getElementById('questionContainer');
var startContainer = document.getElementById('startContainer');
var resultContainer = document.getElementById('resultContainer');
var highScoreContainer = document.getElementById('highScoreContainer');
var lastAnswerEle = document.getElementById('lastAnswer');
var initialEle = document.getElementById('initial');
var headingEle = document.getElementById('heading');
var timerEle = document.getElementById('timer');
var rankingEle = document.getElementById('ranking');
var submitBtn = document.getElementById('submitInitial');

// Working storage
var currentQuestionId = 1;
var score = 0;
var timer = 60;
var highScores = [];

var quizTitle = 'Quiz';

// Add event listener to start test button
startButton.addEventListener('click', startTest);

// All preset questions here
const questions = [{
        id: 1,
        question: 'Who developed the Java Programming Language in 1991?',
        choices: ['James Gosling', 'Dennis Ritchie', 'Kenn Thompson', 'Bjarne Stroustrup'],
        correctAnswer: 0,
    },
    {
        id: 2,
        question: 'Which of the following is NOT an example of a Java Keyword?',
        choices: ['class', 'int', 'sum', 'new'],
        correctAnswer: 2,
    },
    {
        id: 3,
        question: 'Which of the following is an example of a correct comment in Java Programming?',
        choices: ['// This is a comment', '/* This is an example of a comment */', '/**This is an example of a comment*/', 'All of the above'],
        correctAnswer: 3,
    },
    {
        id: 4,
        question: 'Which of the following is NOT true about an Identifier?',
        choices: ['An Identifier can start with a letter.', 'An Identifier can start with a number.', 'An Identifier can start with a dollar sign “$” symbol.', 'An Identifier can start with an underscore “_” symbol.'],
        correctAnswer: 1,
    },
    {
        id: 5,
        question: 'Which of the following is a correct statement in Java that displays the “Hello World” string?',
        choices: ['System.out.Print(“Hello World”);', 'system.out.print(“Hello World”);', 'System.out.println(“Hello World”);', 'System.Out.println(“Hello World”);'],
        correctAnswer: 0,
    },
];

// Start the test
function startTest() {
    startContainer.classList.add('hide');
    questionContainer.classList.remove('hide');

    constructQuestion(currentQuestionId);

    // Set initial timer
    timerEle.innerText = timer;
    // Every second refresh the timer element to show the updated timer value
    const timeValue = setInterval(() => {
        timer--;
        timerEle.innerText = timer;
        if (timer <= 0) {
            // clear timer when reaching zero
            clearInterval(timeValue);
            showResult();
        }
    }, 1000);
}

// construct question UI based on question id
function constructQuestion(id) {
    var currentQ = getCurrentQ(id);

    var questionElement = document.getElementById('quiz_question');

    questionElement.innerText = currentQ.question;

    var answer1Ele = document.getElementById('answer1');
    var answer2Ele = document.getElementById('answer2');
    var answer3Ele = document.getElementById('answer3');
    var answer4Ele = document.getElementById('answer4');

    answer1Ele.innerText = currentQ.choices[0];
    answer2Ele.innerText = currentQ.choices[1];
    answer3Ele.innerText = currentQ.choices[2];
    answer4Ele.innerText = currentQ.choices[3];
}

// Return the question object based on id
function getCurrentQ(id) {
    var currentQ;
    // loop thru questions array to find the matching question by id
    for (let question of questions) {
        if (id === question.id) {
            currentQ = question;
            break;
        }
    }
    return currentQ;
}

// Check the submitted answer if it's the correct answer
function checkAnswer(value) {
    var currentQ = getCurrentQ(currentQuestionId);
    if (value === currentQ.correctAnswer) {
        lastAnswerEle.innerText = 'Correct!';
        score += 20;
    } else {
        lastAnswerEle.innerText = 'Wrong Answer!';
        timer -= 12;
    }

    lastAnswerEle.className = 'card-footer-answer';
    // construct next question
    if (currentQuestionId < questions.length) {
        currentQuestionId++;
        constructQuestion(currentQuestionId);
    } else {
        // no more question
        timer = 1;
        showResult();
    }
}

// Show result
function showResult() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');

    var scoreEle = document.getElementById('score');
    scoreEle.innerText = 'Your final score is ' + score + '.';

    timerEle.innerText = '';

    headingEle.innerText = 'All done!';

    // Autofocus to input text box so can input right away
    initialEle.focus();
}

// Check initial if it's empty and enable/disable submit button
function checkEmpty() {
    var initial = initialEle.value;

    if (initial.trim().length > 0) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

function submitInitial() {
    var initial = initialEle.value;

    var currentScore = { initial: initial, score: score };
    highScores.push(currentScore);

    // Sort history array by score descending order
    highScores.sort((item1, item2) => {
        return item2.score - item1.score;
    });

    var rankList = [];

    // Construct history UI list
    for (let i = 0; i < highScores.length; i++) {
        var item = `<div class='highScore'><label>${i + 1}. ${highScores[i].initial} - ${
      highScores[i].score
    } </label></div>`;
        rankList.push(item);
    }
    // Need to use join here otherwise will show extra comma
    rankingEle.innerHTML = rankList.join('');

    headingEle.innerText = 'High Scores';
    resultContainer.classList.add('hide');
    highScoreContainer.classList.remove('hide');
}

function goBack() {
    // Reset all working variables to initial value to start over
    currentQuestionId = 1;
    score = 0;
    timer = 60;

    lastAnswerEle.innerText = '';
    lastAnswerEle.classList.remove('card-footer-answer');
    headingEle.innerText = quizTitle;
    initialEle.value = '';
    submitBtn.disabled = true;

    questionContainer.classList.remove('hide');
    resultContainer.classList.add('hide');
    highScoreContainer.classList.add('hide');

    timerEle.innerText = timer;
    const timeValue = setInterval(() => {
        timer--;
        timerEle.innerText = timer;
        if (timer <= 0) {
            clearInterval(timeValue);
            showResult();
        }
    }, 1000);
}

function resetHighScore() {
    // Clear high score history array
    highScores = [];
    rankingEle.innerHTML = '';
}