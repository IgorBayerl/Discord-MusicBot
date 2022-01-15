const { QueryType } = require('discord-player');
const playdl = require("play-dl");

module.exports = {
    name: 'play',
    aliases: ['p'],
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {

        try {
            if (!args[0]) return message.channel.send(`Enter a valid search ${message.author}...`);

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

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                return message.channel.send(`I cant connect to the voice channel .. please verify the permissions...`);
            }

            await message.channel.send(`Loading ${res.playlist ? 'playlist' : 'track'}... 🎧`);

            res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

            if (!queue.playing) await queue.play();

        } catch (error) {
            console.log(`Command play ==> ${error}`);
        }
    },
};