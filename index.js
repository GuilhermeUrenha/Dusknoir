import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { token } from './config.json';

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

try {
	client.login(token);
} catch (error) {
	console.error(error);
}

client.commands = new Collection();
const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath)
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command)
		client.commands.set(command.data.name, command);
	else
		console.log(`[WARNING] [Command at ${filePath} missing required 'data'/'execute'.]`);
}

const eventsPath = join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath)
	.filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = join(eventsPath, file);
	const event = require(filePath);
	if (event.once)
		client.once(event.name, (...args) => event.execute(...args));
	else
		client.on(event.name, (...args) => event.execute(...args));
}