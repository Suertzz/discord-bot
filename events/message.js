const leveler = require(`../src/leveler`);

exports.run = (client, fs, config, message) => {
    leveler(client, fs, config, message);
    if ((message.content.indexOf(config.prefix) !== 0) || message.author.bot) return;
    console.log("[CMD]" + "(" + message.author.username + "): " + "'" + message.content + "'");
};