const { Model } = require("../../database/model/dbModel");

class UserValidator
{
	static isRegistered(userid)
	{
		return Model.getUserByID(userid) != null;
	}
}

module.exports = {
	UserValidator
}