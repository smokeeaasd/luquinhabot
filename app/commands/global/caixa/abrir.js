const { EmbedBuilder } = require("discord.js");
const { Model } = require("../../../database/model/dbModel.js");

module.exports = {
	async run(interaction) {
		const userData = Model.getUserByID(interaction.user.id);

		const amount = interaction.options.getInteger("quantia");

		if (userData.gifts >= amount) {
			let prizes = {
				trash: {
					name: ":poop: Lixo... acho que não vale muita coisa!",
					qnt: 0
				},
				coins5k: {
					name: ":coin: **5000** Moedas",
					qnt: 0
				},
				coins70k: {
					name: ":moneybag: **70000** Moedas",
					qnt: 0
				}
			}

			for (let i = 0; i < amount; i++) {
				let randomNumber = Math.round(Math.random() * 100, 0);

				if (randomNumber <= 5) {
					prizes.trash.qnt = prizes.trash.qnt + 1;
				}
				else if (randomNumber > 5 && randomNumber < 98) {
					prizes.coins5k.qnt = prizes.coins5k.qnt + 1;
				}
				else {
					prizes.coins70k.qnt = prizes.coins70k.qnt + 1;
				}
			}

			Object.keys(prizes).forEach(key => {
				if (prizes[key].qnt == 0) {
					delete prizes[key];
				}
			});

			let rewardList = "";

			Object.keys(prizes).forEach(key => {
				rewardList += `${prizes[key].name} **${prizes[key].qnt}x**\n`
			});

			let totalCoins = ((prizes.coins5k?.qnt * 5000) + (prizes.coins70k?.qnt ?? 0) * 70000) + ((prizes.trash?.qnt ?? 0) * 250);
			
			Model.addCoins(interaction.user.id, totalCoins);
			Model.removeGiftFromUser(interaction.user.id, amount);

			let title = amount == 1 ? "Caixa Misteriosa!" : "Caixas Misteriosas!";
			let reward_msg = amount == 1 ? "Recompensa:" : "Recompensas:"

			const rewardEmbed = new EmbedBuilder({
				title: `Você abriu ${amount == 1 ? "uma" : amount} ${title}`,
				description: "Complete missões para receber mais caixas.",
				fields: [
					{
						name: `:package: ${reward_msg}`,
						value: rewardList
					}
				]
			});

			rewardEmbed.setColor(userData.activeColor.hex);

			await interaction.editReply({
				embeds: [rewardEmbed]
			});
		} else {
			const tooMuchGifts = new EmbedBuilder({
				title: "Você não pode abrir caixas misteriosas",
				description: "Você não tem caixas misteriosas o suficiente, participe de missões para obter mais.",
				fields: [
					{
						name: ":package: Como ganhar Caixas Misteriosas?",
						value: "Complete missões para receber caixas!"
					}
				]
			});

			tooMuchGifts.setColor(userData.activeColor.hex);

			await interaction.editReply({
				embeds: [tooMuchGifts]
			});
		}
	}
}