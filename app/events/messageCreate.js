const { Events } = require("discord.js");
const { dbHelper } = require("../database/model.js");

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