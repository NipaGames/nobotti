//Probably most complex file of Nobotti. Read at own risk.

//FINAL WARNING: THIS EVEN CONTAINS REGEXES D:

//too lazy to document this spaghetti

const Discord = require('discord.js');
const fs = require('fs')
const config = require('../utils/coreconfig')
const errors = require('../utils/errorjokes');

module.exports = {
name: 'config',
execute(message, args) {
   if(message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_GUILD')) {
         if(args.length < 1) {
            message.channel.send("You need to select a function. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
            return;
         }
         switch(args[1]){
            case 'create':
               var path = './serverdata/' + message.guild.id + ".json";
               if (fs.existsSync(path)) {
                     message.channel.send("Config file already exists.");
               } else {
                     config.createConfig(message.guild.id, message.guild.name, message.channel);
               }
               break;
            case 'raw':
               var path = './serverdata/' + message.guild.id + ".json";
               if (fs.existsSync(path)) {
                     fs.readFile("./serverdata/" + message.guild.id + ".json", 'utf8', (err,data) => {
                        if (err) {
                           return console.log(err);
                        }
                        message.channel.send("```" + data + "```");
                     });
               } else {
                     message.channel.send("This server doesn't have a config file. Use '!n config create' to create one.");
               }
               break;
            case 'sal':
            case 'setauditlog':
               if(args.length < 3) return message.channel.send("You need to select a channel. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               var disabled = args[2] == "disabled" ? true : false;
               if(disabled == true) {
                     config.changeValue(message.guild.id, "audit_log", "disabled");
                     return message.channel.send('Updated the config!');
               }
               var path = './serverdata/' + message.guild.id + ".json";
               if (fs.existsSync(path)) {
                     var channel = message.content.replace(/\D/g,'');
                     if(channel == "") return message.channel.send('You need to type the channel name after "#". Example: !n config setauditlog #audit-log. To disable audit log, type !n config sal disabled. ' + torut[Math.floor(Math.random() * torut.length)]);
                     if(message.guild.channels.cache.get(channel) === undefined) return message.channel.send("Channel not found.");
                     config.changeValue(message.guild.id, "audit_log", channel);
                     message.channel.send('Updated the config!');
               } else {
                     message.channel.send("This server doesn't have a config file. Use '!n config create' to create one.");
               }
               break;
            case 'smr':
            case 'setmuterole':
               if(args.length < 3) return message.channel.send("You need to select a role. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               var path = './serverdata/' + message.guild.id + ".json";
               if (fs.existsSync(path)) {
                     try {
                        //Some very confusing regex for getting value between quotation marks
                        var regExp = /"([^"]+)"/;
                        var roleName = regExp.exec(message);
                        role = message.channel.guild.roles.cache.find(role => role.name === roleName[1]);
                        if(role == undefined) return message.channel.send('Role not found!');
                        config.changeValue(message.guild.id, "muted_role", role.id);
                        message.channel.send('Updated the config!');
                     } catch {
                        try {
                           var roleName = message.mentions.roles.first();
                           config.changeValue(message.guild.id, "muted_role", roleName.id);
                           message.channel.send('Updated the config!');
                        } catch {
                           message.channel.send('You need to type the role name inside quotation marks or mention the role. Example: !n config setmuterole "kiusaaja"/@kiusaaja. ' + errors.list[Math.floor(Math.random() * errors.list.length)]);
                        }
                     }
               } else {
                     message.channel.send("This server doesn't have a config file. Use '!n config create' to create one.");
               }
               break;
            default:
               message.channel.send("Select a valid function. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               break;  
         }
   }
   else {
         message.channel.send("You need to have 'manage server'-permission to use config commands.");
   }
   }
}
