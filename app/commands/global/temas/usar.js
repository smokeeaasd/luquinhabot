const { EmbedBuilder } = require("discord.js");
const { Model } = require("../../../database/model/dbModel");

module.exports = {
	async execute(interaction) {
		const active_color = Model.getUserActiveColor(interaction.user.id);

		const theme = await interaction.options.getString("cor");

		const themeExists = Model.getColorByName(theme) != null;

		const notUserColors = Model.getNotUserColors(interaction.user.id);

		let userHasColor = true;
		notUserColors.forEach(color => {
			if (color.color_name == theme) {
				userHasColor = false;	
			}
		});

		if (themeExists) {
			const color = Model.getColorByName(theme);

			if (userHasColor) {
				Model.changeUserColor(interaction.user.id, color.id);

				const newColorEmbed = new EmbedBuilder({
					title: `Agora você está utilizando o tema ${color.color_name}`,
					description: "Você pode trocar o tema a qualquer momento com **/tema usar**"
				});
				newColorEmbed.setColor(color.color_hex);

				await interaction.reply({
					embeds: [newColorEmbed],
					ephemeral: true
				});
			} else {
				const userHasNotColor = new EmbedBuilder({
					title: `Você não pode utilizar o tema ${color.color_name}`
				});
				userHasNotColor.setColor(color.color_hex);

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
			colorNotExists.setColor(active_color.color_hex);

			await interaction.reply({
				embeds: [colorNotExists],
				ephemeral: true
			});
		}
	}
}