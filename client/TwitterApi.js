const { exit } = require("process");
const { ETwitterStreamEvent, TweetStream, TwitterApi, ETwitterApiError } = require('twitter-api-v2');
const { TWITTER_USER_ID, TWITTER_API_KEY, TWITTER_KEY_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET, TWITTER_BEARER_TOKEN } = require('../config-twitter.json');

class TwitterApi {

    constructor(twitterModule) {

        //console.log("HEY");
        setInterval(() => { this.update(this) }, 10000);

        this.api = null //Api Object initialize by Auth

        this._isConnected = false; //Boolean value for Auth
        this._connectedResponse = null; //Debug stack Auth response

        this.twitterClient = new TwitterApi(TWITTER_BEARER_TOKEN);

        var myMikuClient = require('../client/MyMikuClient').instance;
        this.twitterModule = twitterModule;

        //Get Authentification from Twitter
        this.getAuthentification();
    }

    update(that) {
        
        console.log("Je suis l'update de Osu API");

    }

    async getAuthentification()
    {
        if(this._isConnected) return true;

        /*let streamUser = this.twitterClient.stream('statuses/filter', { follow: [TWITTER_USER_ID] });

        streamUser.on('tweet', function (tweet) {
            //only show owner tweets
            if(tweet.user.id == TWITTER_USER_ID) {
                var url = "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;

                this.twitterModule.newTweetOnFeed(url);
            }
        });*/

        const user = await this.twitterClient.v2.userByUsername(TWITTER_USER_ID);



        /*client.connect().then(() => {
            console.log("We're online! Now listening for incoming messages.");
            client.on("PM", (message) => {
                console.log(`${message.user.ircUsername}: ${message.message}`);
            });
            this._isConnected = true;

        }).catch(console.error);*/
    }

}

exports.TwitterApi = TwitterApi;