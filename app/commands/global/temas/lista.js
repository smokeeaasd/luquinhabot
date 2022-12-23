const { EmbedBuilder } = require("discord.js");
const { Model } = require("../../../database/model/dbModel");

module.exports = {
	async execute(interaction) {
		const userData = Model.getUserByID(interaction.user.id);

		let colorsList = "";
		userData.purchasedColors.forEach(color => {
			// Primeira letra em maiúsculo
			let colorName = color.name.charAt(0).toUpperCase() + color.name.slice(1);
			colorsList += `${color.emoji} Tema **${colorName}**\n`
		});

		const ColorsEmbed = new EmbedBuilder({
			title: "Seus temas",
			description: colorsList,
			fields: [
				{
					name: "Como utilizar um tema?",
					value: "Utilize /tema usar **tema**"
				}
			]
		});

		ColorsEmbed.setColor(userData.activeColor.hex);

		await interaction.reply({
			embeds: [ColorsEmbed],
			ephemeral: true
		})
	}
}