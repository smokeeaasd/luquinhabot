const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const { Model } = require("../../database/model/dbModel.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Verificar a latência do bot"),

	async execute(interaction) {
		const userData = Model.getUserByID(interaction.user.id);

		const pingEmbed = new EmbedBuilder({
			title: "Pong!",
			description: `${interaction.client.ws.ping}ms`
		});

		pingEmbed.setColor(userData.activeColor.hex);

		await interaction.reply({ embeds: [pingEmbed] });
	}
}