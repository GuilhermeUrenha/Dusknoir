import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('avatar')
	.setDescription('Profile picture.')
	.addUserOption(option => option.setName('user')
		.setDescription('The target user.'));
export async function execute(interaction) {
	const user = (await interaction.options.getUser('user')) ?? interaction.user;
	let member = await interaction.guild.members.fetch(user.id);
	var avatarEmbed = new EmbedBuilder()
		.setColor(member.displayColor)
		.setTitle(`${user.username}#${user.discriminator}`)
		.setImage(user.displayAvatarURL({
			dynamic: true,
			size: 2048
		}))
		.setURL(user.displayAvatarURL({
			size: 2048
		}));
	if (user.bot)
		avatarEmbed.setTitle(`${user.username}#${user.discriminator} \`Bot\``);
	interaction.reply({
		embeds: [avatarEmbed]
	});
}