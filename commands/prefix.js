exports.run = (client, message, args, fs, config) =>
{
    if (!args[0])
    {
        message.channel.send("Le prefix des commandes est '`" + config.prefix + "`'");
        return;
    }
    else if (message.member.roles.some(r=>["Leader", "Administrateur"].includes(r.name)))
    {
        const emoji = client.emojis.find(x => x.name === "prof");
        message.react(emoji);
    }
    else
    {
        message.react("😡");
        message.delete(60000);
        return;
    }
    let newPrefix = message.content.split(" ").slice(1, 2)[0];
    config.prefix = newPrefix;
    config.save();
    message.channel.send("Nouveau préfixe défini sur `" + config.prefix + "`");
}