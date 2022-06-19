
const path = require('path');
const fs = require('fs').promises;

const BaseCommand = require('./structures/BaseCommand');
const BaseEvent = require('./structures/BaseEvent');
const BaseModule = require('./structures/BaseModule');

async function registerModuleHandler(dir = '') {

  console.log(`registerModuleHandler()`);

  const currentPath = dir;

  const moduleFiles = await fs.readdir(currentPath);
  
  let listModules = [];

  for (const file of moduleFiles) {

    const stat = await fs.lstat(path.join(currentPath, file));
    
    if (stat.isDirectory())
      listModules = listModules.concat(await registerModuleHandler(path.join(dir, file)));

    if (file.endsWith('.js')) {
      
      const Module = require(path.join(currentPath, file));
      
      if (Module.prototype instanceof BaseModule) {
                
        const module = new Module();
        
        listModules.push(module);
        console.log(file);
      
      }
    
    }
  }

  return listModules;

}


//TODO System module, 
async function registerCommandsHandler(client, dir = '') {
  
  console.log(`registerCommandsHandler()`);

  const currentPath = dir;

  const commandFiles = await fs.readdir(currentPath);
  
  for (const file of commandFiles) {

    const stat = await fs.lstat(path.join(currentPath, file));
    
    if (stat.isDirectory())
      registerCommandsHandler(client, path.join(dir, file));

    if (file.endsWith('.js')) {
      
      const Command = require(path.join(currentPath, file));
      
      if (Command.prototype instanceof BaseCommand) {
                
        const command = new Command();
        client.commands.set(command.data.name, command);
        
        console.log("Ajout d'une nouvelle commande: "  + command.data.name);

        //Set aliases
        command.aliases.forEach((alias) => {
          client.commands.set(alias, command);
        });
      
      }
    
    }
  }
}

async function registerEventsHandler(client, dir = '') {

  console.log(`registerEventsHandler()`);

  const currentPath = dir;
  
  const eventFiles = await fs.readdir(currentPath);

  for (const file of eventFiles) {

    const stat = await fs.lstat(path.join(currentPath, file));
    
    if (stat.isDirectory()) 
      registerEventsHandler(client, path.join(dir, file));
    
    if (file.endsWith('.js')) {

      const Event = require(path.join(currentPath, file));
      
      if (Event.prototype instanceof BaseEvent) {
        
        const event = new Event();
        

        if (event.once) {
          client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
          client.on(event.name, (...args) => event.execute(client, ...args));
        }

        console.log("Ajout d'un nouveau évènement: "  + event.name);
      
      }

    }
  }
}

module.exports = {
  registerModuleHandler,
  registerCommandsHandler, 
  registerEventsHandler
};