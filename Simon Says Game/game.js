// Global Variables
var sqColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var gameStart = false;

//Events

$(document).keypress(function () {
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  console.log(userClickPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswear(userClickPattern.length - 1);
});

// Functions

function nextSequence() {
  userClickPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  var randomChosenColours = sqColors[randomNumber];
  gamePattern.push(randomChosenColours);
  $("#" + randomChosenColours)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColours);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed"); // set timeout and removes the .pressed
  }, 100);
}

function checkAnswear(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    if (gamePattern.length === userClickPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      console.log("correct");
    }
  } else {
    console.log("Wrong!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}
