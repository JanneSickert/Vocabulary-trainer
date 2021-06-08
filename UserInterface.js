var interfaceVarReadTrainer
var interfaceVarSetTrainer
var len = null

var green = {
	askDescription: false,
	askTerm: false,
	askBrackedContent: false,
	askTheSourtestWord: false,
	multipleAnswerOptions: false
}

var dataAdress = {
	language: 1001,
	description: 1002,
	term: 1003,
	brackedContent: 1004,
	shortestWord: 1005,
	multipleAnswer: 1006
}

function setInterfaceStorageFoo(readTrainer, setTrainer) {
    interfaceVarReadTrainer = readTrainer
    interfaceVarSetTrainer = setTrainer
}

function changeColor(theColor, id) {
	var elem = document.getElementById(id)
	elem.style.color = theColor
}

function setDefaultColor() {
	if (green.askDescription) {
		changeColor('green', "p1")
	} else {
		changeColor('red', "p1")
	}
	if (green.askBrackedContent) {
		changeColor('green', "p2")
	} else {
		changeColor('red', "p2")
	}
	if (green.askTheSourtestWord) {
		changeColor('green', "p3")
	} else {
		changeColor('red', "p3")
	}
	if (green.askTerm) {
		changeColor('green', "p5")
	} else {
		changeColor('red', "p5")
	}
	if (green.multipleAnswerOptions) {
		changeColor('green', "p6")
	} else {
		changeColor('red', "p6")
	}
}

function askTermButton() {
	if (green.askTerm) {
		green.askTerm = false
		changeColor('red', "p5")
		interfaceVarSetTrainer(dataAdress.term, "0")
		green.askTheSourtestWord = false
		changeColor('red', "p3")
		interfaceVarSetTrainer(dataAdress.shortestWord, "0")
	} else {
		green.askTerm = true
		changeColor('green', "p5")
		interfaceVarSetTrainer(dataAdress.term, "1")
	}
}

function askDescriptionButton() {
	if (green.askDescription) {
		green.askDescription = false
		changeColor('red', "p1")
		interfaceVarSetTrainer(dataAdress.description, "0")
		green.askTheSourtestWord = false
		changeColor('red', "p3")
		interfaceVarSetTrainer(dataAdress.shortestWord, "0")
	} else {
		green.askDescription = true
		changeColor('green', "p1")
		interfaceVarSetTrainer(dataAdress.description, "1")
	}
}

function multipleAnswerOptionsButton() {
	if (green.multipleAnswerOptions) {
		green.multipleAnswerOptions = false
		changeColor('red', "p6")
		interfaceVarSetTrainer(dataAdress.multipleAnswer, "0")
	} else {
		green.multipleAnswerOptions = true
		changeColor('green', "p6")
		interfaceVarSetTrainer(dataAdress.multipleAnswer, "1")
	}
}

function askBrackedContentButton() {
	if (green.askBrackedContent) {
		green.askBrackedContent = false
		changeColor('red', "p2")
		interfaceVarSetTrainer(dataAdress.brackedContent, "0")
	} else {
		green.askBrackedContent = true
		changeColor('green', "p2")
		interfaceVarSetTrainer(dataAdress.brackedContent, "1")
	}
}

function askTheSourtestWordButton() {
	if (green.askTheSourtestWord) {
		green.askTheSourtestWord = false
		changeColor('red', "p3")
		interfaceVarSetTrainer(dataAdress.shortestWord, "0")
	} else {
		green.askTheSourtestWord = true
		changeColor('green', "p3")
		interfaceVarSetTrainer(dataAdress.shortestWord, "1")
		green.askDescription = true
		changeColor('green', "p1")
		interfaceVarSetTrainer(dataAdress.description, "1")
		green.askTerm = true
		changeColor('green', "p5")
		interfaceVarSetTrainer(dataAdress.term, "1")
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

function setNewLanguage() {
	if (len === "de") {
		interfaceVarSetTrainer(dataAdress.language, "en")
	} else {
		interfaceVarSetTrainer(dataAdress.language, "de")
	}
	location.reload(true)
}

function loadUI_settings() {
	var il
	il = interfaceVarReadTrainer(dataAdress.language)
	if (il === "de") {
		len = "de"
	} else {
		len = "en"
		interfaceVarSetTrainer(dataAdress.language, "en")
	}
	il = interfaceVarReadTrainer(dataAdress.description)
	if (il === "1") {
		green.askDescription = true
	}
	il = interfaceVarReadTrainer(dataAdress.term)
	if (il === "1") {
		green.askTerm = true
	}
	il = interfaceVarReadTrainer(dataAdress.brackedContent)
	if (il === "1") {
		green.askBrackedContent = true
	}
	il = interfaceVarReadTrainer(dataAdress.shortestWord)
	if (il === "1") {
		green.askTheSourtestWord = true
	}
	il = interfaceVarReadTrainer(dataAdress.multipleAnswer)
	if (il === "1") {
		green.multipleAnswerOptions = true
	}
}

function getUI_settings() {// return the green object with the settings data.
	loadUI_settings()
	setDefaultColor()
	return green
}