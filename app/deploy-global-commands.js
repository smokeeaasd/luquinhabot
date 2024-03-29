const config = require("./config.json");
const { Routes, REST } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands/global');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const commandPath = path.join(commandsPath, file)
	const command = require(commandPath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
	try {
		console.log('Atualizando comandos de barra (/).');

		await rest.put(
			Routes.applicationCommands(config.client_id),
			{ body: commands }
		);

		console.log('Comandos de barra (/) atualizados.');
	} catch (error) {
		console.error(error);
	}
})();