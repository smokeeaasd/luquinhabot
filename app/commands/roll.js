const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Model } = require("../database/dbModel.js");

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
		let active_color = await Model.getUserActiveColor(interaction.user.id);
		
		let number = interaction.options.getNumber("lados");
		number = number ?? 6;
		let roll = Math.floor(Math.random() * number) + 1;

		const rollEmbed = new EmbedBuilder({
			title: `Resultado: ${roll}`,
			description: "Isso é bom ou ruim? É você quem decide."
		});
		rollEmbed.setColor(active_color.color_hex);

		await interaction.reply({
			embeds: [rollEmbed]
		})
	}
}