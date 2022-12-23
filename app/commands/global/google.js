const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Model } = require("../../database/model/dbModel.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("google")
		.setDescription("Realiza uma pesquisa Google para aquela pessoa lerda...")
		.addStringOption((s) => {
			s.setName("pesquisa")
			s.setDescription("O que você quer pesquisar?")
			s.setRequired(true)
			s.setMaxLength(100)

			return s;
		}),

	async execute(interaction) {
		const userData = Model.getUserByID(interaction.user.id);

		let query = interaction.options.getString("pesquisa");
		let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

		const searchEmbed = new EmbedBuilder({
			title: "Aqui está a sua pesquisa!",
			description: "Isso foi tão facil, você deveria fazer isso da proxima vez. :smile:",
			fields: [
				{ name: "URL", value: searchUrl, }
			]
		});
		searchEmbed.setColor(userData.activeColor.hex);

		await interaction.reply({
			embeds: [searchEmbed]
		});
	}
}