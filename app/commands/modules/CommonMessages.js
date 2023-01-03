/**
 * Classe utilizada para auxiliar no envio de mensagens que são usadas em vários comandos
 */
class CommonMessages
{
	/** Quando um usuário não está registrado */
	static notRegisteredUser = "❌ | Conta não foi encontrada no nosso banco de dados. :sob: Talvez algum dia essa pessoa se interesse em lutar.";

	/** Quando um usuário está banido. */
	static bannedUser = "❌ | A conta mencionada foi banida e não poderá interagir comigo. Se você não quer receber alguma punição, se comporte bem. :smile:";

	/** Quando 'autor' do comando está banido. */
	static bannedInteractionAuthor = ":rofl: | Parece que você recebeu alguma **punição** e não tem forças nem para executar um comando, que vergonha!";

	/** Quando o 'author' do comando não é o dono */
	static onlyBotAdmin = "❌ | Você precisa ser **simplesmente o luquinha** para banir um usuário do jogo, mas quem sabe, um dia, você consegue esse cargo!";
}

module.exports = {
	CommonMessages
}