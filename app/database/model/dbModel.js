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
		const userByID = dbHelper.getUserAndClass(user_id) ?? false;

		const player = new Lukinha.Player(
			userByID.disc_id,
			userByID.bio,
			userByID.coins,
			userByID.gifts,
			userByID.last_daily,
			userByID.missions_count,
			this.getUserMission(user_id),
			this.getColorById(userByID.active_color_id),
			this.getClassByID(userByID.class_id),
			this.getUserColors(user_id),
			this.getNotUserColors(user_id)
		)

		return (userByID) ? player : null
	}

	static getColorById(color_id) {
		const colorByID = dbHelper.getColorById(color_id) ?? false;

		const color = new Lukinha.Color(
			colorByID.id,
			colorByID.color_name,
			colorByID.emoji,
			colorByID.color_hex
		);

		return (colorByID) ? color : null;
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
		const userColors = dbHelper.getUserColors(user_id) ?? [];
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
		let userColors = dbHelper.getNotUserColors(user_id) ?? [];
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
		const colors = dbHelper.getUserColors(user_id) ?? [];

		for (const color of colors) {
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
		const missionByID = dbHelper.getMissionByID(mission_id);

		return new Lukinha.Mission(
			missionByID.id,
			missionByID.mission_name,
			missionByID.mission_description,
			missionByID.duration_mins,
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
		const classes = dbHelper.getClasses();

		let classList = [];

		classes.map((_class) => {
			classList.push(
				new Lukinha.Class(
					_class.id,
					_class.class_name,
					_class.class_description,
					_class.multiplier
				)
			)
		});

		return classList;
	}

	static canClassUp(id) {
		const user = dbHelper.getUserAndClass(id);

		const classes = this.getClasses();

		return (user.class_id < classes.length);
	}

	static getClassByID(class_id) {
		const classByID = dbHelper.getClassByID(class_id) ?? false;

		const _class = new Lukinha.Class(
			classByID.id,
			classByID.class_name,
			classByID.class_description,
			classByID.multiplier
		);

		return (classByID) ? _class : null
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