const discord = require('discord.js');
exports.run = (client, message, args, fs, config) => {
    if (message.member.roles.some(r=>["Leader", "Administrateur", "Modérateur", "Support"].includes(r.name)))
    {
        const emoji = client.emojis.find(x => x.name === "prof");
        message.react(emoji);
        message.delete(60000);
        let unmute = message.guild.member(message.mentions.users.first());
        if (!unmute)
            message.channel.send("Argument manquant ou incorrect. Utilisation :`" + config.prefix + "unmute <@username>`");
        else if (unmute.id === message.author.id)
        {
            const emoji = client.emojis.find(x => x.name === "facepalm");
            message.channel.send("Tu ne peux pas rendre la parole à toi même " + emoji);
        }
        else if (unmute.highestRole.position >= message.member.highestRole.position)
            message.channel.send("Désolé, tu ne peux pas rendre la parole à quelqu'un qui est supérieur à toi hiérarchiquement !");
        else
        {
            if (!(message.channel.memberPermissions(unmute).has("SEND_MESSAGES")))
            {
                message.channel.overwritePermissions(unmute, {SEND_MESSAGES: null});
                message.channel.send(unmute + "  à désormais la parole");
                const log = client.channels.get("461275693808877568");
                const embed = new discord.RichEmbed()
                    .setAuthor("Sanction annulé :", client.user.avatarURL)
                    .setColor(10038562)
                    .setThumbnail("https://pics.suertzz.fr/mute-158486_960_720.png")
                    .setTimestamp()
                    .addField("Type :", "mute")
                    .addField("Auteur de l'annulation", message.author.username)
                    .addField("Utilisateur :", unmute.user);
                log.send({embed});
            }
            else
                message.channel.send("L'utilisateur n'est pas muet.");
        }
    }
    else
    {
        message.react("😡");
        message.delete(60000);
        return;
    }
}