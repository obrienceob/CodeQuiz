var goBack = document.querySelector("#goBack");
var clear = document.querySelector("#clear");
var highScoreList = document.querySelector("#highScoreList");

clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

var highScores = localStorage.getItem("highScores");
highScores = JSON.parse(highScores);

if (highScores !== null) {

    for (var i = 0; i < highScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = highScores[i].takerInitials + " " + highScores[i].score;
        highScoreList.appendChild(createLi);

    };
};
// Event listener to move to index page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});