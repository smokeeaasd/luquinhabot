const { Colors, EmbedBuilder } = require('discord.js');
const { Model } = require('../../database/dbModel.js');
const { TimeUtils } = require("../../utils/time.js");
module.exports = {
	async run(interaction) {
		if (Model.isUserInMission(interaction.user.id)) {
			const mission = Model.getUserMission(interaction.user.id);
			let remaining = mission.mission_finish - Date.now() + 1000 // cooldown em ms + 1seg;

			const alreadyAtMissionEmbed = new EmbedBuilder({
				color: Colors.DarkRed,
				title: "Você já está em uma missão!",
				description: (remaining > 0) ? "Espere a missão anterior terminar!" : "Colete as recompensas da missão anterior para iniciar uma nova missão.",
				footer: {
					text: (remaining > 0) ? `Termina em ${TimeUtils.formatMS(remaining)}.` : "Utilize (/missao coletar) para coletar as recompensas da missão"
				}
			});

			await interaction.reply({
				embeds: [alreadyAtMissionEmbed]
			});

			return;
		}

		let randomMission = Model.getRandomMission();
		let user = Model.getUserAndClass(interaction.user.id);

		const startMissionEmbed = new EmbedBuilder({
			color: Colors.DarkPurple,
			title: "Você entrou em uma missão!",
			thumbnail: {
				url: interaction.user.avatarURL(),
				height: 512,
				width: 512
			},
			description: `Duração: **${randomMission.duration_mins} minutos**`,
			fields: [
				{
					name: "Nome da missão",
					value: `${randomMission.mission_name}`,
					inline: false
				},
				{
					name: "Descrição",
					value: `*${randomMission.mission_description}*`
				},
				{
					name: `Classe: ${user.class_name}`,
					value: `*${user.class_description}*`
				}
			],
			footer: {
				text: "Utilize (/missao coletar) para coletar recompensas da missão"
			}
		});

		await interaction.reply({
			embeds: [startMissionEmbed]
		});

		// add usuario em User_Missions
		Model.addMissionToUser(interaction.user.id, randomMission.id, (Date.now() + (randomMission.duration_mins * 1000 * 60)));
	}
}