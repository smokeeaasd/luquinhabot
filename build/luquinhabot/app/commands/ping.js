const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Verificar a latência do bot"),

	async execute(interaction) {
		const pingEmbed = new EmbedBuilder({
			color: Colors.Blue,
			title: "Pong!",
			description: `${interaction.client.ws.ping}ms`
		});

		await interaction.reply({ embeds: [pingEmbed] });
	}
}