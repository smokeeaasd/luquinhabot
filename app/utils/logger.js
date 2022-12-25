const fs = require("fs");
const path = require("path");

class AppLogger {
	/**
	 * @param {String} data 
	 */
	static send(data) {
		const date = new Date();
		const day = date.toLocaleDateString();
		const hours = date.getHours() < 10 ? '0'.concat(date.getHours()) : date.getHours();
		const minutes = date.getMinutes() < 10 ? '0'.concat(date.getMinutes()) : date.getMinutes();

		let prefix = `[${day} ${hours}:${minutes}]`;
		let msg = `${prefix} ${data}`;

		console.log(msg);
	}
}

module.exports = {
	AppLogger
}