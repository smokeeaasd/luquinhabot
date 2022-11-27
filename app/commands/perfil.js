const { SlashCommandBuilder, User, EmbedBuilder, Colors } = require("discord.js");
const { Model } = require("../database/dbModel.js");

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
		/** @type {User} */
		const user = interaction.options.getUser("usuario") ?? interaction.user;

		Model.tryAddUser(user.id);		
		const userDB = Model.getUserAndClass(user.id);

		const userInfo = {
			tag: user.tag.toString(),
			id: user.id.toString(),
			avatar: user.avatarURL(),
			coins: userDB.coins.toString(),
			missions: userDB.missions_count.toString(),
		}

		const userEmbed = new EmbedBuilder({
			color: Colors.DarkPurple,
			description: `Biografia: \`${userDB.bio ?? "Vazio."}\``,
			author: {
				name: userInfo.tag,
				iconURL: userInfo.avatar,
			},
			title: `Perfil de: ${userInfo.tag}`,
			fields: [
				{
					name: "Moedas:",
					value: `**${userInfo.coins}** moedas.`
				},
				{
					name: "Missões:",
					value: `Este usuário já concluiu **${userInfo.missions}** missões.`
				},
				{
					name: `Classe: ${userDB.class_name}`,
					value: `"${userDB.class_description}"`
				}
			],
			footer: {
				text: `ID do usuário: ${userInfo.id}`
			}
		});

		await interaction.reply({
			embeds: [userEmbed]
		});
	}
}