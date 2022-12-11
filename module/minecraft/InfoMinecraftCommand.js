const { SlashCommandBuilder } = require('@discordjs/builders');
const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

const minecraftUtils = require('minecraft-server-util');
const { inflateRaw } = require('zlib');

module.exports = class InfoMinecraftCommand extends BaseCommand {
  constructor() {
	super(
        new SlashCommandBuilder()
        .setName('infomc')
        .setDescription(`Avoir les informations d'un serveur minecraft`)
        .addStringOption(option => option.setName("ip").setDescription("L'adresse IP ou nom précis du serveur").setRequired(true)) 
        .addStringOption(option => option.setName("port").setDescription("Port du serveur (Default:25565)").setRequired(false)), 
        []
	);
  }

  async execute(interaction) {
	let ip = interaction.options.getString("ip");
	//let port = "";
	let port = interaction.options.getString("port");

	if(!ip) {
		await interaction.reply('Tu dois renseigner une adresse IP');
		return;
	}

	if(ip == "gensocraft") {
		ip = "minecraft.takudev.com";
	}

	if(!port) port = "25565";

	const options = {
		timeout: 1000 * 5, // timeout in milliseconds
		enableSRV: true // SRV record lookup
	};

	// The port and options arguments are optional, the
	// port will default to 25565 and the options will
	// use the default options.
	await minecraftUtils.status(ip, parseInt(port), options)
		.then( (result) => {
			
			//throw result.players;
			let msgEmbed = new MessageEmbed();
			
			msgEmbed.setTitle(`Serveur ${ip} : ${port}`);
			msgEmbed.addField('MOTD', `${result.motd.clean}`, false);
			msgEmbed.addField('Version de serveur', `${result.version.name}`, false);
			msgEmbed.addField('Joueurs', `${result.players.online} / ${result.players.max}`, true);
			
			interaction.reply({ embeds: [msgEmbed ] });
		})
		.catch((error) => {
			//if(error) console.log(error);
			//if(error) throw error;
			interaction.reply('Le serveur semble hors-ligne ou inaccessible. Senpai, pls notice me 🥺');
		});

  }
}