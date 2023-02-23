const {
	Events
} = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	intervals: {},
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) {
			console.error(`[Not a command: ${interaction.commandName}.]`);
			return;
		}
		try {
			await command.execute(interaction);
		} catch (error) {
			console.log(error);
			interaction.reply({
				content: 'Error on command execution.',
				ephemeral: true
			});
		}
	}
}