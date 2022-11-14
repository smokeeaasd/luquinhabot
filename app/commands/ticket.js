const { SlashCommandBuilder, ChannelType, PermissionFlagsBits, EmbedBuilder, Colors, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { dbHelper } = require("../database/model");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ticket")
		.setDescription("criar um ticket")
		.addSubcommand(subcmd => {
			subcmd.setName("setcategory");
			subcmd.setDescription("categoria em que o ticket será criado");
			subcmd.addChannelOption(channel => {
				channel.setName("categoria");
				channel.setDescription("categoria");
				channel.addChannelTypes(ChannelType.GuildCategory);
				channel.setRequired(true);
				return channel;
			});
			return subcmd;
		})
		.addSubcommand(subcmd => {
			subcmd.setName("create");
			subcmd.setDescription("criar um ticket");
			subcmd.addStringOption(description => {
				description.setName("description");
				description.setDescription("descrição do ticket");
				description.setMinLength(3);
				description.setMaxLength(100);
				description.setRequired(true);

				return description;
			})
			return subcmd;
		}),

	/** @param {import("discord.js").Interaction} interaction */
	async execute(interaction) {
		switch (interaction.options.getSubcommand()) {
			case "setcategory":
				const roles = interaction.member.permissions.has('MANAGE_CHANNELS');

				// if user has roles
				if (roles) {
					const category = interaction.options.getChannel("categoria");
					dbHelper.updateTicketCategory(interaction.guild.id, category.id);

					const UpdatedCategory = new EmbedBuilder({
						color: Colors.Yellow,
						title: "Categoria atualizada",
						description: `Os tickets serão enviados em: <#${category.id}>`
					});

					try {
						await interaction.reply({
							embeds: [UpdatedCategory],
							ephemeral: true
						});
					} catch (err) {
						console.log(err);
					}
				} else {
					const NotPermissionEmbed = new EmbedBuilder({
						color: Colors.DarkRed,
						title: "Erro ao alterar categoria",
						description: "Você não tem a opção de `Gerenciar Canais`."
					});

					try {
						await interaction.reply({ embeds: [NotPermissionEmbed], ephemeral: true });
					} catch (err) {
						console.log(err);
					}
				}
				break;

			case "create":
				const server = dbHelper.getServerByID(interaction.guild.id);
				const description = interaction.options.getString("description");

				// if channel exists
				if (server?.ticket_category != null) {
					const channel = await interaction.guild.channels.create({
						name: `ticket-${interaction.user.id}`,
						parent: server.ticket_category,
						permissionOverwrites: [
							{
								id: interaction.guild.roles.everyone,
								deny: "ViewChannel"
							},

							{
								id: interaction.user.id,
								deny: "ViewChannel"
							}
						]
					});

					const CreatedTicketEmbed = new EmbedBuilder({
						color: Colors.Green,
						title: "Ticket criado!",
						description: `Criado em: <#${channel.id}>`
					});

					const TicketEmbed = new EmbedBuilder({
						color: Colors.Purple,
						title: `Ticket de ${interaction.user.username}#${interaction.user.discriminator}.`,
						description: `**Descrição:** ${description}`
					});

					const TicketCloseButton = new ButtonBuilder({
						customId: "closeTicket",
						label: "Fechar Ticket",
						style: ButtonStyle.Danger
					});

					const TicketRow = new ActionRowBuilder()
						.addComponents(TicketCloseButton);

					try {
						await interaction.reply({
							embeds: [CreatedTicketEmbed],
							ephemeral: true,
						});

						await channel.send({
							embeds: [TicketEmbed],
							components: [TicketRow],
							body: `<@${interaction.user.id}>`,
						});
					} catch (err) {
						console.log(err);
					}
				} else {
					const UnknownCategoryEmbed = new EmbedBuilder({
						color: Colors.DarkRed,
						title: "Erro ao criar ticket",
						description: "A categoria de tickets não foi definida ou foi excluída."
					});

					try {
						await interaction.reply({
							embeds: [UnknownCategoryEmbed]
						});
					} catch (err) {
						console.log(err);
					}
				}
			break;
		}
	}
}