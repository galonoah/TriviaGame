// Trivia questions and answers data
var QUESTIONS = [
  {
    question: "What unit of measurement is abbreviated 'OZ'?",
    answers: ["Ounces", "Pounds", "Liters", "Oblongs"],
    correctAnswer: "Ounces",
    image: "./assets/images/ounces.jpg",
  },
  {
    question: "Which continent is the least populated?",
    answers: ["Asia", "Antarctica", "Europe", "Africa"],
    correctAnswer: "Antarctica",
    image: "./assets/images/antarctica.jpg",
  },
  {
    question:
      "In the initials of the federal agency known as NASA, what does the first 'A' stand for?",
    answers: ["American", "Aeronautics", "Association", "Administration"],
    correctAnswer: "Aeronautics",
    image: "./assets/images/nasaLogo.jpg",
  },
  {
    question: "What is the capital of Colorado?",
    answers: ["Boise", "Topeka", "Denver", "Trenton"],
    correctAnswer: "Denver",
    image: "./assets/images/denverColorado.jpg",
  },
  {
    question: "Which is the largest state in the US?",
    answers: ["Alaska", "Texas", "Utah", "California"],
    correctAnswer: "Alaska",
    image: "./assets/images/alaskaPlate.jpg",
  },
  {
    question: "Berlin is the capital of which country?",
    answers: ["Belgium", "Netherlands", "Poland", "Germany"],
    correctAnswer: "Germany",
    image: "./assets/images/berlinCard.jpg",
  },
  {
    question: "Which is the longest river in the world?",
    answers: ["Nile", "Amazon", "Mississippi", "Yangtze"],
    correctAnswer: "Nile",
    image: "./assets/images/nileRiver.jpg",
  },
  {
    question: "Where are the famous Egyptian Pyramids located?",
    answers: ["Giza", "Cairo", "Thebes", "Alexandria"],
    correctAnswer: "Giza",
    image: "./assets/images/giza.jpg",
  },
  {
    question: "Which kind of instrument is a violin?",
    answers: ["Woodwind", "Percussion", "String", "Brass"],
    correctAnswer: "String",
    image: "./assets/images/violin.jpg",
  },
  {
    question: "The bright stuff spewing out of a volcano is called...?",
    answers: ["Fire", "Scoria", "Ashes", "Lava"],
    correctAnswer: "Lava",
    image: "./assets/images/lava.jpg",
  },
  {
    question: "What fruit is traditionally the primary ingredient in wine?",
    answers: ["Agave", "Grapes", "Peach", "Plum"],
    correctAnswer: "Grapes",
    image: "./assets/images/wine.jpg",
  },
];

var shuffleQuestions;
var correctAnswerElement;
var questionIndex = 0;
var timeLeft = 15;
var timer;
var correct = 0;
var incorrect = 0;
var isAnswerImageShowing = false;

// Shuffle list array
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

// show image expanding effect only on mobile view
function showImageOnMobile() {
  $("#card-trivia__answer-image").addClass("expand-image");
  $(".flip-box-inner").addClass("flip-answer-image");
  setTimeout(() => {
    $("#card-trivia__answer-image").removeClass("expand-image");
    $(".flip-box-inner").removeClass("flip-answer-image");
  }, 3800);
}

// handle answer-image visibility on windows resizing
$(window).on("resize", function () {
  var win = $(this); //this = window
  if (win.width() <= 650 && isAnswerImageShowing) {
    $(".flip-box-inner").addClass("flip-answer-image");
    $("#card-trivia__answer-image").addClass("expand-image");
  }

  if (win.width() > 650 && isAnswerImageShowing) {
    $(".flip-box-inner").addClass("flip-answer-image");
    $("#card-trivia__answer-image").removeClass("expand-image");
  }
});

