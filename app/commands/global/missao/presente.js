const { Model } = require("../../../database/model/dbModel.js");

module.exports = {
	async run(interaction) {
		let presente = Math.random() <= 0.7;

		if (presente) {
			let giftmsg = await interaction.channel.send(`:gift: | <@${interaction.user.id}> encontrou uma **Caixa Misteriosa** ao finalizar uma missão!`);
			
			setTimeout(async () => {
				try {
					await giftmsg.delete();
				} catch (e) {
					console.log(`[${new Date().toUTCString()}] erro ao apagar mensagem enviada.`);
				};
			}, 5000);

			Model.addGiftToUser(interaction.user.id);
		}
	}
}