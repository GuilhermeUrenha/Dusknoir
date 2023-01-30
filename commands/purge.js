import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('purge')
	.setDescription('Delete messages.')
	.addIntegerOption((option) => option.setName('amount')
		.setDescription('Amount of messages to be deleted.')
		.setRequired(true))
	.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
	.setDMPermission(false);
export async function execute(interaction) {
	const amount = interaction.options.getInteger('amount') ?? 1;
	interaction.deferReply({
		ephemeral: true
	});
	try {
		interaction.channel.bulkDelete(amount);
	} catch (error) {
		return interaction.editReply({
			content: `> Failed to delete messages.\n\`${String(error).replace(']:', ']:\`')}`,
			ephemeral: true,
		});
	}
	interaction.editReply({
		content: `Deleted ${amount} messages.`,
		ephemeral: true
	});
}