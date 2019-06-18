const moment = require('moment');
module.exports = async (client, fs, config, message) => {
    const xp = 15;

    if (message.author.bot) return; // dont count bot itself
    if (message.channel.type === "dm") return; // block count on private msg
    if (message.content.indexOf(config.prefix) === 0) return; // dont count command message

    let user = await global.db.User.findOne({id: message.author.id}).exec();

    if (!user) {
        user = new global.db.User();
        user.id = message.author.id;
        user.username = message.author.username;
    }

    const index = global.cache.findIndex(i => i.id === message.author.id);
    const user_cache = global.cache.filter(item => item.id === message.author.id);
    if (user_cache.length === 0) {
        global.cache.push({id: message.author.id, date: Date.now()});
        user.username = message.author.username;
        user.xp = user.xp + xp;
        user.cookie += 0.25
    } else {
        const date = moment(global.cache[index].date);
        if (date.add(10, 'seconds') < moment()) {
            global.cache = global.cache.filter(item => item.id !== message.author.id);
            global.cache.push({id: message.author.id, date: Date.now()});
            user.username = message.author.username;
            user.xp = user.xp + xp;
            user.cookie += 0.25;
        }
    }

    let n_xp = 100;
    for (let i = 0; i < user.level; i++) {
        n_xp = n_xp * 1.2;
    }
    if (user.xp > n_xp) {
        user.level++;
        user.xp = user.xp - n_xp;
    }
    user.messages++;
    await user.save();
};