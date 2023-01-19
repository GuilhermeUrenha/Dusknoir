const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
	intents:[
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages
	]
});

try{
	client.login(token);
} catch(error){
	console.error(error);
}

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if('data' in command && 'execute' in command){
		client.commands.set(command.data.name, command);
	} else{
		console.log(`[WARNING] [Command at ${filePath} missing required 'data'/'execute'.]`);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for(const file of eventFiles){
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if(event.once)
		client.once(event.name, (...args) => event.execute(...args));
	else
		client.on(event.name, (...args) => event.execute(...args));
}