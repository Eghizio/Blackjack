var Deck = new Array();
var Suits   = [ "Club", "Diamond", "Heart", "Spade"];
var Ranks   = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var Values  = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, [ 1, 11]];

class Card{
    constructor(suit, rank, value){
        this.suit   = suit;
        this.rank   = rank;
        this.value  = value;
        this.img_url = "toBeScraped";
        //this.img_url = "https://en.wikipedia.org/wiki/File:Playing_card_"+suit.toLowerCase()+"_"+rank+".svg";
    }
};

Suits.forEach(suit => {
    Ranks.forEach((rank, i) => {
        Deck.push(new Card(suit, rank, Values[i]));
    });
});

var cards = img_svg.slice();
Deck.forEach((card, i)=>{
    card.img_url = cards[i];
});

$(()=>{
//start onready
const rnd = () => Math.floor(Math.random()*52);
var dealerHand = [Deck[rnd()], Deck[rnd()]];
var playerHand = [Deck[rnd()], Deck[rnd()]];

function aceValue(hand){
    let hasAce = false;
    let val = 0;
    hand.forEach(card=>{
        if(card.rank == "A")
            hasAce = true;
    });
if(hasAce){
    
}
}
$("#dealerHand").append("<img src='"+dealerHand[0].img_url+"' />");
$("#dealerHand").append("<img src='"+dealerHand[1].img_url+"' />");
$("#dealerValue").html(dealerHand[0].value + dealerHand[1].value);

$("#playerHand").append("<img src='"+playerHand[0].img_url+"' />");
$("#playerHand").append("<img src='"+playerHand[1].img_url+"' />");
$("#playerValue").html(playerHand[0].value + playerHand[1].value);
// end onready
});