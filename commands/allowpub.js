const discord = require('discord.js');
exports.run = async (client, message, args, fs, config) => {
    if (message.member.roles.some(r=>["Leader", "Administrateur", "Modérateur", "Support"].includes(r.name)))
    {
        const emoji = client.emojis.find(x => x.name === "prof");
        message.react(emoji);
        let target_user = message.guild.member(message.mentions.users.first());
        if (!target_user)
            message.channel.send("Argument manquant ou incorrect. Utilisation :`" + config.prefix + "allowpub <@username>`");
        else if (target_user.id === message.author.id)
        {
            const emoji = client.emojis.find(x => x.name === "facepalm");
            message.channel.send("Tu ne peux pas t'autoriser à faire des pubs toi-même " + emoji);
        }
        else if (target_user.highestRole.position >= message.member.highestRole.position)
            message.channel.send("Désolé, tu ne peux pas permettre de pub à quelqu'un qui est supérieur à toi hiérarchiquement !");
        else
        {
            const anti_role = ''; // to complete
            if (target_user.roles.has(jail_role))
            {

                target_user.removeRole(antipub_role).catch(console.error);
                let user = await global.db.User.findOne({id: target_user.id}).exec();
                user.antipub.state = false;
                user.antipub.date = null;
                user.antipub.permanent = false;
                await user.save();

                message.channel.send(target_user + "  peut poster des pubs.");
                const log = client.channels.get("461275693808877568");
                const embed = new discord.RichEmbed()
                    .setAuthor("Sanction annulée :", client.user.avatarURL)
                    .setColor(10038562)
                    .setThumbnail("https://pics.suertzz.fr/kissclipart-prisoner-png-clipart-prison-computer-icons-ea6936fe487680b1.png")
                    .setTimestamp()
                    .addField("Type :", "antipub")
                    .addField("Auteur de l'annulation", message.author.username)
                    .addField("Utilisateur :", target_user.user);
                log.send({embed});
            }
            else
                message.channel.send("L'utilisateur peut déjà poster des pubs.");
        }
    }
    else
    {
        message.react("😡");
        message.delete(60000);
        return;
    }
}