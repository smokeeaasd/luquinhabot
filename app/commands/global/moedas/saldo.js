const { Model } = require("../../../database/model/dbModel");

module.exports = {
	async run(interaction) {
		const user = interaction.options.getUser("usuario") ?? interaction.user;

		Model.tryAddUser(user.id);

		const userData = Model.getUserByID(user.id);

		if (user.id == interaction.user.id) {
			await interaction.reply(`:coin: | <@${user.id}> você atualmente tem **${userData.coins}** moedas! Participe de missões para aumentar o seu saldo.`);
		} else {
			await interaction.reply(`:coin: | ||<@${interaction.user.id}>|| <@${user.id}> tem ${userData.coins} moedas! Participe de missões para aumentar o seu saldo.`);
		}
	}
}