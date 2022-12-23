const { EmbedBuilder } = require("discord.js");
const { Model } = require("../../../database/model/dbModel.js");
const { TimeUtils } = require("../../../utils/time.js");
const presente = require("./presente.js");

module.exports = {
	async run(interaction) {
		const userData = Model.getUserByID(interaction.user.id);
		const mission = userData.currentMission;

		// se o usuário não estiver em nenhuma missão
		if (mission == null) {
			const nullMissionEmbed = new EmbedBuilder({
				title: "Você não está em uma missão",
				description: "Utilize (/missao iniciar) para começar uma missão."
			});
			nullMissionEmbed.setColor(userData.activeColor.hex);

			await interaction.reply({
				embeds: [nullMissionEmbed]
			});

			return;
		} else {
			// se a missão já acabou
			if (mission.ended) {
				let reward = Math.ceil(((mission.duration * 200) * (1 + Math.random())) * mission.duration);

				const missionRewardEmbed = new EmbedBuilder({
					title: "Missão concluída",
					thumbnail: {
						url: interaction.user.avatarURL(),
						width: 512,
						height: 512
					},
					description: "Parabéns, você completou a missão!",
					fields: [
						{
							name: ":crossed_swords: Missão",
							value: `${mission.name}`
						},
						{
							name: ":coin: Recompensa",
							value: `**${reward}$** com um Multiplicador **${userData.playerClass.multiplier}x**`
						},
					],
					footer: {
						text: `Você já completou ${userData.missionsCount + 1} missões.`
					}
				});
				missionRewardEmbed.setColor(userData.activeColor.hex);

				Model.addCoins(interaction.user.id, reward);
				Model.completeMission(interaction.user.id);
				await interaction.reply({
					embeds: [missionRewardEmbed],
				});

				await presente.run(interaction);

				const checkClass = require("./checkClass.js");

				await checkClass.run(interaction);
			} else {  // Se a missão ainda não acabou
				let remaining = mission.endTimestamp - Date.now() + 1000 // cooldown em ms + 1seg;

				const inProgressEmbed = new EmbedBuilder({
					title: "Você ainda não terminou a missão!",
					description: "Aguarde o fim da missão para receber as recompensas.",
					footer: {
						text: `Termina em ${TimeUtils.formatMS(remaining)}.`
					}
				});
				inProgressEmbed.setColor(userData.activeColor.hex);

				await interaction.reply({
					embeds: [inProgressEmbed],
				});

				return;
			}
		}
	}
}