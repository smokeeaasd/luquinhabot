const { SlashCommandBuilder, EmbedBuilder, Colors, REST, Routes } = require("discord.js");
const config = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ajuda")
		.setDescription("Lista de comandos."),

	async execute(interaction) {
		let commands = [];
		for (let i of interaction.client.commands)
		{
			let command = i[1]['data'];

			const commandData = {
				name: `/${command['name']}`,
				value: command['description']
			}

			commands.push(commandData);
		}

		const commandList = new EmbedBuilder({
			color: Colors.DarkPurple,
			title: "Lista de comandos",
			description: "Aqui está a lista de comandos!",

			fields: commands
		});

		await interaction.reply({
			embeds: [commandList],
			ephemeral: true,
		})
	}
}