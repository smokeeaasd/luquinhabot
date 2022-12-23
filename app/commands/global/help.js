const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Model } = require("../../database/model/dbModel.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ajuda")
		.setDescription("Lista de comandos."),

	async execute(interaction) {
		const userData = Model.getUserByID(interaction.user.id);
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
			title: "Lista de comandos",
			description: "Aqui está a lista de comandos!",

			fields: commands
		});
		commandList.setColor(userData.activeColor.hex);

		await interaction.reply({
			embeds: [commandList],
			ephemeral: true,
		})
	}
}