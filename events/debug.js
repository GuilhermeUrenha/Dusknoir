import { Events } from 'discord.js';

export const name = Events.Debug;
export const latency = 0;
export function execute(information) {
	const infoArray = information.split(/ +/);
	var latency = infoArray[infoArray.length - 1];
	if (latency.endsWith('ms'))
		this.latency = latency;
}