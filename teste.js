const { Model } = require("./app/database/model/dbModel.js");
const { dbHelper } = require("./app/database/helper/dbHelper.js");

(async () => {
	console.log(await Model.getUserActiveColor("637679977361309715"));
	console.log(await Model.getColorByName("Preto"));
})();