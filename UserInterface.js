var green = {
	askOnlyForeignWords: false,
	askBrackedContent: false,
	askTheSourtestWord: false
}

function changeColor(theColor, id) {
	var elem = document.getElementById(id)
	elem.style.color = theColor
}

function setDefaultColor() {
	changeColor('red', "p1")
	changeColor('red', "p2")
	changeColor('red', "p3")
}

function askOnlyForeignWordsButton() {
	if (green.askOnlyForeignWords) {
		green.askOnlyForeignWords = false
		changeColor('red', "p1")
	} else {
		green.askOnlyForeignWords = true
		changeColor('green', "p1")
	}
}

function askBrackedContentButton() {
	if (green.askBrackedContent) {
		green.askBrackedContent = false
		changeColor('red', "p2")
	} else {
		green.askBrackedContent = true
		changeColor('green', "p2")
	}
}

function askTheSourtestWordButton() {
	if (green.askTheSourtestWord) {
		green.askTheSourtestWord = false
		changeColor('red', "p3")
	} else {
		green.askTheSourtestWord = true
		changeColor('green', "p3")
	}
}

function showVokab() {
	window.location.href = "List_of_registered_vocabulary.html"
}

function jumpBack() {
	window.location.href = "Start_vocabulary_trainer.html"
}

function jumpToNewVocab() {
	window.location.href = "NewVocab.html"
}