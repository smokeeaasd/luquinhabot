const { UserValidator } = require("../app/commands/modules/UserValidator.js");
const { Model } = require("../app/database/model/dbModel.js");

let id = "637679977361309715";

const player = Model.getUserByID(id);

console.log(player);
console.log(UserValidator.isRegistered(id));