const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    execute(client, message) {

        const queue = player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send(`No music plaing...`);
        
        const track = queue.current;
        const methods = ['disabled', 'track', 'queue'];
        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        const embed = new MessageEmbed()
            .setColor('RED')
            .setThumbnail(track.thumbnail)
            .setAuthor({ 
                name: track.title, 
                iconURL: client.user.displayAvatarURL({ 
                    size: 1024, 
                    dynamic: true 
                }) 
            })
            .setDescription(`Volume **${queue.volume}**%\nDuration **${trackDuration}**\nLoop **${methods[queue.repeatMode]}**\nSearched by ${track.requestedBy}`)
            .setTimestamp()
            .setFooter({ text: '', iconURL: message.author.avatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [embed] });
    },
};