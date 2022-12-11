const { SlashCommandBuilder } = require('@discordjs/builders');
const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class MoulinsBleusCommand extends BaseCommand {
  constructor() {
    super(
      new SlashCommandBuilder()
      .setName('moulinsbleus')
      .setDescription('Et si je vous parlais du moulins bleus ?'), 
      ['craftbeer', 'maisondegreg']
    );
  }

  async execute(interaction) {

  let GregDeMars = await interaction.client.users.fetch('195465257718644737');

	await interaction.reply(`Les Moulins Bleus Craft Beer & Food. La maison du modérateur ${GregDeMars} . \nAdresse: 4 Rue Musette, 21000 Dijon`);
  }
}