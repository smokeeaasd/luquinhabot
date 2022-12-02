const { dbHelper } = require("./await dbHelper.js");

class Model {
	static async tryAddUser(user_id) {
		let user = await dbHelper.getUserById(user_id);

		if (user == null) {
			await dbHelper.addUser(user_id)
		}
	}

	static async tryRemoveUser(user_id) {
		let user = await dbHelper.getUserById(user_id);

		if (user != null) {
			await dbHelper.deleteUser(user_id)
		}
	}

	static async getUserById(user_id) {
		return await dbHelper.getUserById(user_id);
	}

	static async getColorById(color_id) {
		return await dbHelper.getColorById(color_id);
	}

	static async getUserColors(user_id) {
		return await dbHelper.getUserColors(user_id);
	}

	static async getNotUserColors(user_id) {
		return await dbHelper.getNotUserColors(user_id);
	}

	static async getUserActiveColor(user_id) {
		return await dbHelper.getActiveUserColor(user_id);
	}

	static async changeUserColor(user_id, color_id) {
		await dbHelper.changeUserColor(user_id, color_id);
	}
	
	static async addColorToUser(user_id, color_id) {
		let colors = await dbHelper.getUserColors(user_id);
		
		for (let color of colors) {
			if (color.id == color_id) {
				return;
			}
		}
		await dbHelper.addColorToUser(user_id, color_id);
	}

	static async isUserInMission(user_id) {
		let mission = await dbHelper.getUserMission(user_id);

		return (mission != null);
	}

	static async getUserMission(user_id) {
		return await dbHelper.getUserMission(user_id);
	}

	static async completeMission(user_id) {
		await dbHelper.increaseUserMissions(user_id);
		await dbHelper.removeMission(user_id);
	}

	static async addMissionToUser(user_id, mission_id, mission_finish) {
		await dbHelper.addMissionToUser(user_id, mission_id, mission_finish);
	}

	static async getRandomMission() {
		return await dbHelper.getRandomMission();
	}

	static async addCoins(user_id, coins) {
		await dbHelper.increaseUserCoins(user_id, coins);
	}

	static async updateBio(user_id, bio) {
		await dbHelper.updateUserBio(user_id, bio);
	}

	static async getUserAndClass(id) {
		return await dbHelper.getUserAndClass(id);
	}

	static async getClasses() {
		return await dbHelper.getClasses();
	}

	static async canClassUp(id) {
		let user = await dbHelper.getUserAndClass(id);

		let classes = this.getClasses();

		return (user.class_id < classes.length);
	}

	static async getClassByID(class_id) {
		await dbHelper.getClassByID(class_id);
	}

	static async setClass(user_id, class_id) {
		await dbHelper.setClass(user_id, class_id);
	}

	static async getWallpapers() {
		return await dbHelper.getWallpapers();
	}

	static async getUserWallpaper(user_id) {
		return await dbHelper.getUserWallpaper(user_id);
	}

	static async setWallpaper(user_id, wallpaper_id) {
		await dbHelper.updateWallpaper(user_id, wallpaper_id);
	}

	static async addWallpaperToUser(user_id, wallpaper_id) {
		await dbHelper.addWallpaperToUser(user_id, wallpaper_id);
	}
}

module.exports = { Model }