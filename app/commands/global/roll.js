const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Model } = require("../../database/model/dbModel.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("dado")
		.setNameLocalizations({
			"en-US": "dice"
		})

		.setDescription("Girar um dado")
		.setDescriptionLocalizations({
			"en-US": "Roll a dice"
		})

		.addIntegerOption((number) => {
			number.setName("lados");
			number.setNameLocalizations({
				"en-US": "sides"
			});

			number.setDescription("Número de lados do dado");
			number.setDescriptionLocalizations({
				"en-US": "Number of sides"
			});

			number.setMinValue(3);
			number.setMaxValue(100);

			return number;
		}),
	async execute(interaction) {
		const userData = Model.getUserByID(interaction.user.id);
		
		let number = interaction.options.getInteger("lados");

		number ??= 6;

		let roll = Math.floor(Math.random() * number) + 1;

		const rollEmbed = new EmbedBuilder({
			title: `Resultado: ${roll}`,
			description: "Isso é bom ou ruim? É você quem decide."
		});
		rollEmbed.setColor(userData.activeColor.hex);

		await interaction.reply({
			embeds: [rollEmbed]
		})
	}
}