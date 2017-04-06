
var file = require("file-system");
var fs = require('fs');
var inquirer = require("inquirer");
var request = require("request");


// var firstPresident = new BasicCard(
//     "Who was the first president of the United States?", "George Washington");

// // "Who was the first president of the United States?"
// console.log(firstPresident.front); 

// // "George Washington"
// console.log(firstPresident.back); 


function CardObj(back, front){
    this.back = back,
    this.front = front,
    this.readBack = function(){
        console.log("back: " + this.back);
    },
    this.readFront = function(){
        console.log("front: " + this.front);
    }
};

function incriment(i, data) {
    if (i < (data.length-1)) {
        
        console.log("test" + i);
        var side = data[i].split("%");
        var newCardObj = new CardObj(side[0], side[1]);
        newCardObj.readBack();
        inquirer.prompt([
            {
                type: "confirm",
                message: "Press [enter] to see the answer.",
                name: "confirmation"
            }
        ]).then(function(review) {
                newCardObj.readFront();
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
    inquirer.prompt([
        {
            type: "input",
            message: 'Back of Card (Example: "Who was the first president of the USA?"',
            name: "back"
        },
        {
            type: "input",
            message: 'Front of Card (Example: "George Washington"',
            name: "front"
        }
    ]).then(function(card) {

  // We will add the value to the bank file.
    fs.appendFile("basic.txt", card.back + "%" + card.front + "^");

  // We will then print the value that was added (but we wont print the total).
    console.log("new card added to file");
    });
};

function reviewCards(){
    
  // To read the basic.txt file
  fs.readFile("basic.txt", "utf8", function(err, data) {

    // Break down the text file to the individual cards
    data = data.split("^");

    // using that data run the incriment function
    incriment(0, data);

  });

};

options();
