// Trivia questions and answers data
var QUESTIONS = [
    {
        question: "What unit of measurement is abbreviated 'Oz'?",
        answers: ["Ounces", "Pounds", "Liters", "Oblongs"],
        correctAnswer: "Ounces",
        image: "./assets/images/ounces.jpg"
    },
    {
        question: "Which continent is the least populated?",
        answers: ["Asia", "Antarctica", "Europe", "Africa"],
        correctAnswer: "Antarctica",
        image: "./assets/images/antarctica.jpg"
    },
    {
        question: "In the initials of the federal agency known as NASA, what does the first 'A' stand for?",
        answers: ["American", "Aeronautics", "Association", "Administration"],
        correctAnswer: "Aeronautics",
        image: "./assets/images/nasaLogo.jpg"
    },
    {
        question: "What is the capital of Colorado?",
        answers: ["Boise", "Topeka", "Denver", "Trenton"],
        correctAnswer: "Denver",
        image: "./assets/images/denverColorado.jpg"
    },
    {
        question: "Which is the largest state in the US?",
        answers: ["Alaska", "Texas", "Utah", "California"],
        correctAnswer: "Alaska",
        image: "./assets/images/alaskaPlate.jpg"
    },
    {
        question: "Berlin is the capital of which country?",
        answers: ["Belgium", "Netherlands", "Poland", "Germany"],
        correctAnswer: "Germany",
        image: "./assets/images/berlinCard.jpg"
    },
    {
        question: "Which is the longest river in the world?",
        answers: ["Nile", "Amazon", "Mississippi", "Yangtze"],
        correctAnswer: "Nile",
        image: "./assets/images/nileRiver.jpg"
    },
    {
        question: "Where are the famous Egyptian Pyramids located?",
        answers: ["Giza", "Cairo", "Thebes", "Alexandria"],
        correctAnswer: "Giza",
        image: "./assets/images/giza.jpg"
    },
    {
        question: "Which kind of instrument is a violin?",
        answers: ["Woodwind", "Percussion", "String", "Brass"],
        correctAnswer: "String",
        image: "./assets/images/violin.jpg"
    },
    {
        question: "The bright stuff spewing out of a volcano is called...?",
        answers: ["Fire", "Scoria", "Ashes", "Lava"],
        correctAnswer: "Lava",
        image: "./assets/images/lava.jpg"
    },
    {
        question: "What fruit is traditionally the primary ingredient in wine?",
        answers: ["Agave", "Grapes", "Peach", "Plum"],
        correctAnswer: "Grapes",
        image: "./assets/images/wine.jpg"
    }
];

var questionIndex = 6;

$(function () {

    // Function gets Questions-Data and append it to HTML and
    // return element with containing right answer text
    function getTrivia() {

        var correctAnswer;
        $("#answers").empty();
        $("#question-header").text(QUESTIONS[questionIndex].question);
        QUESTIONS[questionIndex].answers.forEach(function (answer) {
            var div = $("<div>").append(answer);
            div.appendTo($("#answers"));
            if (div.text() === QUESTIONS[questionIndex].correctAnswer) {
                correctAnswer = div;
            }
            div.addClass("hover"); // Adds hover effect to each answer element
        });

        return correctAnswer;
    }

    // Function adds click event to each answer element and 
    // checks for correct answer. If clicked element has
    // correct answer, text turns green and appends check mark
    // else text turns color gray and appends an X mark 
    function checkCorrectAnswer(correctAnswerElement) {

        $("#answers").children().click(function () {

            if ($(this).text() === correctAnswerElement.text()) {
                $(this).addClass("correct");
                $(this).append("<span> &#10004;</span>");
                $(this).siblings().addClass("wrong");
            } else {
                $(this).addClass("wrong");
                $(this).append("<span> &#10008;</span>");
                $(this).siblings().not(correctAnswerElement).addClass("wrong");
                correctAnswerElement.append("<span> &#10004;</span>");
                correctAnswerElement.addClass("correct");
            }
            $(this).parent().children().off("click"); // Prevent click event
            $("#answers").children().removeClass("hover"); // Turn off hover effect
        });

    }

    function startGame() {

        var correctAnswerElement = getTrivia();

        checkCorrectAnswer(correctAnswerElement);

    }

    startGame();
});