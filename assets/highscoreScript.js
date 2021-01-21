//defining the variable as buttons to select
var goQuiz = document.querySelector("#goBack");
var clear = document.querySelector("#clear");
var highScoreList = document.querySelector("#highScoreList");


//clearing the highscores
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

//grabbing the highscores from local storage, then displaying them
var highScores = localStorage.getItem("highScores");
highScores = JSON.parse(highScores);

if (highScores !== null) {

    for (var i = 0; i < highScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = highScores[i].takerInitials + " " + highScores[i].score;
        highScoreList.appendChild(createLi);

    };
};
// button to go back to the index page
goQuiz.addEventListener("click", function () {
    window.location.replace("./index.html");
});