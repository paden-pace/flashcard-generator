// var firstPresidentCloze = new ClozeCard(
//     "George Washington was the first president of the United States.", "George Washington");

// // "George Washington"
// console.log(firstPresidentCloze.cloze); 

// // " ... was the first president of the United States.
// console.log(firstPresidentCloze.partial); "

// // "George Washington was the first president of the United States.
// console.log(firstPresidentCloze.fullText): "

// // Should throw or log an error because "oops" doesn't appear in "This doesn't work"
// var brokenCloze("This doesn't work", "oops"); 



var file = require("file-system");
var fs = require('fs');
var inquirer = require("inquirer");
var request = require("request");


function CardObj(fullText, cloze, partial){
    this.fullText = fullText,
    this.cloze = cloze,
    this.partial = partial,
    this.readFullText = function(){
        console.log("Full Text: " + this.fullText);
    },
    this.readCloze = function(){
        console.log("Cloze: " + this.cloze);
    },
    this.readPartial = function(){
        console.log("Partial: ... " + this.partial);
    }
};

function incriment(i, data) {
    if (i < (data.length-1)) {
        var side = data[i].split("%");
        var newCardObj = new CardObj(side[0], side[1], side[2]);
        newCardObj.readPartial();
        inquirer.prompt([
            {
                type: "confirm",
                message: "Press [enter] to see the answer.",
                name: "confirmation"
            }
        ]).then(function(review) {
                newCardObj.readFullText();
                console.log("----------------------------------------------");
                i++;
                incriment(i, data);
        });
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
                newCard();
                //options();
                break;

            case "review_existing_cards":
                reviewCards();
                //options();
                break;

            case "exit":
                break;
        }
    });
};



function newCard(){
    console.log("new card");
    inquirer.prompt([
        {
            type: "input",
            message: 'What is the full sentence?',
            name: "fullText"
        },
        {
            type: "input",
            message: 'What is the cloze of the sentence?',
            name: "cloze"
        },
        {
            type: "input",
            message: 'What is the rest of the sentence?',
            name: "partial"
        }
    ]).then(function(card) {

  // We will add the value to the bank file.
    fs.appendFile("cloze.txt", card.fullText + "%" + card.cloze + "%" + card.partial + "^");

  // We will then print the value that was added (but we wont print the total).
    console.log("new card added to file");
    });
};

function reviewCards(){
    console.log("review cards");
    
  // To read the basic.txt file
  fs.readFile("cloze.txt", "utf8", function(err, data) {

    // Break down the text file to the individual cards
    data = data.split("^");
    //console.log(data);

    // using that data run the incriment function
    incriment(0, data);

  });

};

options();
