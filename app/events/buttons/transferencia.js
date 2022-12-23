const { Model } = require("../../database/model/dbModel");

module.exports = {
	constantId: false,
	async execute(interaction) {
		const args = interaction.customId.split(';');
		const userFrom = args[0];
		const userTo = args[1];
		const amount = args[2];

		if (targetId != interaction.user.id) {
			await interaction.reply(`:coin: | <@${interaction.user.id}> você não pode aceitar uma transação que não é sua!`);
		} else {
			const userFromData = Model.getUserByID(userFrom);
			const userToData = Model.getUserByID(userTo);

			Model.addCoins(userFromData.id, -amount);
			Model.addCoins(userToData.id, amount);

			const msg = interaction.message;
			await msg.delete();

			const completePayment = await interaction.channel.send(`:coin: | Transação concluída! <@${userFromData.id}> enviou **${amount}** Moedas para <@${userToData.id}>`);

			setTimeout(async () => {
				try {
					await completePayment.delete();
				} catch (e) {
					console.log(`[${new Date().toUTCString()}] erro ao excluir mensagem.`)
				}
			}, 7000);
		}
	}
}