//Setup
var Deck = new Array();
var Suits   = [ "Club", "Diamond", "Heart", "Spade"];
var Ranks   = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var Values  = [ 1, 1, 1, 1, 1, 0, 0, 0, -1, -1, -1, -1, -1]; //Hi-Lo, can implement others

class Card{
    constructor(suit, rank, value){
        this.suit   = suit;
        this.rank   = rank;
        this.value  = value;
        this.img_url = "toBeScraped";
        //this.img_url = "https://en.wikipedia.org/wiki/File:Playing_card_"+suit.toLowerCase()+"_"+rank+".svg";
    }
};
var decks = 1;
Suits.forEach(suit => {
    Ranks.forEach((rank, i) => {
        for(let n=0; n<decks; n++)
            Deck.push(new Card(suit, rank, Values[i]));
    });
});

var cards = img_svg.slice();

Deck.forEach((card, i)=>{
    card.img_url = cards[i];
});
//Handlers
//uncapped card number (player can check if hes doing well at any time)
//Easy mode with    +1 0 -1 Buttons
//Medium mode with  -1 0 +1 Buttons
//Hard mode with    User input, capped card number
var MODE = "Easy";
//console.log(MODE);
var realCount = 0;

var showCount = false;
var playerCount = 0;

document.addEventListener("DOMContentLoaded", ()=>{
//start onready
//start cardDeal
function Deal(){
    //if(Deck.length){
        r = Math.floor(    Math.random()*(Deck.length-1)); //Last Deck Card always as last :(
        $("#cards").empty();
        $("#cards").append("<img src='"+Deck[r].img_url+"' /><button id='realCount'>Count</button>");
        console.log("Count:"+realCount+" Player:"+playerCount);
        realCount += Deck[r].value;
        //Deck.splice(r, 1);
   //start showCount
    $("#realCount").click(function(){
        if(!showCount)
            $(this).html(realCount); //missmatched
        else if(showCount)
            $(this).html("Count");
        showCount = !showCount;
    });
    //end showCount
}
Deal();
//end cardDeal
//start mode
$(".btn.mode").click(function(){
    MODE = $(this).html();
    $("#mode").empty();
    //console.log(MODE);

    switch(MODE){
        case "Easy":
            $("#mode").append("<label>Your Count:</label><p id='playerCount'>0</p><br><button class='pCount'>+1</button><button class='pCount'>0</button><button class='pCount'>-1</button><br>");
        break;
        case "Medium":
            $("#mode").append("<label>Your Count:</label><p id='playerCount'>0</p><br><button class='pCount'>-1</button><button class='pCount'>0</button><button class='pCount'>+1</button><br>");
        break;
        case "Hard":
    
        break;
        default:
            alert("Something Went Wrong! Please Refresh Page or Come Back Later!");
        break;
    }
});
$(".easy").click();
$(".pCount").click(function(){
    playerCount += Number($(this).html());
    $("#playerCount").html(playerCount);
    Deal();
});
//end mode
//end onready
});
