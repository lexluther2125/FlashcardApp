var inquirer = require("inquirer");
var fs = require("fs");

var BasicCard = function(front, back) {
    this.front = front;
    this.back = back;
    this.type = "basic";
};

module.exports = BasicCard;
