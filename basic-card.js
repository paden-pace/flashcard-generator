
var file = require("file-system");
var fs = require('fs');
var inquirer = require("inquirer");
var request = require("request");

var questions = [
    {front: "What was the founding year for Muggle Quidditch?",
    back: "2005"
    },

    {front: "How many active positions are on a pitch at a time?",
    back: "7"
    },

    {front: "What position is identified with a white headband?",
    back: "chaser"
    },

    {front: "What position is identified with a black headband?",
    back: "beater"
    },

    {front: "What position is identified with a yellow headband?",
    back: "seeker"
    },

    {front: "What position is identified with a green headband?",
    back: "keeper"
    },

    {front: "What team won the Quidditch World Cup VI?",
    back: "Texas Quidditch"
    },

    {front: "What team won the Quidditch World Cup VII?",
    back: "Texas Quidditch"
    },

    {front: "What team won the Quidditch World Cup VIII?",
    back: "Texas Quidditch"
    },

    {front: "Do the players actually fly?",
    back: "no"
    },
];

var score = 0;

// var firstPresident = new BasicCard(
//     "Who was the first president of the United States?", "George Washington");

// // "Who was the first president of the United States?"
// console.log(firstPresident.front); 

// // "George Washington"
// console.log(firstPresident.back); 


// Add a quiz function that will allow you to answer the question
// add a score variable that will go up with correct ones 
// Add a JSON file that has the cards  
// Put the constructor function into a new file  


function CardObj(back, front){
    this.back = back,
    this.front = front,
    this.incorrectBack = function(){
        console.log("Incorrect. The correct answer is: " + this.back)
        console.log("Your score is: " + score);
        console.log("-------------------------------");
    },
    this.correctBack = function(){
        console.log("Correct!");
        score++; 
        console.log("Your score is: " + score);
        console.log("-------------------------------");
    },
    this.readFront = function(){
        console.log("-------------------------------");
        console.log("Question: " + this.front);
    }
};

function incriment(i, questions) {
    if (i < (questions.length)) {
        
        //console.log("test" + i);
        //var side = data[i].split("%");
        //console.log(questions[i]);
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
                i++;
                incriment(i, questions);
            } else if (review.answer != newCardObj.back){
                newCardObj.incorrectBack();
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
           // case "create_new_card":
                //newCard();
                //options();
                //break;

            case "review_existing_cards":
                incriment(0, questions);
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

// function reviewCards(){
    
//   // To read the basic.txt file
//   fs.readFile("basic.txt", "utf8", function(err, data) {

//     // Break down the text file to the individual cards
//     data = data.split("^");

//     // using that data run the incriment function
//     incriment(0, questions);

//   });

// };

options();
