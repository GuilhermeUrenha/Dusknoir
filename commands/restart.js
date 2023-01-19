const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('restart').setDescription('Restart the client.'),
	async execute(interaction) {
		console.log('[Quitted.]');
		await interaction.reply('`[Quitted.]`');
		await interaction.client.destroy();
		process.exit(0);

		/*
        const execSync = require('child_process').execSync;
        const output = execSync('Taskkill /IM node.exe /F && cd "C:\Users\guilh\Área de Trabalho\Info\BOTv2" && node index.js', {encoding: 'utf-8'});  // the default is 'buffer'
        console.log('Output was:\n', output);

        return await interaction.reply({content:`Output was:\n\`${output}\``, ephemeral:true});
        */

		/*
        await interaction.reply('\`[Restarting.]\`');
        global.setTimeout(async() =>{
            interaction.client.login(require('../config.json').token);
            await interaction.editReply('\`[Restarted.]\`');
            process
        }, 5000);
        await interaction.client.destroy();
        process.exit();
        */
	}
};