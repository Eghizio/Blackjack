/*
use with nodejs
const fs = require("fs");
var {img_svg} = JSON.parse(fs.readFileSync("./SVG.json", "utf8"));
console.log(img_svg);
*/
$(()=>{
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

Deck.forEach((card, i) => {
    card.img_url = img_svg[i];
    $("body").append("<img src='"+card.img_url+"' />");
});

});