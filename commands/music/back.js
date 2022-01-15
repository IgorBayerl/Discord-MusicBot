module.exports = {
    name: 'back',
    aliases: ['previous'],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music plaing...`);

        if (!queue.previousTracks[1]) return message.channel.send(`There is no last music`);

        await queue.back();

        message.channel.send(`Going back in to the last music ✅`);
    },
};