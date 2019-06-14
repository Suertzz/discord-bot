const discord = require('discord.js');
exports.run = (client, message, args, fs, config) =>
{
    if (message.member.roles.some(r=>["Leader", "Administrateur"].includes(r.name))) {
        const emoji = client.emojis.find(x => x.name === "prof");
        message.react(emoji);
        message.delete(1);
        const sayMessage = args.slice(1).join(" ");
        try {
            client.channels.get(args[0]).send(sayMessage);
        }
        catch(e) {
            message.channel.send("Une erreur est survenu lors de l'envoie du message :\n```" + e + "```");
        }
    } else {
        message.react("😡");
        message.delete(60000);
    }
};