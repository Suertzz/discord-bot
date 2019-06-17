const discord = require('discord.js');
const fs = require("fs");
const mongoose = require('mongoose');
const client = new discord.Client();


async function init_db() {
    console.log('Initializing the database..');
    const db = await mongoose.connect('mongodb://localhost/lisa', { useNewUrlParser: true });
    const { userSchema, configSchema } = require(`./src/db_schema`);
    db.model('User', userSchema);
    db.model('Config', configSchema);
    global.mongodb = db;
    global.db = global.mongodb.models;
    global.cache = [];
    global.config = await global.db.Config.findOne();
    console.log(global.config);
    if (!global.config) {
        global.config = new global.db.Config();
        await global.config.save();
    }
}

async function bot() {
    const config = global.config;
    fs.readdir("./events/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            let eventFunction = require(`./events/${file}`);
            let eventName = file.split(".")[0];
            client.on(eventName, (...args) => eventFunction.run(client, fs, config, ...args));
        });
    });

    client.on("message", message =>
    {
        if ((message.content.indexOf(config.prefix) !== 0) || message.author.bot) return;
        if (message.channel.type === "dm") return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        fs.readdir("./commands", function(err, items) {
            if (items.includes(command + '.js'))
            {
                let commandFile = require(`./commands/${command}.js`);
                commandFile.run(client, message, args, fs, config);
            }
            else
            {
                message.channel.send("Commande inconnue, essayez `" + config.prefix + "help`");
                message.delete(60000);
            }
        });
    });

    client.login(process.env.BOT_SECRET);
}

async function startup() {
    try {
        await init_db()
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
    await bot().catch(console.error);
}

startup();