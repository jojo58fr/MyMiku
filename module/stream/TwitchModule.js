const BaseModule = require('../../utils/structures/BaseModule');
const { Collection } = require('discord.js');
const { TwitchApi } = require("../../client/TwitchApi");

module.exports = class TwitchModule extends BaseModule {
	
    constructor() {
	  super('Twitch Module', 'A module that called twitch API with exclusives features !', true);
	}
  
	Construct() {
		super.Construct();

		this.activeNotificationRoles = true;

		let twitchApi = new TwitchApi();

	}

	Update() {
		super.Update();

	}

    async OnReady(client, interaction) {
		await super.OnReady(client, interaction);

		this.CreateNotificationRole("847873984950173766", client);

    }

	async OnGuildMemberAdd(client, interaction) {
		await super.OnGuildMemberAdd(client, interaction);

        console.log('User ' + interaction.user.username + ' has joined the server!');
        
        let role = interaction.guild.roles.cache.find( x => x.name === "Viewers (MyMiku)");
        interaction.roles.add(role).catch(console.error);

	}

	async CreateNotificationRole(guildID, client) {
		if(this.activeNotificationRoles)
		{
			let guild = await client.guilds.fetch(guildID);

			let role = guild.roles.cache.find( x => x.name === "Viewers (MyMiku)");
			if(role == null) {
				role = guild.roles.create({ name: 'Viewers (MyMiku)',  })
				.catch(console.error);
			}
		}
	}

	

}
