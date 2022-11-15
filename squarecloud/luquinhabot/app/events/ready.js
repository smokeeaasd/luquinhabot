const { Events, ActivityType } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	isAsync: true,

	/**
	 * @param {import("discord.js").Client} client 
	 */
	async execute(client) {
		console.log(`Pronto! Logado como ${client.user.tag}`);

		client.user.setPresence({
			activities: [
				{
					name: `${client.guilds.cache.size} servidores!`,
					type: ActivityType.Watching,
				},
			],
			status: "idle",
		});
	}
}