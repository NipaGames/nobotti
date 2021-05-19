const Discord = require('discord.js');
const errors = require('../utils/errorjokes');

module.exports = {
    name: 'help',
    legacy: true,
    execute(sender, channel, args, callback) {
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

           callback(exampleEmbed);
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

                   callback(exampleEmbed);
                    break;
                //Config category
                case 'config':
                    exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#00ff7e')
                        .setTitle('Config commands')
                        .setDescription('For admin use. Used for editing the config file of the server.')
                        .addField('raw', 'Gets the raw .json document of the config.\nUsage: !n config raw')
                        .addField('create', "Creates the config if it doesn't exist.\nUsage: !n config create")
                        .addField('clear', "Cleares the config file.\nUsage: !n config clear")
                        .addField('smr/setmutedrole', 'Defines the muted-role.\nUsage: !n config smr/setmutedrole "role name"/@role')
                        .addField('sdr/setdefaultrole', 'Defines the default role for someone joining.\nUsage: !n config sdr/setdefaultrole "role name"/@role (use !n sdr none to disable)')
                        .addField('sal/setauditlog', 'Defines the audit log channel.\nUsage: !n config sal/setauditlog #channel')
                        .addField('spl/setpubliclog', 'Defines the public log channel. Sends messages here if someone leaves or joins.\nUsage: !n config spl/setpubliclog #channel')
                        .addField('sjm/setjoinmessage', 'Defines the message for someone joining.\nUsage: !n config sjm/setjoinmessage "message"')
                        .addField('slm/setleavemessage', 'Defines the message for someone leaving.\nUsage: !n config slm/setleavemessage "message"')

                   callback(exampleEmbed);
                    break;
                //Moderation category
                case 'moderation':
                    exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#00ff7e')
                        .setTitle('Moderation commands')
                        .setDescription('For moderating the server. For example, you can delete messages or mute members.')
                        .addField('clear', 'Used to clean many messages at once (maximum: 99).\nUsage: !n clear <amount>')
                        .addField('mute', 'Give a member "muted"-role. Needs some config setup.\nUsage: !n mute <@member>')

                   callback(exampleEmbed);
                    break;
                default:
                   callback("Please use a valid category. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
                    break;
            }
        }
    }
}