const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Model } = require("../../database/model/dbModel.js");
const { UserValidator } = require("../commandUtils/UserValidator.js");
const { CommonMessages } = require("../commandUtils/commonMessages.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("perfil")
		.setNameLocalizations({
			"en-US": "profile"
		})

		.setDescription("Verificar o perfil de um usuário.")
		.setDescriptionLocalizations({
			"en-US": "View a user's profile"
		})
		
		.addUserOption(user => {
			user.setName("usuario");
			user.setNameLocalizations({
				"en-US": "user"
			});

			user.setDescription("Escolha um usuário");
			user.setDescriptionLocalizations({
				"en-US": "Choose an user"
			});

			return user;
		}),
	
	/** @param {import("discord.js").Interaction} interaction */
	async execute(interaction) {

		const user = interaction.options.getUser("usuario") ?? interaction.user;

		if (!UserValidator.isRegistered(user.id))
		{
			return await interaction.reply({
				content: CommonMessages.notRegisteredUser,
				ephemeral: true
			});
		}
		
		// A partir daqui, a interação leva mais tempo para ser respondida
		await interaction.deferReply();

		const userData = Model.getUserByID(user.id);

		const profileEmbed = new EmbedBuilder({
			title: `Informações de ${user.tag}`,
			description: `:bookmark_tabs: **Biografia:** \`${userData.bio ?? "vazio"}\``,
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
			embeds: [profileEmbed],
			ephemeral: false
		});
	}
}