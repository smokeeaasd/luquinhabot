const { SlashCommandBuilder } = require("discord.js");
const { Model } = require("../../database/model/dbModel.js");
const abrir = require("./caixa/abrir.js");
const quantia = require("./caixa/quantidade.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("caixa")
		.setNameLocalizations({
			"en-US": "box"
		})
		.setDescription("Gerenciar suas caixas misteriosas")
		.setDescriptionLocalizations({
			"en-US": "Manage your mystery boxes"
		})
		.addSubcommand(subcmd => {
			subcmd.setName("abrir");
			subcmd.setNameLocalizations({
				"en-US": "open"
			});

			subcmd.setDescription("Abrir caixas misteriosas");
			subcmd.setDescriptionLocalizations({
				"en-US": "Open your mystery boxes"
			});

			subcmd.addIntegerOption(qnt => {
				qnt.setName("quantia");
				qnt.setNameLocalizations({
					"en-US": "amount"
				});

				qnt.setDescription("Quantidade de caixas para abrir");
				qnt.setDescriptionLocalizations({
					"en-US": "Number of boxes to be opened"
				});

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
				await interaction.deferReply();
				abrir.run(interaction);
			break;

			case "quantidade":
				quantia.run(interaction);
			break;
		}
	}
}