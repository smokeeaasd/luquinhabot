const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roll")
		.setDescription("girar um dado")
		.addNumberOption((number) => {
			number.setName("lados");
			number.setDescription("Número de lados do dado.")
			number.setMinValue(3);
			number.setMaxValue(100);

			return number;
		}),
	async execute(interaction) {
		let number = interaction.options.getNumber("lados");
		number = number ?? 6;
		let roll = Math.floor(Math.random() * number) + 1;

		const RollEmbed = new EmbedBuilder({
			color: Colors.Gold,
			title: `Resultado: ${roll}`,
			description: "Isso é bom ou ruim? É você quem decide."
		});

		await interaction.reply({
			embeds: [RollEmbed]
		})
	}
}