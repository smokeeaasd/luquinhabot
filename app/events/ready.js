const { Events, ActivityType, EmbedBuilder, Colors } = require("discord.js");
const config = require("../config.json");

module.exports = {
	name: Events.ClientReady,
	once: true,
	isAsync: true,

	/**
	 * @param {import("discord.js").Client} client 
	 */
	async execute(client) {
		console.log(`[${new Date().toUTCString()}] Logado como ${client.user.tag}`);

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

		const guild = client.guilds.cache.get(config.guild_id);
		const eventChannel = guild.channels.cache.get("1049062148690681956");

		/*setInterval(async () => {
			const giftEmbed = new EmbedBuilder({
				color: Colors.DarkPurple,
				title: ":gift: Alguém deixou um presente cair!",
				description: "Reaja com :gift: para coletar!"
			});

			const message = await eventChannel.send({
				embeds: [giftEmbed]
			});

			message.react("🎁")

			const collector = message.createReactionCollector({
				filter: (reaction, user) => {
					return reaction.emoji.name === '🎁' && user.id != client.user.id;
				},
				max: 1
			});

			collector.on('collect', async (reaction, user) => {
				await reaction.message.delete();
				const winMsg = await eventChannel.send(`:gift: | <@${user.id}> acaba de **coletar** um presente!`);

				setTimeout(async () => {
					await winMsg.delete();
				}, 5000);
			});
		}, 600000);*/
	}
}