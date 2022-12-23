class Mission {
	id;
	name;
	description;
	duration;
	endTimestamp;
	ended;

	constructor(id, name, description, duration, endTimestamp)
	{
		this.id = id;
		this.name = name;
		this.description = description;
		this.duration = duration;
		this.endTimestamp = endTimestamp;
		this.ended = (Date.now() > endTimestamp);
	}
}

module.exports = { Mission }