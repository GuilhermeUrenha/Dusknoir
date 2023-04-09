const {
	SlashCommandBuilder,
	EmbedBuilder
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('stats').setDescription('Debug info.'),
	async execute(interaction) {
		const {
			latency
		} = require('../events/debug.js');

		let description = '';
		description += `\nNode.js Version: \`${process.version}\``;
		description += `\nClient Runtime: \`${require('../misc.js')
			.Time(interaction.client.uptime / 1000)
			.replace('.', ',')}\``;
		if (latency) description += `\nConnection Latency: \`${latency}\``;
		else description += `\nConnection Latency: \`Sending a heartbeat…\``;
		description += `\nAPI Latency: \`${interaction.client.ws.ping}ms\``;

		const informationEmbed = new EmbedBuilder()
			.setColor(interaction.guild.members.me.displayColor)
			.setTitle('Client Info.')
			.setDescription(description)
			.setThumbnail('https://64.media.tumblr.com/ab8e0fc428cedf454da7d4a15cc1bb5c/tumblr_mtl8u32w2K1rfjowdo1_500.gif');
		interaction.reply({
			embeds: [informationEmbed]
		});
	}
}
/*
console.log('platform')
console.log(process.platform);
console.log('cpuUsage')
console.log(process.cpuUsage());
console.log('memoryUsage')
console.log(process.memoryUsage());
console.log('resourceUsage')
console.log(process.resourceUsage());
console.log('uptime')
console.log(process.uptime());
*/