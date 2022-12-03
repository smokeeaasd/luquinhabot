const { EmbedBuilder, Colors } = require("discord.js");
const { Model } = require("../../database/dbModel.js");
const { TimeUtils } = require("../../utils/time.js");

module.exports = {
	async run(interaction) {
		let active_color = await Model.getUserActiveColor(interaction.user.id);
		const mission = await Model.getUserMission(interaction.user.id);

		// se o usuário não estiver em nenhuma missão
		if (mission == null) {
			const nullMissionEmbed = new EmbedBuilder({
				title: "Você não está em uma missão",
				description: "Utilize (/missao iniciar) para começar uma missão."
			});
			nullMissionEmbed.setColor(active_color.color_hex);

			await interaction.reply({
				embeds: [nullMissionEmbed]
			});

			return;
		} else {
			// se a missão já acabou
			if (Date.now() > mission.mission_finish) {
				let reward = Math.ceil(((mission.duration_mins * 200) * (1 + Math.random())) * mission.multiplier);

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
							name: "Missão",
							value: `${mission.mission_name}`
						},
						{
							name: "Recompensa",
							value: `**${reward}$** com um Multiplicador **${mission.multiplier}x**`
						},
					],
					footer: {
						text: `Você já completou ${mission.missions_count + 1} missões.`
					}
				});
				missionRewardEmbed.setColor(active_color.color_hex);

				await Model.addCoins(interaction.user.id, reward);
				await Model.completeMission(interaction.user.id);
				await interaction.reply({
					embeds: [missionRewardEmbed],
				});

				const checkClass = require("./checkClass.js");

				await checkClass.run(interaction);
			} else {  // Se a missão ainda não acabou
				let remaining = mission.mission_finish - Date.now() + 1000 // cooldown em ms + 1seg;

				const inProgressEmbed = new EmbedBuilder({
					title: "Você ainda não terminou a missão!",
					description: "Aguarde o fim da missão para receber as recompensas.",
					footer: {
						text: `Termina em ${TimeUtils.formatMS(remaining)}.`
					}
				});
				inProgressEmbed.setColor(active_color.color_hex);

				await interaction.reply({
					embeds: [inProgressEmbed],
				});

				return;
			}
		}
	}
}