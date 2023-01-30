import { Events } from 'discord.js';

export const name = Events.InteractionCreate;
export const intervals = {};
export async function execute(interaction) {
	if (!interaction.isChatInputCommand())
		return;

	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`[Not a command: ${interaction.commandName}.]`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		interaction.reply({
			content: 'Error on command execution.',
			ephemeral: true
		});
	}
}