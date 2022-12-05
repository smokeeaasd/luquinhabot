const Canvas = require("@napi-rs/canvas");
const { Model } = require("./app/database/model/dbModel.js");
const { dbHelper } = require("./app/database/helper/dbHelper.js");
const path = require("path");

(async () => {
	console.log(await Model.getUserActiveColor("637679977361309715"));
	console.log(await Model.getRandomMission());
})();