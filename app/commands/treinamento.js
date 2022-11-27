const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("treinamento")
		.setDescription("Inicia um treinamento."),
	async execute(interaction) {
		
	}
}