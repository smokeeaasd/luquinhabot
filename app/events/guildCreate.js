const { Events } = require("discord.js");
const { dbHelper } = require("../database/model.js");
module.exports = {
	name: Events.GuildCreate,
	once: false,
	isAsync: true,

	/** @param {import("discord.js").Interaction} guild */
	async execute(guild) {
		let server = dbHelper.getServerByID(guild.id);

		if (server?.discord_id == null)
		{
			dbHelper.addServer(guild.id);
		}
	}
}