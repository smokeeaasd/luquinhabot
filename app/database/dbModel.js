const { dbHelper } = require("./dbHelper.js");

class Model
{
	static tryAddUser(user_id)
	{
		let user = dbHelper.getUserById(user_id);

		if (user == null)
		{
			dbHelper.addUser(user_id)
		}
	}

	static tryAddServer(server_id)
	{
		let server = dbHelper.getServerByID(server_id);

		if (server == null)
		{
			dbHelper.addServer(server_id)
		}
	}

	static tryUpdateTicketCategory(server_id, category_id)
	{
		let server = dbHelper.getServerByID(server_id);

		if (server?.ticket_category == null)
		{
			dbHelper.updateTicketCategory(server_id, category_id);
		}
	}

	static isUserInMission(user_id)
	{
		let mission = dbHelper.getUserMissions(user_id);

		return (mission != null);
	}

	static completeMission(user_id)
	{
		dbHelper.increaseUserMissions(user_id);
		dbHelper.removeMission(user_id);
	}
}