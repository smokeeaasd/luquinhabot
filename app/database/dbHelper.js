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

	/** Adicionar usuário no banco de dados.
	 * @param {String} id
	 */
	static addUser(id) {
		this.runTransaction(
			[
				db.prepare("INSERT INTO Users(id) VALUES(@id)"),
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
				db.prepare("DELETE FROM Users WHERE id = @id"),
				{ id: id }
			]
		);
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
				db.prepare("UPDATE Users SET bio = @bio WHERE id = @id"),
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
		return db.prepare("SELECT m.*, um.*, u.*, c.* from User_Mission um JOIN Mission m on (um.mission_id = m.id) JOIN Users u on (u.id = um.id) JOIN Class c on (c.id = u.class_id) WHERE um.id = ?").get(id);
	}

	/**
	 * Aumentar número de missões em 1.
	 * @param {String} id 
	 */
	static increaseUserMissions(id) {
		this.runTransaction(
			[
				db.prepare("UPDATE USERS SET missions_count = missions_count + 1 WHERE id = @id"),
				{ id: id }
			]
		);
	}

	/**
	 * Verificar se o usuário completou alguma missão.
	 * @param {String} id 
	 */
	static getCompletedMissions(id) {
		return db.prepare("SELECT * FROM User_Mission WHERE id = ? AND mission_finish < ?").get(id, Date.now());
	}

	/**
	 * Remove a missão atual de um usuário.
	 * @param {String} id 
	 */
	static removeMission(id) {
		this.runTransaction(
			[
				db.prepare("DELETE FROM User_Mission WHERE id = @id"),
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
				db.prepare("UPDATE Users SET coins = coins + @coins WHERE id = @id"),
				{ coins: coins, id: id }
			]
		)
	}

	/**
	 * Obtém um usuário e a sua classe por id de usuário.
	 * @param {String} id 
	 */
	static getUserAndClass(id) {
		return db.prepare("SELECT u.*, c.* FROM Users u JOIN Class c on (c.id = u.class_id) WHERE u.id = ?").get(id);
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
		return db.prepare("SELECT * FROM Class WHERE id = ?").get(id);
	}

	/**
	 * Altera a classe de um usuário
	 * @param {String} id 
	 * @param {Number} class_id 
	 */
	static setClass(id, class_id) {
		this.runTransaction(
			[
				db.prepare("UPDATE Users SET class_id = @class_id WHERE id = @id"),
				{ class_id: class_id, id: id }
			]
		);
	}

	/**
	 * Retorna todos os papéis de parede
	 */
	static getWallpapers() {
		return db.prepare("SELECT * FROM Wallpapers").all();
	}

	/**
	 * Adiciona um wallpaper para um usuário
	 * @param {String} id 
	 * @param {Number} wallpaper_id 
	 */
	static addWallpaperToUser(id, wallpaper_id) {
		this.runTransaction(
			[
				db.prepare("INSERT INTO User_Wallpapers(user_id, wallpaper_id) VALUES(@id, @wallpaper_id)"),
				{ id: id, wallpaper_id: wallpaper_id }
			]
		);
	}

	/**
	 * Retorna todos os wallpapers do usuário
	 * @param {String} id 
	 */
	static getUserWallpapers(id) {
		return db.prepare("SELECT * FROM User_Wallpapers WHERE id_user = ?").all(id);
	}

	/**
	 * Alterar o papel de parede atual
	 * @param {String} id
	 */
	static updateWallpaper(id, wallpaper) {
		this.runTransaction(
			[
				db.prepare("UPDATE Users SET active_wallpaper = @wallpaper WHERE id = @id"),
				{id: id, wallpaper: wallpaper}
			]
		);
	}
}

module.exports = {
	dbHelper
}