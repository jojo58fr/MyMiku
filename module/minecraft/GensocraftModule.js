const { Collection } = require('discord.js');

const BaseModule = require('../../utils/structures/BaseModule');
const minecraftUtils = require('minecraft-server-util');

module.exports = class GensocraftModule extends BaseModule {
	
    constructor() {
	  super('Gensocraft Module', 'A private module for Gensocraft', true);

      this.serverStatusCanal    = "1050108185060585482";
      this.serverVersionCanal   = "1050108722845859890";
      this.serverPlayersCanal   = "1050107917312983110";
	}
  
	Construct() {
		super.Construct();

		this.client = null;

		setInterval(() => { this.UpdateInfosMinecraft(this) }, 60000);
	}

	Update() {
		super.Update();
	}

	UpdateInfosMinecraft() {

		let ip = "minecraft.takudev.com";
		let port = "25565";
	
		const options = {
			timeout: 1000 * 5, // timeout in milliseconds
			enableSRV: true // SRV record lookup
		};
	
		// The port and options arguments are optional, the
		// port will default to 25565 and the options will
		// use the default options.
		minecraftUtils.status(ip, parseInt(port), options)
			.then( (result) => {
				
				if(this.client) {
					console.log(`[MODULE: GensocraftModule]: UPDATE DES INFORMATIONS SERVEUR ON`);
					var that = this;
					(async() => {
						let serverStatusChannel = await that.client.channels.fetch(that.serverStatusCanal);
						let serverVersionChannel = await that.client.channels.fetch(that.serverVersionCanal);
						let serverPlayersChannel = await that.client.channels.fetch(that.serverPlayersCanal);
				
						serverStatusChannel.setName(`Serveur : Online`);
						serverVersionChannel.setName(`Version : ${result.version.name}`);
						serverPlayersChannel.setName(`Joueurs : ${result.players.online} / ${result.players.max}`);
					})();
				
				}


			})
			.catch((error) => {

				if(this.client) {
					console.log(`[MODULE: GensocraftModule]: UPDATE DES INFORMATIONS SERVEUR OFF`);
					var that = this;
					(async() => {
						let serverStatusChannel = await that.client.channels.fetch(that.serverStatusCanal);
						let serverVersionChannel = await that.client.channels.fetch(that.serverVersionCanal);
						let serverPlayersChannel = await that.client.channels.fetch(that.serverPlayersCanal);
				
						serverStatusChannel.setName(`Serveur : Offline`);
						serverVersionChannel.setName(`Version : //`);
						serverPlayersChannel.setName(`Joueurs : //`);
					})();
				
				}

				//if(error) console.log(error);
			});


	}

    async OnReady(client, interaction) {
		await super.OnReady(client, interaction);

		this.client = client;


    }



}