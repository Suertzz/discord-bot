const discord = require('discord.js');
exports.run = (client, message, args, fs, config) => {
    if (message.member.roles.some(r=>["Leader", "Administrateur", "Modérateur", "Support"].includes(r.name)))
    {
        const emoji = client.emojis.find(x => x.name === "prof");
        message.react(emoji);
        message.delete(60000);
        let mute = message.guild.member(message.mentions.users.first());
        if (!mute)
            message.channel.send("Argument manquant ou incorrect. Utilisation :`" + config.prefix + "mute <@username> [reason]`");
        else if (mute.id === message.author.id)
        {
            const emoji = client.emojis.find(x => x.name === "facepalm");
            message.channel.send("Tu ne peux pas te mute toi même " + emoji);
        }
        else if (mute.highestRole.position >= message.member.highestRole.position)
            message.channel.send("Désolé " + message.author.username + " mais il ne faut pas déconner. Tu ne peux pas rendre muet quelqu'un qui est supérieur à toi hiérarchiquement !");
        else
        {
            if (message.channel.memberPermissions(mute).has("SEND_MESSAGES"))
            {
                message.channel.overwritePermissions(mute, {SEND_MESSAGES: false});
                message.channel.send(mute + " est désormais muet.");
                const log = client.channels.get("461275693808877568");
                let reason;
                if (args[1])
                    reason = args.slice(1).join(" ");
                else
                    reason = "Aucune raison spécifié";
                const embed = new discord.RichEmbed()
                    .setAuthor("Sanction :", client.user.avatarURL)
                    .setColor(10038562)
                    .setThumbnail("https://pics.suertzz.fr/mute-158486_960_720.png")
                    .setTimestamp()
                    .addField("Type :", "mute")
                    .addField("Auteur de la sanction :", message.author.username)
                    .addField("Raison :", reason)
                    .addField("Utilisateur :", mute.user);
                log.send({embed});
            }
            else
                message.channel.send("L'utilisateur est déjà muet dans ce canal.");
        }
    }
    else
    {
        message.react("😡");
        message.delete(60000);
        return;
    }
};