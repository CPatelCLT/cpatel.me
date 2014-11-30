// JavaScript Document
var suspectArray = ["a","b","c","d","e","f","g"];
var perpArray = ["a","b","c","d","e","f","g"];
var cluesArray = ["a","b","c","d","e","f","g"];

var players = [];
count = 0;
var p = [];
var pla1;
var pla2;
var pla3;
var skip = 0;

	 
//Creates an array of players, and takes in their names 
function displayPlayers(){
	//array for players with names
 for(var i = 0; i <= 2; i++){
	 count++;
	 p[i] = window.prompt("Player " + count + ": Enter your name");
	 //var blah
	 //blah = [window.prompt("Player " + count + ": Enter your name"), [i]];
	  players.push(p[i]);
 		//players.push(blah);
 }
	document.getElementById("p1").innerHTML = players[0];
	pla1 = players[0];
	document.getElementById("p2").innerHTML = players[1];
	pla2 = players[1];
	document.getElementById("p3").innerHTML = players[2];
	pla3 = players[2];
}

//displays suspects array
function initDisplay() {
	pickPerps();
	document.getElementById("suspects").innerHTML = "Suspects:  " + suspectArray;
	displayPlayers();
	//document.getElementById("choices").innerHTML = perpArray;
	generateClues();
	/*var clues;
	clues = document.getElementById("choices").innerHTML;
	clues = (clues + "</br>");*/
}

//chooses 3 elements to be perps
function pickPerps(){
	shuffle(perpArray);
	perpArray = perpArray.slice(4);
}



//generates clues after each cycle of players skipping.
function generateClues(){
	shuffle(cluesArray);
	cluesArray = cluesArray.slice(4);
	var numinperps = 0;
	
	for(var i = 0; i<cluesArray.length; i++) {
		if(perpArray.indexOf(cluesArray[i]) != -1) {
			numinperps++;
		}
	}
	if (numinperps === 3) {
		cluesArray = ["a","b","c","d","e","f","g"];
		generateClues();
	} else {
		var clues;
		clues = document.getElementById("choices").innerHTML;
		clues = clues + "<p>" + cluesArray + " ---- " + numinperps + " are criminals </p>";
		document.getElementById("choices").innerHTML = clues;
		cluesArray = ["a","b","c","d","e","f","g"];
	}
}

//When player clicks submit, matches answer against perp array, if Player wins - Game Over, if Player loses, their buttons become disabled and they can no longer play
function checkAnswer(currP){

	var choices;
	var lifeordeath;
	var pla;
	switch(currP) {
	case "p1":
	choices = p1sub();
	pla = pla1;
	break;
	
	case "p2":
	choices = p2sub();
	pla = pla2;
	break;
	
	case "p3":
	choices = p3sub();
	pla = pla3;
	break;
	}
	
	//New method of checking the arrays
	if (checkArrays(choices,perpArray)) {
		lifeordeath = true;
	}else{
		lifeordeath = false;
	}
	
	
	if(lifeordeath === false){
	    alert(pla + " has lost");	
		
		remove(players, players[players.indexOf(pla)] );
		
	     //alert(players.length);
		 if(players.length < 1){
			alert("Game Over");
		}
		
		 removePlayer(currP);
	}else{
	alert("win game");
	
	playerWins();
	}
	
}

//disables buttons of losing player
function removePlayer(currP) {
	//alert(currP);
	
	switch(currP) {
	case "p1":
	document.getElementById("p1sub").disabled = true;
	document.getElementById("p1skip").disabled = true;
	break;
	
	case "p2":
	document.getElementById("p2sub").disabled = true;
	document.getElementById("p2skip").disabled = true;
	break;
	
	case "p3":
	document.getElementById("p3sub").disabled = true;
	document.getElementById("p3skip").disabled = true;
	resetButtons();
	break;

	}
}

//disables all players buttons when one player wins.
function playerWins(){

	document.getElementById("p1sub").disabled = true;
	document.getElementById("p1skip").disabled = true;
	document.getElementById("p2sub").disabled = true;
	document.getElementById("p2skip").disabled = true;
	document.getElementById("p3sub").disabled = true;
	document.getElementById("p3skip").disabled = true;

	}

