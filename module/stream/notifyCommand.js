const { SlashCommandBuilder } = require('@discordjs/builders');
const BaseCommand = require('../../utils/structures/BaseCommand');

const { listModules } = require('../../utils/registry');

module.exports = class NotifyCommand extends BaseCommand {
    constructor() {
      super(
        new SlashCommandBuilder()
        .setName('notify')
        .setDescription(`Permet d'ajouter des notifications`)
        .addStringOption(option => option.setName("level").setDescription("Ton niveau de notification (stream, all)").setRequired(true)), 
        []
      );
    }
  
    async execute(interaction) {
        
      var myMikuClient = require('../../client/MyMikuClient').instance;
      let notifierModule = myMikuClient.getModuleByName('Notifier Module');

      notifierModule.Notify(interaction, interaction.options.getString("level"));
    }
  }