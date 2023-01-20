const {
	Events,
	ActivityType
} = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		let guild = client.guilds.cache.get('423291676379840512');
		let channel = guild.channels.cache.get('465329247511379969');
		let totalServers = client.guilds.cache.size;
		client.user.setPresence({
			activities: [{
				name: `${totalServers} servers.`,
				type: ActivityType.Watching
			}],
			status: 'online', //idle / dnd / invisible
		});

		channel.messages
			.fetch({
				limit: 15
			})
			.then((messages) => {
				for (var message of [...messages.values()]) {
					if (message.content == '`[Ready.]`') {
						message.delete().catch(console.error);
						return true;
					}
				}
			})
			.catch(console.error);

		global.setTimeout(function() {
			console.log('[Ready.]');
			channel.send('`[Ready.]`');
		}, 800);
	}
}