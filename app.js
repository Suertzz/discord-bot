const discord = require('discord.js');
const config = require("./config.json");
const auth = require("./auth.json");
const fs = require("fs")
const client = new discord.Client();


client.on("message", message =>
{
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    if (message.content.startsWith(config.prefix + "prefix"))
    {
        if (message.member.roles.some(r=>["Administrateur", "Modérateur", "Support"].includes(r.name)))
        {
            const emoji = client.emojis.find(x => x.name === "prof");
            message.react(emoji);
        }
        else
        {
            message.react("😡");
            message.delete(60000);
            return;
        }
        let newPrefix = message.content.split(" ").slice(1, 2)[0];
        config.prefix = newPrefix;
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
        message.channel.send("Nouveau préfixe défini sur `" + config.prefix + "`");
    }
    else
    {
        message.channel.send("Commande inconnue, essayez `" + config.prefix + "help`");
        message.react("🤔");
        message.delete(60000);
    }
});

client.login(auth.token);