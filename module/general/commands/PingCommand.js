const { SlashCommandBuilder } = require('@discordjs/builders');
const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
      .setName('ping')
      .setDescription(`Je vous donne la latence entre nous deux et celle de l'API. Un ping-pong ?`), 
      ['pong']
    );
  }

  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    interaction.editReply(`Pong! 🏓 ${sent.createdTimestamp - interaction.createdTimestamp}ms. Latence API: ${Math.round(interaction.client.ws.ping)}ms`);
    
  }
}
