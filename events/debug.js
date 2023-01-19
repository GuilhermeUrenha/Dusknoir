const { Events } = require('discord.js');

module.exports ={
	name: Events.Debug,
    latency: 0,
	execute(information){
        const infoArray = information.split(/ +/);
        var latency = infoArray[infoArray.length-1];
        if(latency.endsWith('ms'))
            this.latency = latency;
    }
}