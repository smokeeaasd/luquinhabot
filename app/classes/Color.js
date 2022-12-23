class Color {
	id;
	name;
	emoji;
	hex;

	constructor(id, name, emoji, hex) {
		this.id = id;
		this.name = name;
		this.emoji = emoji;
		this.hex = hex;
	}
}

module.exports = { Color }