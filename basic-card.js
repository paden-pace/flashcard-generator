
// To Do:  
// Put the constructor function into a new file 



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
            choices: ["review_existing_cards", "exit"],
            name: "selection"
        }
    ]).then(function(user) {
        switch (user.selection) {
            //To add the option for Creating Cards (needs to be added to prompt too)
            // case "create_new_card":
                //newCard();
                //options();
                //break;

            case "review_existing_cards":
                reviewCards();
                break;

            case "exit":
                break;
        }
    });
};

// Old function of adding cards needs to be updated 

// function newCard(){
//     inquirer.prompt([
//         {
//             type: "input",
//             message: 'Back of Card (Example: "Who was the first president of the USA?"',
//             name: "back"
//         },
//         {
//             type: "input",
//             message: 'Front of Card (Example: "George Washington"',
//             name: "front"
//         }
//     ]).then(function(card) {
//         fs.appendFile("basic.txt", card.back + "%" + card.front + "^");
//         console.log("new card added to file");
//     });
// };

function reviewCards(){

    // To read the basic.txt file
    fs.readFile("basic.txt", "utf8", function(err, data) {
    var questions = JSON.parse(data);

    // using that data to run the incriment function
    incriment(0, questions);
    });
};

options();
