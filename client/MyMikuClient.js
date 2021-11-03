const fs = require('fs');
const { Permissions, MessageEmbed, Client, Collection, Intents } = require('discord.js');

const { Console } = require('console');
const { DiscordAPIError } = require('discord.js/src/index.js');
const path = require('path');


// Importing this allows you to access the environment variables of the running node process
require('dotenv').config();

const { registerModuleHandler, registerCommandsHandler, registerEventsHandler } = require('../utils/registry');

class MyMikuClient {
    
    constructor() {

        if (MyMikuClient._instance) {
            throw new Error("Singleton classes can't be instantiated more than once.")
        }
        MyMikuClient._instance = this;

        this.client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"] /*[Intents.FLAGS.GUILDS]*/ });
        this.client.commands = new Collection();

        this.client.prefix = process.env.MYMIKU_BOT_PREFIX;

        this.InitRegistry(this);

        this.modules = [];

    }

    async InitRegistry()
    {
        this.modules = await registerModuleHandler(path.join(__dirname, '/../module'));

        await registerCommandsHandler(this.client, path.join(__dirname, '/../module'));
        await registerEventsHandler(this.client, path.join(__dirname, '/../events'));
    }

    login(token)
    {
        this.client.login(token);
    }

    getClient()
    {
        return this.client;
    }

    getModuleByName(name)
    {
        for (const module of this.modules) {
        
            if(module.name == name)
            {
                return module;
            }
            //TODO ENUMERER SUR LES MODULES POUR AVOIR LE MODULE AU BON NOM
        
        }
    }


    getModuleByClassName(className)
    {
        for (const module of this.modules) {
        
            if(module instanceof className)
            {
                return module;
            }
            //TODO ENUMERER SUR LES MODULES POUR AVOIR LE MODULE AU BON NOM
        
        }
    }

    getClientCommands()
    {
        return this.client.commands;
    }

    async createNotificationRole()
    {
        let guildsoAuth = await this.client.guilds.fetch();

        for(const guildoAuth of guildsoAuth) {
            
            /*let guild = await this.client.guilds.fetch(guildoAuth[0]);

            let role = guild.roles.cache.find( x => x.name === "Viewers (MyMiku)");

            if(role == null) {
                role = guild.roles.create({ name: 'Viewers (MyMiku)',  })
                .catch(console.error);
            }*/

            //TODO TEMP FIX to gather all users and set role

            /*guild.members.fetch({ user: ["290580201132392449", "290580201132392449"]})
                .then(members => {
                    members.map(member => {
                        //TODO console.log("Check Roles and Bot");
                        if(!member.user.bot && !member.roles.cache.has(role.id))
                        {
                            console.log("Ajout role: " + member.user.username); 
                            member.roles.add(role).catch(console.error)
                        }
                    } )
                });*/

        }

        return;



    }

    addNotificationRole()
    {
        //let role = guild.roles.cache.find( x => x.name === "Viewers (MyMiku)");

        // if role doesn't exist, notify the author of command that the role couldn't be found
        //if (!role) return message.channel.send(`**${message.author.username}**, role not found`)

        // find all guild members that aren't bots, and add the "Community" role to each
        //message.guild.members.filter(m => !m.user.bot).forEach(member => member.addRole(role))

        // notify the author of the command that the role was successfully added to all members
        //message.channel.send(`**${message.author.username}**, role **${role.name}** was added to all members`
        

        /*// find the role with the name "Community"
        let role = message.guild.roles.find(r => r.name == 'Community')

        // if role doesn't exist, notify the author of command that the role couldn't be found
        if (!role) return message.channel.send(`**${message.author.username}**, role not found`)

        // find all guild members that aren't bots, and add the "Community" role to each
        message.guild.members.filter(m => !m.user.bot).forEach(member => member.addRole(role))

        // notify the author of the command that the role was successfully added to all members
        message.channel.send(`**${message.author.username}**, role **${role.name}** was added to all members`
        */
    }


}

var instance = new MyMikuClient(); // Executes succesfully

exports.instance = instance;