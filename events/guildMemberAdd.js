async function sendWelcomeMessage(member) {
    try {
        await member.send("Bienvenue sur le discord officiel du CMS MineWeb ! " +
            "Pour pouvoir communiquer avec les membres de la communauté et avoir" +
            " accès aux canaux tu peux aller lire le <#407234106716454912> :grin:")
    } catch (e) {
        console.log("Unable to send welcome private message to user " + member.user.id);
    }
}

async function checkIfUserIsInJail(client, member) {
    console.log("Checking if user " + member.user.id + " is in jail..");
    const jailRole = member.guild.roles.get("601562209528840243");
    const jailChannel = client.channels.get("602216362928111618");
    let user = await global.db.User.findOne({id: member.user.id}).exec();

    if (user && user.jail.state) {
        member.addRole(jailRole).catch(console.error);
        jailChannel.send("Le :monkey: " + member.user + " est de retour parmis nous :monkey_face:")
    }
}

exports.run = async (client, fs, config, member) => {
    await sendWelcomeMessage(member);
    await checkIfUserIsInJail(client, member);

};