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
		await interaction.deferReply();
		/** @type {User} */
		const user = interaction.options.getUser("usuario") ?? interaction.user;

		Model.tryAddUser(user.id);		

		const userDB = Model.getUserAndClass(user.id);

		const userInfo = {
			username: user.username,
			tag: user.tag.toString(),
			id: user.id.toString(),
			bio: userDB.bio.toString(),
			avatar: user.avatarURL(),
			coins: userDB.coins.toString(),
			missions: userDB.missions_count.toString(),
			wallpaper: userDB.active_wallpaper,
			class: {
				name: userDB.class_name,
				description: userDB.class_description
			}
		}

		const sendProfile = require('./profile/sendProfile.js');

		await sendProfile.execute(interaction, userInfo, userDB);
	}
}