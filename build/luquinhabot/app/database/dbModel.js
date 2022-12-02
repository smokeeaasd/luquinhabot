const { dbHelper } = require("./dbHelper.js");

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

	static getWallpapers() {
		return dbHelper.getWallpapers();
	}

	static getUserWallpaper(user_id) {
		return dbHelper.getUserWallpaper(user_id);
	}
	
	static setWallpaper(user_id, wallpaper_id) {
		dbHelper.updateWallpaper(user_id, wallpaper_id);
	}

	static addWallpaperToUser(user_id, wallpaper_id) {
		dbHelper.addWallpaperToUser(user_id, wallpaper_id);
	}
}

module.exports = { Model }