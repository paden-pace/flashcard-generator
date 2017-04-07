
var file = require("file-system");
var fs = require('fs');
var inquirer = require("inquirer");
var request = require("request");


var CardObj = function(back, front){
    this.back = back,
    this.front = front,
    this.incorrectBack = function(){
        console.log("Incorrect. The correct answer is: " + this.back)
    },
    this.correctBack = function(){
        console.log("Correct!");
    },
    this.readFront = function(){
        console.log("-------------------------------");
        console.log("Question: " + this.front);
    }
};


module.exports = CardObj;