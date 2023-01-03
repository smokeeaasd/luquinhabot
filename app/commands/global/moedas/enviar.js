const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, InteractionResponse, ComponentType } = require("discord.js");

const { Model } = require("../../../database/model/dbModel");
const { UserValidator } = require("../../modules/UserValidator");
const { CommonMessages } = require("../../modules/CommonMessages");
const { AppLogger } = require("../../../utils/logger.js");

module.exports = {
	async run(interaction) {
		const user = interaction.options.getUser("usuario");

		if (!UserValidator.isRegistered(user.id)) {
			return await interaction.reply({
				content: CommonMessages.notRegisteredUser,
				ephemeral: true
			});
		} else if (UserValidator.isBanned(user.id)) {
			return await interaction.reply({
				content: CommonMessages.bannedUser,
				ephemeral: true
			});
		}

		const userFromData = Model.getUserByID(interaction.user.id);
		const userToData = Model.getUserByID(user.id)

		// enviar para si mesmo
		if (userToData.id == interaction.user.id) {
			const payYourself = new EmbedBuilder({
				title: ":coin: Erro ao realizar transação",
				description: "Qual é o sentido de enviar moedas para você mesmo(a)?"
			});

			payYourself.setColor(userFromData.activeColor.hex);

			await interaction.reply({
				embeds: [payYourself]
			});
		} else {
			const amount = interaction.options.getInteger("quantia");
			if (amount > userFromData.coins) {
				const insufficientMoney = new EmbedBuilder({
					title: ":coin: Erro ao realizar transação",
					description: `Você não tem **${amount}** moedas para realizar essa transação, participe de missões para obter moedas.`
				});

				insufficientMoney.setColor(userFromData.activeColor.hex);

				return await interaction.reply({
					embeds: [insufficientMoney]
				});
			} else {
				const row = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId(`transferir;${interaction.user.id};${userToData.id};${amount}`)
							.setLabel("Aceitar")
							.setStyle(ButtonStyle.Primary)
					);

				/** @type {InteractionResponse} */
				let response = await interaction.reply({
					content: `:coin: | Você irá enviar **${amount}** moedas para <@${user.id}>. Para a transação ser concluída, <@${user.id}> precisa aceitar o pagamento até <t:${Math.round(Date.now() / 1000 + 600, 0)}:F>`,
					components: [row]
				});

				const collector = response.createMessageComponentCollector({
					componentType: ComponentType.Button,
					max: 1,
					filter: (i) => {
						return i.user.id === userToData.id;
					},
					time: 600000,
				});

				collector.on('collect', async (i) => {

					if (!UserValidator.hasCoins(interaction.user.id, amount))
					{
						return i.reply(`:money_with_wings: | Parece que <@${interaction.user.id}> fugiu com o dinheiro que iria te pagar, que calote!`);
					}
					Model.addCoins(userFromData.id, -amount);
					Model.addCoins(userToData.id, amount);

					return await i.reply(`:coin: | Transação concluída! <@${userFromData.id}> enviou **${amount}** Moedas para <@${userToData.id}>`);
				});

				collector.on('ignore', async (i) => {
					return await i.reply({
						content: `:coin: | <@${interaction.user.id}> você não pode aceitar uma transação que não é para você!`,
						ephemeral: true
					});
				});

				collector.on('end', async () => {
					if (collector.collected.size == 0) {
						interaction.deleteReply().catch(() => {
							AppLogger.send("Erro ao excluir mensagem");
						});
					}
				})
			}
		}
	}
}