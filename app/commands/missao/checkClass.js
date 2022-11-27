const { EmbedBuilder, Colors } = require("discord.js");
const { Model } = require("../../database/dbModel")

module.exports = {
	async run(interaction) {
		async function classLevelUp(interaction, user, class_id) {
			Model.setClass(interaction.user.id, class_id);

			const newUser = Model.getUserAndClass(interaction.user.id);
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

			await interaction.followUp({
				embeds: [ClassUpEmbed],
				ephemeral: true
			});
		}

		const user = Model.getUserAndClass(interaction.user.id);

		if (Model.canClassUp(interaction.user.id)) {
			switch (user.missions_count) {
				case 10:
					await classLevelUp(interaction, user, 2);
				break;

				case 20:
					await classLevelUp(interaction, user, 3);
				break;

				case 50:
					await classLevelUp(interaction, user, 4);
				break;

				case 100:
					await classLevelUp(interaction, user, 5);
				break;

				case 200:
					await classLevelUp(interaction, user, 6);
				break;
			}
		}
	}
}