const {
	SlashCommandBuilder
} = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('pong'),
	async execute(interaction) {
		let messageId;
		interaction.reply({
			content: 'pong',
			ephemeral: true
		});
		await wait(1000);
		interaction.followUp({
			content: 'Pong again!',
			ephemeral: true
		}).then((message) => {
			messageId = message.id;
		});
		await wait(2000);
		interaction.webhook.deleteMessage(messageId);
	}
}