const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");
const { Model } = require("../database/dbModel");

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
		let bio = interaction.options.getString("bio");
		
		Model.tryAddUser(interaction.user.id);
		Model.updateBio(interaction.user.id, bio);

		const changedBioEmbed = new EmbedBuilder({
			color: Colors.DarkPurple,
			title: "A sua bio foi alterada!",
			description: `\`${bio}\``
		});

		await interaction.reply({	
			embeds: [changedBioEmbed],
			ephemeral: true
		});
	}
}