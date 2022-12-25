const { SlashCommandBuilder, Message, PermissionFlagsBits } = require("discord.js");
const { Model } = require("../../database/model/dbModel.js");

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

		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addIntegerOption(n => {
			n.setName("quantidade");
			n.setDescription("Quantidade de mensagens para apagar");
			n.setMinValue(1);
			n.setMaxValue(100);
			n.setRequired(true);
			return n;
		}),
	
	/** @param {import("discord.js").Interaction} interaction */
	async execute(interaction) {
		const amount = interaction.options.getInteger("quantidade");

		let messages = await interaction.channel.messages.fetch({
			limit: amount
		});
		
		let count = messages.size;
		messages.map(async (msg) => {
			await msg.delete().catch(() => {});
		});

		await interaction.reply(`:white_check_mark: | <@${interaction.user.id}> excluí **${count}** ${count != 1 ? "mensagens" : "mensagem"} do chat!`);
	}
}