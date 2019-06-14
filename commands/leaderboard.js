const discord = require('discord.js');
exports.run = async (client, message, args, fs, config) =>
{
    const emoji = client.emojis.find(x => x.name === "prof");
    message.react(emoji);
    message.delete(60000);

    let users = await global.db.User.find().sort([['level', -1]]);
    const embed = new discord.RichEmbed()
        .setFooter("© Suertzz | Mineweb.org")
        .setColor(15158332)
        .setThumbnail("https://pics.suertzz.fr/170180_trophy-icon-png-removebg-preview.png")
        .setAuthor('Classement par niveau :', client.user.avatarURL)
        .addField("**1.**", "*" + users[0].username + "* : " + "`" + users[0].level + "`", true)
        .addField("**2.**", "*" + users[1].username + "* : " + "`" + users[1].level + "`", true)
        .addField("**3.**", "*" + users[2].username + "* : " + "`" + users[2].level + "`", true)
        .addField("**4.**", "*" + users[3].username + "* : " + "`" + users[3].level + "`", true)
        .addField("**5.**", "*" + users[4].username + "* : " + "`" + users[4].level + "`", true)
        .addField("**6.**", "*" + users[5].username + "* : " + "`" + users[5].level + "`", true)
        .addField("**7.**", "*" + users[6].username + "* : " + "`" + users[6].level + "`", true)
        .addField("**8.**", "*" + users[7].username + "* : " + "`" + users[7].level + "`", true)
        .addField("**9.**", "*" + users[8].username + "* : " + "`" + users[8].level + "`", true)
        .addField("**10.**", "*" + users[9].username + "* : " + "`" + users[9].level + "`", true);
    message.channel.send({embed});
};