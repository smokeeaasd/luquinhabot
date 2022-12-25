const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("missao")
		.setNameLocalizations({
			"en-US": "mission"
		})

		.setDescription("Gerenciar uma missão.")
		.setDescriptionLocalizations({
			"en-US": "Manage a mission"
		})

		.addSubcommand(subcmd => {
			subcmd.setName("iniciar");
			subcmd.setNameLocalizations({
				"en-US": "start"
			});

			subcmd.setDescription("Inicia uma nova missão");
			subcmd.setDescriptionLocalizations({
				"en-US": "Start a new mission"
			});

			return subcmd;
		})
		.addSubcommand(subcmd => {
			subcmd.setName("coletar");
			subcmd.setNameLocalizations({
				"en-US": "collect"
			});

			subcmd.setDescription("Coletar recompensas de missão");
			subcmd.setDescriptionLocalizations({
				"en-US": "Collect mission rewards"
			});
			
			return subcmd;
		}),

	/** @param {import("discord.js").Interaction} interaction */
	async execute(interaction) {
		const subCommand = interaction.options.getSubcommand();

		if (subCommand == "iniciar") {
			const missionStart = require("./missao/iniciar.js");
			missionStart.run(interaction);
		}
		else if (subCommand == "coletar") {
			const missionCollect = require("./missao/coletar.js");
			missionCollect.run(interaction);
		}
	}
}