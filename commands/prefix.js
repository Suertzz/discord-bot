exports.run = (client, message, args, fs, config) =>
{
    if (message.member.roles.some(r=>["Administrateur", "Modérateur", "Support"].includes(r.name)))
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
    fs.writeFile("config.json", JSON.stringify(config), (err) => console.error);
    message.channel.send("Nouveau préfixe défini sur `" + config.prefix + "`");
}