var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;


// if we click on the start/reset button
document.getElementById("startreset").onclick = 
function() {
  //if we are playing
  if(playing == true){
    location.reload(); //reload page
  } else { //if we are not playing
    
    //change mode to playing
    playing = true;

    //set score to 0
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;

    //show countdown box

    show("timeremaining");
      timeremaining = 60;
      
    //change button to reset

    document.getElementById("startreset").innerHTML = "Reset Game";

    //hide gameover box
    hide("gameOver");

      //start countdown
      startCountdown();

      //generate a new Q&A

      generateQA();
  }
}
    
        
//Clicking on an answer box
for(i=1; i<5; i++){
  document.getElementById("box" + i).onclick = 
function() {
  //check if we are playing
  if(playing == true){
    if(this.innerHTML == correctAnswer){
      //correct answer

      //increase score by 1
      score++;
      document.getElementById("scorevalue").innerHTML = score;

      //hide wrong box and show correct box
      hide("wrong");
      show("correct");
      setTimeout(function(){
        hide("correct");
      }, 1000);

      //Genereate new Q&A
      generateQA();
    } else {
      //wrong answer
      hide("correct");
      show("wrong");
      setTimeout(function(){
        hide("wrong");
      }, 1000);
    }
  }
}
}

//functions

//start counter
function startCountdown(){
  action = setInterval(function(){
    timeremaining -= 1;
    document.getElementById("remainingValue").innerHTML = timeremaining;
      if(timeremaining == 0){ //gameover
        stopCountdown();
        show("gameOver");
        document.getElementById("gameOver").innerHTML = "<p>Game Over!</p> <p>Yout score is " + score + "</p>";

        hide("timeremaining");
        hide("correct");
        hide("wrong");
        playing = false;
        document.getElementById("startreset").innerHTML = "Start Game";
      }
  }, 1000);
}

//stop counter
function stopCountdown() {
  clearInterval(action);
}

//hide an element
function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

//show an element
function show(Id) {
  document.getElementById(Id).style.display = "block";
}

//generate question and multiple answers
function generateQA(){
  var x = 1 + Math.round(9 * Math.random());
  var y = 1 + Math.round(9 * Math.random());
  correctAnswer = x*y;
  document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer

    //fill other boxes with wrong answers
    var answers = [correctAnswer];
    for(i=1; i<5; i++) {
      if( i != correctPosition) {
        var wrongAnswer;
        do{
          wrongAnswer = (1 + Math.round(9 * Math.random()))*(1 + Math.round(9 * Math.random())); //a wrong answer
        }
        while(answers.indexOf(wrongAnswer)>-1)
          document.getElementById("box" + i).innerHTML = wrongAnswer;
          answers.push(wrongAnswer);
      }
    }
}