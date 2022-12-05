const { SlashCommandBuilder } = require("discord.js");
const { Model } = require("../../database/model/dbModel");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("temas")
		.setDescription("Selecionar um tema"),
	async execute(interaction) {
		const avaliableColors = Model.getUserColors(interaction.user.id);

		let components = []
		for (let color of avaliableColors) {
			let data = {
				label: `${color.color_name}`,
				description: `Clique para selecionar o Tema: ${color.color_name}.`,
				value: color.id,
				emoji: color.emoji
			}

			components.push(data)
		}
	}
}