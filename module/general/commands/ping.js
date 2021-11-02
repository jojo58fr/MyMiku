const { SlashCommandBuilder } = require('@discordjs/builders');
const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with Pong!'), 
      ['pong']
    );
  }

  async execute(interaction) {
    interaction.reply('Pong!');
  }
}
