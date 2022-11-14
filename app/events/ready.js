const { Events, Status, ActivityType } = require("discord.js");
const { dbHelper } = require("../database/model");

module.exports = {
	name: Events.ClientReady,
	once: true,
	isAsync: true,

	/**
	 * @param {import("discord.js").Client} client 
	 */
	async execute(client) {
		console.log(`Pronto! Logado como ${client.user.tag}`);
		for (const guild of client.guilds.cache)
		{
			const server = dbHelper.getServerByID(guild[1].id);

			if (server == null)
			{
				dbHelper.addServer(guild[1].id);
			}
		}

		await client.user.setPresence({
			activities: [
				{
					name: `${dbHelper.getServersCount().count} servidores!`,
					type: ActivityType.Watching,
				},
			],
			status: "idle",
		});
	}
}