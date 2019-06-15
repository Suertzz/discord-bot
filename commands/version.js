const discord = require('discord.js');
const info = require ('./../package.json');
exports.run = (client, message, args, fs, config) =>
{
    const emoji = client.emojis.find(x => x.name === "prof");
    message.react(emoji);
    const embed = new discord.RichEmbed()
        .setAuthor("Informations :", client.user.avatarURL)
        .setFooter("© Suertzz | Mineweb.org")
        .setColor(1752220)
        .setThumbnail(client.user.avatarURL)
        .addField("Version du bot :", info.version)
        .addField("Auteur :", "Suertzz")
        .addField("Github :", "https://github.com/Suertzz/discord-bot");
    message.channel.send({embed});
};