var inquirer = require("inquirer");
var fs = require("fs");

var ClozeCard = function(text, cloze) {
	this.text = text;
	this.cloze = cloze;
	this.type = "cloze";
	this.clozeText = this.text.replace(this.cloze, "__________");
};

module.exports = ClozeCard;