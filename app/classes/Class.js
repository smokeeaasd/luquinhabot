class Class {
	id;
	name;
	description;
	multiplier;

	constructor(id, name, description, multiplier) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.multiplier = multiplier;
	}
}

module.exports = { Class }