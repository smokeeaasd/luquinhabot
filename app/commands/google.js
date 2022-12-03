const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Model } = require("../database/dbModel.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("google")
		.setDescription("Realiza uma pesquisa Google.")
		.addStringOption((s) => {
			s.setName("pesquisa")
			s.setDescription("o que o seu amigo quer pesquisar")
			s.setRequired(true)
			s.setMaxLength(100)

			return s;
		}),

	async execute(interaction) {
		let active_color = await Model.getUserActiveColor(interaction.user.id);
		let query = interaction.options.getString("pesquisa");
		let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

		const searchEmbed = new EmbedBuilder({
			title: "Aqui está a sua pesquisa!",
			description: "Isso foi tão facil, você deveria fazer isso da proxima vez. :smile:",
			fields: [
				{ name: "URL", value: searchUrl, }
			]
		});
		searchEmbed.setColor(active_color.color_hex);

		await interaction.reply({
			embeds: [searchEmbed]
		});
	}
}