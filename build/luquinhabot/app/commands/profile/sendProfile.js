const Canvas = require("@napi-rs/canvas");

const { AttachmentBuilder, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
	async execute(interaction, userInfo) {		
		const canvas = Canvas.createCanvas(1100, 350);

		const ctx = canvas.getContext("2d");

		function drawText(font, text, color, x, y) {
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.font = font;
			ctx.textAlign = "start";
			ctx.fillText(text, x, y);
			ctx.closePath();
		}

		// Fundo roxo.
		ctx.beginPath();

		ctx.fillStyle = "#8712e0";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.closePath();

		// diminuindo o brilho do wallpaper
		ctx.beginPath();

		ctx.fillStyle = "#111111dd";
		ctx.fillRect(50, 50, 1000, 250);

		ctx.closePath();

		// Nome de usuário
		drawText("50px Helvetica", userInfo.username, "#e9e9e9", 300, 115);
		// Classe de usuário
		drawText("50px Helvetica", userInfo.class.name, "#e9e9e9", 300, 190);
		// Total de missões
		drawText("50px Helvetica", `${userInfo.missions} missões concluídas`, "#e9e9e9", 300, 265);

		// Avatar
		const avatar = await Canvas.loadImage(userInfo.avatar);
		
		ctx.beginPath();

		ctx.arc(175, 175, 100, 0, Math.PI*2, true);

		ctx.closePath();

		ctx.clip();

		ctx.drawImage(avatar, 75, 75, 200, 200);
		

		const attachment = new AttachmentBuilder(await canvas.encode("png"), {name: 'perfil.png'});

		const UserProfile = new EmbedBuilder({
			color: Colors.DarkPurple,
			title: `Informações de ${userInfo.tag}`,
			description: `**Bio: ** \`${userInfo.bio}\` `,
			image: {
				url: `attachment://${attachment.name}`
			},
			footer: {
				text: `ID de Usuário: ${userInfo.id}`,
			},
			fields: [
				{
					name: "Saldo",
					value: `:coin: ${userInfo.coins} Moedas.`
				},
				{
					name: "Descrição da Classe",
					value: `*${userInfo.class.description}*`
				}
			]
		});

		await interaction.editReply({
			embeds: [UserProfile],
			files: [attachment]
		});
	}
}