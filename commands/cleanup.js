exports.run = (client, message, args, fs, config) =>
{
    if (message.member.roles.some(r=>["Administrateur", "Modérateur"].includes(r.name)))
        message.delete();
    else
    {
        message.react("😡");
        message.delete(60000);
        return;
    }
    async function purge()
    {
        if (isNaN(args[0])) {
            message.channel.send("Veuillez utiliser un nombre comme argument. Utilisation : `" + config.prefix + "cleanup <amount>`");
            return;
        }
        const fetched = await message.channel.fetchMessages({limit: args[0]});
        console.log(fetched.size + " messages found, deleting...");

        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send("Erreur : ${error}"));
    }

    purge();
}