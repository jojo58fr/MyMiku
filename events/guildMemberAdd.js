const BaseEvent = require('../utils/structures/BaseEvent');
const { Collection } = require('discord.js');

module.exports = class GuildMemberAdd extends BaseEvent {
	
    constructor() {
	  super('guildMemberAdd');
	}
  
	async execute(client, interaction) {
		var myMikuClient = require('../client/MyMikuClient').instance;
		
		for(const module of myMikuClient.modules) {
			if(module.active)
				module.OnGuildMemberAdd(client, interaction);
		}

	}

}
  