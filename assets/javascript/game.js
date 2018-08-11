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

//vars to replace text on page showing current progress
var winsText = document.getElementById("win-count"); 
var lossText = document.getElementById("loss-count");
var guessesText = document.getElementById("guesses-left");
var progText = document.getElementById("current-progress");
var lettersText = document.getElementById("letters-guessed");
var animate = document.getElementById("animation");

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

//converts the char array to a string
function arrToStr(arg) {
    var y = "";
    for(i=0; i < arg.length; i++){
        y += arg[i];
    }
    return y;

}

function gameOver(){
    alert("The correct answer is: " + answer);
    losses++;
    lossText.innerHTML = losses;
    gameSetup();
}

function gameWin(){
    wins++;
    winsText.innerHTML = wins;
    progText.innerHTML = currentProg;
    this.setTimeout(gameSetup(), 5000);
}

function gameSetup(){
    getNewAnswer(); //Get a new answer from the pool
    emptyAns(); //Create an empty array with _ in place of letters
    guessesLeft = 7; //Start game with 8 guesses
    currentProg = arrToStr(emptyAnsArr); //variable to hold current progress
    lettersGuessed = ""; //reset lettersGuessed
    wrongLetters = ""; //reset wrongLetters
    //update text on screen
    animate.innerHTML = "<img src='assets/images/newGame.png'/>";
    progText.innerHTML = currentProg; 
    lettersText.innerHTML = lettersGuessed;
    guessesText.innerHTML = guessesLeft;
}

function animated(){
    if(guessesLeft == 6){
        animate.innerHTML = "<img src='assets/images/1.png'/>";
    } else if(guessesLeft == 5){
        animate.innerHTML = "<img src='assets/images/2.png'/>";
    } else if(guessesLeft == 4){
        animate.innerHTML = "<img src='assets/images/3.png'/>";
    } else if(guessesLeft == 3){
        animate.innerHTML = "<img src='assets/images/4.png'/>";
    } else if(guessesLeft == 2){
        animate.innerHTML = "<img src='assets/images/5.png'/>";
    } else if(guessesLeft == 1){
        animate.innerHTML = "<img src='assets/images/6.png'/>";
    } else if(guessesLeft == 0){
        animate.innerHTML = "<img src='assets/images/7.png'/>";
    }
}


// takes key input, checks if guess is right or not and then checks for end game condition
function guess(){
    document.onkeyup = function(event) {
    keyPress = event.key;
        if (alphabet.indexOf(keyPress) >= 0){ 
            keyPress = keyPress.toLowerCase();
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
                    animated();
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
            gameWin();
        }
        if(guessesLeft == 0){
            gameOver();
        }
        
    }   
}

//MAIN PROCESS

gameSetup();
guess();