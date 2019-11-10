const discord = require('discord.js');
const moment = require('moment');
exports.run =  async (client, message, args, fs, config) => {
    if (message.member.roles.some(r=>["Leader", "Administrateur", "Modérateur", "Support"].includes(r.name)))
    {
        const emoji = client.emojis.find(x => x.name === "prof");
        message.react(emoji);
        let target_user = message.guild.member(message.mentions.users.first());
        if (!target_user || (args[1].match(/^[0-9]+$/) === null))
            message.channel.send("Argument manquant ou incorrect. Utilisation :`" + config.prefix + "jail <@username> <duration in min> [reason]`");
        else if (target_user.id === message.author.id)
        {
            const emoji = client.emojis.find(x => x.name === "facepalm");
            message.channel.send("Tu ne peux pas te mettre en prison " + emoji);
        }
        else if (target_user.highestRole.position >= message.member.highestRole.position)
            message.channel.send("Désolé " + message.author.username + " mais il ne faut pas déconner. Tu ne peux pas mettre en prison quelqu'un qui est supérieur à toi hiérarchiquement !");
        else
        {
            const jail_role = '601562209528840243';
            const member_role = '588147420659974154';
            if (!target_user.roles.has(jail_role))
            {
                target_user.addRole(jail_role).catch(console.error);
                target_user.removeRole(member_role).catch(console.error);
                let user = await global.db.User.findOne({id: target_user.id}).exec();
                if (!user) {
                    user = new global.db.User();
                    user.id = target_user.id;
                    user.username = target_user.user.username;
                }
                user.jail.state = true;
                if (args[1] !== "0") {
                    user.jail.date = moment(Date.now()).add(args[1], 'minutes');
                } else {
                    user.jail.permanent = true;
                }
                message.channel.send(target_user + " est désormais en prison.");
                const log = client.channels.get("461275693808877568");
                let reason;
                if (args[2])
                    reason = args.slice(2).join(" ");
                else
                    reason = "Aucune raison spécifié";
                const embed = new discord.RichEmbed()
                    .setAuthor("Sanction :", client.user.avatarURL)
                    .setColor(10038562)
                    .setThumbnail("https://pics.suertzz.fr/kissclipart-prisoner-png-clipart-prison-computer-icons-ea6936fe487680b1.png")
                    .setTimestamp()
                    .addField("Type :", "jail")
                    .addField("Auteur de la sanction :", message.author.username)
                    .addField("Raison :", reason)
                    .addField("Prend fin le :", args[1] === "0" ? "définitif" : user.jail.date)
                    .addField("Utilisateur :", target_user.user);
                log.send({embed});
                await user.save();
            }
            else
                message.channel.send("L'utilisateur est déjà en prison.");
        }
    }
    else
    {
        message.react("😡");
        message.delete(60000);
        return;
    }
};