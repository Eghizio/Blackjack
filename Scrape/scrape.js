//Cards
var Deck = new Array();
var Suits   = [ "Club", "Diamond", "Heart", "Spade"];
var Ranks   = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var Values  = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, [ 1, 11]];

class Card{
    constructor(suit, rank, value){
        this.suit   = suit;
        this.rank   = rank;
        this.value  = value;
        //this.img_url = "toBeScraped";
        //this.img_url = "https://en.wikipedia.org/wiki/File:Playing_card_"+suit.toLowerCase()+"_"+rank+".svg";
    }
};

Suits.forEach(suit => {
    Ranks.forEach((rank, i) => {
        Deck.push(new Card(suit, rank, Values[i]));
    });
});
//Cheerio
/*
<div class="fullImageLink" id="file">
    <a href="//upload.wikimedia.org/wikipedia/commons/3/36/Playing_card_club_A.svg">
        <img alt="File:Playing card club A.svg" >
*/
const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs');
const writeJSON = fs.createWriteStream('../SVG.json');
const writeJSONP = fs.createWriteStream('../SVG.jsonp');
writeJSON.write(`{\n    "img_svg":[\n`);
writeJSONP.write(`var img_svg = [\n`);
//SVGjson = new Array(52);
//var j = 1;

Deck.forEach((card, i) => {
    request("https://en.wikipedia.org/wiki/File:Playing_card_"+card.suit.toLowerCase()+"_"+card.rank+".svg", (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const svg = "https:" + $("#file > a").attr('href');

            card.img_url = svg;
            //SVGjson[i] = card.img_url;
            //console.log(i + ": " + SVGjson[i]);

            //quickfix
            if(i == Deck.length - 1){
                Deck.forEach((card, i) => {
                    setTimeout(()=>{
                        if(i == Deck.length - 1){
                            writeJSON.write(`        "${card.img_url}"\n    ]\n}`);
                            writeJSONP.write(`    "${card.img_url}"\n];`);
                        }
                        else{
                            writeJSON.write(`        "${card.img_url}",\n`);
                            writeJSONP.write(`    "${card.img_url}",\n`);
                        }
                    },1000);
                });
            }
            //if(j==52)
            //     writeStream.write(`        "${svg}"\n    ]\n}`);
            // else
            //     writeStream.write(`        "${svg}",\n`);
            // j++;
            //SVGjson[i] = card.img_url;
            //console.log(card);
        }
    });
});

//its async so its not sorted in json file //it already is sorted with quickfix ;p
