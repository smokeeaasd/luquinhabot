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

	static getUserById(user_id) {
		return dbHelper.getUserById(user_id);
	}

	static getColorById(color_id) {
		return dbHelper.getColorById(color_id);
	}

	static getColorByName(color_name)
	{
		return dbHelper.getColorByName(color_name);
	}

	static getUserColors(user_id) {
		return dbHelper.getUserColors(user_id);
	}

	static getNotUserColors(user_id) {
		return dbHelper.getNotUserColors(user_id);
	}

	static getUserActiveColor(user_id) {
		return dbHelper.getActiveUserColor(user_id);
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

	static isUserInMission(user_id) {
		let mission = dbHelper.getUserMission(user_id);

		return (mission != null);
	}

	static getUserMission(user_id) {
		return dbHelper.getUserMission(user_id);
	}

	static completeMission(user_id) {
		dbHelper.increaseUserMissions(user_id);
		dbHelper.removeMission(user_id);
	}

	static addMissionToUser(user_id, mission_id, mission_finish) {
		dbHelper.addMissionToUser(user_id, mission_id, mission_finish);
	}

	static getRandomMission() {
		return dbHelper.getRandomMission();
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
		dbHelper.getClassByID(class_id);
	}

	static setClass(user_id, class_id) {
		dbHelper.setClass(user_id, class_id);
	}
}

module.exports = { Model }