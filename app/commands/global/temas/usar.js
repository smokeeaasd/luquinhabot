const { EmbedBuilder } = require("discord.js");
const { Model } = require("../../../database/model/dbModel");

module.exports = {
	async execute(interaction) {
		const userData = Model.getUserByID(interaction.user.id);

		const theme = await interaction.options.getString("cor").toLowerCase();

		const themeExists = Model.getColorByName(theme) != null;

		let userHasColor = true;

		userData.notPurchasedColors.forEach(color => {
			if (color.name == theme) {
				userHasColor = false;	
			}
		});

		if (themeExists) {
			const color = Model.getColorByName(theme);
			let colorName = color.name.charAt(0).toUpperCase() + color.name.slice(1);

			if (userHasColor) {
				Model.changeUserColor(interaction.user.id, color.id);

				const newColorEmbed = new EmbedBuilder({
					title: `Tema selecionado: ${colorName} ${color.emoji}`,
					description: "Você pode trocar o tema a qualquer momento com **/tema usar**"
				});
				newColorEmbed.setColor(color.hex);

				await interaction.reply({
					embeds: [newColorEmbed],
					ephemeral: true
				});
			} else {
				const userHasNotColor = new EmbedBuilder({
					title: `Você não pode utilizar o tema ${colorName}`
				});
				userHasNotColor.setColor(userData.activeColor.hex);

				await interaction.reply({
					embeds: [userHasNotColor],
					ephemeral: true
				});
			}
		} else {
			const colorNotExists = new EmbedBuilder({
				title: "Temos um problema!",
				description: "Essa cor não existe!"
			});
			colorNotExists.setColor(userData.activeColor.hex);

			await interaction.reply({
				embeds: [colorNotExists],
				ephemeral: true
			});
		}
	}
}