//GLOBAL VARIABLES//
//=====================================
//Arrays and Variables for holding data
var wordOptions = ["sano", "santana", "dozier", "mauer", "berrios", "kepler", "rosario"]
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

//Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft= 9;

//FUNCTIONS//
//=====================================
function startGame () {
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersinWord = selectedWord.split("");
	numBlanks = lettersinWord.length;

	//Reset
	guessesLeft = 9;
	wrongLetters = [];
	blanksAndSuccesses = [];

	//Populate blanks and successes
	for (var i=0; i<numBlanks; i++){
		blanksAndSuccesses.push(" _ ");
	}

	//Change html to reflect game
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;

	//Debugging
	console.log(selectedWord);
	console.log(lettersinWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
	//Check if letter in word
	var isLetterInWord = false;

	for (var i=0; i<numBlanks; i++){
	 	if(selectedWord[i] == letter) {
	 		isLetterInWord = true;
	 	} 
	 }

//check where letter exists and populate blanksAndSucesses
	if(isLetterInWord) {
		for (var i=0; i<numBlanks; i++){
			if(selectedWord[i] == letter) {
				blanksAndSuccesses[i] = letter;
			}
		}
	}

//letter not in word
	else {
		wrongLetters.push(letter);
		guessesLeft--
	}
	//testing
	console.log(blanksAndSuccesses);
}

function roundComplete(){
	console.log("Win Count:" + winCount +"| Loss Count: " + lossCount + " | Guesses Left" + guessesLeft);

		//update guess info
		document.getElementById("numGuesses").innerHTML = guessesLeft;
		document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("");
		document.getElementById("wrongGuesses").innerHTML = wrongLetters.join("");
		//check if user won
		if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
			winCount++; 
			alert("You Won!");

			//update HTML win counter
			document.getElementById("winCounter").innerHTML = winCount;

			startGame();
		}

		//check if user lost
		else if (guessesLeft == 0) {
			lossCount++;
			alert("You lost!");

			//update HTML loss counter
			document.getElementById("lossCounter").innerHTML = lossCount;
			startGame();
		}
}



//MAIN PROCESS//
//=====================================

//Starts the game
startGame();

//Record guesses

document.onkeydown = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();



	//debugging
	console.log(letterGuessed);
}

