const { Events, Colors, EmbedBuilder } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	isAsync: true,

	/**
	 * @param {import("discord.js").Interaction} interaction 
	 */
	async execute(interaction) {
		if (!interaction.isChatInputCommand())
			return

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			const errEmbed = new EmbedBuilder({
				color: Colors.DarkRed,
				title: "Me desculpe",
				description: "Ocorreu um erro! Estou em beta ainda."
			});
			await interaction.reply({ embeds: [errEmbed], ephemeral: true });
		}
	}
}