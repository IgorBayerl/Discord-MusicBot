const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music plaing... `);

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send(`You need to disable the loop to do this:  (${client.config.app.prefix}) `);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Loop **${queue.repeatMode === 0 ? 'off' : 'on'}** all the queue is in loop 🔁` : `Something went wrong`);
        } else {
            if (queue.repeatMode === 2) return message.channel.send(`You need to disable the loop on the current song to do this: (${client.config.app.prefix}loop queue) `);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Loop **${queue.repeatMode === 0 ? 'off' : 'on'}** the current song will play again and again (you can do a queue loop with the option <queue> ) 🔂` : `Something went wrong `);
        };
    },
};