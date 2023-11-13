//set up variables that reference elements in the html file
var startBtn = document.querySelector("#start");
var viewBtn = document.querySelector("#viewscores");
var questbox = document.querySelector("#question");
var smolbox = document.getElementById('smolbox');
var answerbox = document.getElementById('answer');
var submitBtn = document.querySelector('#submit');
var initialbox = document.querySelector('#initial');
var scorebox = document.querySelector('#scorebox')


//event listeners for all the buttons. first one tells the start button to keep time and display the questions, the second tells the buttons generated in smolbox to check the given answer, and the third acts as a toggle for the score list attached to the view scores button
startBtn.addEventListener("click", function () {
    keepTime();
    displayQuestion();
});
smolbox.addEventListener("click", checkAnswer)
viewBtn.addEventListener("click", function() {
    var scoreList = document.getElementById('scoredisplay');

    if (scoreList.style.display === 'block') {
        scoreList.style.display = 'none';
    } else {
        scoreList.style.display = 'block';
    }
});

//sets up the timer and tells it to give the user a score of 0 when time runs out and bypasses the submitScore function
var timer = document.querySelector(".time");

var timeLeft = 30;
var score = timeLeft;
var timeInterval;

function keepTime() {
    timer.textContent = timeLeft + " seconds left.";

    timeInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = timeLeft + " seconds left.";

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timer.textContent = "yr score is 0";
            reset();
        }
    }, 1000);
}

//object with question details including an array for the answers and an index value for the correct answer
var questions = [{
    question: "first question",
    answers: ['no', 'yes', 'maybe', 'ok'],
    correct: 1
}, {
    question: "second question",
    answers: ['idk', 'i guess', 'no way', 'yuh'],
    correct: 2
}]

//establishes position in object as 0
var position = 0

//function to display a question at the position established by the position variable along with its possible answers and remove the start button display on click
function displayQuestion() {
    questions.position = 0
    smolbox.innerHTML = '';
    questbox.textContent = questions[position].question;
    startBtn.style.display = 'none';
    displayAnswers()
}

//function to display the answers as buttons, increasing the index at each iteration
//the index starts at 0, as long as the index is less than the length of the answers element of the questions object
//answer button variable is a button
//the text content of the answerbutton is determined by the position of the index of the answers element fo the questions object
//the attribute of the answer button is set to the data index by the current index positio.normalize
//smolbox is appended with the details of variable, answerButton
function displayAnswers() {
    for (let index = 0; index < questions[position].answers.length; index++) {
        var answerButton = document.createElement('button');
        answerButton.textContent = questions[position].answers[index];
        answerButton.setAttribute('data-index', index);
        smolbox.appendChild(answerButton)
    }
}

//function to check answer is set to an event on the answer buttons to check if the answer chosen matches the correct answer set in the questions object
//if the answer is correct, the index position is pushed forward, if the answer is incorrect, two seconds are decreased from the time left
//if position exceeds or is equal to the length of the questions object, then it ends the game by displaying the score and, after a moment, runs submitScore
function checkAnswer(event) {
    var button = event.target;
    var index = button.getAttribute('data-index');

    if (index == questions[position].correct) {
        answerbox.textContent = "correct";
    } else {
        answerbox.textContent = "incorrect";
        timeLeft--;
        timeLeft--;
        timer.textContent = timeLeft + " seconds left.";
    }
    position++;
    if (position >= questions.length) {
        clearInterval(timeInterval);
        timer.textContent = "yr score is " + timeLeft;
        
        setTimeout(submitScore, 1000);
    } else {
        displayQuestion();
    }
}

//function to submit scores by checking if a string was entered, if not, it runs displayMessage which returns to submitScore, if a string was entered, the function checks if a score already exists and then puts into into local storage where the name and score are split before and then later rejoined as a distinct item in the array for later display
//the start button is told to reappear, show scores is run to initialize the scoreboard, and the reset function is called to reset all the display parts
function submitScore() {
    var name = prompt("Enter yr initials", "");
    var score = timeLeft;

    if (name === "") {
        displayMessage();

    } else {
        var oldScores = localStorage.getItem("scores");
        var scoresArray;

        if (oldScores) {
            scoresArray = oldScores.split(',');
        } else {
            scoresArray = [];
        }
        scoresArray.push(name + ":" + score);

        localStorage.setItem("scores", scoresArray.join(','));

        startBtn.style.display = 'initial';
        
    }
    showScore();
    reset();
}

//an alert to ask you to please enter your initials
function displayMessage() {
    alert("plz enter yr initials!");
    submitScore();
}

//function to pull the matching scores and initials from localStorage, parsing them and fitting each one backtogether to display as new list items inside scoredisplay
function showScore() {
    var oldScores = localStorage.getItem("scores") || "";
    var scoresArray;

    if (oldScores) {
        scoresArray = oldScores.split(',');
    } else {
        scoresArray = [];
    }

    var scoreList = document.getElementById('scoredisplay');

    scoreList.innerHTML = '';

    scoresArray.forEach(function (scoreString) {
        var [name, score] = scoreString.split(':');

        var scoreEntry = document.createElement('li');
        scoreEntry.textContent = name + "   " + score;

        scoreList.appendChild(scoreEntry);
    });
}

//function to reset all the moving parts including the position of the index in the questions object and the timer
function reset() {
    position = 0;
    timeLeft = 30;
    questbox.textContent = "";
    smolbox.textContent = "";
    answerbox.textContent = "";
}
