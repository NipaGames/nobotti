//Imports
const Discord = require('discord.js');
const errors = require('../utils/errorjokes');

module.exports = {
    name: 'help',
    execute(message, args) {
        //Execute if no category given
        if(args.length < 2) {
            //General info
            exampleEmbed = new Discord.MessageEmbed()
                .setColor('#00ff7e')
                .setTitle('How to use Nobotti?')
                .setDescription('Nobotti has various types of different commands.\nYou can get better info for every category by using !n help <category>')
                .addField('Fun', 'Just for fun. Commands like "hi", "random", etc. ')
                .addField('Config', 'For admin use. Used for editing the config file of the server.')
                .addField('Moderation', 'For moderating the server. For example, you can delete messages or mute members.')

            message.channel.send(exampleEmbed);
        }
        else {
            //Info of categories
            switch(args[1].toLowerCase()) {
                //Fun category
                case 'fun':
                    exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#00ff7e')
                        .setTitle('Fun commands')
                        .setDescription('Nobotti has various types of different commands.\nYou can get better info for every category by using !n help <category>')
                        .addField('random', 'Gives a random number between given numbers. \nUsage: !n random <num1> <num2>')
                        .addField('hi', 'The most useful command of Nobotti.\nUsage: !n hi')
                        .addField('creeper (yes, seriously)', 'Aw man.\nUsage: !n creeper')

                    message.channel.send(exampleEmbed);
                    break;
                //Config category
                case 'config':
                    exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#00ff7e')
                        .setTitle('Config commands')
                        .setDescription('For admin use. Used for editing the config file of the server.')
                        .addField('raw', 'Gets the raw .json document of the config.\nUsage: !n config raw')
                        .addField('create', "Creates the config if it doesn't exist.\nUsage: !n config create")
                        .addField('smr/setmutedrole', 'Defines the muted-role.\nUsage: !n config smr/setmutedrole "role name"/@role')
                        .addField('sal/setauditlog', 'Defines the audit log channel.\nUsage: !n config sal/setauditlog #channel')

                    message.channel.send(exampleEmbed);
                    break;
                //Moderation category
                case 'moderation':
                    exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#00ff7e')
                        .setTitle('Moderation commands')
                        .setDescription('For moderating the server. For example, you can delete messages or mute members.')
                        .addField('clear', 'Used to clean many messages at once (maximum: 99).\nUsage: !n clear <amount>')
                        .addField('mute', 'Give a member "muted"-role. Needs some config setup.\nUsage: !n mute <@member>')

                    message.channel.send(exampleEmbed);
                    break;
                default:
                    message.channel.send("Please use a valid category. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
                    break;
            }
        }
    }
}