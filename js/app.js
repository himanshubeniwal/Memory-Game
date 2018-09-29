/*
 * Create a list that holds all of your cards
 */
var card=["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond","fa fa-bomb","fa fa-leaf",
"fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];
/* 
Doubling the array 
*/
var cards = card.concat(card);

let matched=0;
let stars=3;
let matchCount=0;
let moveCount=0;
let openCards=[];

/* 
Creating DECK 
*/
let timer= new Timer();

/* 
For creating deck and adding event to all cards
*/
function createDeck()
{cards = shuffle(cards);
timer.addEventListener('secondsUpdated', function(e) { $('#basicUsage').html(timer.getTimeValues().toString());
});
let pack = document.createDocumentFragment();
resetStars();
for(let j=0; j <= 15; j++){
	const li = document.createElement('li');
	li.className = "card";
	const i = document.createElement('i');
	i.className = cards[j];
	li.appendChild(i);
	li.addEventListener("click", function(){
	if(moveCount===0){
	timer.start();  
	}
	if(check($(this))){ 
	if(openCards.length===0){
     		start= new Date().getTime();
           openCards.push($(this));
           console.log(openCards);
           }
           else if(openCards.length===1){
           	openCards.push($(this));
                if(isMatch($(this))){
                	setTimeout(Match, 400);
                }
                else{
				setTimeout(closeCard, 700);
                }
            }
		moveCount++;
		$(this).addClass("open"); 
           $(this).addClass("show");
           updateMoveCount();   
           }   
});
	pack.appendChild(li);
}
    document.querySelector(".deck").appendChild(pack);
}
/* 
Checking for card matching 
*/
let isMatch = function()
{
    const class1 =openCards[0].children().attr("class");
    const class2=openCards[1].children().attr("class");
    if(class1===class2)
	{		return true;		}
    else 
	{          return false;	 	}
}

/*
Addinng responsiveness for restarting 
*/
$(".restart").click(function(){	resetGame(); });

/* 
Placing card in matching starte and check if user has won 
*/
function Match()
{
      openCards[0].addClass("match");
      openCards[1].addClass("match");
      openCards=[];
      matched+=2;
      console.log(matched);
    if(hasWon())
        {   timer.stop();
            $(".deck").empty();
            let content="<h1 id='wintext'>Hey Congratutions! You won by : <b> "+stars+" </b>stars<br> <b>"+moveCount+"</b> moves";
            content+="<br><button  onclick='resetGame()'>Restart</button>";
            content +="<br>Time Taken= "+  document.getElementById("basicUsage").innerHTML;
            $(".deck").append(content);
        }
}

/*
resetGame for reseting Game 
*/
function resetGame(){
    $(".deck").empty();
    openCards=[];
    matched=0;
    moveCount=0;
    stars=3;
    updateMoveCount();
    createDeck();
    resetStars();
    timer.stop();
    $('#basicUsage').html(timer.getTimeValues().toString());
}

/*
Updating Counter 
*/
function updateMoveCount(){
    document.querySelector(".moves").innerHTML=moveCount;
    if(moveCount===15||moveCount===20){
        console.log("Star reduced");
        removeStar();
        stars--;
    }
}

/*
 For reducing the star
*/
function removeStar()
{
 	let starList = $(".fa-star");
	$(starList[starList.length-1]).toggleClass("fa-star fa-star-o");
}

/*
Now close the opened card 
*/
let closeCard =function()
{     openCards.forEach(function(x) {
      x.toggleClass("open");
      x.toggleClass("show");
});
    openCards=[];
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/* 
Checking for wether a card is opened or matched earlier
*/ 
function check(card) 
{  return !(card.hasClass("open") || card.hasClass("match"));
};

/*
Reset The Stars 
*/
function resetStars()
{   $(".stars").empty();
    for (let i=0; i<3; i++)
	{
        $(".stars").append(`<li><i class="fa fa-star"></i></li>`);
	}
    stars=3;
}

/*
Declaring whether the player has already won 
*/
function hasWon(){
    if(matched===16)
        return true;
    else 
        return false;
}
/* 
 * Display the cards on the page  - DONE
 *   - shuffle the list of cards using the provided "shuffle" method below - DONE
 *   - loop through each card and create its HTML -DONE
 *   - add each card's HTML to the page - DONE
 */


/*
 * set up the event listener for a card. If a card is clicked: - DONE
 *  - display the card's symbol (put this functionality in another function that you call from this one)  - DONE
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)- DONE
 *  - if the list already has another card, check to see if the two cards match   - DONE
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)- DONE
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)- DONE
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)- DONE
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)- DONE
 */
