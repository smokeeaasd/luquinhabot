const Canvas = require("@napi-rs/canvas");
const { Model } = require("./app/database/dbModel.js");
const path = require("path");

// console.log(Model.getUserAndClass("637679977361309715"));

const canvas = Canvas.loadImage(path.join("app\\commands\\profile\\wallpaper", "landscape1.jpg"));

console.log(canvas);