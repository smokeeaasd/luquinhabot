const { EmbedBuilder, Colors } = require("discord.js");
const { Model } = require("../../database/dbModel.js");
const { TimeUtils } = require("../../utils/time.js");

module.exports = {
	async run(interaction) {
		const mission = Model.getUserMission(interaction.user.id);

		// se o usuário não estiver em nenhuma missão
		if (mission == null) {
			const nullMissionEmbed = new EmbedBuilder({
				color: Colors.Red,
				title: "Você não está em uma missão",
				description: "Utilize (/missao iniciar) para começar uma missão."
			});

			await interaction.reply({
				embeds: [nullMissionEmbed]
			});

			return;
		} else {
			// se a missão já acabou
			if (Date.now() > mission.mission_finish) {
				let reward = Math.ceil(((mission.duration_mins * 200) * (1 + Math.random())) * mission.multiplier);

				const missionRewardEmbed = new EmbedBuilder({
					color: Colors.DarkPurple,
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

				Model.addCoins(interaction.user.id, reward);
				Model.completeMission(interaction.user.id);
				await interaction.reply({
					embeds: [missionRewardEmbed],
				});

				const checkClass = require("./checkClass.js");

				await checkClass.run(interaction);
			} else {  // Se a missão ainda não acabou
				let remaining = mission.mission_finish - Date.now() + 1000 // cooldown em ms + 1seg;

				const inProgressEmbed = new EmbedBuilder({
					color: Colors.DarkRed,
					title: "Você ainda não terminou a missão!",
					description: "Aguarde o fim da missão para receber as recompensas.",
					footer: {
						text: `Termina em ${TimeUtils.formatMS(remaining)}.`
					}
				});

				await interaction.reply({
					embeds: [inProgressEmbed],
				});

				return;
			}
		}
	}
}