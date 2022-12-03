const { EmbedBuilder, Colors } = require("discord.js");
const { Model } = require("../../database/dbModel")

module.exports = {
	async run(interaction) {
		let active_color = await Model.getUserActiveColor(interaction.user.id);
		
		async function classLevelUp(interaction, user, class_id) {
			await Model.setClass(interaction.user.id, class_id);

			const newUser = await Model.getUserAndClass(interaction.user.id);
			const ClassUpEmbed = new EmbedBuilder({
				color: Colors.DarkPurple,
				title: "Você subiu de classe!",
				description: "Participe de missões para melhorar a sua classe!",
				fields: [
					{
						name: `Nova classe: ${newUser.class_name}`,
						value: `**Descrição:** *${newUser.class_description}*`
					},
					{
						name: "Multiplicador de Moedas:",
						value: `~~${user.multiplier}~~ >> **${newUser.multiplier}**`
					}
				]
			});
			ClassUpEmbed.setColor(active_color.color_hex);

			await interaction.followUp({
				embeds: [ClassUpEmbed],
				ephemeral: true
			});
		}

		const user = await Model.getUserAndClass(interaction.user.id);

		if (await Model.canClassUp(interaction.user.id)) {
			switch (user.missions_count) {
				case 10:
					await classLevelUp(interaction, user, 2);
					await Model.addColorToUser(interaction.user.id, 2)
				break;

				case 20:
					await classLevelUp(interaction, user, 3);
					await Model.addColorToUser(interaction.user.id, 3)
				break;

				case 50:
					await classLevelUp(interaction, user, 4);
					await Model.addColorToUser(interaction.user.id, 4)
				break;

				case 100:
					await classLevelUp(interaction, user, 5);
					await Model.addColorToUser(interaction.user.id, 5)
				break;

				case 200:
					await classLevelUp(interaction, user, 6);
					await Model.addColorToUser(interaction.user.id, 6)
				break;
			}
		}
	}
}