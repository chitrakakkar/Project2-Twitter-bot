var async = require('async');
var request = require('request');


var quotes_data="";
//http://stackoverflow.com/questions/33111961/typeerror-task-is-not-a-function-in-async-js-parrallel
// without function (callback){Image(callback)}, was getting error:Task is not a function
async.parallel([
    Image,
    quotes
    ],
    function(err, data){
    if (err) {
        console.log(err);
    } else {
        // data is an array of results from each function
        console.log('\n** Parallel Results');

        console.log('Your image url is ' + data[0]);  // an *array* of results,
        console.log('Your quotes for the day is' + data[1].quotes); // an *array* of results,
    }
});


function Image(callback)
{
    var Image_key=process.env.PIXABAY_API_KEY;
    var url = "https://pixabay.com/api/"; // the base URL
    var params = { 'key':Image_key, 'q' :'beautiful', 'image_type':'photo'  };
    request({url:url, qs: params}, function(err, res, data)
    {
        if(err)
        {
            callback("Error !!! ")
        }
        else {
            var Image = JSON.parse(data);
            if (err)
            {
                return callback(null, 'No Image found');
            }
            callback("The url for the Image is " + Image.hits[0].userImageURL);
        }
    });

}

function quotes(callback)
{
    //var url = 'http://quotes.rest/qod.json';
    var url = 'http://www.quotzzy.co/api/quote';
    request(url, function(err, res, data){
        var quotes_object = JSON.parse(data);
        //console.log(data);
        if (quotes.status == '404')
        { return callback(null, 'error');
        }
        quotes_data = {'quotes':quotes_object.text, 'author':quotes_object.author.name};
        callback( quotes_data)
    })
}
