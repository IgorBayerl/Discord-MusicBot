const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: ['sh'],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Please enter a valid search...`);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`No results...`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel,

            async onBeforeCreateStream(track, source, _queue) {
                if (source === "youtube") {
                    console.log(`play-dl`);
                    return (await playdl.stream(track.url)).stream;
                }
            }
        });

        const maxTracks = res.tracks.slice(0, 10)
        const embed = new MessageEmbed()
            .setColor('RED')
            .setAuthor({ 
                name: `Results for ${args.join(' ')}`, 
                iconURL: client.user.displayAvatarURL({ 
                    size: 1024, 
                    dynamic: true 
                }) 
            })
            .setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\ Select a number between **1** and **${maxTracks.length}** or **cancel**`)
            .setTimestamp()
            .setFooter({ text: '', iconURL: message.author.avatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send(`Search canceled ✅`) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`Invalid, try a number between **1** and **${maxTracks.length}** or **cancel**...`);

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                return message.channel.send(`I cant connect to the voice channel...`);
            }

            await message.channel.send(`Loading results... 🎧`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send(`No results...`);
        });
    },
};