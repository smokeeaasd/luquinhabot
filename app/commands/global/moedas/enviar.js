const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");

const { Model } = require("../../../database/model/dbModel");

const { UserValidator } = require("../../commandUtils/UserValidator");
const { CommonMessages } = require("../../commandUtils/CommonMessages");

module.exports = {
	async run(interaction) {
		const user = interaction.options.getUser("usuario");

		if (UserValidator.isRegistered(user.id))
		{
			return await interaction.reply({
				content: CommonMessages.notRegisteredUser,
				ephemeral: true
			});
		}
		
		const userData = Model.getUserByID(interaction.user.id);

		// enviar para si mesmo
		if (user.id == interaction.user.id) {
			const payYourself = new EmbedBuilder({
				title: ":coin: Erro ao realizar transação",
				description: "Qual é o sentido de enviar moedas para você mesmo(a)?"
			});

			payYourself.setColor(userData.activeColor.hex);

			await interaction.reply({
				embeds: [payYourself]
			});
		} else {
			const amount = interaction.options.getNumber("quantia");
			if (amount > userData.coins) {
				const insufficientMoney = new EmbedBuilder({
					title: ":coin: Erro ao realizar transação",
					description: `Você não tem **${amount}** moedas para realizar essa transação, participe de missões para obter moedas.`
				});

				insufficientMoney.setColor(userData.activeColor.hex);

				return await interaction.reply({
					embeds: [insufficientMoney]
				});
			} else {
				Model.tryAddUser(user.id);

				const row = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId(`${interaction.user.id};${user.id};${amount}`)
							.setLabel("Aceitar")
							.setStyle(ButtonStyle.Primary)
					)

				const msg = await interaction.reply({
					content: `:coin: | Você irá enviar **${amount}** moedas para <@${user.id}>. Para a transação ser concluída, <@${user.id}> precisa aceitar o pagamento até <t:${Math.round(Date.now()/1000 + 600, 0)}:F>`,
					components: [row]
				});

				setTimeout(async () => {
					try {
						msg.delete();
					} catch (e) {
						console.log(`[${new Date().toUTCString}] erro ao excluir mensagem.`);
					}
				}, 600000);
			}
		}
	}
}