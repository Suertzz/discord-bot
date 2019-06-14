const discord = require('discord.js');
exports.run = (client, message, args, fs, config) =>
{
    if (message.member.roles.some(r=>["Leader", "Administrateur"].includes(r.name))) {
        const emoji = client.emojis.find(x => x.name === "prof");
        message.react(emoji);
        message.delete(50);
        const sayMessage = args.join(" ");
        message.channel.send(sayMessage);
    } else {
        message.react("😡");
        message.delete(60000);
    }
};