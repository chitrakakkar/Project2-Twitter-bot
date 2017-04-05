var Jimp = require("jimp");
var Quotes= require('../bot/API_Async_MultiThreading');
var fs = require('fs');



Quotes.quotes(function (err, data)
{
    //data has quotes and author's name
    if (err)
    {
        console.log('Error in getting quotes' + err);
    }
    else
    {
        Jimp.read('../public/images/Downloaded_Image.jpg', function( err,images)
        {
            if (err) throw err;
            Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(function (font)
            {

                images.scaleToFit(600, 600);
                images.print(font, 20,250, data.quotes, 600); // wrapped text
                images.print(font,277,450, "-" + data.author)// resize
                    .quality(60)
                    .brightness(-0.3)
                    .write("Processed_Image.jpg");

                // set JPEG quality
            }).catch(function (err)
            {
                console.error(err)

            });
        });
    }

});