const Canvas = require("@napi-rs/canvas");
const { Model } = require("./app/database/dbModel.js");
const path = require("path");

for (let color of Model.getUserColors("637679977361309715")) {
	console.log(color.id);
};