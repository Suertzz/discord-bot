exports.run = (client, fs, config, args) => {
    console.log(`Ready !`);
    client.user.setActivity(config.prefix + "help");
}