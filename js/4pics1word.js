var letterDir = "img/letters/";
var unusedBlock = letterDir + "used-answer-block.png";
var words;
var dir;
var len;
var tries;
var imageDir;
var actualWord;
var compareWord;
var letter;
var letters;
var guess;

var count=30;
var counter;

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

function go(mode) {
	$("#content").show();
	$("#title").hide();

	if (mode == "easy") {
  	words = easy;
  	letters = easyLetters;
  	count=easyTimer;
  } else if (mode == "moderate") {
  	words = moderate;
  	letters = moderateLetters;
  	count=moderateTimer;
  } else {
  	words = hard;
  	letters = hardLetters;	      	
  	count=hardTimer;
  }

  $("#category").attr("src", "img/" + mode + ".png");
	dir = Math.ceil(Math.random() * words.length);
	actualWord = words[dir-1].toLowerCase();
	compareWord = actualWord.replace(/ /g, "");
  guess = compareWord.replace(/\w/g,"_");
	len = compareWord.length;
	imageDir = "img/"+mode +"/"+compareWord + "/";
	letter = letters[dir-1].toLowerCase().replace(/ /g, "").shuffle();

  init();

  $("#IMAGE_1").attr("src",imageDir+"1.jpg");
  $("#IMAGE_2").attr("src",imageDir+"2.jpg");
  $("#IMAGE_3").attr("src",imageDir+"3.jpg");
  $("#IMAGE_4").attr("src",imageDir+"4.jpg");

  counter =setInterval(timer, 1000); //1000 will  run it every 1 second
}

function home() {
  $("#content").hide();
  $("#title").show();
  clearInterval(counter);
}

function init() {
  tries = 0;
  guess = compareWord.replace(/\w/g,"_");

  var a = actualWord.split("");
  var b = "";
  $("#LETTERS").text("");
  for (var i = 0; i < a.length; i++) {
    if (a[i]== " ") {
      b += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    } else {
      b += "<img id=\""+i+"\" class=\"word\" src=\"" + unusedBlock + "\"/>";
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
    setTimeout(function () {alert("Correct!");}, 100);
    clearInterval(counter);
  }
}

function remove(block, letter) {
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