const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Model } = require("../../database/model/dbModel.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("perfil")
		.setDescription("Verificar o perfil de um usuário.")
		.addUserOption(user => {
			user.setName("usuario");
			user.setDescription("Escolha um usuário");
			return user;
		}),
	
	/** @param {import("discord.js").Interaction} interaction */
	async execute(interaction) {
		// A interação pode levar mais tempo para resposta.
		await interaction.deferReply();

		const user = interaction.options.getUser("usuario") ?? interaction.user;

		Model.tryAddUser(user.id);

		const userData = Model.getUserByID(interaction.user.id);

		const profileEmbed = new EmbedBuilder({
			title: `Informações de ${user.tag}`,
			description: `:bookmark_tabs: **Biografia:** \`${userData.bio}\`.`,
			fields: [
				{
					name: ":coin: Saldo",
					value: `**${userData.coins}** Moedas.`
				},
				{
					name: ":crossed_swords: Missões",
					value: `**${userData.missionsCount}** missões concluídas.`
				},
				{
					name: `:shield: Classe: ${userData.playerClass.name}`,
					value: userData.playerClass.description
				}
			],
			thumbnail: {
				url: user.avatarURL()
			},
			footer: {
				text: `ID do Usuário: ${userData.id}`
			}
		});
		profileEmbed.setColor(userData.activeColor.hex);

		await interaction.editReply({
			embeds: [profileEmbed]
		});
	}
}