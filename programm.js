var MAX_POINTS
var SHOW_BRACKETED_CONTENT = true
var KIND
var ANSWER_SHORTEST_WORD = true
var globalText
var arr = new Array()
var isActiv
var nextMessageSent = true
var currentPoints = 0
var descriptionQuest
var termQuest
var data_length
var nextIndex = 0
var interval = 1
var unchecktArr = []
var varResetTrainer
var varReadTrainer
var varSetTrainer
var differentOptionsActiv
var multipleAnswerOptions

function setGlobalText(pText) {
	globalText = pText
}

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

function setMaxPoints(pPoints) {
	MAX_POINTS = pPoints
}

function setKIND(pKind) {
	KIND = pKind
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
    restorPoints() {// and set notKnow to false if this vocab have 3 points
        var localVar = restore(this.index)
        this.punkte = parseInt(localVar)
		if (this.punkte == 3) {
			this.notKnow = false
		}
    }
    setPointToNull() {
        store(this.index, "0")
    }
    upDownPunkte(str) {
        if (str==="Up") {
            if (this.punkte == MAX_POINTS - 1) {
				this.punkte++
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
  	get getActiv() {
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


function Options() {
	
	const DELIMITER = ", "
	
	function Different() {
		
		this.system = null
		this.user = null
		
		this.checkOptions = function() {
			for (var i = 0; i < this.system.length; i++) {
				if (this.system[i] === this.user) {
					return true
				}
			}
			return false
		}
	}


	function Multiple() {
		
		var allPosibleAnswers = []
		var systemArr
		var userArr
		
		function existInArray(str, arr) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] === str) {
					return true
				}
			}
			return false
		}
		
		function fakulteat(len) {
			var erg = len
			for (var i = len - 1; i > 0; i--) {
				erg = erg * i
			}
			return erg
		}
		
		function createArrOfAllPosibleAnswers() {
			while (allPosibleAnswers.length < fakulteat(systemArr.length)) {
				var next = []
				while (next.length < systemArr.length) {
					var rw = systemArr[Math.round(Math.random() * systemArr.length)]
					if (!(existInArray(rw, next))) {
						next.push(rw)
					}
				}
				allPosibleAnswers.push(next)
			}
		}
		
		function addSpaceAfterComma(str) {
			var resultStr = ""
			for (var i = 0; i < str.length; i++) {
				if (str[i] === ",") {
					resultStr = resultStr + str[i] + " "
				} else {
					resultStr = resultStr + str[i]
				}
			}
			return resultStr
		}
		
		this.setData = function(system, user) {
			systemArr = system
			userArr = user
		}
		
		this.check = function() {
			var possibleAnswers = []
			var userAnswer = addSpaceAfterComma(userArr.toString())
			allPosibleAnswers.forEach(function (phrase) {
				var str = phrase.toString()
				possibleAnswers.push(addSpaceAfterComma(str))
			});
			for (var i = 0; i < possibleAnswers.length; i++) {
				if (possibleAnswers[i] === userAnswer) {
					return true
				}
			}
			return false
		}
	}


	var different = new Different()
	var multiple = new Multiple()

	function contains(str) {
		var partStr = DELIMITER
		var len = str.length - 1
		for (var i = 0; i < len; i++) {
			if (str[i] === partStr[0] && str[i + 1] === partStr[1]) {
				return true
			}
		}
		return false
	}
	
	this.differentOptions = function(system, user) {
		if (contains(system)) {
			different.system = system.split(DELIMITER)
			different.user = user
			return (different.checkOptions())
		} else {
			return (system === user)
		}
	}
	
	this.multipleAnswerOptions = function(system, user) {
		if (contains(system) && contains(user) && system.length == user.length) {
			multiple.setData(system.split(DELIMITER), user.split(DELIMITER))
			var b = multiple.check()
			return b
		} else {
			return (system === user)
		}
	}
}


function optsCheck(system, user) {
	var opt = new Options()
	if (differentOptionsActiv) {
		return (opt.differentOptions(system, user))
	} else if (multipleAnswerOptions) {
		return (opt.multipleAnswerOptions(system, user))
	} else {
		return (system === user)
	}
}

function containsEql(str, mchar) {
	for (var i = 0; i < str.length; i++) {
		if (str[i] === mchar) {
			return true
		}
	}
	return false
}

function eql(user, system) {// Just looking for cling
	if (!(SHOW_BRACKETED_CONTENT)) {
		if (containsEql(system, "(")) {
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
    var input1 = prompt(globalText.formel + arr[i].getWort)
    if (input1 === "END") {
		isActiv = false
	} else {
		if (eql(input1, arr[i].getFormel)) {
			arr[i].upDownPunkte("Up")
			alert(globalText.right + " " + String(arr[i].getPunkte) + " " + globalText.points)
		} else {
			arr[i].upDownPunkte("down")
			alert(globalText.tfalse + " " + String(arr[i].getPunkte) + " " + globalText.points)
			alert(arr[i].getWort + " << >> " + arr[i].getFormel)
		}
	}
}

function askWort(i) {
    var input1 = prompt(globalText.wort + arr[i].getFormel)
    if (input1 === "END") {
		isActiv = false
	} else {
		if (eql(input1, arr[i].getWort)) {
			arr[i].upDownPunkte("Up")
			alert(globalText.right + " " + String(arr[i].getPunkte) + " " + globalText.points)
		} else {
			arr[i].upDownPunkte("down")
			alert(globalText.tfalse + " " + String(arr[i].getPunkte) + " " + globalText.points)
			alert(arr[i].getFormel + " << >> " + arr[i].getWort)
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
			alert(globalText.nextLevel)
			nextMessageSent = false
		}
	}
}

function score(cardNr) {
    if (interval==0) {
        var allPoints = MAX_POINTS * data_length;
		updateCurrentPoints()
		cardNr = cardNr + 1
		alert(globalText.card + cardNr + globalText.account + currentPoints + globalText.from + allPoints + globalText.mpoints)
		interval = 4
    } else {
		interval = interval - 1
    }
}

function makeQuiz() {
    var aa = function(nr) {
        switch (nr) {
            case 0: askFormel(i)//term
                break
            case 1: askWort(i)// description
                break
        }
    }
	var askRandom = function() {
		var randomNr = Math.round(Math.random());
        aa(randomNr)
	}
    var stop = getSize();
    for (var i = 0; i < stop; i++) {
		if (!isActiv) {
			break
		}
        if (arr[i].getActiv) {
            if (ANSWER_SHORTEST_WORD) {
                if (arr[i].getFormel.length > arr[i].getWort.length) {
                    aa(1)
                } else {
                    aa(0)
                }
            } else {
				if (termQuest && descriptionQuest) {
					askRandom()
				} else {
					if (termQuest) {
						askFormel(i)
					} else if (descriptionQuest) {
						askWort(i)
					} else {
						askRandom()
					}
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
	descriptionQuest = green.askDescription
	termQuest = green.askTerm
	multipleAnswerOptions = green.multipleAnswerOptions
	differentOptionsActiv = green.differentOptionsActiv
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