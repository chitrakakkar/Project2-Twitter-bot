var Jimp = require("jimp");
var Quotes= require('../bot/API_Async');
var fs = require('fs');
var twitter= require('../bot/twitter');

// Quotes gets Image and quotes object from API_ASync
Quotes.Image(function (err, Imagedata)
{
    // save the processed image;
    var Processed_Image_Loc ="Processed_Image.jpg";
    if(err)
    {
        console.log('Error in getting Image' + err)
    }
    else
    {
        // tweeter status to give credit to the user;
        var status = "Full Image at :- " + Imagedata.Web + 'Uploaded by the user :- ' + Imagedata.User;
        Quotes.quotes(function (err, quotesData)
        {
            if (err)
            {
                console.log('Error in getting quotes' + err);
            }
            else
            {   // jimp module reads the image and writes the quotes on it;
                Jimp.read(Imagedata.Image, function( err,images)
                {
                    if (err) throw err;
                    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(function (font)
                    {

                        images.scaleToFit(700, 700); //resize
                        images.print(font, 20,150, quotesData.quotes, 600); // wrapped text
                        images.print(font,277,350, "-" + quotesData.author) // writing the quotes;
                        //images.print(font,10, 560, "Page url ->"+ data.url)

                            .quality(60)
                            .brightness(-0.3)
                        .write(Processed_Image_Loc, function (err, Image)
                        {
                            // send the status and processed Image to the twitter account to post
                            twitter(status, Processed_Image_Loc, function (err, tweet)
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

                        })
                        });
                });
            }

        });

    }

});