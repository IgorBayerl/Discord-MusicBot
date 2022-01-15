module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    utilisation: '{prefix}shuffle',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music plaing...`);

        if (!queue.tracks[0]) return message.channel.send(`There is no music in the queue!`);

        await queue.shuffle();

        return message.channel.send(`Shuffled queue **${queue.tracks.length}** song(s) ! ✅`);
    },
};