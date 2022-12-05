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
		let active_color = Model.getUserActiveColor(interaction.user.id);
		
		// A interação pode levar mais tempo para resposta.
		await interaction.deferReply();

		const user = interaction.options.getUser("usuario") ?? interaction.user;

		Model.tryAddUser(user.id);

		const userDB = Model.getUserAndClass(user.id);

		const userInfo = {
			username: user.username,
			tag: user.tag.toString(),
			id: user.id.toString(),
			bio: userDB.bio,
			avatar: user.avatarURL(),
			coins: userDB.coins.toString(),
			missions: userDB.missions_count.toString(),
			color: active_color.color_hex,
			class: {
				name: userDB.class_name,
				description: userDB.class_description
			}
		}

		const profileEmbed = new EmbedBuilder({
			title: `Informações de ${userInfo.tag}`,
			description: `**Biografia:** \`${userInfo.bio}\`.`,
			fields: [
				{
					name: "Moedas",
					value: `:coin: ${userInfo.coins} Moedas.`
				},
				{
					name: "Missões",
					value: `\`${userInfo.tag}\` já concluiu ${userInfo.missions} missões.`
				},
				{
					name: `Classe: ${userInfo.class.name}`,
					value: userInfo.class.description
				}
			],
			thumbnail: {
				url: userInfo.avatar
			},
			footer: {
				text: `ID do Usuário: ${userInfo.id}`
			}
		});
		profileEmbed.setColor(userInfo.color);

		await interaction.editReply({
			embeds: [profileEmbed]
		});
	}
}