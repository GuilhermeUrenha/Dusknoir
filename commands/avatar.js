const {
	SlashCommandBuilder,
	EmbedBuilder
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Profile picture.')
		.addUserOption(option =>
			option.setName('user')
			.setDescription('The target user.')),
	async execute(interaction) {
		const user = (await interaction.options.getUser('user')) ?? interaction.user;
		const member = await interaction.guild.members.fetch(user.id);
		const avatarEmbed = new EmbedBuilder()
			.setColor(member.displayColor)
			.setTitle(`${user.username}#${user.discriminator}`)
			.setImage(user.displayAvatarURL({
				dynamic: true,
				size: 2048
			}))
			.setURL(user.displayAvatarURL({
				size: 2048
			}));
		if (user.bot) avatarEmbed.setTitle(`${user.username}#${user.discriminator} \`Bot\``);
		interaction.reply({
			embeds: [avatarEmbed]
		});
	}
}