const { Colors, EmbedBuilder } = require('discord.js');
const { Model } = require('../../../database/model/dbModel.js');
const { TimeUtils } = require("../../../utils/time.js");
module.exports = {
	async run(interaction) {
		const userData = Model.getUserByID(interaction.user.id);

		if (userData.currentMission != null) {
			const mission = userData.currentMission;
			let remaining = mission.endTimestamp - Date.now() + 1000 // cooldown em ms + 1seg;

			const alreadyAtMissionEmbed = new EmbedBuilder({
				title: "Você já está em uma missão!",
				description: (remaining > 0) ? "Espere a missão anterior terminar!" : "Colete as recompensas da missão anterior para iniciar uma nova missão.",
				footer: {
					text: (remaining > 0) ? `Termina em ${TimeUtils.formatMS(remaining)}.` : "Utilize (/missao coletar) para coletar as recompensas da missão"
				}
			});
			alreadyAtMissionEmbed.setColor(userData.activeColor.hex);

			await interaction.reply({
				embeds: [alreadyAtMissionEmbed]
			});

			return;
		}

		let randomMission = Model.getRandomMission();

		const startMissionEmbed = new EmbedBuilder({
			title: "Você entrou em uma missão!",
			thumbnail: {
				url: interaction.user.avatarURL(),
				height: 512,
				width: 512
			},
			description: `:hourglass: Duração: **${randomMission.duration} minutos**`,
			fields: [
				{
					name: ":crossed_swords: Missão",
					value: `${await randomMission.name}`,
					inline: false
				},
				{
					name: ":page_with_curl: Descrição",
					value: `${await randomMission.description}`
				},
				{
					name: `:shield: Classe: ${userData.playerClass.name}`,
					value: `${userData.playerClass.description}`
				}
			],
			footer: {
				text: "Utilize (/missao coletar) para coletar recompensas da missão"
			}
		});
		startMissionEmbed.setColor(userData.activeColor.hex);

		await interaction.reply({
			embeds: [startMissionEmbed]
		});

		// add usuario em User_Missions
		Model.addMissionToUser(interaction.user.id, randomMission.id, (Date.now() + (randomMission.duration * 1000 * 60)));
	}
}