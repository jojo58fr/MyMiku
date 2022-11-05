const BaseModule = require('../utils/structures/BaseModule');
//const { TwitterApi } = require("../client/TwitterApi");

module.exports = class TwitterModule extends BaseModule {
	
    constructor() {
	  super('Twitter Module', 'A module that called Twitter API with exclusives features !', true);
	}
  
	Construct() {
		super.Construct();

		this.client = null;
		//this.twitterApi = new TwitterApi(this);
	}

	Update() {
		super.Update();

	}

    async OnReady(client, interaction) {
		await super.OnReady(client, interaction);
    }

	/* Modules functions */

    async newTweetOnFeed(url)
    {
        console.log("User just ended his live");
        
        const channel = await this.client.channels.fetch("990171769715441674");
        
        channel.send( { content: `${url}`});



    }

}
