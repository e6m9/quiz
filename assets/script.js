//take inventory of what you have, whenever you start something new
//don't forget object, array, 
// var bigbox = document.getElementById('bigbox');
// var quest = document.querySelector(".question");

//set up variables that reference elements in the html file
var startBtn = document.querySelector("#start");
var questBox = document.querySelector("#question");
var smolbox = document.getElementById('smolbox');
var answerBox = document.getElementById('answer');

//event listeners for all the buttons. first one tells the start button to keep time and display the questions
startBtn.addEventListener("click", keepTime);
startBtn.addEventListener("click", displayQuestion) //excercise that makes things disappear
smolbox.addEventListener("click", checkAnswer);
// var highscore = document.getElementById('highscore');

//sets up timer
var timer = document.querySelector(".time");

var timeLeft = 30;

function keepTime() {
    var timeInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = timeLeft + " seconds left.";

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            displayMessage();
        }
    }, 1000);
}

//variables for questions
q1 = "first question";
q2 = "second question";

//object with question details
var questions = [{question: q1,
answers: ['no', 'yes', 'maybe', 'ok'],
correct: 1}, {question: q2,
    answers: ['idk', 'i guess', 'no way', 'yuh'],
    correct: 2}]

//establishes position in object as 0
var position = 0

//function to display a question at the position established by the position variable
function displayQuestion() {
    smolbox.innerHTML = '';
    questBox.textContent = questions[position].question;
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
//if position exceeds the length of the questions object, then it ends the game
function checkAnswer(event) {
    var button = event.target;
    var index = button.getAttribute('data-index');
    console.log(index)
    if(index == questions[position].correct){
        answerBox.textContent = "correct";
    } else {
        answerBox.textContent = "incorrect";
        timeLeft--;
        timeLeft--;
        timer.textContent = timeLeft + " seconds left.";
    }
    position++;
    if (position == questions.length) {
        //endgame to input high score
    }
    displayQuestion();
}

// var score = timeLeft;
// function displayMessage() {
    // displays score and high score input form or a button to go to that
// }