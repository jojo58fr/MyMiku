const { Collection } = require('discord.js');

const BaseModule = require('../../utils/structures/BaseModule');
const { TwitchApi } = require("../../client/TwitchApi");

module.exports = class TwitchModule extends BaseModule {
	
    constructor() {
	  super('Twitch Module', 'A module that called twitch API with exclusives features !', true);
	}
  
	Construct() {
		super.Construct();

		this.activeNotificationRoles = true;

		let twitchApi = new TwitchApi(this);

		this.embedNotificationLive = null;

		this.client = null;

        this.guildID = null;
	}

	Update() {
		super.Update();

	}

    async OnReady(client, interaction) {
		await super.OnReady(client, interaction);

		this.client = client;

        this.setGuildId("847873984950173766");
		this.CreateNotificationRole("847873984950173766", client);

    }

	async OnGuildMemberAdd(client, interaction) {
		await super.OnGuildMemberAdd(client, interaction);

        console.log('User ' + interaction.user.username + ' has joined the server!');
        
        let role = interaction.guild.roles.cache.find( x => x.name === "Viewers (MyMiku)");
        interaction.roles.add(role).catch(console.error);

	}

    async setGuildId(guildID) {
        //console.log("GuildID:" + guildID)
        this.guildID = guildID;
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

	/* Modules functions */

	async beginNotificationLive(onLiveEmbed)
    {
        console.log("User just started his live");

        let msgEmbed = onLiveEmbed.createEmbed();

        var embedMessage = null;

        //DEV CHANNEL
        //const channel = await this.client.channels.fetch("977864710517035048");
        ///END DEV CHANNEL

        const channel = await this.client.channels.fetch("848186561081376778");
        
        console.log(this.guildID);
        let guild = await this.client.guilds.fetch(this.guildID);
        let ViewersRole = guild.roles.cache.find( x => x.name === "Viewers (MyMiku)");

        channel.send( { content: `Hey ! Mon live vient de débuter ${ViewersRole}` , embeds: [msgEmbed] }).then((msg) => { this.embedNotificationLive = msg; });

        //console.log( this.embedNotificationLive );

    }
 
    async updateNotificationLive(onLiveEmbed)
    {
        if(this.embedNotificationLive != null)
        {

            let msgEmbed = onLiveEmbed.createEmbed();

            let guild = await this.client.guilds.fetch(this.guildID);
            let ViewersRole = guild.roles.cache.find( x => x.name === "Viewers (MyMiku)");

            this.embedNotificationLive.edit({ content: `Hey ! Un live est en cours ${ViewersRole}` , embeds: [msgEmbed] });
        }

        console.log("User just updated his live");
    }

    async endNotificationLive(onLiveEmbed)
    {
        console.log("User just ended his live");
        
        if(this.embedNotificationLive != null)
        {

            let msgEmbed = onLiveEmbed.createEmbed(true);

            this.embedNotificationLive.edit({ content: `Mon live est terminé. Merci à tous ! ${ViewersRole}`, embeds: [msgEmbed] });
        }

    }


}
