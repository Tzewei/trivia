console.log("running!");

var questArr = ['1 + 1 = 2', '2 + 2 = 4', '3 + 2 = 6', '4 + 2 = 8', '5 + 2 = 7', '6 + 8 = 14', '7 - 3 = 3', '8 x 2 = 18', '9 % 9 = 0', '10 - 8 = 1'];
var ansArr = ['t', 't', 'f', 'f', 't', 't', 'f', 'f', 't', 'f'];

var selectedQuest = [0,1,2,3,4,5,6,7,8,9];  //list of questions to be asked
var selectedAns = [0,1,2,3,4,5,6,7,8,9];
var totalQuest = questArr.length;
var choice;
var currentQuest = 0;
var p1Score = 0;
var p2Score = 0;
var playerTurn = 1; // 1 player1; 2 = player2

questionGen();
displayQuestion();
initButton();
console.log(selectedQuest);
console.log(selectedAns);
console.log(totalQuest);

function main() {
    var nextButtonPtr = document.getElementById('nextButton');
    checkAnswer();

    if (isGameOver()) {
        stopButton();
        nextButtonPtr.removeEventListener('click', nextQuest);
        whoWon();
        restart();
    } //game over

}


function nextQuest(event) {
    var holdID = event.target.id;
    var checkAnswerPtr = document.getElementById('displayAnswer');
    var trueButtonPtr = document.getElementById('trueButton');
    var falseButtonPtr = document.getElementById('falseButton');

    checkAnswerPtr.style.background = '#F4F0BB';
    checkAnswerPtr.style.color = 'black';

    displayAnswer('Select True or False');
    currentQuest++;
    playTurn();
    displayQuestion();
    console.log('In nextQuest, Current Question :' + currentQuest);
    initButton();
    trueButtonPtr.style.display='inline-block';
    falseButtonPtr.style.display='inline-block';

}

function stopButton() {
    var trueButtonPtr = document.getElementById('trueButton');
    var falseButtonPtr = document.getElementById('falseButton');

    trueButtonPtr.removeEventListener('click', getInput);
    falseButtonPtr.removeEventListener('click', getInput);
}


//It should restart the game so it can be played again.*/
function restart() {

    alert('Press Restart button to continue');
}

//It should return 0 if the game is not yet finished. Else it should return either 1 or 2 depending on which player won. It should return 3 if the game is a draw.
function whoWon() {
    if (p1Score > p2Score) {
        displayAnswer('Game Completed. Winner is Player 1!');
    } else displayAnswer('Game Completed. Winner is Player 2!');
}

//It should return a true or false if the quiz is over.
function isGameOver() {
    console.log('currentQuest :' + currentQuest + ' totalQuest :' + totalQuest);
    if (currentQuest === (totalQuest-1)) {
        return true;
    }
    return false;
}

//It should return an integer that is the zero-based index the correct answer for the currrent question
function checkAnswer() {
    console.log('in checkAnswer');
    var checkAnswerPtr = document.getElementById('displayAnswer');
    var nextButtonPtr = document.getElementById('nextButton');

    if (choice == ansArr[ selectedQuest[currentQuest] ]) {
        if (playerTurn === 1) p1Score++;
        else p2Score++;

        displayAnswer('The answer is Correct!!!');
        checkAnswerPtr.style.background = 'yellow';
        displayScore();
    } else {
        displayAnswer('The answer is Wrong!!!');
        checkAnswerPtr.style.background = 'red';
        checkAnswerPtr.style.color = 'white';
        displayScore();
    }

    stopButton();
    nextButtonPtr.style.display='inline-block';


}

function displayAnswer(answer) {
    var answerPtr = document.getElementById('displayAnswer');
    answerPtr.innerHTML = answer;
}

