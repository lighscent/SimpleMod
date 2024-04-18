const fs = require('fs');
const path = require('path');
const client = require('../client');
const log = require('../logger');
const { Collection } = require('discord.js');

client.commands = new Collection();
const foldersPath = path.resolve(__dirname, '../commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.resolve(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.resolve(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            log.load(`⏳ Load command ${command.data.name}`);
        } else {
            log.error(`❌ Failed to load command ${file}`);
        }
    }
}