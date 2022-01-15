module.exports = async (client) => {
    console.log(`Logged to the client ${client.user.username}\n-> The bot is in ${client.guilds.cache.size} servers!`);

    client.user.setActivity(client.config.app.playing);
};