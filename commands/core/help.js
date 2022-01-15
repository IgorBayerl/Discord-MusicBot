const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    showHelp: false,
    utilisation: '{prefix}help',

    execute(client, message, args) {
        const commands = client.commands.filter(x => x.showHelp !== false)

        const embed = new MessageEmbed()
            .setColor('RED')
            .setAuthor({ 
                name: client.user.username, 
                iconURL: client.user.displayAvatarURL({ 
                    size: 1024, 
                    dynamic: true 
                }) 
            })
            .setDescription('')
            .addField(`Ativado - ${commands.size}`, commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map(y => y).join(', ')})\`` : '\`'}`).join(' | '))
            .setTimestamp()
            .setFooter({ text: '', iconURL: message.author.avatarURL({ dynamic: true }) });

        message.channel.send({ embeds: [embed] });
    }
};