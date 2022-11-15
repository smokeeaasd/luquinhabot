const { EmbedBuilder } = require("@discordjs/builders");
const { Colors } = require("discord.js");

module.exports = {
	/** @param {import("discord.js").Interaction} interaction */
	async execute(interaction) {
		switch (interaction.customId) {
			case "closeTicket":
				const CloseTicketEmbed = new EmbedBuilder({
					color: Colors.DarkRed,
					title: "Ticket fechado",
					description: `<@${interaction.user.id}> fechou o ticket`
				});

				try {
					await interaction.reply({
						embeds: [CloseTicketEmbed]
					});

					await interaction.channel.delete();
				} catch (e) {
					console.log(e);
				}
			break;
		}
	}
}