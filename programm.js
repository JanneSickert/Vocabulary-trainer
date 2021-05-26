// Settings
const MAX_POINTS = 3
var SHOW_BRACKETED_CONTENT = true
const KIND = ["die Beschreibung", "das Fachwort"]
var ANSWER_SHORTEST_WORD = true
// --------

var globalText = {
    wort: "Was ist " + KIND[0] + ": ",
    formel: "Was ist " + KIND[1] + ": ",
    finish: "Fertig! Du hast bei jedem Wort " + MAX_POINTS + " Punkte geschafft.",
    nextLevel: "NEXT LEVEL: Now you only need to ask for foreign words",
	currentPointsText: "Aktueller Punktestand: ",
	storageError: "ERROR: Es kann nicht auf den localStorage zugekriffen werden!"
}
var arr = new Array()
var isActiv
var nextMessageSent = true
var currentPoints = 0
var onlyEnglishQuest = true	// Just ask for KIND[0] words
var data_length
var nextIndex = 0
var interval = 1
var unchecktArr = []
var varResetTrainer
var varReadTrainer
var varSetTrainer

function setStorageFoo(resetTrainer, readTrainer, setTrainer) {
    varResetTrainer = resetTrainer
    varReadTrainer = readTrainer
    varSetTrainer = setTrainer
}

var deleteDoubleEntrys = function (oldArray) {
	var copy = Object.assign({}, oldArray)
	var len = oldArray.length
	var doubleIndexArray = []
	var resultArr = []
	function checkBanIndex(index) {
		var b = true
		for (var i = 0; i < doubleIndexArray.length; i++) {
			if (doubleIndexArray[i] == index) {
				b = false
			}
		}
		return b
	}
	function compare(a, b) {// return true if the content is the same
		return (a[0] === b[0] && a[1] === b[1])
	}
	for (var i = 0; i < len; i++) {
		if (checkBanIndex(i)) {
			for (var j = 0; j < len; j++) {
				if (!(i == j)) {
					if (compare(oldArray[i], copy[j])) {
						doubleIndexArray.push(j)
					}
				}
			}
		}
	}
	for (var k = 0; k < len; k++) {
		if (checkBanIndex(k)) {
			resultArr.push(oldArray[k])
		}
	}
	return resultArr
}

function store(id, value) {
    varSetTrainer(id, value);
}

function restore(id) {
    return varReadTrainer(id)
}

function setSize(size) {
    data_length = size;
}

function getSize() {
    return data_length;
}

class Staff {
    constructor(formel, wort, index) {
      this.index = index;
      this.formel = formel;
      this.wort = wort;
      this.punkte = 0;
      this.notKnow = true;
    }
    restorPoints() {
        var localVar = restore(this.index);
        this.punkte = parseInt(localVar);
    }
    setPointToNull() {
        store(this.index, "0")
    }
    upDownPunkte(str) {
        if(str==="Up") {
            if (this.punkte == MAX_POINTS) {
                this.notKnow = false
            } else {
                this.punkte++
            }
        } else {
            if (!(this.punkte==0)) {
                this.punkte--
            }
        }
        store(this.index, ("" + this.punkte));
    }
  	get is_Activ() {
      return this.notKnow;
    }
    get getFormel() {
      return this.formel;
    } 
    get getWort() {
      return this.wort;
    }
    get getPunkte() {
        return this.punkte;
    }
}

function addChecktContent(formel, wort) {
	var next = new Staff(formel, wort, nextIndex)
    nextIndex++;
    arr.push(next);
}

function add(formel, wort) {
	unchecktArr.push([formel, wort])
}

function contains(str, partChar) {
	for (var i = 0; i < str.length; i++) {
		if (str[i]===partChar) {
			return true
		}
	}
	return false
}

function LongAnswer() {
  this.oneWord = function(user, system) {
    if (system.length > 8) {
      var sameWords = 0
      var words = system.split(" ")
      var copy = Object.assign({}, words)
      var len = words.length
      for (var i = 0; i < len; i++) {
        for (var k = 0; k < len; k++) {
          if (!(i==k)) {
            if (words[i]===copy[k]) {
              sameWords++
            }
          }
        }
      }
      sameWords = sameWords / 2
      if (sameWords >= (words.length / 2)) {
        return true
      } else {
        return false
      }
    } else {
      return (user===system)
    }
  }
  this.arr = function(user, system) {
    for (var i = 0; i < system.length; i++) {
      if (this.oneWord(user, system[i])) {
        return true
      }
    }
  }
}

