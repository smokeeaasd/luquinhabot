const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("tema")
		.setNameLocalizations({
			"en-US": "theme"
		})
		.setDescription("Gerenciar os seus temas.")
		.setDescriptionLocalizations({
			"en-US": "Manage your themes."
		})
		.addSubcommand(subcmd => {
			subcmd.setName("listar");
			subcmd.setNameLocalizations({
				"en-US": "list"
			})

			subcmd.setDescription("Listar temas disponíveis");
			subcmd.setDescriptionLocalizations({
				"en-US": "List avaliable themes"
			})

			return subcmd;
		})
		.addSubcommand(subcmd => {
			subcmd.setName("definir");
			subcmd.setNameLocalizations({
				"en-US": "select"
			})

			subcmd.setDescription("Definir um tema");
			subcmd.setDescriptionLocalizations({
				"en-US": "Set a theme"
			});

			subcmd.addStringOption(theme => {
				theme.setName("cor");
				theme.setNameLocalizations({
					"en-US": "color"
				});

				theme.setDescription("Escolha o tema");
				theme.setDescriptionLocalizations({
					"en-US": "Choose a theme"
				});
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

			case "definir":
				const usarTema = require("./temas/usar.js");
				usarTema.execute(interaction);
			break;
		}
	}
}