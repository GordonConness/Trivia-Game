var currentQuestion = 0;
var correct = 0;
var wrong = 0;
var timer = 30;
var i = 0;

var interval = setInterval(function() {
    timer--;
    $('#timer').text(timer);
    if (timer === 0) {
        currentQuestion++;
        $("#trivButtons").empty();
        i++;
        $("#response").empty();
        logic();
        timer = 30;
    }
}, 1000)

var questionArr = [{
  question: "What is the name of John Snow's Direwolf?",
  choices: ["Ghost","Grey Wind", "Lady", "Nymeria"],
  values: [true, false, false, false]
}, {
  question: "How many fingertips did Stannis Baratheon chop off of Davos hand?",
  choices: ['1', '2', '3', '4'],
  values: [false, false, false, true]

}, {
  question: "Who is the king of Westeros when the show begins?",
  choices: ['Rhaegar Targaryen', 'Robert Baratheon', 'Aerys Targaryen', 'Ned Stark'],
  values: [false, true, false, false]
}, {
  question: "What is Ollenna's relationship to Mace Tyrell?",
  choices: ['Sister', 'Aunt', 'Mother', 'Lover'],
  values: [false, false, true, false]

}, {
  question: "Which of the following characters DOES appear in season 1?",
  choices: ['Beric Dondarrion','Stanis Baratheon','Craster','Roose Bolton'],
  values: [true, false, false, false]

}, 
]

function answerButton() {
    for (var i = 0; i < questionArr[currentQuestion].choices.length; i++) {

        var button = $("<button>");
        button.text(questionArr[currentQuestion].choices[i]);
        button.addClass("answer-buttons btn btn-primary");
        button.attr("value", questionArr[currentQuestion].values[i]);
        button.attr("Data-name", questionArr[currentQuestion].choices[i]);
        $("#trivButtons").append(button);
    };
}


function logic() {

    $("#trivQuestion").html(questionArr[currentQuestion].question)
    answerButton();
    $("button").on("click", function() {
        var answers = $(this).attr("Data-name");
        console.log(answers);
        if ($(this).attr("value") === "Correct!") {
            correct++;
            $("#response").html("Correct");
            currentQuestion++;
            timer = 30;
            $("#trivButtons").empty();
            i++;
            $("#response").empty();
            logic();
        } else {

            $("#response").html("Loser! King Joffrey will have your head!");
            wrong++;
            currentQuestion++;
            timer = 30;
            $("#trivButtons").empty();
            i++;
            $("#response").empty();
            logic();
        }
        console.log(currentQuestion);
    });



}

logic();