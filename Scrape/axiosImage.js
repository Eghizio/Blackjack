'use strict'

const fs = require("fs");
const path = require("path");
const axios = require("axios");

var {img_svg} = JSON.parse(fs.readFileSync("../SVG.json", "utf8"));
var succ = 0;

async function downloadImage(url, i){

        let name = "card"+(i+1)+".svg";
        const PATH = path.resolve(__dirname, "cards", name);

        const response = await axios({
            method:"GET",
            url:url,
            responseType:"stream"
        });

        response.data.pipe(fs.createWriteStream(PATH));

        return new Promise((resolve, reject)=>{
            response.data.on("end", ()=>{
                succ++;
                console.log("Saved:"+i+" Success:"+succ);
                resolve();
            });
            response.data.on("error", ()=>{
                console.log("Failed:"+i+" Success:"+succ);
                reject();
            });
        });
}
img_svg.forEach((url, i)=>{
    downloadImage(url, i);
});