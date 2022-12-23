const { EmbedBuilder, Colors } = require("discord.js");
const { Model } = require("../../../database/model/dbModel.js")

module.exports = {
	async run(interaction) {
		const userData = Model.getUserByID(interaction.user.id);

		async function classLevelUp(interaction, oldUser, class_id) {
			Model.setClass(interaction.user.id, class_id);

			const newUser = Model.getUserByID(interaction.user.id);

			const ClassUpEmbed = new EmbedBuilder({
				color: Colors.DarkPurple,
				title: ":shield: Você subiu de classe!",
				description: "Participe de missões para melhorar a sua classe!",
				fields: [
					{
						name: `:crossed_swords: Nova classe: ${newUser.playerClass.name}`,
						value: `**Descrição:** *${newUser.playerClass.description}*`
					},
					{
						name: ":coin: ultiplicador de Moedas:",
						value: `${oldUser.multiplier} aumentou para **${newUser.multiplier}**`
					}
				]
			});
			ClassUpEmbed.setColor(userData.activeColor.hex);

			await interaction.followUp({
				embeds: [ClassUpEmbed],
				ephemeral: true
			});
		}

		if (Model.canClassUp(interaction.user.id)) {
			switch (user.missions_count) {
				case 10:
					await classLevelUp(interaction, userData.playerClass, 2);
				break;

				case 20:
					await classLevelUp(interaction, userData.playerClass, 3);
				break;

				case 50:
					await classLevelUp(interaction, userData.playerClass, 4);
				break;

				case 100:
					await classLevelUp(interaction, userData.playerClass, 5);
				break;

				case 200:
					await classLevelUp(interaction, userData.playerClass, 6);
				break;
			}
		}
	}
}