// VARIABLES

var wins = 0; //win counter
var losses = 0; // loss counter
// create pool to pull answers from
var answerPool = ["Tom Brady", "Andrew Luck", "Aaron Rodgers", "Odell Beckham", "Dak Prescott", "Drew Brees", "Russell Wilson", "Matthew Stafford", "Matt Ryan", "Philip Rivers", "Ben Roethlisberger", "Carson Palmer", "Eli Manning", "Joe Flacco", "Blake Bortles", "Marcus Mariota", "Cam Newton", "Derek Carr", "Jameis Winston", "Kirk Cousins", "Jared Goff", "Eli Manning"]
//create array for checking valid input
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var guessesLeft; // guesses left counter
var lettersGuessed; // track all letters guessed
var emptyAnsArr = []; // array converting letters in answer to '_'
var answer; // var to hold the correct answer
var guessRight; //boolean to track if each guess is correct
var wrongLetters; //incorrect letters already guessed to be displayed to the user
var gameOverBool = false;

//vars to replace text on page 
var winsText = document.getElementById("win-count"); 
var lossText = document.getElementById("loss-count");
var guessesText = document.getElementById("guesses-left");
var progText = document.getElementById("current-progress");
var lettersText = document.getElementById("letters-guessed");
var animate = document.getElementById("animation");
var newGame = document.getElementById("new-game");
var currentWordText = document.getElementById("current-word");

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

//converts the char array to a string for cleaner output
function arrToStr(arg) {
    var y = "";
    for(i=0; i < arg.length; i++){
        y += arg[i];
    }
    return y;

}

// handles loss condition
function gameLose(){
    losses++;
    lossText.innerHTML = losses;
    progText.innerHTML = answer;
    currentWordText.innerHTML = "Correct answer: ";
}

//handles win condition
function gameWin(){
    wins++;
    winsText.innerHTML = wins;
    progText.innerHTML = currentProg;
}

//ends game and triggers gameWin() or gameLose()
function gameOver(){
    gameOverBool = true;
    if(currentProg == answer){
        gameWin();
        newGame.innerHTML = "You won! Click 'New Game' to play again";
    } else{
        gameLose();
        newGame.innerHTML = "You lost! Click 'New Game' to play again";
    }
    

}

function gameSetup(){
    getNewAnswer(); //Get a new answer from the pool
    emptyAns(); //Create an empty array with _ in place of letters
    guessesLeft = 7; //Start game with 8 guesses
    currentProg = arrToStr(emptyAnsArr); //variable to hold current progress
    lettersGuessed = ""; //reset lettersGuessed
    wrongLetters = ""; //reset wrongLetters
    gameOverBool = false;
    //update text on screen
    animate.innerHTML = "<img src='assets/images/newGame.png'/>";
    progText.innerHTML = currentProg; 
    lettersText.innerHTML = lettersGuessed;
    guessesText.innerHTML = guessesLeft;
    winsText.innerHTML = wins;
    lossText.innerHTML = losses;
    newGame.innerHTML = "";
    currentWordText.innerHTML = "Current word: ";
}

//replaces picture on incorrect guess. causes page to flicker when image is replaced. Need to layer images and use z-index instead. 
function animated(){
    switch(guessesLeft){
        case 0: animate.innerHTML = "<img src='assets/images/7.png'/>";
        break;
        case 1: animate.innerHTML = "<img src='assets/images/6.png'/>";
        break;
        case 2: animate.innerHTML = "<img src='assets/images/5.png'/>";
        break;
        case 3: animate.innerHTML = "<img src='assets/images/4.png'/>";
        break;
        case 4: animate.innerHTML = "<img src='assets/images/3.png'/>";
        break;
        case 5: animate.innerHTML = "<img src='assets/images/2.png'/>";
        break;
        case 6: animate.innerHTML = "<img src='assets/images/1.png'/>";
        break;
        case 7: animate.innerHTML = "<img src='assets/images/newGame.png'/>";
        break;
    }
}



function guess(){
        document.onkeyup = function(event) { //take keypress
    if(gameOverBool == false){ //only move forward if gameOver = false
        keyPress = event.key; //store keypress
            if (alphabet.indexOf(keyPress) >= 0){ //check for valid input
                keyPress = keyPress.toLowerCase(); //normalize input to account for capital
                if (lettersGuessed.indexOf(keyPress) == -1){ //check if letter has been guessed
                    guessRight = false; //set bool for correct guess to false
                    lettersGuessed += keyPress; //add keypress to lettersGuessed
                    for (i=0; i < answer.length; i++){ //for loop to check each letter of the answer against keypress
                        if(keyPress == answer[i] || keyPress.toUpperCase() == answer[i]){
                            emptyAnsArr[i] = answer[i];  
                            guessRight = true;              
                        }

                    }
                    if(guessRight == false){ 
                        guessesLeft--; //decrement guesses left when guess is wrong
                        wrongLetters += keyPress; //add letter to the string of incorrect guesses
                        animated(); // change hangman picture to update progress
                    }
                    currentProg = arrToStr(emptyAnsArr); //get currentProg string from emptyAnsArr
                    progText.innerHTML = currentProg; // display currentProg to user
                    lettersText.innerHTML = wrongLetters; // update wrong letters text
                    guessesText.innerHTML = guessesLeft; // update guesses left text
                    
                }
                else {
                    alert("You already guessed that") 
                }
            }
            else {
                alert("Please choose a valid letter");
            }
            if(currentProg == answer || guessesLeft == 0){ //end game when win or loss condition is reached
                gameOver();
            }
        }
    }   
}

//MAIN PROCESS

gameSetup(); //call to setup game
guess(); //start the game