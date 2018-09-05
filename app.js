const discord = require('discord.js');
const config = require("./config.json");
const auth = require("./auth.json");
const client = new discord.Client();


client.on("message", message =>
{
    if ((message.content.indexOf(config.prefix) !== 0) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const fs = require("fs");

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args, fs, config);
    } catch (err) {
        console.error(err);
    }
});

client.login(auth.token);