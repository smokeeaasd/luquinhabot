const { SlashCommandBuilder, EmbedBuilder, Colors, Message, InteractionResponse, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");
const { Model } = require("../../database/model/dbModel");
const { AppLogger } = require("../../utils/logger.js");
const { CommonMessages } = require("../modules/CommonMessages");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("botban")
		.setDescription("Banir um usuário do bot")
		.addUserOption(user => {
			user.setName("usuario");
			user.setDescription("Usuário que será banido");
			user.setRequired(true);

			return user;
		})
		.addStringOption(reason => {
			reason.setName("motivo");
			reason.setDescription("Motivo da punição");
			reason.setRequired(true);

			return reason;
		}),

	/**
	 * 
	 * @param {import("discord.js").Interaction} interaction 
	 */
	async execute(interaction) {
		const user = interaction.options.getUser("usuario");

		if (user.id	!= interaction.guild.ownerId)
		{
			return await interaction.reply({
				content: CommonMessages.onlyBotAdmin,
				ephemeral: true,
			});
		}
		const reason = interaction.options.getString("motivo");


		const banEmbed = new EmbedBuilder({
			title: "Banimento de Usuário",
			description: "Você está prestes a banir um usuário. Clique no botão para confirmar.",
			color: Colors.DarkRed,
			fields: [
				{
					name: "Usuário",
					value: `<@${user.id}>`
				},
				{
					name: "Motivo",
					value: reason
				}
			]
		});

		const button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`ban;${user.id}`)
					.setLabel("Confirmar")
					.setStyle(ButtonStyle.Danger)
			)
		/**
		 * @type {InteractionResponse}
		 */
		let response = await interaction.reply({
			embeds: [banEmbed],
			components: [button]
		});

		const collector = response.createMessageComponentCollector({
			componentType: ComponentType.Button,
			maxUsers: 1,
			filter: (i) => {
				return i.user.id === interaction.user.id;
			}
		});

		collector.on('collect', (i) => {
			interaction.deleteReply().catch(() => {
				AppLogger.send("Erro ao excluir mensagem");
			});

			if (Model.getBannedUser(user.id) != null)
			{
				return i.reply({
					content: CommonMessages.bannedUser,
					ephemeral: true
				});
			}

			Model.banUser(user.id, reason);

			return i.reply({
				content: `:white_check_mark: | Usuário punido!\n\n**Usuário:** <@${user.id}>\n\n**Motivo:** ${reason}`,
				ephemeral: true
			});
		});
	}
}