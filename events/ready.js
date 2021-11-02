const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class Ready extends BaseEvent {
	constructor() {
	  super('ready');
	}
  
	async execute(client, interaction) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		var myMikuClient = require('../client/MyMikuClient').instance;

		for(const module of myMikuClient.modules) {
			if(module.active)
				module.OnReady(client, interaction);
		}

		myMikuClient.createNotificationRole();


	}
}