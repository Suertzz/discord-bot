const discord = require('discord.js');
const config = require("./config.json");
const auth = require("./auth.json");
const fs = require("fs");
const client = new discord.Client();

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, fs, config, ...args));
    });
});

client.on("message", message =>
{
    if ((message.content.indexOf(config.prefix) !== 0) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    fs.readdir("./commands", function(err, items) {
        if (items.includes(command + '.js'))
        {
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(client, message, args, fs, config);
        }
        else
        {
            message.channel.send("Commande inconnue, essayez `" + config.prefix + "help`");
            message.delete(60000);
        }
    });
});

client.login(auth.token);