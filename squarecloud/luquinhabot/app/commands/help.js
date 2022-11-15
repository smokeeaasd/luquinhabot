const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ajuda")
		.setDescription("Está com dúvida? Eu te ajudo!"),

	async execute(interaction) {
		const HelpEmbed = new EmbedBuilder({
			color: Colors.Aqua,
			title: "Comandos",
			fields: [
				{name: "/daily", value: "Receba a sua recompensa diária."},
				{name: "/dalle", value: "Gerar imagem baseada em prompt"},
				{name: "/google", value: "Fazer uma pesquisa no Google."},
				{name: "/ping", value: "Verificar o ping do bot"},
				{name: "/roll", value: "Girar um dado"}
			]
		});

		return await interaction.reply({embeds: [HelpEmbed]})
	}
}