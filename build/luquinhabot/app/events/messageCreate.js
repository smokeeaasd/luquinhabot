const { Events, EmbedBuilder, Colors } = require("discord.js");
const { Model } = require("../database/dbModel");

module.exports = {
	name: Events.MessageCreate,
	once: false,
	isAsync: true,

	/**
	 * @param {import("discord.js").Message} msg
	 */
	async execute(msg) {
		if (msg.author.bot) return;
	}
}