const SQLite = require("better-sqlite3");
const path = require("path");

const db = new SQLite(path.join(__dirname, 'luquinha.sqlite'));

const begin = db.prepare('BEGIN');
const commit = db.prepare('COMMIT');

class dbHelper {
	/**
	 * Rodar uma transação sqlite
	 * @param  {...any} args
	 */
	static runTransaction(...args) {
		args.forEach(argument => {
			begin.run();
			argument[0].run(argument[1]);
			commit.run();
		});
	}

	/**
	 * Adicionar servidor no banco de dados por id
	 * @param {String} id 
	 */
	static addServer(id) {
		this.runTransaction(
			[
				db.prepare("INSERT INTO Servers(discord_id) VALUES(@id)"),
				{ id: id }
			],
		)
	}

	/**
	 * Remover servidor do banco de dados por id
	 * @param {String} id 
	 */
	static deleteServer(id) {
		this.runTransaction(
			[
				db.prepare("DELETE FROM Servers WHERE discord_id = @id"),
				{ id: id }
			],
		)
	}

	/** Obter servidor por id
	 * @param {String} id
	 */
	static getServerByID(id) {
		return db.prepare("SELECT * FROM Servers WHERE discord_id = ?").get(id);
	}

	/** Atualizar a categoria de tickets */
	static updateTicketCategory(id, category_id)
	{
		this.runTransaction(
			[
				db.prepare("UPDATE Servers SET ticket_category = @category_id WHERE discord_id = @id"),
				{category_id: category_id, id: id}
			]
		)
	}

	/** Obter a lista de servidores */
	static getServersCount()
	{
		return db.prepare("SELECT Count(*) as count FROM Servers").get();
	}

	/** Adicionar usuário no banco de dados.
	 * @param {String} id
	 */
	static addUser(id)
	{
		this.runTransaction(
			[
				db.prepare("INSERT INTO Users(discord_id) VALUES(@id)"),
				{id: id}
			]
		);
	}

	/** Receber a lista de missões */
	static getMissions()
	{
		return db.prepare("SELECT Count(*) as count FROM Mission").get();
	}

	/** Obter uma missão aleatória */
	static getRandomMission()
	{
		let count = this.getMissions().count;

		let random = Number.parseInt((Math.random()*count).toFixed(0));

		return db.prepare("SELECT * from Mission WHERE id = ?").get(random);
	}

	/**
	 * Adicionar missão aleatória para usuário
	 * @param {String} id 
	 */
	static addMissionToUser(id)
	{
		let randomMission = this.getRandomMission();
		this.runTransaction(
			[
				db.prepare("INSERT INTO User_Mission(discord_id, mission_id, mission_finish) VALUES(@id, @mission_id, @mission_finish)"),
				{id: id, mission_id: randomMission.id, mission_finish: (Date.now() + randomMission.mission_finish * 1000 * 60)}
			]
		);
	}

	/**
	 * Retornar usuário por id
	 * @param {String} id
	 */
	static getUserById(id)
	{
		return db.prepare("SELECT * FROM Users WHERE discord_id = ?").run(id);
	}

	/**
	 * Retornar missões do usuário.
	 * @param {String} id 
	 */
	static getUserMissions(id)
	{
		return db.prepare("SELECT * FROM User_Mission WHERE discord_id = ?").get(id);
	}

	/**
	 * Aumentar número de missões em 1.
	 * @param {String} id 
	 */
	static increaseUserMissions(id)
	{
		this.runTransaction(
			[
				db.prepare("UPDATE USERS SET missions_count = missions_count + 1 WHERE discord_id = @id"),
				{id: id}
			]
		);
	}

	/**
	 * Verificar se o usuário completou alguma missão.
	 * @param {String} id 
	 */
	static getCompletedMissions(id)
	{
		return db.prepare("SELECT * FROM User_Mission WHERE discord_id = ? AND mission_finish < ?").run(id, Date.now());
	}

	/**
	 * Remove a missão atual de um usuário.
	 * @param {String} id 
	 */
	static removeMission(id)
	{
		this.runTransaction(
			[
				db.prepare("DELETE FROM User_Missions WHERE discord_id = @id"),
				{id: id}
			]
		);
	}
}

module.exports = {
	dbHelper
}