const discord = require('discord.js');
exports.run = async (client, message, args, fs, config) =>
{
    // db check if user exist
    let user = await global.db.User.findOne({id: message.author.id}).exec();
    if (!user) {
        user = new global.db.User();
        user.id = message.author.id;
        await user.save();
    }

    // calc xp needed for x level
    let n_xp = 100;
    for (let i = 0; i < user.level; i++) {
        n_xp = n_xp * 1.2;
    }

    // process comamand
    const emoji = client.emojis.find(x => x.name === "prof");
    message.react(emoji);
    message.delete(60000);
    const embed = new discord.RichEmbed()
        .setAuthor("Profil de " + message.author.username)
        .setFooter("© Suertzz | Mineweb.org")
        .setColor(3447003)
        .setThumbnail(message.author.avatarURL)
        .addField("Niveau", user.level)
        .addField("XP",  Math.round(user.xp) + " / " + Math.round(n_xp));
    message.channel.send({embed});
};