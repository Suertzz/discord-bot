const CronJob = require('cron').CronJob;

async function jailCron(client) {
    console.log("Checking if user is in jail..");
    const myGuilds = client.guilds.get("269958087740358656"); // hard coded need improv
    const jailRole = "601562209528840243";
    let lists = await global.db.User.find({}).exec();

    if (lists) {
        lists.forEach(async function(item) {
            if (!item.jail.permanent && (Date.now() > item.jail.date) && item.jail.state) {
                console.log(item.id + " is in now free from jail");
                item.jail.state = false;
                myGuilds.fetchMember(item.id).then(member => member.removeRole(myGuilds.roles.get(jailRole))).catch(console.error);
                await item.save();
            }
        })
    }
}

exports.run = (client, fs, config, args) => {
    console.log(`Ready !`);
    client.user.setActivity(config.prefix + "help");
    new CronJob('* * * * *', function() {
        jailCron(client).catch(console.error);
    }, null, true, 'America/Los_Angeles');
};