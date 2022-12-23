const { EmbedBuilder } = require("discord.js");
const { Model } = require("../../../database/model/dbModel");

module.exports = {
	async run(interaction) {
		const userData = Model.getUserByID(interaction.user.id);

		let qnt_msg = userData.gifts <= 1 ? "Caixa Misteriosa" : "Caixas Misteriosas";

		const giftsEmbed = new EmbedBuilder({
			title: "Suas Caixas Misteriosas",
			description: `:package: ${userData.gifts == 0 ? "Nenhuma" : userData.gifts} ${qnt_msg}, participe de missões para ganhar mais!`
		});

		giftsEmbed.setColor(userData.activeColor.hex);

		await interaction.reply({
			embeds: [giftsEmbed]
		});
	}
}