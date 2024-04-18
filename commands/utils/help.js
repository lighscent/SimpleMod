const { SlashCommandBuilder, ClientApplication } = require("discord.js");
const log = require("../../logger");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List all of my commands'),

    async execute(interaction) {
        const { commands } = interaction.client;

        const embed = {
            title: 'Help',
            description: 'Here is a list of all my commands:',
            color: 0x466ae1,
            timestamp: new Date().toISOString(),
            fields: [],
        };

        commands.forEach(command => {
            embed.fields.push({
                name: `/${command.data.name}`,
                value: command.data.description,
                inline: false,
            });
        });

        try {
            interaction.reply({ embeds: [embed] });
        } catch (error) {
            log.error(error);
            interaction.reply({ content: 'There was an error trying to send help message!', ephemeral: true });
        }
    }
}