const { Events } = require("discord.js");
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
		if (interaction.isButton())
		{
			const buttonsPath = path.join(__dirname, 'buttons');
			const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

			for (const file of buttonFiles)
			{
				const button = require(path.join(buttonsPath, file));

				await button.execute(interaction);
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