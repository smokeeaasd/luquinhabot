const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("missao")
		.setDescription("Gerenciar uma missão.")
		.addSubcommand(subcmd => {
			subcmd.setName("iniciar");
			subcmd.setDescription("Inicia uma nova missão");
			return subcmd;
		})
		.addSubcommand(subcmd => {
			subcmd.setName("coletar");
			subcmd.setDescription("Coletar recompensas de missão");
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