var Jimp = require("jimp");
var Quotes= require('../bot/API_Async_MultiThreading');
var fs = require('fs');

var Image_text =" ";



Quotes.quotes(function (err, data)
{
    //data has quotes and author's name
    if (err)
    {
        console.log('Error in getting quotes' + err);
    }
    else
    {
        // TODO: change the image file name to Saved_Image.jpg
        Jimp.read('../public/images/Saved_Image.jpg', function (err, images)
        {
            if (err) throw err;
            images.resize(256, 256)            // resize
                .quality(60)                 // set JPEG quality
                .greyscale()                // set greyscale
                .write("Resize_Quotes.jpg");
        });
    }
    
});

