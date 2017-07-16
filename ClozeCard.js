var fs = require("fs");
var BasicCard = require("./BasicCard");

var ClozeCard = function(text, cloze) {
	this.text = text;
	this.cloze = cloze;
	this.type = "cloze";
	this.clozeText = this.text.replace(this.cloze, "__________");
};

module.exports = ClozeCard;