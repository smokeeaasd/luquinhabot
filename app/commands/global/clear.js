const { SlashCommandBuilder, PermissionFlagsBits, Collection, Message } = require("discord.js");
const { AppLogger } = require("../../utils/logger.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("apagar")
		.setNameLocalizations({
			"en-US": "clear"
		})

		.setDescription("Apagar as mensagens de um chat")
		.setDescriptionLocalizations({
			"en-US": "Clear chat messages"
		})

		.addIntegerOption(n => {
			n.setName("quantidade");
			n.setDescription("Quantidade de mensagens para apagar");
			n.setMinValue(3);
			n.setMaxValue(99);
			n.setRequired(true);
			return n;
		}),
	
	/** @param {import("discord.js").Interaction} interaction */
	async execute(interaction) {
		if (!interaction.memberPermissions.has("ManageMessages"))
		{
			return await interaction.reply({
				content: ":x: | Você precisa da permissão `GERENCIAR MENSAGENS` para utilizar este comando.",
				ephemeral: true
			});
		}
		const amount = interaction.options.getInteger("quantidade");

		let messages = await interaction.channel.messages.fetch({
			limit: amount
		});
		
		let count = messages.size;
		await interaction.channel.bulkDelete(messages);

		await interaction.reply(`:white_check_mark: | <@${interaction.user.id}> excluí **${count}** ${count != 1 ? "mensagens" : "mensagem"} do chat!`);

		setTimeout(async () => {
			interaction.deleteReply().catch(() => {
				AppLogger.send("Ocorreu um erro ao apagar a mensagem")
			});
		}, 2000);
	}
}