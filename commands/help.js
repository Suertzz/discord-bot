const discord = require('discord.js');
exports.run = (client, message, args, fs, config) =>
{
    const emoji = client.emojis.find(x => x.name === "prof");
    message.react(emoji);
    message.delete(60000);

    if (message.member.roles.some(r=>["Leader", "Administrateur"].includes(r.name)))
    {
        const embed = new discord.RichEmbed()
            .setAuthor("Récapitulatif des commandes disponible :", client.user.avatarURL)
            .setFooter("© Suertzz | Mineweb.org")
            .setColor(3426654)
            .addField("`" + config.prefix + "help`", "Afficher ce même message")
            .addField("`" + config.prefix + "version`", "Affiche la version du bot")
            .addField("`" + config.prefix + "prefix`", "Redéfinir un nouveau préfix")
            .addField("`" + config.prefix + "cleanup`", "Nettoyage des messages");
        message.channel.send({embed});
    }
    else if (message.member.roles.some(r=>["Modérateur"].includes(r.name)))
    {
        const embed = new discord.RichEmbed()
            .setAuthor("Récapitulatif des commandes disponible :", client.user.avatarURL)
            .setFooter("© Suertzz | Mineweb.org")
            .setColor(3426654)
            .addField("`" + config.prefix + "help`", "Afficher ce même message")
            .addField("`" + config.prefix + "version`", "Affiche la version du bot")
            .addField("`" + config.prefix + "cleanup`", "Nettoyage des messages");
        message.channel.send({embed});
    }
    else if (message.member.roles.some(r=>["Support"].includes(r.name)))
    {
        const embed = new discord.RichEmbed()
            .setAuthor("Récapitulatif des commandes disponible :", client.user.avatarURL)
            .setFooter("© Suertzz | Mineweb.org")
            .setColor(3426654)
            .addField("`" + config.prefix + "help`", "Afficher ce même message")
            .addField("`" + config.prefix + "version`", "Affiche la version du bot")
            .addField("`" + config.prefix + "cleanup`", "Nettoyage des messages");
        message.channel.send({embed});
    }
    else
    {
        const embed = new discord.RichEmbed()
            .setAuthor("Récapitulatif des commandes disponible :", client.user.avatarURL)
            .setFooter("© Suertzz | Mineweb.org")
            .setColor(3426654)
            .addField("`" + config.prefix + "help`", "Afficher ce même message")
            .addField("`" + config.prefix + "version`", "Affiche la version du bot");
        message.channel.send({embed});
    }
};