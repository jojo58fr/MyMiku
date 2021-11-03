const { SlashCommandBuilder } = require('@discordjs/builders');
const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class OnlyFansCommand extends BaseCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
      .setName('onlyfans')
      .setDescription('Je vous donne mon OnlyFans et celui de TakuDev'), 
      []
    );
  }

  async execute(interaction) {
	await interaction.reply(`https://tenor.com/view/saki-saki-mukai-naoya-slap-slapping-anime-slap-gif-22321835 Tu n'auras rien de coquin ! Seul mon créateur prévoit de faire un onlyfan un jour: il montrera son plus beau arsenal, le METAL GEAR.`);
  }
}