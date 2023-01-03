const { AppLogger } = require("./app/utils/logger.js");
const { ShardingManager } = require('discord.js');

const config = require("./app/config.json");
const path = require("node:path");

const manager = new ShardingManager(path.join(path.join(__dirname, 'app'), 'bot.js'), { token: config.token });

manager.on('shardCreate', shard => {
	AppLogger.send(`Shard com ID ${shard.id} foi iniciado.`);
});

manager.spawn();