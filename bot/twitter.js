// Taken from https://github.com/minneapolis-edu/spiraltron/blob/master/bot/twitter.js

var Twitter = require('twitter');
var fs = require('fs'); // file system to read files

// posts the status and Image
function post(status, image, callback)
{
    // twitter API keys
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    try
    {
        // returns the content of the file;
      var img = fs.readFileSync(image);

    } catch (e)
    {
        console.log('Error reading image file');
        return callback(e);
    }
    // posts the Image in the media folder of the twitter account;
    client.post('media/upload', {media:img}, function(error, media, response)
    {
        // media object returned, which is something that can be tweeted,

        if (error)
        {
            console.log('error creating media ' + error);
            return callback(error);
        }
        else
            {
            var statusText =
            {
                status: status,
                media_ids: media.media_id_string
            };
            client.post('statuses/update', statusText, function(error, tweet, response) {

                if (error) {
                    console.log('error tweeting ' + error);
                    return callback(error)
                }

                else {
                    console.log('Tweeted ' + tweet.text);
                    return callback(null, tweet)
                }

            });
        }
    });
}
module.exports = post;