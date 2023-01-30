import { SlashCommandBuilder, codeBlock } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('roll')
	.setDescription('Dice roll.')
	.addStringOption((option) => option.setName('dice')
		.setDescription("Dice's to roll.")
		.setRequired(true));
export async function execute(interaction) {
	var dice = interaction.options.getString('dice');
	var dBase = Array.from(dice), dSorted = [], dTrim = [], dRolls = [], dFilter = [];
	var Numbers = '', dDice = [], dSplit = [], dResolved = '', Total;
	for (n of dBase) {
		if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'd'].some((d) => d == n)) {
			Numbers += n;
			continue;
		}
		if (['+', '-', '*', '/', '^', '(', ')'].some((d) => d == n)) {
			if (Numbers.length) {
				dSorted.push(Numbers);
				Numbers = '';
			}
			dSorted.push(n);
			continue;
		}
		return interaction.reply({
			content: `> **Roll**: \`${dice}\`.\nUnexpected \`\'${n}\'\`.`,
			ephemeral: true,
		});
	}
	if (Numbers.length)
		dSorted.push(Numbers);
	let previous;
	for (s of dSorted) {
		if (previous != s)
			dTrim.push(s);
		previous = s;
	}
	if (dTrim.some((p) => p == '(') ? !dTrim.some((p) => p == ')') : dTrim.some((p) => p == ')'))
		return interaction.reply({
			content: `> **Roll**: \`${dice}\`.\nUnexpected \`\'${dTrim.find((k) => k == '(') ?? dTrim.find((k) => k == ')')}\'\`.`,
			ephemeral: true,
		});
	for (t of dTrim) {
		if (t.includes('d')) {
			dDice = t.split('d');
			dDice = dDice.map((i) => i.replace(/^$/, '1'));
			if (dDice.length > 2)
				return interaction.reply({
					content: `> **Roll**: \`${dice}\`.\nInvalid Dice \`\'${t}\'\`.`,
					ephemeral: true,
				});
			for (t = 1; t <= dDice[0]; t++) {
				let r = Math.floor(Math.random() * dDice[1]) + 1;
				dRolls.push(r);
				dSplit.push(r);
			}
			dFilter.push(dSplit);
			dSplit = [];
		} else
			dFilter.push(t);
	}
	for (f of dFilter) {
		if (typeof f == 'object')
			f = f.reduce((a, c) => a + c, 0);
		dResolved += f;
	}
	try {
		Total = global.eval(dResolved);
	} catch (err) {
		return interaction.reply({
			content: `> **Roll**: \`${dice}\`.\nUnexpected input.`,
			ephemeral: true,
		});
	}
	interaction.reply(codeBlock('md', `# ${Total}\nDetails:[${dTrim.join('')} (${dRolls.join(' ')})]`));
}