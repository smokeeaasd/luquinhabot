const { Events } = require("discord.js");
const { Model } = require("../database/model/dbModel");
const path = require("path");
const fs = require("fs");

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	isAsync: true,

	/**
	 * @param {import("discord.js").Interaction} interaction 
	 */
	async execute(interaction) {
		Model.tryAddUser(interaction.user.id);

		if (interaction.isButton())
		{
			const buttonsPath = path.join(__dirname, 'buttons');
			const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

			for (const buttonFile of buttonFiles)
			{
				const button = require(path.join(buttonsPath, buttonFile));

				if (button.constantId)
				{
					if (interaction.customId == button.id)
					{
						await button.execute(interaction, ...args);
					}
				} else {
					await button.execute(interaction);
				}
			}
			return;
		}
		
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