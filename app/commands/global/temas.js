const { SlashCommandBuilder } = require("discord.js");
const { Model } = require("../../database/model/dbModel");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("tema")
		.setDescription("Selecionar um tema")
		.addSubcommand(subcmd => {
			subcmd.setName("listar");
			subcmd.setDescription("Lista de temas disponíveis");

			return subcmd;
		})
		.addSubcommand(subcmd => {
			subcmd.setName("usar");
			subcmd.setDescription("Utilizar um tema");

			subcmd.addStringOption(theme => {
				theme.setName("cor");
				theme.setDescription("Escolha o tema.");
				theme.setRequired(true);

				return theme;
			});

			return subcmd;
		}),
	async execute(interaction) {

		const subCommand = await interaction.options.getSubcommand();

		switch (subCommand)
		{
			case "listar":
				const listarTema = require("./temas/lista.js");
				listarTema.execute(interaction);
			break;

			case "usar":
				const usarTema = require("./temas/usar.js");
				usarTema.execute(interaction);
			break;
		}
	}
}