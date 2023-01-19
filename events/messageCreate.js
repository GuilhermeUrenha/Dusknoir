const { Events } = require('discord.js');

module.exports ={
	name: Events.MessageCreate,
    cooldown: false,
	async execute(message){
        if(this.cooldown) return;
        var targetId = '922246498383700018';
        //var targetId = require('../config.json').ownerId;
        if(message.author.id != targetId) return;
        var attachment = 'https://media.discordapp.net/attachments/623306406912720903/1049055986494742601/asdf2.gif?width=620&height=676';
        message.channel.send({content:attachment});
        this.cooldown = true;
        global.setTimeout(()=> this.cooldown = false, 15 * 1000);
    }
}