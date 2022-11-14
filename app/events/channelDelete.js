const { Events, ChannelType } = require("discord.js");
const { dbHelper } = require("../database/model");

module.exports = {
	name: Events.ChannelDelete,
	once: false,
	async: true,

	/** @param {import("discord.js").Channel} channel */
	async execute(channel) {
		if (channel.type == ChannelType.GuildCategory) {
			const server = dbHelper.getServerByID(channel.guild.id);

			if (server.ticket_category == channel.id) {
				dbHelper.updateTicketCategory(channel.guild.id, null);
			}
		}
	}
}