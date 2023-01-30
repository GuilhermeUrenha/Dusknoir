import { SlashCommandBuilder } from 'discord.js';
import { setTimeout as wait } from 'node:timers/promises';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('pong');
export async function execute(interaction) {
	var messageId;
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