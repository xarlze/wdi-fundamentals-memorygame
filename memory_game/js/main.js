//Declaration

var cards = [
{
	rank: "queen",
	suit: "hearts",
	cardImage:"images/queen-of-hearts.png",
},
{
	rank: "queen",
	suit: "diamonds",
	cardImage:"images/queen-of-diamonds.png",
},
{
	rank: "king",
	suit: "hearts",
	cardImage:"images/king-of-hearts.png",
},
{
	rank: "king",
	suit: "diamonds",
	cardImage:"images/king-of-diamonds.png",
},
];
var cardsInPlay = [];
var score = 0;

function displayScore(){
	document.getElementById("scoreNum").innerHTML = score;
}

function checkForMatch(){
	if(cardsInPlay.length===2){
		if(cardsInPlay[0]===cardsInPlay[1]){
			alert("You found a match!");
			score++;
			displayScore();
		} else {
			alert("Sorry, try again.");
		}
	}
}

function flipCard(){
	var cardId = this.getAttribute("data-id");
	console.log("User flipped card with rank "+ cards[cardId].rank+ " suit "+ cards[cardId].suit+ " and image path " + cards[cardId].cardImage)
	cardsInPlay.push(cards[cardId].rank);
	this.setAttribute("src", cards[cardId].cardImage);
	checkForMatch();
}

function shuffle(array) {
	var currentIndex = array.length;
	var temporaryValue;
	var randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function createBoard(){
	var randArr = [0,1,2,3];
	shuffle(randArr);
	for (var i = 0; i < cards.length; i++){
		var cardElement = document.createElement('img');
		cardElement.setAttribute("src", "images/back.png");
		cardElement.setAttribute("data-id", randArr[i]);
		cardElement.addEventListener("click", flipCard);
		document.getElementById("game-board").appendChild(cardElement);
	}
}

function resetBoard(){
	for (var i = cards.length - 1; i >= 0; i--) {
		document.getElementById("game-board").removeChild(document.getElementsByTagName("img")[i]);
	}
	for (var i = cardsInPlay.length - 1; i >= 0; i--) {
		cardsInPlay.pop();
	}
	createBoard();
}

//Execution
displayScore();
createBoard();

document.getElementById("reset").addEventListener("click", resetBoard);