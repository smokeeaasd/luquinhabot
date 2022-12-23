const { Model } = require("./app/database/model/dbModel.js");
const { dbHelper } = require("./app/database/helper/dbHelper.js");

let id = "637679977361309715";

console.log(Model.getUserByID(id));