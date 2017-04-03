/*The MIT License (MIT)
 https://github.com/demsking/image-downloader/blob/master/LICENSE

 Copyright (c) 2016 Sébastien Demanou

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE*/


var async = require('async');
var request = require('request');
var image_downloader = require('image-downloader');
var fs = require('fs');
const path = require('path');

var quotes_data="";
var Image_data="";
//http://stackoverflow.com/questions/33111961/typeerror-task-is-not-a-function-in-async-js-parrallel
// without function (callback){Image(callback)}, was getting error:Task is not a function
async.parallel([
    Image,
    quotes
    ],
    function(err, data)
    {
        if (err) {
            console.log(err);
        } else {
            // data is an array of results from each function
            console.log('\n** Parallel Results');

            console.log('Your image url is ' + data[0].Image);  // an *array* of results,
            console.log('Your quotes for the day is :- ' + data[1].quotes); // an *array* of results,
        }
        //
        var options =
        {
            url: data[0].Image,
            dest: '../public/images/Downloaded_Image.jpg',
            done: function (err, filename, Image)
            {
                if (err) {
                    throw err;
                }
                console.log('File saved to', filename);

            }
        };
        image_downloader(options);
    });

function Image(callback)
{
    var Image_string = ['beautiful','Flowers','Mountains'];
    var Image_string_Index= Image_string[Math.floor(Math.random()*4)];
    var Image_key=process.env.PIXABAY_API_KEY;
    var url = "https://pixabay.com/api/"; // the base URL
    var params = { 'key':Image_key, 'q' :Image_string_Index, 'image_type':'photo'  };
    request({url:url, qs: params}, function(err, res, data)
    {

        if(err)
        {
            callback("Error !!! ")
        }
        else
            {
            var Image = JSON.parse(data);
            var Image_index= Image.hits.length;
          //https://www.w3schools.com/jsref/jsref_random.asp
            var i= Math.floor(Math.random()*Image_index);
            if (err)
            {
                return callback(null, 'No Image found');
            }
            Image_data={'Image':Image.hits[i].userImageURL, 'User':Image.hits[i].user};
            callback(null, Image_data);
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
        callback(null, quotes_data)
    })
}

module.exports = {
    Image:Image,
    quotes:quotes

};
// var f_name=path.basename("../public/images/");
// console.log("Check this",f_name);