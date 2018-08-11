// VARIABLES

var wins = 0;
var losses = 0;
var answerPool = ["Tom Brady", "Andrew Luck", "Aaron Rodgers", "Odell Beckham"]
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var emptyAnswer;
var guessesLeft;
var lettersGuessed;
var emptyAnsArr = [];
var answer;
var guessRight;
var wrongLetters;
var winsText = document.getElementById("win-count");
var lossText = document.getElementById("loss-count");
var guessesText = document.getElementById("guesses-left");
var progText = document.getElementById("current-progress");
var lettersText = document.getElementById("letters-guessed");

// FUNCTIONS

// Pull answer from the pool of available options

function getNewAnswer() {
    answer = answerPool[Math.floor(Math.random() * answerPool.length)]
    return answer;
}

//function to create an empty string with _ instead of letters, preserving the space between first and last name
function emptyAns(){
    emptyAnsArr = [];
    for (var i = 0; i < answer.length; i++){
    if(alphabet.indexOf(answer[i]) >= 0){
        emptyAnsArr.push("_");
    } else{
        emptyAnsArr.push(" ");
    }
    }
}


function arrToStr(arg) {
    var y = "";
    for(i=0; i < arg.length; i++){
        y += arg[i];
    }
    return y;

}


function guess(){
    document.onkeyup = function(event) {
    keyPress = event.key;
        if (alphabet.indexOf(keyPress) >= 0){ 
            if (lettersGuessed.indexOf(keyPress) == -1){
                guessRight = false;
                lettersGuessed += keyPress;
                for (i=0; i < answer.length; i++){
                    if(keyPress == answer[i] || keyPress.toUpperCase() == answer[i]){
                        emptyAnsArr[i] = answer[i];  
                        guessRight = true;              
                    }

                }
                if(guessRight == false){
                    guessesLeft--;
                    wrongLetters += keyPress;
                }
                currentProg = arrToStr(emptyAnsArr);
                progText.innerHTML = currentProg;
                lettersText.innerHTML = wrongLetters;
                guessesText.innerHTML = guessesLeft;
            }
            else {
                alert("You already guessed that")
            }
        }
        else {
            alert("Please choose a valid letter");
        }
        if(currentProg == answer){
            setTimeout(gameWin(), 1000);
        }
        if(guessesLeft == 0){
            gameOver();
        }
    }
}


function gameOver(){
    alert("SORRY, YOU LOST. Lets play again");
    losses++;
    lossText.innerHTML = losses;
    gameSetup();
}

function gameWin(){
    wins++;
    winsText.innerHTML = wins;
    progText.innerHTML = currentProg;
    gameSetup();
}

function gameSetup(){
    getNewAnswer(); //Get a new answer from the pool
    emptyAns(); //Create an empty array with _ in place of letters
    guessesLeft = 8; //Start game with 8 guesses
    currentProg = arrToStr(emptyAnsArr); //variable to hold current progress
    lettersGuessed = "";
    wrongLetters = "";
    progText.innerHTML = currentProg;
    lettersText.innerHTML = lettersGuessed;
    guessesText.innerHTML = guessesLeft;
}


//MAIN PROCESS

gameSetup();
guess();