function optsCheck(system, user) {
  var longAns = new LongAnswer()
  if (contains(system, ",")) {
    var options = system.split(", ")
    for (var i = 0; i < options.length; i++) {
      if (user === options[i]) {
        return true
      }
    }
    return (longAns.arr(user, options))
  } else {
    if (user === system) {
      return true
    } else {
      return (longAns.oneWord(user, system))
    }
  }
}

function eql(user, system) {
	if (!(SHOW_BRACKETED_CONTENT)) {
		if (contains(system, "(")) {
			var update = system.split("(")
			return (optsCheck(update[0], user))
		} else {
      return (optsCheck(system, user))
		}
	} else {
    return (optsCheck(system, user))
	}
}

function askFormel(i) {
    var input1 = prompt(globalText.formel + arr[i].getWort);
    if (input1 === "END") {
		isActiv = false
	} else {
		if (eql(input1, arr[i].getFormel)) {
			arr[i].upDownPunkte("Up");
			alert("Right! " + String(arr[i].getPunkte) + " Punkte");
		} else {
			arr[i].upDownPunkte("down");
			alert("False! " + String(arr[i].getPunkte) + " Punkte");
			alert(arr[i].getWort + " << >> " + arr[i].getFormel);
		}
	}
}

function askWort(i) {
    var input1 = prompt(globalText.wort + arr[i].getFormel);
    if (input1 === "END") {
		isActiv = false
	} else {
		if (eql(input1, arr[i].getWort)) {
			arr[i].upDownPunkte("Up");
			alert("Right! " + String(arr[i].getPunkte) + " Punkte");
		} else {
			arr[i].upDownPunkte("down");
			alert("False! " + String(arr[i].getPunkte) + " Punkte");
			alert(arr[i].getFormel + " << >> " + arr[i].getWort);
		}
	}
}

function exam() {
    var nochZuLernen = true
    var maxCompletePoints = 3 * getSize();
    var completePoints = 0;
    for (var a = 0; a < getSize(); a++) {
        completePoints = completePoints + arr[a].getPunkte
    }
    if (completePoints >= maxCompletePoints) {
        nochZuLernen = false;
		alert(globalText.finish);
        varResetTrainer()
    }
    return nochZuLernen;
}

function countAllCurrentPoints() {
	currentPoints = 0;
    for (var i = 0; i < arr.length; i++) {
	    currentPoints = arr[i].getPunkte + currentPoints
    }
}

function updateCurrentPoints() {
	countAllCurrentPoints()
	if (getSize() <= currentPoints) {
		if (nextMessageSent) {
			onlyEnglishQuest = true
			alert(globalText.nextLevel)
			nextMessageSent = false
		}
	}
}

function score(cardNr) {
    if (interval==0) {
        var allPoints = MAX_POINTS * data_length;
	updateCurrentPoints()
	cardNr = cardNr+1
        alert("Karte: " + cardNr + ", Konto: " + currentPoints + " von " + allPoints + " Punkten")
	interval = 4
    } else {
	interval = interval-1
    }
}

function makeQuiz() {
    var aa = function(nr) {
        switch (nr) {
            case 0: askFormel(i)
                break
            case 1: askWort(i)
                break
        }
    }
    var stop = getSize();
    for (var i = 0; i < stop; i++) {
		if (!isActiv) {
			break
		}
        if (arr[i].is_Activ) {
            if (ANSWER_SHORTEST_WORD) {
                if (arr[i].getFormel.length > arr[i].getWort.length) {
                    aa(1)
                } else {
                    aa(0)
                }
            } else {
                if (!(onlyEnglishQuest)) {
                    askFormel(i)
                } else {
                    var randomNr = Math.round(Math.random());
                    aa(randomNr)
                }
            }
            score(i)
        }
    }
}

function makeCons() {
	var goodArr = deleteDoubleEntrys(unchecktArr)
	setSize(goodArr.length)
	for (var ci = 0; ci < goodArr.length; ci++) {
		addChecktContent(goodArr[ci][0], goodArr[ci][1])
	}
}

function setConstants(green) {
	SHOW_BRACKETED_CONTENT = green.askBrackedContent
	ANSWER_SHORTEST_WORD = green.askTheSourtestWord
	onlyEnglishQuest = green.askOnlyForeignWords
}

function startQuiz(green) {
	isActiv = true
	makeCons()
	setConstants(green)
    if (isNaN(parseInt(restore(0)))) {
		arr.forEach(function (vocab) {
            vocab.setPointToNull()
        });
    } else {
		arr.forEach(function (vocab) {
			vocab.restorPoints()
        });
	    countAllCurrentPoints()
	    alert(globalText.currentPointsText + currentPoints)
	}
    while(exam() && isActiv) {
        makeQuiz();
    }
	location.reload(true)
}