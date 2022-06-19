const { SlashCommandBuilder } = require('@discordjs/builders');
const BaseCommand = require('../../utils/structures/BaseCommand');

var { listModules } = require('../../utils/registry');
const NotifierModule = require('./NotifierModule');

module.exports = class UnnotifyCommand extends BaseCommand {
    constructor() {
      super(
        new SlashCommandBuilder()
        .setName('unnotify')
        .setDescription(`Permet d'enlever des notifications`) 
        .addStringOption(option => option.setName("level").setDescription("Ton niveau de notification (stream, all)").setRequired(true)),
        []
      );
    }
  
    async execute(interaction) {  
        var myMikuClient = require('../../client/MyMikuClient').instance;
        let notifierModule = myMikuClient.getModuleByName('Notifier Module');
        notifierModule.Unnotify(interaction, interaction.options.getString("level"));

    }
  }