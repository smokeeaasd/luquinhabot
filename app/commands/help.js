const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ajuda")
		.setDescription("Está com dúvida? Eu te ajudo!"),

	async execute(interaction) {
		const HelpEmbed = new EmbedBuilder({
			color: Colors.DarkPurple,
			title: "Comandos",
			fields: [
				{name: "/missao", value: "Iniciar ou coletar uma missão"},
				{name: "/google", value: "Fazer uma pesquisa no Google."},
				{name: "/ping", value: "Verificar o ping do bot"},
				{name: "/roll", value: "Girar um dado"}
			]
		});

		return await interaction.reply({embeds: [HelpEmbed]})
	}
}