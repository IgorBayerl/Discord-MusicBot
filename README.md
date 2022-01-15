# Music Bot

An open source discord bot that plays music.


## ✔ Pre requirements.

- [x] [FFmpeg](https://www.ffmpeg.org) to process the audio

- [x] [NodeJS 16](https://nodejs.org/en/)

## 📑 Installation


### Creating an discord bot on discord dev tools
[Discord Developers section](https://discordapp.com/developers/applications) 

1 - Create a new application

2 - Create a new bot

3 - In the **Bot** section, turn on the `PRESENCE INTENT` , `SERVER MEMBERS INTENT` and `MESSAGE CONTENT INTENT`

4 - Generate the link to invite the bot in the **OAuth2 -> URL Generator** section.

### Clone the repository

- Open the terminal and run this commands.
```sh
git clone https://github.com/IgorBayerl/Discord-MusicBot.git

cd Discord-MusicBot
```
## ⚙ Configuration

Before start you need to configure your bot.
The file with all the configurations you need to do is located in the main folder `config.js`.

```js

module.exports = {
    app: {
        prefix: '!',
        token: 'XXXXXXXXXXXXXX',
        playing: 'Making this server 200% more fun!',
        maxVolume: 100,
        loopMessage: false,
        discordPlayer: {},
        language: 'en',
        DJ: {
            enabled: false,
            roleName: 'XXX',
            commands: []
        }
    }
};

```

#### What everything means
- `app.px`, the prefix that will be set to use the bot
- `app.token`, the token of the bot available on the [Discord Developers](https://discordapp.com/developers/applications) section
- `app.playing`, the activity of the bot
- `app.maxVol`, the maximum volume that users can define
- `app.loopMessage`, if the message that a music is played should be sent when it is looped
- `app.discordPlayer`, options used by discord-player
- `app.language`, select the language of the messages - ( Not working yet )
- `app.DJ.enabled`, whether the DJ mode should be activated or not 
- `app.DJ.roleName`, the name of the DJ role to be used
- `app.DJ.commands`, the list of commands limited to members with the DJ role



-----

