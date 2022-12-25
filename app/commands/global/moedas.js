const { SlashCommandBuilder } = require("discord.js");
const { Model } = require("../../database/model/dbModel");
const saldo = require("./moedas/saldo");
const enviar = require("./moedas/enviar");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("moedas")
		.setNameLocalizations({
			"en-US": "coins"
		})

		.setDescription("Gerenciar as suas moedas")
		.setDescriptionLocalizations({
			"en-US": "Manage your coins"
		})
		.addSubcommand(saldo => {
			saldo.setName("saldo");
			saldo.setNameLocalizations({
				"en-US": "bal"
			});

			saldo.setDescription("Ver o saldo de um usuário")
			saldo.setDescriptionLocalizations({
				"en-US": "View a user's balance"
			});

			saldo.addUserOption(user => {
				user.setName("usuario");
				user.setNameLocalizations({
					"en-US": "user"
				});

				user.setDescription("Escolha um usuário");
				user.setDescriptionLocalizations({
					"en-US": "Choose a user"
				})

				return user;
			})

			return saldo;
		})
		.addSubcommand(enviar => {
			enviar.setName("enviar");
			enviar.setDescription("Enviar saldo para um usuário");
			enviar.addUserOption(user => {
				user.setName("usuario");
				user.setDescription("Escolha um usuário");
				user.setRequired(true);

				return user;
			});
			enviar.addNumberOption(number => {
				number.setName("quantia");
				number.setDescription("Quantia de moedas para enviar.");
				number.setRequired(true);
				number.setMinValue(10);

				return number;
			});

			return enviar;
		}),
	async execute(interaction) {
		const subCommand = interaction.options.getSubcommand();

		switch (subCommand)
		{
			case "saldo":
				await saldo.run(interaction);
			break;

			case "enviar":
				await enviar.run(interaction);
			break;
		}
	}
}