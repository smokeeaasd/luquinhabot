const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Model } = require("../../database/model/dbModel.js");
const { TimeUtils } = require("../../utils/time.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("daily")
		.setDescription("coletar a recompensa diária"),
	async execute(interaction) {
		const userData = Model.getUserByID(interaction.user.id);

		let last_daily = userData.lastDaily;
		let cooldown = Date.now() - last_daily;

		if (cooldown >= 86400000)
		{
			let random_coins = Math.round((Math.random() * 6000), 0);

			const receivedDaily = new EmbedBuilder({
				title: "Você coletou o seu prêmio diário!",
				description: "Volte em 24 horas para receber uma recompensa novamente!",
				fields: [
					{
						name: ":coin: Recompensa",
						value: `**${random_coins}** Moedas`
					}
				]
			});

			receivedDaily.setColor(userData.activeColor.hex);

			Model.updateDaily(interaction.user.id);
			Model.addCoins(interaction.user.id, random_coins);

			await interaction.reply({
				embeds: [receivedDaily]
			});
		} else {
			const cooldownDaily = new EmbedBuilder({
				title: "Você não pode coletar sua recompensa diária!",
				description: "Você precisa aguardar 24 horas após uma coleta.",
				fields: [
					{
						name: ":alarm_clock: Tempo restante",
						value: `${TimeUtils.formatMS(86400000 - cooldown, true)}`
					}
				]
			});

			cooldownDaily.setColor(userData.activeColor.hex);

			await interaction.reply({
				embeds: [cooldownDaily],
				ephemeral: true
			});
		}
	}
}