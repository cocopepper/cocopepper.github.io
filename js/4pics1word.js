var letterDir = "img/letters/";
var unusedBlock = letterDir + "used-answer-block.png";
var words;
var dir;
var len;
var tries;
var imageDir;
var actualWord="";
var compareWord="";
var letter;
var letters;
var guess;
var score = 0;
var scoreCounter;
var usedWords = [""];
var usedClue = 0;

var gameTries = 3;

var count=30;
var counter;

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

function pass() {
  gameTries--; 
  go(category);
}

let checker = (arr, target) => target.every(v => arr.includes(v));

function isGameOver() {
  if (gameTries <= 0) {
    alert("Game Over!");
    alert("Final Score: " + score);
    return true;
  }

  return false;
}

function go(mode) {

  if (isGameOver()) {
    return;
  }

	if (mode == "easy") {
  	words = easy;
  	letters = easyLetters;
  	count=easyTimer;
    scoreCounter=easyScore;
  } else if (mode == "moderate") {
  	words = moderate;
  	letters = moderateLetters;
  	count=moderateTimer;
    scoreCounter=moderateScore;
  } else {
  	words = hard;
  	letters = hardLetters;	      	
  	count=hardTimer;
    scoreCounter=hardScore;
  }

  if (checker(usedWords, words)) {
    alert ("No more words!");
    return;
  }
  category = mode;
  $(".content").show();
  $("#title").hide();

  $("#category").attr("src", "img/" + mode + ".png");
	while (usedWords.includes(actualWord)) {
    dir = Math.ceil(Math.random() * words.length);
  	actualWord = words[dir-1].toLowerCase();
  	compareWord = actualWord.replace(/ /g, "");
    if (!usedWords.includes(actualWord)) {
      usedWords.push(actualWord);
      break;
    }
    if (checker(usedWords, words)) {
      break;
    }
  } 

  usedClue=0;
  guess = compareWord.replace(/\w/g,"_");
	len = compareWord.length;
	imageDir = "img/"+mode +"/"+compareWord + "/";
	letter = letters[dir-1].toLowerCase().replace(/ /g, "").shuffle();

  init();

  $("#IMAGE_1").attr("src",imageDir+"1.jpg");
  $("#IMAGE_2").attr("src",imageDir+"2.jpg");
  $("#IMAGE_3").attr("src",imageDir+"3.jpg");
  $("#IMAGE_4").attr("src",imageDir+"4.jpg");

  $("#timer").hide();
  //counter =setInterval(timer, 1000); //1000 will  run it every 1 second
}

function home() { 
  gameTries--; 
  if (isGameOver()) {
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
  if (usedClue >= clueLimit) {
    alert("All clues used already.");
    return;
  }
  score--;
  $("#score").text(score);
  var i = Math.ceil(Math.random() * guess.length);
  while (guess.indexOf("_") >= 0 && guess[i-1]!= "_") {
    i = Math.ceil(Math.random() * guess.length);
  }

  var temp = guess.split("");
  temp[i-1] = compareWord[i-1];
  guess = temp.join("");

  var el = $("input[value="+compareWord[i-1]+"]").parent().filter(":visible:first");
  
  var block = $("#"+[i-1]);
  block[0].src =  el.find("img").attr("src");
  block.removeClass("word");

  el.hide();
  usedClue++;
}

function init() {
  if (isGameOver()) {
    return;
  }
  $("#score").text(score);
  tries = 0;
  guess = compareWord.replace(/\w/g,"_");

  var a = actualWord.split("");
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

  a = letter.split("");
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

function select(letter, el) {
  if (isGameOver()) {
    return;
  }
  tries++;
  if (tries > len) {
    return;
  }

  $(el).hide();
  $(".word")[0].src =  $(el).find("img")[0].src;

  var block = $(".word:first");
  block.removeClass("word");

  block.click(function () {remove(this, el);});

  guess = guess.replace(/\_/, letter);

  if (guess.length == len && guess == compareWord) {
    setTimeout(function () {
      score+= scoreCounter;
      $("#score").text(score);
      alert("Correct!");
      gameTries--;
      clearInterval(counter);
      
      if (!isGameOver()) {     
        go(category); 
      }
    }, 100);
  }
}

function remove(block, letter) {
  if (isGameOver()) {
    return;
  }
  tries--; 
  $(letter).show();
  $(block).addClass("word");
  $(block).attr("src", unusedBlock);

  var temp = guess.split("");
  temp[block.id] = "_";
  guess = temp.join("");
}

function timer()
{
  count=count-1;
  if (count <= 0)
  {
     clearInterval(counter);
     alert("Time's Up!");
     //counter ended, do something here
     return;
  }

  $("#timer").text(count);
  if ( count <= 5) {
  	$("#timer").css("color", "red");
  }
  //Do code for showing the number of seconds here
}
