const fs = require("fs");
const path = require("path");

class Project {
	static getLineCount(dir) {
		let excludes = ['logs', 'luquinha.sqlite3', 'comandos.sqlite', 'node_modules', 'package.json', 'package-lock.json'];
		let count = 0;
		function getDirLineCount(_dir) {

			let directory = fs.readdirSync(_dir);

			directory.filter(file => {
				return !excludes.includes(file)
			}).forEach(file => {
				if (file.includes('.')) {//+=
					count += fs.readFileSync(path.join(_dir, file)).toString('utf-8').split('\n').length;
				} else if (!file.includes('.sql')) {
					getDirLineCount(path.join(_dir, file));
				}
			});
		}

		getDirLineCount(dir);

		return count;
	}
}

module.exports = {
	Project
}

console.log(`${Project.getLineCount('DSHub')} Linhas`);