const ms = require('ms');

// export const s_ping = {	
//     name: 'ping',
//     aliases: ['p'],
//     showHelp: false,
//     utilisation: '{prefix}ping',
// }

// const ping = (client, message) => {
//     message.channel.send(`Pong 🛰️ **${client.ws.ping}ms** 🛰️`);
// };
// export default ping;

// mudar para paradigma funcional ou factory pattern

module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: '{prefix}ping',

    execute(client, message) {
        message.channel.send(`Pong 🛰️ **${client.ws.ping}ms** 🛰️`);
    },
};