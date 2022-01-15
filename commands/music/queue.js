const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`No music playing...`);

        if (!queue.tracks[0]) return message.channel.send(`No song queued after current song...`);

        const methods = ['', '🔁', '🔂'];
        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`);
        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `And **${songs - 5}** other(s) music(s)...` : `In the playlist **${songs}** Music(s)...`;

        const embed = new MessageEmbed()
            .setColor('RED')
            .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }))
            .setAuthor({ 
                name: `Server queue - ${message.guild.name} ${methods[queue.repeatMode]}`, 
                iconURL: client.user.displayAvatarURL({ 
                    size: 1024, 
                    dynamic: true 
                }) 
            })
            .setDescription(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
            .setTimestamp()
            .setFooter({ text: '', iconURL: message.author.avatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [embed] });
    },
};