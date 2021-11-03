const path = require('path');
const fs = require('fs').promises;
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const BaseCommand = require('./utils/structures/BaseCommand');

async function registerCommandHandlerList(dir = '') {

	console.log(`registerCommandHandlerList()`);
  
	const currentPath = dir;
  
	const commandFiles = await fs.readdir(currentPath);
	
	let listCommand = [];
  
	for (const file of commandFiles) {
  
	  const stat = await fs.lstat(path.join(currentPath, file));
	  
	  if (stat.isDirectory())
	  listCommand = listCommand.concat(await registerCommandHandlerList(path.join(dir, file)));
  
	  if (file.endsWith('.js')) {
		
		const Command = require(path.join(currentPath, file));
		
		if (Command.prototype instanceof BaseCommand) {
				  
		  const command = new Command();
		  
		  listCommand.push(command);
		
		}
	  
	  }
	}
  
	return listCommand;
  
}


async function main() {

	const commands = [];
	const commandsClass = await registerCommandHandlerList(path.join(__dirname, './module'));
	
	for (const command of commandsClass) {
		commands.push(command.data.toJSON());
	}
	
	const rest = new REST({ version: '9' }).setToken(token);
	
	//Guild command, scope only the guild that have an ID, Development Only
	rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);

	//Global commands - Production Only
	/*await rest.put(
		Routes.applicationCommands(clientId),
		{ body: commands },
	);*/

}

main();