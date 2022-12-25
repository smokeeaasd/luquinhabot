const { Events, ActivityType } = require("discord.js");
const { AppLogger } = require("../utils/logger.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	isAsync: true,

	/**
	 * @param {import("discord.js").Client} client 
	 */
	async execute(client) {
		AppLogger.send("Luquinha iniciado.", true);

		setInterval(() => {
			client.user.setPresence({
				activities: [
					{
						name: `${client.guilds.cache.size} servidores!`,
						type: ActivityType.Watching,
					},
				],
				status: "idle",
			});
		}, 30000);
	}
}