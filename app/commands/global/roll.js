const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Model } = require("../../database/model/dbModel.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roll")
		.setDescription("Girar um dado.")
		.addNumberOption((number) => {
			number.setName("lados");
			number.setDescription("Número de lados do dado.")
			number.setMinValue(3);
			number.setMaxValue(100);

			return number;
		}),
	async execute(interaction) {
		const userData = Model.getUserByID(interaction.user.id);
		
		let number = interaction.options.getNumber("lados");

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