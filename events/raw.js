exports.run = (client, fs, config, event) => {
    const eventName= event.t;
    const member = "588147420659974154";
    const java = "588147191382671373";
    const c = "588147298232696903";
    const js = "588147375076409384";
    const html = "588192767025610754";
    const php = "588918645904637973";

    if (eventName === "MESSAGE_REACTION_ADD")
    {
        const emoji_id = event.d.emoji.id;
        if (event.d.message_id === "588184257265008640") {
            if (emoji_id === "584806352006676501")
                defRole(member);
        }
        if (event.d.message_id === "588925374742790173") {
            if (emoji_id === "588925994249748481")
                defRole(java);
            if (emoji_id === "588925994790944778")
                defRole(c);
            if (emoji_id === "588925994312794122")
                defRole(js);
            if (emoji_id === "588925994975494145")
                defRole(html);
            if (emoji_id === "588925995692851201")
                defRole(php);
        }
    }
    if (eventName === "MESSAGE_REACTION_REMOVE")
    {
        const emoji_id = event.d.emoji.id;
        if (event.d.message_id === "588184257265008640") {
            if (emoji_id === "584806352006676501")
                removeRole(member);
        }
        if (event.d.message_id === "588925374742790173") {
            if (emoji_id === "588925994249748481")
                removeRole(java);
            if (emoji_id === "588925994790944778")
                removeRole(c);
            if (emoji_id === "588925994312794122")
                removeRole(js);
            if (emoji_id === "588925994975494145")
                removeRole(html);
            if (emoji_id === "588925995692851201")
                removeRole(php);
        }
    }
    function defRole(role) {
        const myGuilds = client.guilds.get(event.d.guild_id);
        myGuilds.fetchMember(event.d.user_id).then(member => member.addRole(myGuilds.roles.get(role))).catch(console.error);
    }
    function removeRole(role) {
        const myGuilds = client.guilds.get(event.d.guild_id);
        myGuilds.fetchMember(event.d.user_id).then(member => member.removeRole(myGuilds.roles.get(role))).catch(console.error);
    }
};

