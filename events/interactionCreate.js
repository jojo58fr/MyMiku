const BaseEvent = require('../utils/structures/BaseEvent');
const { Collection } = require('discord.js');

module.exports = class InteractionCreate extends BaseEvent {
	constructor() {
	  super('interactionCreate');
	}
  
	async execute(client, interaction) {
		var myMikuClient = require('../client/MyMikuClient').instance;
		
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		console.log(`${interaction.commandName} / `);

		if (!interaction.isCommand()) return;
		
		const Command = myMikuClient.getClient().commands.get(interaction.commandName);

		if (!Command) return;

		try {
			Command.execute(interaction);
		} catch (error) {
			console.error(error);
			interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		
	}
}
  