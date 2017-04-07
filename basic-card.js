
var file = require("file-system");
var fs = require('fs');
var inquirer = require("inquirer");
var request = require("request");

var CardObj = require('./basic-constructor.js');

var score = 0; 

function incriment(i, questions) {
    if (i < (questions.length)) {
        
        var newCardObj = new CardObj(questions[i].back, questions[i].front);
        newCardObj.readFront();
        inquirer.prompt([
            {
                type: "input",
                message: "What is your answer?",
                name: "answer"
            }
        ]).then(function(review) {
            if(review.answer == newCardObj.back){
                newCardObj.correctBack();
                score++; 
                console.log("Your score is: " + score);
                console.log("-------------------------------");
                i++;
                incriment(i, questions);
            } else if (review.answer != newCardObj.back){
                newCardObj.incorrectBack();
                console.log("Your score is: " + score);
                console.log("-------------------------------");
                i++;
                incriment(i, questions);
            };  
        });
    } else if (i == (questions.length)){
        console.log("-------------------------------");
        console.log("Game Over! Your score was: " + score);
        console.log("-------------------------------");
    };
};

// A switch-case statement
// The switch-case will direct which function gets run.
function options (){
  inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["create_new_card", "review_existing_cards", "exit"],
            name: "selection"
        }
    ]).then(function(user) {
        switch (user.selection) {
            case "create_new_card":
                console.log("new clicked");
                newCard();
                break;

            case "review_existing_cards":
                reviewCards();
                break;

            case "exit":
                break;
        }
    });
};

function newCard(){
    inquirer.prompt([
        {
            type: "input",
            message: 'Question of Card (Example: "Who was the first president of the USA?"',
            name: "front"
        },
        {
            type: "input",
            message: 'Answer of Card (Example: "George Washington"',
            name: "back"
        }   
    ]).then(function(card) {

        var pushCard = {"front": card.front,
                    "back": card.back
                };
        
        fs.readFile("basic.txt", "utf8", function(err, data) {
            //console.log(" 0 new card added to file");
            var questions = JSON.parse(data);

            questions.push(pushCard);
        
            var questionStr = JSON.stringify(questions);

            fs.writeFile("basic.txt", questionStr);
        });
    });
};

function reviewCards(){

    // To read the basic.txt file
    fs.readFile("basic.txt", "utf8", function(err, data) {
    var questions = JSON.parse(data);

    // using that data to run the incriment function
    incriment(0, questions);
    });
};

options();
