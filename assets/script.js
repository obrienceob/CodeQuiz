//creating a variable to hold all the questions, answers, and options as strings
var quizQuestions = [
    {
        question: "Which of the following is NOT a common datatype?",
        options: ["strings", "boolean", "number", "element"],
        answer: ["element"]
    },
    {
        question: "what is 'this' in JavaScript?",
        options: ["'This' is word used to identify a specific person or thing close at hand or being indicated or experienced", "The 'this' keyword refers to the object it belongs to", "A question in your quiz, dummy", "...'this' is fine"],
        answer: ["The 'this' keyword refers to the object it belongs to"]
    },
    {
        question: "A useful tool available in Chrome to help catch JavaScript errors is: ",
        options: ["Elements", "Window", "Console", "console log"],
        answer: ["Console"]
    },
    {
        question: "When making a function, where should I store the lines of code to be executed?",
        options: ["In the parenthesis", "within quotes", "[]", "Curly braces"],
        answer: ["Curly braces"]
    },
    {
        question: "What is the DOM?",
        options: ["Document Object Model", "A suffix forming nouns denoting a state or condition. Ex- freedom", "One of the main characters in the Fast and the Furious movies, played by Vin Diesel", "Document Object Method"],
        answer: ["Document Object Model"]
    }
]

//variables for the quiz
var score = 0;
var questionIndex = 0;

//selevting the buttons and elements in the html which the game will be impacting
var time = document.querySelector("#timer");
var button = document.querySelector("#startTimer");
var questionsDiv = document.querySelector("#quizDiv");
var container = document.querySelector(".container");

//variables for the timer
var timeLeft = 75;
var originalTime = 0;
var penalty = 10;
var listCreate = document.createElement("ul");

//triggers the timer when clicking the start quiz button
button.addEventListener("click", function() {
    if (originalTime === 0) {
        originalTime = setInterval(function() {
            timeLeft--;
            time.textContent = "Time left: " + timeLeft + " seconds";

            if (timeLeft <= 0) {
                clearInterval(originalTime);
                gameOver();
                time.textContent = "Time's up!";
            };
        }, 1000);
    };
    render(questionIndex);
});

//displays the questions and answers on the page, as a new list item in an list within the quizDiv
function render(questionIndex) {
    quizDiv.innerHTML = "";
    listCreate.innerHTML = "";

    for (var i = 0; i < quizQuestions.length; i++) {
        var displayQuestion = quizQuestions[questionIndex].question;
        var displayOptions = quizQuestions[questionIndex].options;
        quizDiv.textContent = displayQuestion;
    };
    displayOptions.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizDiv.appendChild(listCreate);
        listCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    });
};

//creating an event to compare the user's choice with the correct answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == quizQuestions[questionIndex].answer) {
            score++;
            createDiv.textContent = "You got it! The correct answer is " + quizQuestions[questionIndex].answer;
        }
        else {
            timeLeft = timeLeft - penalty;
            createDiv.textContent = "Nope, the correct answer is " + quizQuestions[questionIndex].answer;
        }
    }
    questionIndex++;

    if (questionIndex >= quizQuestions.length) {
        gameOver();
        createDiv.textContent = "The quiz is over! You answered " + score + " of " + quizQuestions.length + " correct, nice job!";
    }
    else {
        render(questionIndex);
    }
    quizDiv.appendChild(createDiv);
}

//gameOver will append the last page, and display the score of the test taker. It also contains the storage of the user score and initals, which will be displayed on a separate html page
function gameOver() {
    quizDiv.innerHTML = "";
    timeLeft.innerHTML = "";

    var createHeadding = document.createElement("h2");
    createHeadding.setAttribute("id", "createP");
    createHeadding.textContent = "Quiz over!";

    quizDiv.appendChild(createHeadding);

    var createP = document.createElement("p");
    createP.setAttribute("id", "create p");

    quizDiv.appendChild(createP);

    if (timeLeft >= 0) {
        var secondsRemaining = timeLeft;
        var createP2 = document.createElement("p");
        clearInterval(originalTime);
        createP.textContent = "Your score is: " + secondsRemaining;

        quizDiv.appendChild(createP2);
    }

    var createInitials = document.createElement("label");
    createInitials.setAttribute("id", "createInitials");
    createInitials.textContent = "Enter your initials: ";

    quizDiv.appendChild(createInitials);

    var createId = document.createElement("input");
    createId.setAttribute("type", "text");
    createId.setAttribute("id", "initials");
    createId.textContent = "";

    quizDiv.appendChild(createId);

    var Submit = document.createElement("button");
    Submit.setAttribute("type", "submit");
    Submit.setAttribute("id", "Submit");
    Submit.textContent = "Submit";

    quizDiv.appendChild(Submit);

    Submit.addEventListener("click", function() {
        var takerInitials = createId.value;
        
        if (takerInitials === null) {

            console.log("no initials entered!");
        }
        else {
            var userScore = {
                takerInitials: takerInitials,
                score: secondsRemaining
            }
            console.log(userScore);
            var highScores = localStorage.getItem("highScores");
            if (highScores === null) {
                highScores = [];
            }
            else {
                highScores = JSON.parse(highScores);
            };
            highScores.push(userScore);
            var addScore = JSON.stringify(highScores);
            localStorage.setItem("highScores", addScore);
            window.location.replace("./Highscores.html");
        };
    });

}