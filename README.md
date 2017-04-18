# Web Project 2: Twitter Bot

## QuotesOfTheDay
The assignment was to create a Twitter bot that posts something meaningful to Twitter. I chose to do a "Quotes of the Day” bot. This program uses the Pixabay API to search for pictures with [beautiful, flowers, mountains] in the description randomly. It then selects a random image from the first page of results. Then there is another API call made to quotzzy.com for a random quote. Finally, JIMP is used to write the quotes on the Image and posts the Processed-image to Twitter via the Twitter REST API. Posts are scheduled Once a day at 7 a.m. everyday.

## The Application

There is a small homepage site so that users who visit the bot's Heroku page get a little information about the app. There is one example processed-image for the user with some information about the Image and the user for the Image.
The Heroku-app can be found at@https://vast-ocean-77173.herokuapp.com/ and Twitter @ https://twitter.com/@chitraMCTC


## Future Development: -
To post the Image on the webpage as Twitter everyday.

## KnownBugs:
Not known since this bot runs once a day !! may need more errors handling in case of multiple requets.
