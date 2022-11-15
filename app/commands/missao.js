const { SlashCommandBuilder, Colors } = require("discord.js");
const { Model } = require("../database/dbModel.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("missao")
		.setDescription("Você tem interesse em participar de uma missão?")
		.addSubcommand(subcmd => {
			subcmd.setName("iniciar");
			subcmd.setDescription("inicia uma nova missão");
			return subcmd;
		})
		.addSubcommand(subcmd => {
			subcmd.setName("coletar");
			subcmd.setDescription("coletar recompensas de missão");
			return subcmd;
		}),

	/** @param {import("discord.js").Interaction} interaction */
	async execute(interaction) {
		Model.tryAddUser(interaction.user.id);

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