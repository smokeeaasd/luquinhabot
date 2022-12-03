const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const { Model } = require("../database/dbModel.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Verificar a latência do bot"),

	async execute(interaction) {
		let active_color = await Model.getUserActiveColor(interaction.user.id);

		const pingEmbed = new EmbedBuilder({
			title: "Pong!",
			description: `${interaction.client.ws.ping}ms`
		});

		pingEmbed.setColor(active_color.color_hex);

		await interaction.reply({ embeds: [pingEmbed] });
	}
}