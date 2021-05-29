const aPoints = 3
const de_KIND = ["die Beschreibung", "das Fachwort"]
const en_KIND = ["the description", "the technical term"]
var globalText = {
	deutsch: {
		wort: "Was ist " + de_KIND[0] + ": ",
		formel: "Was ist " + de_KIND[1] + ": ",
		finish: "Fertig! Du hast bei jedem Wort " + aPoints + " Punkte geschafft.",
		nextLevel: "NEXT LEVEL: Jetzt wird nur noch nach den Fachwörtern gefragt.",
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
		tdel: "Der fortschritt wurde gelöscht.",
		svt: ["Einstellungen", "Nur nach Fremdwörtern Fragen", "Frage nach geklammerten Inhalten",
		"Frage nach dem kürtzesten der beiden Wörter", "inglish", "Starte Programme",
		"Starte Quiz", "Zeige alle Vokabeln", "Dialogfeld Befehle", "Beendet das Dialogfeld"],
		lorv: ["Zurück"]
	},
	inglish: {
		wort: "What is " + en_KIND[0] + ": ",
		formel: "What is " + en_KIND[1] + ": ",
		finish: "Finished! You have by every word " + aPoints + " points.",
		nextLevel: "NEXT LEVEL: Now you only need to ask for " + en_KIND[0],
		currentPointsText: "Current score: ",
		storageError: "ERROR: The localStorage cannot be accessed!",
		right: "right",
		tfalse: "false",
		points: "points",
		card: "card: ",
		account: ", account: ",
		from: " from ",
		mpoints: " points",
		write: "write ",
		resetToDo: " to reset the progress.",
		keep: "Progress has been maintained.",
		tdel: "The progress has been deleted.",
		svt: ["Settings", "Only ask for " + en_KIND[0], "Ask about bracked content",
		"Ask for the shortest of the two words", "Deutsch", "start program",
		"start quiz", "Show all vocabulary", "Commands dialog box", "Exits the dialog box"],
		lorv: ["back"]
	}
}