function displayScore() {
    var score1Ptr = document.getElementById('p1ScoreBox');
    var score2Ptr = document.getElementById('p2ScoreBox');
    score1Ptr.innerHTML = 'Player 1 Score is ' + p1Score + '.';
    score2Ptr.innerHTML = 'Player 2 Score is ' + p2Score + '.';
}

/*It should take a single integer, which specifies which choice the current player wants to make. It should return a boolean true/false if the answer is correct.*/
function playTurn() {
    var playerStatusPtr = document.getElementById('playerStatus');
    if (playerTurn === 1) {
        playerTurn = 2;
        playerStatusPtr.style.background = '#febbbb';
    } else {
        playerTurn = 1;
        playerStatusPtr.style.background = '#b2e1ff';

    }
    console.log('in playTurn player ' + playerTurn);
}

function displayQuestion() {
    var playerStatusPtr = document.getElementById('playerStatus');
    var questdisplayPtr = document.getElementById('displayQuest');
    var questTextdisplayPtr = document.getElementById('displayQuestText');
    console.log('in displayQuestion playTurn' + playerTurn);
    playerStatusPtr.innerHTML = 'Player ' + playerTurn;
    questdisplayPtr.innerHTML = 'Question ' + (currentQuest + 1) + ': ';
    questTextdisplayPtr.innerHTML = questArr[ selectedQuest[currentQuest] ];
}

function questionGen() {

  var j, x, count;
  for (count = selectedQuest.length; count; count--) {
    j = Math.floor(Math.random() * count);
    x = selectedQuest[count - 1];
    selectedQuest[count - 1] = selectedQuest[j];
    selectedQuest[j] = x;
  }

  selectedAns = selectedQuest;

  console.log(selectedQuest);
  console.log(selectedAns);


    /*
    function shuffle (a) {
      var j, x, i;
      for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
    }
    */
    /*for (var i = 0; i < totalQuest; i++) {
        //selectedQuest[i] = Math.floor( ( 10* Math.random() ) );
        selectedQuest[i] = i;
    }*/
}

//activate the buttons
function initButton() {
    var restartButPtr = document.getElementById('restartButton');
    var trueButtonPtr = document.getElementById('trueButton');
    var falseButtonPtr = document.getElementById('falseButton');
    var nextButtonPtr = document.getElementById('nextButton');
    trueButtonPtr.addEventListener('click', getInput);
    falseButtonPtr.addEventListener('click', getInput);
    restartButPtr.addEventListener('click', restartButton);
    nextButtonPtr.addEventListener('click', nextQuest);

    nextButtonPtr.style.display='none';
}

//get the input from the buttons
function getInput(event) {
    var buttonID = event.target.id;
    var trueButtonPtr = document.getElementById('trueButton');
    var falseButtonPtr = document.getElementById('falseButton');

var button = document.getElementById(buttonID);

    if (buttonID === 'trueButton') choice = 't';
    else choice = 'f';

trueButtonPtr.style.display='none';
falseButtonPtr.style.display='none';

    main();
}

function restartButton(event) {
    var restartID = event.target.id;
    var trueButtonPtr = document.getElementById('trueButton');
    var falseButtonPtr = document.getElementById('falseButton');

    console.log('in Reset button');

    selectedQuest = []; //list of questions to be asked
    totalQuest = 4;
    currentQuest = 0;
    p1Score = 0;
    p2Score = 0;
    playerTurn = 1; // 1 player1; 2 = player2

    questionGen();
    displayQuestion();
    displayAnswer('Answer True or False');
    displayScore();
    trueButtonPtr.style.display='inline-block';
    falseButtonPtr.style.display='inline-block';

    initButton();
}

//It should return an integer that is the number of questions in a game
//function numberOfQuestions(totalQuest){
//console.log('In numberOfQuestions()');
//alert("Choose number of question for the challenge");


/*
numberOfChoices()
It should return an integer that is the number of choices for the current question


//It should return an integer that is the zero-based index of the current question in the quiz
//function currentQuestion(){}
*/
