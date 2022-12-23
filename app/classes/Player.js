const { Class } = require("./Class");
const { Color } = require("./Color");
const { Mission } = require("./Mission");

class Player {

	/** @type {Number} */		 id;
	/** @type {String} */		 bio;
	/** @type {Number}*/		 coins;
	/** @type {Number}*/		 gifts;
	/** @type {Number}*/		 lastDaily;
	/** @type {Number}*/		 missionsCount;
	/** @type {Mission | null}*/ currentMission;
	/** @type {Color}*/			 activeColor;
	/** @type {Class}*/			 playerClass;
	/** @type {Color[]}*/		 purchasedColors;
	/** @type {Color[]}*/		 notPurchasedColors;

	constructor(id, bio, coins, gifts, lastDaily, missionsCount, currentMission, activeColor, playerClass, purchasedColors, notPurchasedColors) {
		this.id = id;
		this.bio = bio
		this.coins = coins;
		this.gifts = gifts;
		this.lastDaily = lastDaily;
		this.missionsCount = missionsCount;
		this.currentMission = currentMission;
		this.activeColor = activeColor;
		this.playerClass = playerClass;
		this.purchasedColors = purchasedColors;
		this.notPurchasedColors = notPurchasedColors;
	}
}

module.exports = { Player }