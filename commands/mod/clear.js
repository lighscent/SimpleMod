const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const log = require('../../logger');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears messages in a channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option => option.setName('amount').setDescription('The amount of messages to clear.').setMinValue(1).setMaxValue(100).setRequired(true)),

    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        const embed = {
            title: 'Clear Messages',
            description: `Successfully cleared ${amount} messages by ${interaction.user}`,
            color: 0x466ae1,
            timestamp: new Date().toISOString(),
        }        

        try {
            await interaction.channel.bulkDelete(amount, true).then(() => {
                interaction.reply({ embeds: [embed] }).then(() => {
                    setTimeout(() => {
                        interaction.deleteReply();
                    }, 10000);
                });
            });
        } catch (error) {
            log.error(error);
            interaction.reply({ content: 'There was an error trying to clear messages in this channel!', ephemeral: true });
        }
    }
}