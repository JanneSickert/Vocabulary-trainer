const aPoints = 3
const de_KIND = ["die Beschreibung", "das Fachwort"]
const en_KIND = ["die Beschreibung", "das Fachwort"]
var globalText = {
	deutsch: {
		wort: "Was ist " + de_KIND[0] + ": ",
		formel: "Was ist " + de_KIND[1] + ": ",
		finish: "Fertig! Du hast bei jedem Wort " + aPoints + " Punkte geschafft.",
		nextLevel: "NEXT LEVEL: Now you only need to ask for foreign words",
		currentPointsText: "Aktueller Punktestand: ",
		storageError: "ERROR: Es kann nicht auf den localStorage zugekriffen werden!",
		right: "Richtig",
		tfalse: "Falsch",
		points: "Punkte",
		card: "Karte: ",
		account: ", Konto: ",
		from: " von ",
		mpoints: " Punkten",
		write: "Schreibe ",
		resetToDo: " um den fortschritt zurück zu setzen.",
		keep: "Der fortschritt wurde beibehalten.",
		tdel: "Der fortschritt wurde gelöscht."
	},
	inglish: {
		wort: "Was ist " + en_KIND[0] + ": ",
		formel: "Was ist " + en_KIND[1] + ": ",
		finish: "Fertig! Du hast bei jedem Wort " + aPoints + " Punkte geschafft.",
		nextLevel: "NEXT LEVEL: Now you only need to ask for foreign words",
		currentPointsText: "Aktueller Punktestand: ",
		storageError: "ERROR: Es kann nicht auf den localStorage zugekriffen werden!",
		right: "Richtig",
		tfalse: "Falsch",
		points: "Punkte",
		card: "Karte: ",
		account: ", Konto: ",
		from: " von ",
		mpoints: " Punkten",
		write: "Schreibe ",
		resetToDo: " um den fortschritt zurück zu setzen.",
		keep: "Der fortschritt wurde beibehalten.",
		tdel: "Der fortschritt wurde gelöscht."
	}
}