const { Events } = require("discord.js");
const log = require("../logger");


module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;


    },
}