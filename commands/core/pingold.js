const ms = require('ms');

module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: '{prefix}ping',

    execute(client, message) {
        message.channel.send(`Pong 🛰️ **${client.ws.ping}ms** 🛰️`);
    },
};