const BaseModule = require('../../utils/structures/BaseModule');
const { Collection } = require('discord.js');

module.exports = class WelcomeModule extends BaseModule {
	
    constructor() {
	  super('Welcome Module', 'A module that give you a warm welcome !', false);
	}
  
	Construct() {
		super.Construct();
		/*var myMikuClient = require('../client/MyMikuClient').instance;
        console.log('User ' + interaction.user.username + ' has joined the server!');
        let role = interaction.guild.roles.cache.find( x => x.name === "Viewers (MyMiku)");
        interaction.roles.add(role).catch(console.error);*/
	}

	async OnGuildMemberAdd(client, interaction) {
		await super.OnGuildMemberAdd(client, interaction);

		const channel = await client.channels.fetch("847873987078127638");
		const emoji = await client.emojis.cache.find(emoji => emoji.name === "pog_zun");
        channel.send( { content: `Bienvenue sur le serveur discord de TakuDev ${interaction} ! ${emoji}`});

	}

}