$(function () {
  // Hide main HTML content until background image loads
  $("#container").hide();
  var src = $("#container").css("background-image");
  var url = src.match(/\((.*?)\)/)[1].replace(/('|")/g, "");
  var img = new Image();
  img.onload = function () {
    //  load app background image
    $(".looping-rhombuses-spinner").hide();
    $("#container").show();
  };
  img.src = url;
  if (img.complete) img.onload();

  // Function gets Questions-Data and append it to HTML and
  // returns element containing correct answer
  function getTrivia() {
    let correctAnswer;

    // delay appending answer-image after flip effect
    setTimeout(() => {
      $(".flip-box-back")
        .empty()
        .append(
          `<img src='${shuffleQuestions[questionIndex].image}' alt='answer'>`
        );
    }, 500);

    // append trivia question
    $("#card-trivia__question").text(shuffleQuestions[questionIndex].question);

    // get trivia possible answers
    const shuffleAnswers = shuffle(shuffleQuestions[questionIndex].answers);

    // remove previews answers and append new answers for next trivia
    $("#card-trivia__answers").empty();
    shuffleAnswers.forEach(function (answer) {
      const answerElement = $("<div>").addClass(
        "text-center card-trivia__answer--hover-effect"
      );
      answerElement.append(answer);
      answerElement.appendTo($("#card-trivia__answers"));

      if (answer === shuffleQuestions[questionIndex].correctAnswer) {
        correctAnswer = answerElement;
      }
    });

    return correctAnswer;
  }

  // Function adds click event to each answer element and
  // checks for correct answer. If clicked element has
  // correct answer, text turns green and appends check mark
  // else text turns color gray and appends an X mark
  function checkCorrectAnswer() {
    $("#card-trivia__answers")
      .children()
      .click(function () {
        isAnswerImageShowing = true;
        resetIntervalTimer();

        if ($(this).text() === correctAnswerElement.text()) {
          correct++;
          showCorrectAnswer();
        } else {
          incorrect++;
          $(this).addClass("wrong");
          $(this).append("<span> &#10008;</span>");
          $(this).siblings().not(correctAnswerElement).addClass("wrong");

          correctAnswerElement.append("<span> &#10004;</span>");
          correctAnswerElement.addClass("correct");

          $("#message").css("display", "block");
          $("#timeLeft").css("display", "none");
          $("#message").text("INCORRECT");
        }

        // show image-answer with flip effect
        if ($(window).width() > 650) {
          $(".flip-box-inner, .flip-box-back").addClass("flip-answer-image");
        }

        // Prevent click event and hover effect after answer selection
        $(this)
          .parent()
          .children()
          .off("click")
          .removeClass("card-trivia__answer--hover-effect");

        if ($(window).width() <= 650) {
          showImageOnMobile();
        }
      });
  }

  // Function shows the correct trivia answer
  function showCorrectAnswer() {
    $("#card-trivia__answers")
      .children()
      .not(correctAnswerElement)
      .addClass("wrong");
    correctAnswerElement.append("<span> &#10004;</span>");
    correctAnswerElement.addClass("correct");

    $("#card-trivia__answers").children().removeClass("hover");
    $("#card-trivia__answers").children().off("click");

    $("#message").css("display", "block");
    $("#timeLeft").css("display", "none");
    $("#message").text("CORRECT");
    $(".flip-box-inner, .flip-box-back").addClass("flip-answer-image");
    $("#card-trivia__answer-image").removeClass("expand-image");
  }

  // Function creates a countdown which is display on HTML
  // If timeLeft variable reach zero, correct answer shows up
  // and then wait for 4.5 seconds to restart
  function intervalTimer() {
    timer = setInterval(function () {
      timeLeft--;
      $("#timerSeconds").text(timeLeft);

      if (timeLeft == 0) {
        incorrect++;
        showCorrectAnswer();
        clearInterval(timer);
        timeLeft = 15;
        $("#timeLeft").css("display", "none");
        $("#message").text("TIME'S UP!");
        $("#message").css("display", "block");

        if ($(window).width() <= 650) {
          showImageOnMobile();
        }

        setTimeout(function () {
          questionIndex++;
          $("#message").css("display", "none");
          $("#timeLeft").css("display", "block");
          $("#timerSeconds").text(timeLeft);
          $(".flip-box-inner, .flip-box-back").removeClass("flip-answer-image");
          $("#card-trivia__answer-image").removeClass("expand-image");
          isAnswerImageShowing = false;
          startGame();
        }, 4500);
      }
    }, 1000);
  }

  // Function clears countdown after an answer is click and
  // waits four seconds to restart
  function resetIntervalTimer() {
    clearInterval(timer);

    setTimeout(function () {
      questionIndex++;
      timeLeft = 15;
      $("#message").css("display", "none");
      $("#message").text("TIME'S UP");
      $("#timeLeft").css("display", "block");
      $("#timerSeconds").text(timeLeft);
      $(".flip-box-inner, .flip-box-back").removeClass("flip-answer-image");
      $("#card-trivia__answer-image").removeClass("expand-image");
      isAnswerImageShowing = false;
      startGame();
    }, 4500);
  }

  // Function starts the game
  // If questionIndex reach shuffleQuestions length, game ends and score
  // shows up, otherwise the games keeps running until last question
  function startGame() {
    if (questionIndex < shuffleQuestions.length) {
      correctAnswerElement = getTrivia();

      checkCorrectAnswer();

      intervalTimer();
    } else {
      questionIndex = 0;
      isAnswerImageShowing = false;
      $("#card-trivia").css("display", "none");
      $("#correct").text("Correct: " + correct);
      $("#incorrect").text("Incorrect: " + incorrect);
      $("#score").css("display", "block");
    }
  }

  // Click event button starts game
  $("#button").click(function () {
    correct = 0;
    incorrect = 0;
    questionIndex = 0;
    $("#card-trivia").css("display", "grid");
    $("#button").css("display", "none");
    shuffleQuestions = shuffle(QUESTIONS);
    startGame();
  });

  // Click event close score pop-up
  $("#close").click(function () {
    $("#score").css("display", "none");
    $("#button").css("display", "inline-block");
  });
});
