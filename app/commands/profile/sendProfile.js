const Canvas = require("@napi-rs/canvas");
const path = require("node:path");

const { AttachmentBuilder } = require("discord.js");

module.exports = {
	async execute(interaction, userInfo) {
		const canvas = Canvas.createCanvas(1000, 1000);

		const ctx = canvas.getContext("2d");

		const background = await Canvas.loadImage(`app\\commands\\profile\\wallpaper\\${userInfo.wallpaper}`);

		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		// diminuindo o brilho do wallpaper
		ctx.beginPath();

		ctx.fillStyle = "#111111dd";
		ctx.fillRect(0, 0, canvas.width, 250);

		ctx.closePath();

		// Username
		ctx.beginPath();

		// Username
		ctx.beginPath();
		
		ctx.fillStyle = "#e9e9e9";
		ctx.font = "50px Helvetica";
		ctx.textAlign = "start";
		ctx.fillText(`${userInfo.username}`, 250, 65);

		ctx.closePath();

		// Classe
		ctx.beginPath();
		
		ctx.fillStyle = "#e9e9e9";
		ctx.font = "50px Helvetica";
		ctx.textAlign = "start";
		ctx.fillText(`${userInfo.class}`, 250, 140);

		// Missões
		ctx.beginPath();
		
		ctx.fillStyle = "#e9e9e9";
		ctx.font = "50px Helvetica";
		ctx.textAlign = "start";
		ctx.fillText(`${userInfo.missions} missões concluídas`, 250, 215);

		ctx.closePath();

		// Avatar
		const avatar = await Canvas.loadImage(userInfo.avatar);
		
		ctx.beginPath();

		ctx.arc(125, 125, 100, 0, Math.PI*2, true);

		ctx.closePath();

		ctx.clip();

		ctx.drawImage(avatar, 25, 25, 200, 200);
		

		const attachment = new AttachmentBuilder(await canvas.encode("png"), {name: 'perfil.png'});

		await interaction.editReply({
			files: [attachment]
		});
	}
}