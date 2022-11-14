const config = require("./app/config.json");

const path = require("node:path");

const { ShardingManager } = require('discord.js');

const manager = new ShardingManager(path.join(path.join(__dirname, 'app'), 'bot.js'), { token: config.token });

manager.on('shardCreate', shard => {
	console.log(`[Shard ${shard.id}] Iniciado.`);
});

manager.spawn();