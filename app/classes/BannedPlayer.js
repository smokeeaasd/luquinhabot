class BannedPlayer
{
	id;
	reason;
	constructor(id, reason)
	{
		this.id = id;
		this.reason = reason;
	}
}

module.exports = {
	BannedPlayer
}