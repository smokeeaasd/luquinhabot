const { Model } = require("../../database/model/dbModel");

class UserValidator
{
	static isRegistered(userid)
	{
		return Model.getUserByID(userid) != null;
	}

	static isBanned(userid)
	{
		return Model.getBannedUser(userid) != null;
	}

	static hasCoins(userid, amount)
	{
		return Model.getUserByID(userid).coins >= amount;
	}
}

module.exports = {
	UserValidator
}