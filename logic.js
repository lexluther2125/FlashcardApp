var inquirer = require("inquirer");
var fs = require("fs");
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var flashcards = [];

startProgram();

function startProgram() {
    inquirer.prompt([{
        type: "list",
        name: "option",
        message: "What action would you like to perform?",
        choices: [{
            name: "Create a new Basic flashcard"
        }, {
            name: "Create a new Cloze flashcard"
        }, {
            name: "Review my flashcards"
        }]
    }]).then(function(answer) {
        if (answer.option === "Create a new Basic flashcard") {
            createBasic();
        } else if (answer.option === "Create a new Cloze flashcard") {
            createCloze();
        } else if (answer.option === "Review my flashcards")
            reviewCards();
    });
};

var createBasic = function() {
    inquirer.prompt([{
        name: "front",
        message: "What is the question you've chosen for this card?",
         validate: function(input) {
                    if (input === "") {
                        console.log('Please provide a question');
                        return false;
                    } else {
                        return true;
                    }
                }
            }, {
                name: "back",
            message: "What is the answer to this question?",
            validate: function(input) {
                if (input === "") {
                    console.log("Please provide an answer");
                    return false;
                } else {
                    return true;
                }
            }
        }]).then(function(answer) {
            var basicCard = new BasicCard(answer.front, answer.back);
            flashcards.push(basicCard);
            console.log("Flashcard created!");
            startProgram();
        });
    };

var createCloze = function() {
    inquirer.prompt([{
        name: "information",
        message: "What is the full text for this card?",
        validate: function(input) {
            if (input === "") {
                console.log("Please provide text for this card.");
                return false;
            } else {
                return true;
            }
        }
    }]).then(function(answer) {
        fullText = answer.information;
        inquirer.prompt([{
            name: "hidden",
            message: "What is the cloze portion of this flashcard?",
            validate: function(input) {
                if (input === "") {
                    console.log("Please input the cloze portion of this flashcard.");
                    return false;
                } else {
                    return true;
                }
            }
        }]).then(function(answers) {
            console.log(answers);
            var hidden = answers.hidden;
            if (fullText.includes(hidden)) {
                var clozeCard = new ClozeCard(fullText, hidden);
                flashcards.push(clozeCard);
                console.log("Flashcard created!")
                startProgram();
            } else {
                console.log("The cloze portion you provided is not in the full text. Please try again.");
                startProgram();
            }

        });
    });
}

var reviewCards = function(index) {
    card = flashcards[index];
    // var type = ["basic", "cloze"];

    var questionText;
    var correctResponse;

    if (card.type === "basic") {
        questionText = card.front;
        correctResponse = card.back;
    } else if (card.type === "cloze") {
        questionText = card.clozeDeleted;
        correctResponse = card.cloze;
    }
    inquirer.prompt([{
        name: "response",
        message: questionText
    }]).then(function(answer) {
        if (answer.response === correctResponse) {
            console.log("Correct!")
            if (index < flashcards.length - 1) {
                showCards(index + 1);
            }
        } else {
            console.log("Wrong!");
            if (index < flashcards.length - 1) {
                showCards(index + 1)
            }
        }

    });
};