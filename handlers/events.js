const fs = require('fs');
const path = require('path');
const client = require('../client');
const log = require('../logger');

const eventsPath = path.resolve(__dirname, '../events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.resolve(eventsPath, file);
    const event = require(filePath);

    if ('name' in event && 'execute' in event) {
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        log.load(`⏳ Load event ${event.name}`);
    } else {
        log.error(`❌ Failed to load event ${file}`);
    }

}

log.info(`✔️  Loaded ${fs.readdirSync('./events').length} events`);