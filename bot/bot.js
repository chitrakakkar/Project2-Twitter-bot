var Jimp = require("jimp");
var Quotes= require('../bot/API_Async_MultiThreading');
var fs = require('fs');
var twitter= require('../bot/twitter');
var querystring = require("querystring");
var stringify = require("querystring").stringify;

Quotes.Image(function (err, Imagedata)
{
    if(err)
    {
        console.log('Error in getting Image' + err)
    }
    else
    {

        var status = "Full Image at" + Imagedata.Web + 'by the user @' + Imagedata.user;
        Quotes.quotes(function (err, quotesData)
        {
            if (err)
            {
                console.log('Error in getting quotes' + err);
            }
            else
            {
                Jimp.read(querystring.stringify(Imagedata.Image), function( err,images)
                {
                    console.log("I am the Image" , Imagedata.Image);
                    if (err) throw err;
                    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(function (font)
                    {

                        images.scaleToFit(600, 600); //resize
                        images.print(font, 20,250, quotesData.quotes, 600); // wrapped text
                        images.print(font,277,450, "-" + quotesData.author)
                        //images.print(font,10, 560, "Page url ->"+ data.url)

                            .quality(60)
                            .brightness(-0.3);
                        //.write("Processed_Image.jpg");
                        twitter(status, images, function (err, tweet)
                        {
                            if(err)
                            {
                                console.log('error posting tweet');
                                console.log(err)

                            }
                            else {
                                console.log('Tweet posted, check twitter');

                            }

                        } )

                    }).catch(function (err)
                    {
                        console.error(err)

                    });
                });
            }

        });

    }

});