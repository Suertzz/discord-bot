const discord = require('discord.js');
exports.run = async (client, message, args, fs, config) => {
    if (message.member.roles.some(r=>["Leader", "Administrateur", "Modérateur", "Support"].includes(r.name)))
    {
        const emoji = client.emojis.find(x => x.name === "prof");
        message.react(emoji);
        let target_user = message.guild.member(message.mentions.users.first());
        if (!target_user)
            message.channel.send("Argument manquant ou incorrect. Utilisation :`" + config.prefix + "unjail <@username>`");
        else if (target_user.id === message.author.id)
        {
            const emoji = client.emojis.find(x => x.name === "facepalm");
            message.channel.send("Tu ne peux pas te sortir de prison toi même " + emoji);
        }
        else if (target_user.highestRole.position >= message.member.highestRole.position)
            message.channel.send("Désolé, tu ne peux pas sortir de prison quelqu'un qui est supérieur à toi hiérarchiquement !");
        else
        {
            const jail_role = '601562209528840243';
            const member_role = '588147420659974154';
            if (target_user.roles.has(jail_role))
            {

                target_user.removeRole(jail_role).catch(console.error);
                target_user.addRole(member_role).catch(console.error);
                let user = await global.db.User.findOne({id: target_user.id}).exec();
                user.jail.state = false;
                user.jail.date = null;
                user.jail.permanent = false;
                await user.save();

                message.channel.send(target_user + "  est libre.");
                const log = client.channels.get("461275693808877568");
                const embed = new discord.RichEmbed()
                    .setAuthor("Sanction annulée :", client.user.avatarURL)
                    .setColor(10038562)
                    .setThumbnail("https://pics.suertzz.fr/kissclipart-prisoner-png-clipart-prison-computer-icons-ea6936fe487680b1.png")
                    .setTimestamp()
                    .addField("Type :", "jail")
                    .addField("Auteur de l'annulation", message.author.username)
                    .addField("Utilisateur :", target_user.user);
                log.send({embed});
            }
            else
                message.channel.send("L'utilisateur n'est pas en prison.");
        }
    }
    else
    {
        message.react("😡");
        message.delete(60000);
        return;
    }
}