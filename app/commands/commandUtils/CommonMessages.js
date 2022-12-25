/**
 * Classe utilizada para auxiliar no envio de mensagens que são usadas em vários comandos
 */
class CommonMessages
{
	/** Quando um usuário não está registrado */
	static notRegisteredUser = `❌ | Conta não foi encontrada no nosso banco de dados. :sob: Talvez algum dia essa pessoa se interesse em lutar.`;

	/** Quando um usuário está banido. */
	static bannedUser = `❌ | A conta mencionada foi banida e não poderá interagir comigo. Se você não quer receber alguma punição, se comporte bem. :smile:`;

	static onlyBotAdmin = `❌ | Você precisa ser **Administrador do Luquinha** para banir um usuário do jogo, mas quem sabe, um dia, você consegue esse cargo!`;
}

module.exports = {
	CommonMessages
}