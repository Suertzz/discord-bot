const discord = require('discord.js');
const commands = [
    {
        command: 'help',
        desc: 'Afficher ce même message'
    },
    {
        command: 'version',
        desc: 'Affiche la version du bot'
    },
    {
        command: 'profile',
        desc: 'Affiche votre profil'
    },
    {
        command: 'leaderboard',
        desc: 'Affiche le classement par niveau'
    },
    {
        command: 'prefix',
        desc: 'Redéfinir un nouveau préfix',
        roles: ['Leader', 'Administrateur']
    },
    {
        command: 'cleanup',
        desc: 'Nettoyage des messages',
        roles: ['Support', 'Modérateur', 'Leader', 'Administrateur']
    },
    {
        command: 'jail',
        desc: 'Mettre en prison une personne',
        roles: ['Support', 'Modérateur', 'Leader', 'Administrateur']
    },
    {
        command: 'unjail',
        desc: 'Faire sortir une personne de prison',
        roles: ['Support', 'Modérateur', 'Leader', 'Administrateur']
    },
    {
        command: 'say',
        desc: 'Envoie un message au nom du bot',
        roles: ['Leader', 'Administrateur']
    },
    {
        command: 'antipub',
        desc: 'Mettre le rôle Anti-Pub à une personne',
        roles: ['Support', 'Modérateur', 'Leader', 'Administrateur']
    },
    {
        command: 'allowpub',
        desc: 'Enlever le rôle Anti-Pub d\'une personne',
        roles: ['Support', 'Modérateur', 'Leader', 'Administrateur']
    }
]

exports.run = (client, message, args, fs, config) => {
    if (message.channel.type === "dm") return;
    const emoji = client.emojis.find(x => x.name === 'prof');
    message.react(emoji);

    const fields = commands.filter((command) => {
        if (command.roles === undefined) return true; // available for all users
        return message.member.roles.some(role => command.roles.includes(role.name))
    })

    const embed = new discord.RichEmbed()
        .setAuthor('Récapitulatif des commandes disponible :', client.user.avatarURL)
        .setFooter('© Suertzz | Mineweb.org')
        .setColor(3426654);
    fields.forEach((field) => {
        embed.addField('`' + config.prefix + field.command + '`', field.desc)
    });

    return message.channel.send({embed})
}