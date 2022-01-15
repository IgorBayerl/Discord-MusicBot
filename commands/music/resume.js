module.exports = {
    name: 'resume',
    aliases: ['rs'],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`No music plaing...`);

        const success = queue.setPaused(false);

        return message.channel.send(success ? `Current song ${queue.current.title} resuming ✅` : `Something went wrong`);
    },
};