const {
	SlashCommandBuilder
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('interval')
		.setDescription('Sets, lists and clears Intervals.')
		.addSubcommand((subcommand) =>
			subcommand
			.setName('set')
			.setDescription('Sets interval.')
			.addIntegerOption((option) =>
				option.setName('time')
				.setDescription('Interval loop time.')
				.setMinValue(2)
				.setMaxValue(300)
				.setRequired(true))
			.addBooleanOption((option) =>
				option.setName('delete')
				.setDescription('Delete previous.')
				.setRequired(true))
			.addStringOption((option) =>
				option.setName('content')
				.setDescription('Content.')
				.setRequired(true)))
		.addSubcommand((subcommand) =>
			subcommand.setName('list')
			.setDescription('Intervals list.'))
		.addSubcommand((subcommand) =>
			subcommand.setName('clear')
			.setDescription('Clear all intervals.')
			.addIntegerOption((option) =>
				option.setName('number')
				.setDescription('Interval number.')
				.setMinValue(1)
				.setMaxValue(10))),
	async execute(interaction) {
		const {
			intervals
		} = require('../events/interactionCreate.js');
		const action = interaction.options.getSubcommand();

		switch (action) {
			case 'set':
				const timeInterval = interaction.options.getInteger('time');
				const deletePrevious = interaction.options.getBoolean('delete');
				const messageContent = interaction.options.getString('content');
				for (f = 1; f <= 10; f++)
					if (!intervals[interaction.channel.id + '-' + f]) {
						intervals[interaction.channel.id + '-' + f] = global.setInterval(
							async function() {
								const message = global.setTimeout(() => interaction.channel.send(messageContent), 300);
								if (deletePrevious)
									interaction.channel.messages
									.fetch({
										limit: 15
									})
									.then((messages) => {
										if (message) messages.delete(message.id);
										for (let message of [...messages.values()])
											if (
												message.content == messageContent &&
												message.author.id == interaction.client.user.id
											)
												message.delete().catch(console.error);
									})
									.catch(console.error);
							}, timeInterval * 1000);
						intervals[interaction.channel.id + '-' + f].message = messageContent;
						interaction.reply({
							content: 'Interval set.',
							ephemeral: true
						});
						break;
					}
				if (!interaction.replied)
					interaction.reply({
						content: 'Maximum intervals reached.',
						ephemeral: true
					});
			break;

			case 'list':
				var keys = Object.keys(intervals);
				if (keys.length) {
					var message = 'Intervals channel list:\n>>> ';
					for (id in keys) {
						message += `# **\`${keys[id].slice(-1)}\`** \t• `;
						message += `[\` ${Object.values(intervals)[id].message} \`]\t`;
						message += `> <#${keys[id].slice(0, -2)}>\n`;
					}
					interaction.reply(message);
				} else interaction.reply({
					content: 'No intervals set.',
					ephemeral: true
				});
			break;

			case 'clear':
				const number = interaction.options.getInteger('number') ?? 0;
				var cleared = false;
				if (!number) {
					for (f = Object.keys(intervals).length; f >= 0; f--)
						if (intervals[interaction.channel.id + '-' + f]) {
							global.clearInterval(intervals[interaction.channel.id + '-' + f]);
							delete intervals[interaction.channel.id + '-' + f];
							cleared = true;
						} else if (!f && !cleared)
						interaction.reply({
							content: 'No interval to clear.',
							ephemeral: true
						});
					if (cleared)
						interaction.reply({
							content: 'Intervals cleared.',
							ephemeral: true
						});
				} else if (intervals[interaction.channel.id + '-' + number]) {
					global.clearInterval(intervals[interaction.channel.id + '-' + number]);
					delete intervals[interaction.channel.id + '-' + number];
					interaction.reply({
						content: `Interval # **${number}**  cleared.`,
						ephemeral: true
					});
				} else
					interaction.reply({
						content: 'No interval to clear.',
						ephemeral: true
					});
			break;

			default:
				interaction.reply({
					content: 'Unexpected.',
					ephemeral: true
				});
		}
	}
}