const { QueryType } = require('discord-player');
const playdl = require("play-dl");
const config = require('../../config');
const lang = require('../../lang/languages');

module.exports = {
    name: 'play',
    aliases: ['p'],
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {

        try {
            console.log(config.app.language);
            if (!args[0]) return message.channel.send(`${lang[config.app.language].invalidSearch} ${message.author}...`);

            const res = await player.search(args.join(' '), {
                requestedBy: message.member,
                searchEngine: QueryType.AUTO
            });

            if (!res || !res.tracks.length) return message.channel.send(lang[config.app.language].noResult);

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
                return message.channel.send(lang[config.app.language].cantConnect);
            }

            await message.channel.send(`${lang[config.app.language].loading} ${res.playlist ? lang[config.app.language].playlist : lang[config.app.language].track}... 🎧`);

            res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

            if (!queue.playing) await queue.play();

        } catch (error) {
            console.log(`Command play ==> ${error}`);
        }
    },
};