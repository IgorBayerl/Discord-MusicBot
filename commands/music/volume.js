const maxVol = client.config.app.maxVol;

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music plaing...`);

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send(`The current volume is ${queue.volume} 🔊\n*to change the volume type a number between **1** and **${maxVol}**.*`);

        if (queue.volume === vol) return message.channel.send(`Its already in this volume!`);

        if (vol < 0 || vol > maxVol) return message.channel.send(`This is an invalid number. please enter a value between **1** and **${maxVol}**`);

        const success = queue.setVolume(vol);

        return message.channel.send(success ? `The volume has changed to **${vol}**/**${maxVol}**% 🔊` : `Something went wrong`);
    },
};