const { Events, PermissionsBitField } = require("discord.js");
const { Model } = require("../database/model/dbModel");
const { CommonMessages } = require("../commands/modules/CommonMessages.js");

const path = require("path");
const fs = require("fs");

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	isAsync: true,

	/**
	 * @param {import("discord.js").Interaction} interaction 
	 */
	async execute(interaction) {
		/**
		 * @type {Readonly<PermissionsBitField>}
		 */
		const botChannelPermissions = interaction.channel.permissionsFor(interaction.client.user.id);
		if (!botChannelPermissions.has("SendMessages")) {
			return await interaction.reply({
				content: ":x: | Para que os meus comandos funcionem, preciso da permissão de `Enviar Mensagens` nesse canal.",
				ephemeral: true
			});
		}
		if (!botChannelPermissions.has("EmbedLinks")) {
			return await interaction.reply({
				content: ":x: | Para que os meus comandos funcionem, preciso da permissão de `Embed Links` nesse canal.",
				ephemeral: true
			});
		}
		Model.tryAddUser(interaction.user.id);

		if (interaction.isButton()) {
			const bannedUser = Model.getBannedUser(interaction.user.id);

			if (bannedUser != null) {
				return await interaction.reply({
					content: CommonMessages.bannedInteractionAuthor.concat(`\n**Motivo da punição**: ${bannedUser.reason}`),
					ephemeral: true
				});
			}
		}

		if (interaction.isChatInputCommand()) {
			const bannedUser = Model.getBannedUser(interaction.user.id);

			if (bannedUser != null) {
				return await interaction.reply({
					content: CommonMessages.bannedInteractionAuthor.concat(`\n**Motivo da punição**: ${bannedUser.reason}`),
					ephemeral: true
				});
			}
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'Ocorreu um erro na execução do comando.', ephemeral: true });
			}
		}
	}
}