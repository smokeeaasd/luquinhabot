const { SlashCommandBuilder } = require("discord.js");
const { Model } = require("../../database/model/dbModel.js");
const abrir = require("./caixa/abrir.js");
const quantia = require("./caixa/quantidade.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("caixa")
		.setDescription("Gerenciar suas caixas misteriosas")
		.addSubcommand(subcmd => {
			subcmd.setName("abrir");
			subcmd.setDescription("Abrir caixas misteriosas");

			subcmd.addNumberOption(qnt => {
				qnt.setName("quantia");
				qnt.setDescription("Quantidade de caixas para abrir");
				qnt.setMinValue(1);
				qnt.setRequired(true);

				return qnt;
			});

			return subcmd
		})
		.addSubcommand(subcmd => {
			subcmd.setName("quantidade");
			subcmd.setDescription("Ver suas caixas misteriosas");

			return subcmd;
		}),
	async execute(interaction) {
		const subCommand = interaction.options.getSubcommand();

		switch (subCommand)
		{
			case "abrir":
				abrir.run(interaction);
			break;

			case "quantidade":
				quantia.run(interaction);
			break;
		}
	}
}