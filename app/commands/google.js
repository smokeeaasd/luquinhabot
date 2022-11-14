const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("google")
		.setDescription("faz uma pesquisa para aquela pessoa preguiçosa")
		.addStringOption((s) => {
			s.setName("pesquisa")
			s.setDescription("o que o seu amigo quer pesquisar")
			s.setRequired(true)
			s.setMaxLength(100)

			return s;
		}),

	async execute(interaction) {
		let query = interaction.options.getString("pesquisa");
		let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

		const SearchEmbed = new EmbedBuilder({
			color: Colors.Aqua,
			title: "Aqui está a sua pesquisa!",
			description: "Isso foi tão facil, você deveria fazer isso da proxima vez. :smile:",
			fields: [
				{ name: "URL", value: searchUrl, }
			]
		});

		await interaction.reply({
			embeds: [SearchEmbed]
		});
	}
}