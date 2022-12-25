const { Collection } = require("discord.js");

const fs = require("node:fs");
const path = require("node:path");
const { AppLogger } = require("../utils/logger");

module.exports = {
    async run(client) {
        client.commands = new Collection();

        const guildCommandsPath = path.join(__dirname, '../commands/guild');
		const globalCommandsPath = path.join(__dirname, '../commands/global');

        const guildCommandFiles = fs.readdirSync(guildCommandsPath).filter(file => file.endsWith('.js'));
		const globalCommandFiles = fs.readdirSync(globalCommandsPath).filter(file => file.endsWith('.js'));

		const commandFiles = [
			{
				path: guildCommandsPath,
				files: guildCommandFiles
			},
			{
				path: globalCommandsPath,
				files: globalCommandFiles
			}
		];

		AppLogger.send(`Carregando arquivos de comandos`);
		for (const commandFile of commandFiles)
		{
			for (const file of commandFile.files)
			{
				const filePath = path.join(commandFile.path, file);
				const command = require(filePath);
				client.commands.set(command.data.name, command);
			}
		}
		AppLogger.send(`Arquivos de comandos foram carregados`);
    }
}
