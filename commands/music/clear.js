module.exports = {
    name: 'clear',
    aliases: ['cq'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music plaing... `);

        if (!queue.tracks[0]) return message.channel.send(`That is the last music in the queue!`);

        await queue.clear();

        message.channel.send(`The queue is clear 🗑️`);
    },
};