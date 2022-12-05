const SQLite = require("better-sqlite3");
const path = require("path");

const db = new SQLite(path.join(__dirname, '../luquinha.sqlite'));

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

	static addUser(id) {
		this.runTransaction(
			[
				db.prepare(
					`INSERT INTO Users(id)
					VALUES(@id)`),
				{ id: id }
			],
			[
				db.prepare(
					`INSERT INTO User_Colors(id_user, id_color)
					VALUES(@id, 1)`),
				{ id: id }
			]
		);
	}

	/**
	 * Excluir usuário do banco por id
	 * @param {String} id 
	 */
	static deleteUser(id) {
		this.runTransaction(
			[
				db.prepare("DELETE FROM User_Mission WHERE id = @id"),
				{ id: id }
			],
			[
				db.prepare("DELETE FROM User_Colors WHERE id_user = @id"),
				{ id: id }
			]
			[
			db.prepare("DELETE FROM Users WHERE id = @id"),
			{ id: id }
			]
		);
	}

	static getColorById(color_id) {
		return db.prepare("SELECT * FROM Colors WHERE id = ?").get(color_id);
	}

	static getUserColors(id) {
		return db.prepare(
			`SELECT c.* FROM Colors c
			JOIN User_Colors uc ON (uc.id_color = c.id)
			WHERE uc.id_user = ?`).all(id);
	}

	static getNotUserColors(id) {
		return db.prepare(
			`SELECT c.* FROM Colors c
			WHERE c.id NOT IN (
				SELECT uc.id_color FROM User_Colors uc
				WHERE uc.id_user = ?
			)`).all(id);
	}

	static getActiveUserColor(id) {
		return db.prepare(
			`SELECT c.* FROM Colors c
			JOIN Users u on (u.active_color_id = c.id)
			WHERE u.id = ?`).get(id)
	}

	static addColorToUser(id, color_id) {
		this.runTransaction(
			[
				db.prepare(
					`INSERT INTO User_Colors(id_user, id_color)
					VALUES (@id, @color_id)`),
				{ id: id, color_id: color_id }
			],
		)
	}

	static changeUserColor(id, color_id) {
		this.runTransaction(
			[
				db.prepare(
					`UPDATE Users
					SET active_color_id = @color_id
					WHERE id = @id`
				),
				{ id: id, color_id: color_id }
			]
		)
	}

	/** Receber a lista de missões */
	static getMissions() {
		return db.prepare("SELECT Count(*) as count FROM Mission").get();
	}

	/** Obter uma missão aleatória */
	static getRandomMission() {
		let count = this.getMissions().count;

		let random = Math.ceil((Math.random() * count));

		return db.prepare("SELECT * from Mission WHERE id = ?").get(random);
	}

	/**
	 * Adicionar missão aleatória para usuário
	 * @param {String} id 
	 */
	static addMissionToUser(id, mission_id, mission_finish) {
		this.runTransaction(
			[
				db.prepare("INSERT INTO User_Mission(id, mission_id, mission_finish) VALUES(@id, @mission_id, @mission_finish)"),
				{ id: id, mission_id: mission_id, mission_finish: mission_finish }
			]
		);
	}

	static updateUserBio(id, bio) {
		this.runTransaction(
			[
				db.prepare(
					`UPDATE Users
					SET bio = @bio WHERE id = @id`),
				{ id: id, bio: bio }
			]
		);
	}

	/**
	 * Retornar usuário por id
	 * @param {String} id
	 */
	static getUserById(id) {
		return db.prepare("SELECT * FROM Users WHERE id = ?").get(id);
	}

	/**
	 * Retornar missões do usuário.
	 * @param {String} id 
	 */
	static getUserMission(id) {
		return db.prepare(
			`SELECT m.*, um.*, u.*, c.* from User_Mission um
			JOIN Mission m on (um.mission_id = m.id)
			JOIN Users u on (u.id = um.id)
			JOIN Class c on (c.id = u.class_id)
			WHERE um.id = ?`).get(id);
	}

	/**
	 * Aumentar número de missões em 1.
	 * @param {String} id 
	 */
	static increaseUserMissions(id) {
		this.runTransaction(
			[
				db.prepare(
					`UPDATE Users
					SET missions_count = missions_count + 1
					WHERE id = @id`),
				{ id: id }
			]
		);
	}

	/**
	 * Verificar se o usuário completou alguma missão.
	 * @param {String} id 
	 */
	static getCompletedMissions(id) {
		return db.prepare(
			`SELECT * FROM User_Mission
			WHERE id = ? AND mission_finish < ?`).get(id, Date.now());
	}

	/**
	 * Remove a missão atual de um usuário.
	 * @param {String} id 
	 */
	static removeMission(id) {
		this.runTransaction(
			[
				db.prepare(
					`DELETE FROM User_Mission
					WHERE id = @id`),
				{ id: id }
			]
		);
	}

	/**
	 * Adiciona moedas para um usuário
	 * @param {String} id 
	 * @param {Number} coins 
	 */
	static increaseUserCoins(id, coins) {
		this.runTransaction(
			[
				db.prepare(
					`UPDATE Users
					SET coins = coins + @coins
					WHERE id = @id`),
				{ coins: coins, id: id }
			]
		)
	}

	/**
	 * Obtém um usuário e a sua classe por id de usuário.
	 * @param {String} id 
	 */
	static getUserAndClass(id) {
		return db.prepare(
			`SELECT u.*, c.* FROM Users u 
			JOIN Class c on (c.id = u.class_id)
			WHERE u.id = ?`).get(id);
	}

	/**
	 * Retorna todas as classes
	 * @returns 
	 */
	static getClasses() {
		return db.prepare("SELECT * FROM Class").all();
	}

	/**
	 * Retorna uma classe por ID
	 * @param {String} id 
	 */
	static getClassByID(id) {
		return db.prepare(
			`SELECT * FROM Class
			WHERE id = ?`).get(id);
	}

	/**
	 * Altera a classe de um usuário
	 * @param {String} id 
	 * @param {Number} class_id 
	 */
	static setClass(id, class_id) {
		this.runTransaction(
			[
				db.prepare(
					`UPDATE Users
					SET class_id = @class_id
					WHERE id = @id`),
				{ class_id: class_id, id: id }
			]
		);
	}
}

module.exports = {
	dbHelper
}