//when player clicks submit, either moves to next player, after all 3 players have skipped, new clues will be generated
function skipPlayer(currP){
	
	switch(currP) {
	case "p1":
	document.getElementById("p1sub").disabled = true;
	document.getElementById("p1skip").disabled = true;
	skip++;
	break;
	
	case "p2":
	document.getElementById("p2sub").disabled = true;
	document.getElementById("p2skip").disabled = true;
		skip++;
	break;
	
	case "p3":
	document.getElementById("p3sub").disabled = true;
	document.getElementById("p3skip").disabled = true;
		skip++;
	break;
	
	}
	if(skip === players.length){
		//generate new clues
		generateClues();
		resetButtons();
		skip = 0;
	}
}

//Buttons are disabled after each players turn, after new clues are generated, the buttons are reset to enabled.
function resetButtons(){
	if(players.indexOf(pla1) != -1){
	document.getElementById("p1sub").disabled = false;
	document.getElementById("p1skip").disabled = false;
	}
	if(players.indexOf(pla2) != -1){
	document.getElementById("p2sub").disabled = false;
	document.getElementById("p2skip").disabled = false;
	}
	if (players.indexOf(pla3) != -1){
	document.getElementById("p3sub").disabled = false;
	document.getElementById("p3skip").disabled = false;
	}
}

//Player 1 submit button function - returns selected answer as array, and matched with the perps array.
function p1sub() {
	var sel1 = document.getElementById("p11");
	var sel2 = document.getElementById("p12");
	var sel3 = document.getElementById("p13");
	var pick1 = sel1.options[sel1.selectedIndex].value;
	var pick2 = sel1.options[sel2.selectedIndex].value;
	var pick3 = sel1.options[sel3.selectedIndex].value;
	var parray = [pick1,pick2,pick3];
	if (pick1 === pick2 || pick2 === pick3 || pick1 === pick3) {
	    alert("Each choice must be unique.");	    
	} else {
	return parray;
	}
}

//Player 1 submit button function - returns selected answer as array, and matched with the perps array.
function p2sub() {
	var sel1 = document.getElementById("p21");
	var sel2 = document.getElementById("p22");
	var sel3 = document.getElementById("p23");
	var pick1 = sel1.options[sel1.selectedIndex].value;
	var pick2 = sel1.options[sel2.selectedIndex].value;
	var pick3 = sel1.options[sel3.selectedIndex].value;
	var parray = [pick1,pick2,pick3];
	if (pick1 === pick2 || pick2 === pick3 || pick1 === pick3) {
	    alert("Each choice must be unique");	    
	} else {
	return parray;
	}	
}

//Player 1 submit button function - returns selected answer as array, and matched with the perps array.
function p3sub() {
	var sel1 = document.getElementById("p31");
	var sel2 = document.getElementById("p32");
	var sel3 = document.getElementById("p33");
	var pick1 = sel1.options[sel1.selectedIndex].value;
	var pick2 = sel1.options[sel2.selectedIndex].value;
	var pick3 = sel1.options[sel3.selectedIndex].value;
	var parray = [pick1,pick2,pick3];
	if (pick1 === pick2 || pick2 === pick3 || pick1 === pick3) {
	    alert("Each choice must be unique");	    
	} else {
	return parray;
	}
}


//
// Utility functions
//
// Compares two arrays for same values regard
function checkArrays( arrA, arrB ){

    //check if lengths are different
    if(arrA.length !== arrB.length) return false;


    //slice so we do not effect the original
    //sort makes sure they are in order
    //join makes it a string so we can do a string compare
    var cA = arrA.slice().sort().join(","); 
    var cB = arrB.slice().sort().join(",");

    return cA===cB;

}

//removes losing player from players array.
function remove(arr, item) {
      for(var i = arr.length; i--;) {
          if(arr[i] === item) {
              arr.splice(i, 1);
          }
      }
  }
  //function to shuffle the array and choose random elements
function shuffle(array)
{
    var m = array.length, t, i;
    while (m > 0) 
    {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}


