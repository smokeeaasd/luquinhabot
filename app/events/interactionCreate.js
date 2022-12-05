const { Events } = require("discord.js");
const { Model } = require("../database/model/dbModel");

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	isAsync: true,

	/**
	 * @param {import("discord.js").Interaction} interaction 
	 */
	async execute(interaction) {

		Model.tryAddUser(interaction.user.id);
		
		if (!interaction.isChatInputCommand())
			return

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Ocorreu um erro na execução do comando.', ephemeral: true });
		}
	}
}