// Container elements in the HTML file. Methods of objects will fill them with relevant data.
sectionNameContainer  = document.getElementById("section-name");
sectionOrderContainer = document.getElementById("section-ordr");
exerciseContainer 	  = document.getElementById("container");
nxtbtnContainer 	  = document.getElementById("nxt-btn");

// Variable that points to the current exercise.
pointer = 0;
finalResult = "";

// Constructors
function Main (optionA, optionB, optionC) {

function Grammar (clueString, optionA, optionB, optionC) {
	this.sectionName  = "GRAMMAR SECTION";
	this.sectionOrder = "Select the correct answer.";
	this.options      = [optionA, optionB, optionC];
	var str = "<p>"+ clueString +"</p>";

	this.buildExercise = function () {
		str += "<table><tr>";
		for (var i = 0; i < this.options.length; ++i) {
			str += "<td><button onClick='exercises[pointer].saveAnswer(this.innerText)'>"+ this.options[i] +"</button></td>";
		}
		str += "</tr></table>";
		return str;
	};

	this.saveAnswer = function (buttonText) {
		this.studentAnswer = buttonText;
		nxtbtnContainer.style.display = "block";
	};
}

function Listening (clueString, audioFile, optionA, optionB, optionC) {
	// Create a dummy element so it is loaded in the background
	dummy = document.createElement("audio");
	dummy.src = "audio/"+ audioFile +".mp3" ;	

	this.sectionName  = "LISTENING SECTION";
	this.sectionOrder = "Select the correct answer.";
	this.options      = [optionA, optionB, optionC];
	var str  = "<p>"+ clueString +"</p>";
	str 	+= "<audio controls><source src='audio/"+ audioFile +".mp3'></audio><br><br>";

	this.buildExercise = function () {
		str     += "<table><tr>";
		for (var i = 0; i < this.options.length; ++i) {
			str += "<td><button onClick='exercises[pointer].saveAnswer(this.innerText)'>"+ this.options[i] +"</button></td>";
		}
		str += "</tr></table>";
		return str;
	};

	this.saveAnswer = function (buttonText) {
		this.studentAnswer = buttonText;
		nxtbtnContainer.style.display = "block";
	};
}

function Reading (article, clueString, optionA, optionB, optionC) {
	this.sectionName  = "READING SECTION";
	this.sectionOrder = "Read and select the correct answer.";
	this.options      = [optionA, optionB, optionC];
	var str = "<p>"+ article +"</p>";
	str    += "<p>"+ clueString +"</p>";

	this.buildExercise = function () {
		str += "<table><tr>";
		for (var i = 0; i < this.options.length; ++i) {
			str += "<td><button onClick='exercises[pointer].saveAnswer(this.innerText)'>"+ this.options[i] +"</button></td>";
		}
		str += "</tr></table>";
		return str;
	};

	this.saveAnswer = function (buttonText) {
		this.studentAnswer = buttonText;
		nxtbtnContainer.style.display = "block";
	};
}

function CodingA (clueString, imageFile, helperString) {
	// Create a dummy element so it is loaded in the background
	dummy = document.createElement("img");
	dummy.src = "images/"+ imageFile;	

	this.sectionName  = "CODING-A SECTION";
	this.sectionOrder = "Fill the blanks to correctly answer the question.";
	var wordsArr	= helperString.split(" ");

	this.buildExercise = function() {
		var mainForm = "<p>"+ clueString +"</p>";
		mainForm    += "<img src='images/"+ imageFile +"'>"; 
		mainForm    += "<br><form onSubmit='return exercises[pointer].saveAnswer()'>";
		for (var i = 0; i < wordsArr.length; i++) {
			if (wordsArr[i] > 0) {
				mainForm += "<input class='isAnswer text-center' type='text' size='"+wordsArr[i]+"' maxlength='"+wordsArr[i]+"' required> ";
			} else {
				mainForm += wordsArr[i] + " ";
			}
		}
		mainForm += "<input style='display:none' type='submit'></form><br><br>";
		return mainForm;
	};

	this.saveAnswer = function () {
		this.studentAnswer = "";
		var inputs = document.getElementsByClassName("isAnswer");
		for ( var i = 0; i < inputs.length; ++i ) {
			this.studentAnswer += inputs[i].value;
		}
		nxtbtnContainer.style.display = 'block';
		return false;
	};
}


// Function in charge of building and displaying an exercise based on pointer.
function buildAndShow () {
	sectionNameContainer.innerText  = exercises[pointer].sectionName;
	sectionOrderContainer.innerText = exercises[pointer].sectionOrder;
	container.innerHTML	 			= exercises[pointer].buildExercise();
}

// Function in charge of building the final string that will be sent to the server.
function checker () {
	finalResult += exercises[pointer].studentAnswer;
	++pointer;
	if ( pointer == exercises.length ) {
		alert("The exam is finished.");
		return 0;
	}
	nxtbtnContainer.style.display = "none";
	buildAndShow();
}
