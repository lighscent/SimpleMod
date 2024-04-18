const { Events } = require("discord.js");
const log = require("../logger");


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        try {
            if (!interaction.isChatInputCommand()) return;
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                log.error(`❌ Command ${interaction.commandName} not found`);
                return interaction.reply({ content: 'This command is not available.', ephemeral: true });
            }

            await command.execute(interaction);
        } catch (error) {
            log.error(error);
            console.log(error);
            if (interaction.replied || interaction.deferred) {
                return interaction.followUp({ content: 'There was an error while executing this command!\n Please try again later or contact the [support](https://discord.gg/azukiov).', ephemeral: true});
            } else {
                return interaction.reply({ content: 'There was an error while executing this command!\n Please try again later or contact the [support](https://discord.gg/azukiov).', ephemeral: true});
            }
        }
    },
}