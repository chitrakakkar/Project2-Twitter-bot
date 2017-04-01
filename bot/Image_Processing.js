var Jimp = require("jimp");
var Quotes= require('../bot/API_Async_MultiThreading');

console.log(Quotes);

// open a file called "lenna.png"
Jimp.read("../public/images/", function (err, lenna) {
    if (err) throw err;
    lenna.resize(256, 256)            // resize
        .quality(60)                 // set JPEG quality
        .greyscale()                // set greyscale
        .write("Resize_Quotes.jpg");



});