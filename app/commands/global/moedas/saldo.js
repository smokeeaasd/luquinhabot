const { Model } = require("../../../database/model/dbModel");

const { UserValidator } = require("../../modules/UserValidator.js");
const { CommonMessages } = require("../../modules/CommonMessages.js");

module.exports = {
	async run(interaction) {
		const user = interaction.options.getUser("usuario") ?? interaction.user;

		if (!UserValidator.isRegistered(user.id)) {
			return await interaction.reply({
				content: CommonMessages.notRegisteredUser,
				ephemeral: true
			});
		} else if (UserValidator.isBanned(user.id)) {
			return await interaction.reply({
				content: CommonMessages.bannedUser,
				ephemeral: true
			});
		}

		const userData = Model.getUserByID(user.id);

		if (user.id == interaction.user.id) {
			await interaction.reply(`:coin: | <@${user.id}> você atualmente tem **${userData.coins}** moedas! Participe de missões para aumentar o seu saldo.`);
		} else {
			await interaction.reply(`:coin: | ||<@${interaction.user.id}>|| <@${user.id}> tem **${userData.coins}** moedas! Participe de missões para aumentar o seu saldo.`);
		}
	}
}