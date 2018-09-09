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