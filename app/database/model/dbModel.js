const { Lukinha } = require("../../classes/Lukinha.js");

const { dbHelper } = require("../helper/dbHelper.js");

class Model {
	static tryAddUser(user_id) {
		let user = dbHelper.getUserById(user_id);

		if (user == null) {
			dbHelper.addUser(user_id)
		}
	}

	static tryRemoveUser(user_id) {
		let user = dbHelper.getUserById(user_id);

		if (user != null) {
			dbHelper.deleteUser(user_id)
		}
	}

	static getUserByID(user_id) {
		let user = dbHelper.getUserAndClass(user_id);

		return new Lukinha.Player(
			user.disc_id,
			user.bio,
			user.coins,
			user.gifts,
			user.last_daily,
			user.missions_count,
			this.getUserMission(user_id),
			this.getColorById(user.active_color_id),
			this.getClassByID(user.class_id),
			this.getUserColors(user_id),
			this.getNotUserColors(user_id)
		)
	}

	static getColorById(color_id) {
		const color = dbHelper.getColorById(color_id);

		return new Lukinha.Color(color.id, color.color_name, color.emoji, color.color_hex);
	}

	static getColorByName(color_name) {
		const colorByName = dbHelper.getColorByName(color_name) ?? false;

		const color = new Lukinha.Color(
			colorByName.id,
			colorByName.color_name,
			colorByName.emoji,
			colorByName.color_hex
		);

		return (colorByName) ? color : null;
	}

	static getUserColors(user_id) {
		let userColors = dbHelper.getUserColors(user_id);
		let colorsList = [];

		for (const userColor of userColors) {
			colorsList.push(
				new Lukinha.Color(
					userColor.id,
					userColor.color_name,
					userColor.emoji,
					userColor.color_hex
				)
			);
		}

		return colorsList;
	}

	static getNotUserColors(user_id) {
		let userColors = dbHelper.getNotUserColors(user_id);
		let colorsList = [];

		for (const userColor of userColors) {
			colorsList.push(
				new Lukinha.Color(
					userColor.id,
					userColor.color_name,
					userColor.emoji,
					userColor.color_hex
				)
			)
		}
		return colorsList;
	}

	static changeUserColor(user_id, color_id) {
		dbHelper.changeUserColor(user_id, color_id);
	}

	static addColorToUser(user_id, color_id) {
		let colors = dbHelper.getUserColors(user_id);

		for (let color of colors) {
			if (color.id == color_id) {
				return;
			}
		}
		dbHelper.addColorToUser(user_id, color_id);
	}

	static getUserMission(user_id) {
		const userMission = dbHelper.getUserMission(user_id) ?? false;

		const mission = new Lukinha.Mission(
			userMission.mission_id,
			userMission.mission_name,
			userMission.mission_description,
			userMission.duration_mins,
			userMission.mission_finish
		);

		return (userMission) ? mission : null;
	}

	static getMissionByID(mission_id) {
		const mission = dbHelper.getMissionByID(mission_id) ?? false;

		return new Lukinha.Mission(
			mission.id,
			mission.mission_name,
			mission.mission_description,
			mission.duration_mins,
		);
	}

	static completeMission(user_id) {
		dbHelper.increaseUserMissions(user_id);
		dbHelper.removeMission(user_id);
	}

	static addMissionToUser(user_id, mission_id, mission_finish) {
		dbHelper.addMissionToUser(user_id, mission_id, mission_finish);
	}

	static getRandomMission() {
		const randomMission = dbHelper.getRandomMission();

		return new Lukinha.Mission(
			randomMission.id,
			randomMission.mission_name,
			randomMission.mission_description,
			randomMission.duration_mins
		);
	}

	static addCoins(user_id, coins) {
		dbHelper.increaseUserCoins(user_id, coins);
	}

	static updateBio(user_id, bio) {
		dbHelper.updateUserBio(user_id, bio);
	}

	static getUserAndClass(id) {
		return dbHelper.getUserAndClass(id);
	}

	static getClasses() {
		return dbHelper.getClasses();
	}

	static canClassUp(id) {
		let user = dbHelper.getUserAndClass(id);

		let classes = this.getClasses();

		return (user.class_id < classes.length);
	}

	static getClassByID(class_id) {
		const _class = dbHelper.getClassByID(class_id);

		return new Lukinha.Class(_class.id, _class.class_name, _class.class_description, _class.multiplier);
	}

	static setClass(user_id, class_id) {
		dbHelper.setClass(user_id, class_id);
	}

	static updateDaily(user_id) {
		dbHelper.updateDaily(user_id);
	}

	static addGiftToUser(user_id) {
		dbHelper.addGiftToUser(user_id);
	}

	static removeGiftFromUser(user_id, amount) {
		dbHelper.removeGiftFromUser(user_id, amount);
	}
}

module.exports = { Model }