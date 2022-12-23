const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Model } = require("../../database/model/dbModel.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("sobremim")
		.setDescription("Alterar a sua bio.")
		.addStringOption(bio => {
			bio.setName("bio");
			bio.setDescription("Sua bio.")
			bio.setMinLength(3);
			bio.setMaxLength(32);
			bio.setRequired(true);
			return bio;
		}),
	async execute(interaction) {
		const userData = Model.getUserByID(interaction.user.id);
		
		let bio = interaction.options.getString("bio");
		
		Model.updateBio(interaction.user.id, bio);

		const changedBioEmbed = new EmbedBuilder({
			title: "A sua bio foi alterada!",
			description: `\`${bio}\``
		});
		changedBioEmbed.setColor(userData.activeColor.hex);

		await interaction.reply({	
			embeds: [changedBioEmbed],
			ephemeral: true
		});
	}
}