const { Collection } = require('discord.js');

const BaseModule = require('../../utils/structures/BaseModule');

module.exports = class NotifierModule extends BaseModule {
	
    constructor() {
	  super('Notifier Module', 'A module that coexist with twitch module. Allows users to enable and disable notifications', true);
	}
  
	Construct() {
		super.Construct();

		this.activeNotificationRoles = true;


		this.client = null;
	}

	Update() {
		super.Update();

	}

    async OnReady(client, interaction) {
		await super.OnReady(client, interaction);

		this.client = client;


    }

    async Unnotify(interaction, level){

        let StreamRole = interaction.guild.roles.cache.find( x => x.name === "Viewers (MyMiku)");

        switch(level) {
            case 'stream':
                await interaction.member.roles.remove(StreamRole).catch(console.error);
                await interaction.reply({ content: `🔕 La notification du stream as été désactivée`, ephemeral: true });
            break;
            case 'all':
                await interaction.member.roles.remove(StreamRole).catch(console.error);
                await interaction.reply({ content: `🔕 Toutes les notifications ont été enlevés`, ephemeral: true });
            break;
            default:    
                await interaction.reply({ content: `Erreur de commande, veillez préciser le contexte (stream, all).`, ephemeral: true });
            break;
        }

    }

    async Notify(interaction, level) {

        let StreamRole = interaction.guild.roles.cache.find( x => x.name === "Viewers (MyMiku)");


        switch(level) {
            case 'stream':
                await interaction.member.roles.add(StreamRole).catch(console.error);
                await interaction.reply({ content: `🔔 La notification du stream as été activé.`, ephemeral: true });
            break;
            case 'all':
                await interaction.member.roles.add(StreamRole).catch(console.error);
                await interaction.reply({ content: `🔔 Toutes les notifications ont été activés.`, ephemeral: true });
            break;
            default:
                await interaction.reply({ content: `Erreur de commande, veillez préciser le contexte (stream, all).`, ephemeral: true });
            break;
        }

    }



}


