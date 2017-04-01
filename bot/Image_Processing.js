var Jimp = require("jimp");
var Quotes= require('../bot/API_Async_MultiThreading');

var Image_text =" ";

Quotes.quotes(function (err, data) {
    if (err) {
        console.log('Error in getting quotes' + err);
    }
    else
    {
        console.log("I am here", data);
        Jimp.read("../public/images/", function (err, images) {
            if (err) throw err;
            images.resize(256, 256)            // resize
                .quality(60)                 // set JPEG quality
                .greyscale()                // set greyscale
                .write("Resize_Quotes.jpg");
        });

    }
    
});

