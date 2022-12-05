const { EmbedBuilder } = require("discord.js");
const { Model } = require("../../../database/model/dbModel");

module.exports = {
	async execute(interaction) {
		const avaliableColors = Model.getUserColors(interaction.user.id);

		let colorsList = "";
		avaliableColors.forEach(color => {
			colorsList += `${color.emoji} Tema **${color.color_name}**\n`
		});

		const active_color = Model.getUserActiveColor(interaction.user.id);

		const ColorsEmbed = new EmbedBuilder({
			title: "Seus temas",
			description: colorsList,
			fields: [
				{
					name: "Como utilizar um tema?",
					value: "Utilize /temas usar **tema**"
				}
			]
		});

		ColorsEmbed.setColor(active_color.color_hex);

		await interaction.reply({
			embeds: [ColorsEmbed],
			ephemeral: true
		})
	}
}