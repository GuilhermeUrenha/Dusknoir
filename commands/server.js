const {
	SlashCommandBuilder,
	EmbedBuilder
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Server desc.')
		.setDMPermission(false),
	async execute(interaction) {
		if (!interaction.inGuild())
			return interaction.reply({
				content: 'In-Guild command.',
				ephemeral: true
			});

		const fetchOwner = await interaction.guild.fetchOwner();
		const roles = new Map(interaction.guild.roles.cache);
		for (r of [...roles])
			if (r[1].name == '@everyone') roles.delete(r[0]);

		const textChannel = 0,
			voiceChannel = 2,
			categoryChannel = 4,
			announcementChannel = 5;

		const Guild = {
			Name: interaction.guild.name,
			Icon: interaction.guild.iconURL({
				size: 2048
			}),
			Owner: fetchOwner.user.username + '#' + fetchOwner.user.discriminator,
			//Region: interaction.guild.region.charAt(0).toUpperCase() + message.guild.region.slice(1),
			Roles: roles.size,
			Members: interaction.guild.memberCount,
			Bots: interaction.guild.memberCount - interaction.guild.members.cache.filter((member) => !member.user.bot).size,
			Categories: interaction.guild.channels.cache.filter((channel) => channel.type == categoryChannel).size,
			Channels: interaction.guild.channels.cache.filter((channel) => channel.type == textChannel || channel.type == announcementChannel).size,
			Voices: interaction.guild.channels.cache.filter((channel) => channel.type == voiceChannel).size,
			Identity: interaction.guild.id,
			CreatedAt: interaction.guild.createdAt.toLocaleDateString('pt-br', {
				year: 'numeric',
				month: 'short',
				day: '2-digit',
			}) //weekday: 'long', timeZoneName: 'short'
		};

		for (f in Guild)
			if (typeof Guild[f] == 'number') Guild[f] = `• ${Guild[f]}`;

		const guildEmbed = new EmbedBuilder()
			.setColor(interaction.guild.members.me.displayColor)
			.setTitle(Guild.Name)
			.setImage(Guild.Icon)
			.addFields({
				name: 'Owner',
				value: Guild.Owner,
				inline: false
			}, {
				name: 'Roles',
				value: Guild.Roles,
				inline: true
			}, {
				name: 'Members',
				value: Guild.Members,
				inline: true
			}, {
				name: 'Bots',
				value: Guild.Bots,
				inline: true
			}, {
				name: 'Categories',
				value: Guild.Categories,
				inline: true
			}, {
				name: 'Channels',
				value: Guild.Channels,
				inline: true
			}, {
				name: 'Voices',
				value: Guild.Voices,
				inline: true
			}, {
				name: 'Server Id',
				value: Guild.Identity,
				inline: false
			})
			.setFooter({
				text: `Guild Created  •  ${Guild.CreatedAt}`,
				iconURL: interaction.client.user.displayAvatarURL(),
			});

		interaction.reply({
			embeds: [guildEmbed]
		});
	}
};