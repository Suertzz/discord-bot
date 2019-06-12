const discord = require('discord.js');
exports.run = (client, fs, config, event) => {
    const eventName= event.t;
    if (eventName === "MESSAGE_REACTION_ADD")
    {
        let role = "588147420659974154";
        if (event.d.message_id === "588184257265008640") {
            if (event.d.emoji.id === "584806352006676501")
                defRole(role);
        }
        function defRole() {
            const myGuilds = client.guilds.get(event.d.guild_id);
            myGuilds.fetchMember(event.d.user_id).then(member => member.addRole(myGuilds.roles.get(role))).catch(console.error);
        }
    }
};
