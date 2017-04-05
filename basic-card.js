
var file = require("file-system");
var fs = require('fs');
var inquirer = require("inquirer");
var request = require("request");


// var action = process.argv[2];
// var value = process.argv[3];


// var firstPresident = new BasicCard(
//     "Who was the first president of the United States?", "George Washington");

// // "Who was the first president of the United States?"
// console.log(firstPresident.front); 

// // "George Washington"
// console.log(firstPresident.back); 


// We will then create a switch-case statement (if-then would also work).
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

    // Loop through those cards and split each value into 2 sides
    for (var i = 0; i < (data.length-1); i++) {
        //console.log("flashcard: " + data[i]);
        var side = data[i].split("%");
        console.log("back: " + side[0]);
        console.log("front: " + side[1]);
        // for (var i = 0; i < side.length; i++) {
        //     console.log(side[i]);
        //     inquirer.prompt([
        //         {
        //             type: "confirm",
        //             message: "Press [enter] to see the back",
        //             name: "confirmation"
        //         }
        //     ]).then(function(review) {
        //             console.log(side[i+1]);
        //     });
        // };
    };
  });

//option to delete??

};

options();
