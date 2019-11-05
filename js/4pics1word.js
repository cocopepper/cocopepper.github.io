var letterDir = "img/letters/";
var unusedBlock = letterDir + "used-answer-block.png";
var imageDir;

var wordPool;
var index;
var wordLength;
var originalWord="";
var compareWord="";

var shuffledChoices;
var letterChoices;

var guessCtr;
var guess;

var score = 0;
var scoreCounter;

var usedWords = [""];
var usedClue = 0;

var count=30;
var counter;

var isSolved = false;

var category;

String.prototype.shuffle = function () {
  var a = this.split(""),
      n = a.length;

  for(var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
  }
  return a.join("");
}

let checker = (arr, target) => target.every(v => arr.includes(v));

function init() {
  if (isLastTry()) {
    return;
  }
  $("#score").text(score);
  guessCtr = 0;
  guess = compareWord.replace(/\w/g,"_");

  //Initialize blank boxes
  var a = originalWord.split("");
  var b = "";
  $("#LETTERS").text("");
  for (var i = 0, ctr=0; i < a.length; i++) {
    if (a[i]== " ") {
      if (i > 12) {
        b+= "<br/>";
      } else {
        b += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
      }
    } else {
      b += "<img id=\""+ctr+"\" class=\"word\" src=\"" + unusedBlock + "\"/>";
      ctr++;
    }
  }
  $("#WORDS").text("");
  $("#WORDS").append(b);

  //Initialize letter choices
  a = shuffledChoices.split("");
  b = "";
  $("#LETTERS").text("");
  for (var i = 0; i < a.length; i++) {
    if (a.length > 12 && i == Math.floor(a.length/2)) {
      b+="<br/>";
    }
    b += "<span onclick=\"select('" + a[i] + "', this);return false;\"><input type=\"hidden\" value=\""+a[i]+"\"/><img style=\"cursor: pointer;\"src=\"" + letterDir + a[i] + ".png\"/> </span>";
  }
  $("#LETTERS").append(b);
}

function newWord(mode) {
  if (isLastTry()) {
    return;
  }

	if (mode == "easy") {
  	wordPool = easy;
  	letterChoices = easyLetters;
  	count=easyTimer;
    scoreCounter=easyScore;
  } else if (mode == "moderate") {
  	wordPool = moderate;
  	letterChoices = moderateLetters;
  	count=moderateTimer;
    scoreCounter=moderateScore;
  } else {
  	wordPool = hard;
  	letterChoices = hardLetters;	      	
  	count=hardTimer;
    scoreCounter=hardScore;
  }

  if (checker(usedWords, wordPool)) {
    alert ("No more words!");
    return;
  }

  category = mode;
  isSolved = false;

  $(".content").show();
  $("#title").hide();

  $("#category").attr("src", "img/" + mode + ".png");

  //Prevents getting the same word from pool
	while (usedWords.includes(originalWord)) {
    index = Math.ceil(Math.random() * wordPool.length) - 1;
  	originalWord = wordPool[index].toLowerCase();
  	compareWord = originalWord.replace(/ /g, "");
    if (!usedWords.includes(originalWord)) {
      usedWords.push(originalWord);
      break;
    }
    if (checker(usedWords, wordPool)) {
      break;
    }
  } 

  usedClue=0;
  guess = compareWord.replace(/\w/g,"_");
	wordLength = compareWord.length;
	imageDir = "img/"+mode +"/"+compareWord + "/";
	shuffledChoices = letterChoices[index].toLowerCase().replace(/ /g, "").shuffle();

  init();

  $("#IMAGE_1").attr("src",imageDir+"1.jpg");
  $("#IMAGE_2").attr("src",imageDir+"2.jpg");
  $("#IMAGE_3").attr("src",imageDir+"3.jpg");
  $("#IMAGE_4").attr("src",imageDir+"4.jpg");

  if (isTimed) {
    counter =setInterval(timer, 1000); //1000 will  run it every 1 second
  } else {
    $("#timer").hide();    
  }
}

function home() { 
  gameTries--; 
  if (isLastTry()) {
    return;
  }
  $(".content").hide();
  $("#title").show();
  clearInterval(counter);
}

function clue() {
  if (isGameOver()) {
    return;
  }

  if (score <= 0) {
    alert("Earn score first.");
    return; 
  }

  if (hasClueLimit && usedClue >= clueLimit) {
    alert("All clues used already.");
    return;
  }

  score--;
  $("#score").text(score);

  var i = Math.ceil(Math.random() * guess.length) - 1;
  while (guess.indexOf("_") >= 0 && guess[i]!= "_") {
    i = Math.ceil(Math.random() * guess.length) - 1;
  }

  var temp = guess.split("");
  temp[i] = compareWord[i];
  guess = temp.join("");

  var el = $("input[value="+compareWord[i]+"]").parent().filter(":visible:first");
  
  var block = $("#"+[i]);
  block[0].src =  el.find("img").attr("src");
  block.removeClass("word");
  
  el.hide();
  usedClue++;
  guessCtr++;
}

function select(letter, el) {
  if (isGameOver()) {
    return;
  }

  if (guessCtr >= wordLength) {
    return;
  }

  guessCtr++;

  $(el).hide();
  $(".word")[0].src =  $(el).find("img")[0].src;

  var block = $(".word:first");
  block.removeClass("word");
  block.click(function () {remove(this, el);});

  guess = guess.replace(/\_/, letter);

  if (guess.length == wordLength && guess == compareWord) {
    setTimeout(function () {
      score+= scoreCounter;
      $("#score").text(score);
      alert("Correct!");
      isSolved = true;
      clearInterval(counter);

      if (isGameOver()) {
        return;
      }
    }, 100);
  }
}

function remove(block, letter) { 
  if (isGameOver()) {
    return;
  }
  
  guessCtr--; 
  $(letter).show();
  $(block).addClass("word");
  $(block).attr("src", unusedBlock);
  $(block).unbind("click");

  var temp = guess.split("");
  temp[block.id] = "_";
  guess = temp.join("");
}

function timer()
{
  count = count - 1;
  if (count <= 0)
  {
    clearInterval(counter);
     //counter ended, do something here

    if (isGameOver()) {
      return;
    }
    return;
  }

  $("#timer").text(count);
  $("#timer").css("color", "black");
  if (count <= 5) {
  	$("#timer").css("color", "red");
  }
  //Do code for showing the number of seconds here
}

function pass() {
  gameTries--; 
  newWord(category);
}

function isGameOver() {
  if (checkTimesUp && count <= 0) {
    alert("Time's Up!");
    if (hasLimit && gameTries == 1) {
      alert("Game Over!");
      alert("Final Score: " + score);
    }
    return true;
  }

  if ((checkTimesUp && count <= 0 || !checkTimesUp || isSolved) && hasLimit && gameTries == 1) {
    alert("Game Over!");
    alert("Final Score: " + score);
    return true;
  }

  return false;
}

function isLastTry() {
  if (hasLimit && gameTries <= 0) {
    alert("No more passes!");
    gameTries++;
    return true;
  }

  return false;
}