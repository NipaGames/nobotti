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
         let path = './serverdata/' + message.guild.id + ".json";
         switch(args[1]){
            case 'create':
               if (fs.existsSync(path)) {
                  message.channel.send("Config file already exists.");
               } else {
                  config.createConfig(message.guild.id, message.guild.name, message.channel);
                  message.channel.send("Created the config.");
               }
               break;
            case 'clear':
               if (!fs.existsSync(path)) {
                   message.channel.send("This server doesn't have a config file. Use 'n! config create' to create one.");
               } else {
                  if(args.length < 3) return message.channel.send("Are you sure? This resets the whole config file! Use 'n! config clear confirm' to confirm.");
                  if(args[2] != "confirm") return message.channel.send("Are you sure? This resets the whole config file! Use 'n! config clear confirm' to confirm.");
                  config.createConfig(message.guild.id, message.guild.name, message.channel);
                  message.channel.send("Cleared the config.");
               }
               break;
            case 'raw':
               if (fs.existsSync(path)) {
                     fs.readFile("./serverdata/" + message.guild.id + ".json", 'utf8', (err,data) => {
                        if (err) {
                           return console.log(err);
                        }
                        message.channel.send("```" + data + "```");
                     });
               } else {
                     message.channel.send("This server doesn't have a config file. Use 'n! config create' to create one.");
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
               if (fs.existsSync(path)) {
                     let channel = message.content.replace(/\D/g,'');
                     if(channel == "") return message.channel.send('You need to type the channel name after "#". Example: n! config setauditlog #audit-log. To disable audit log, type n! config sal disabled. ' + torut[Math.floor(Math.random() * torut.length)]);
                     if(message.guild.channels.cache.get(channel) === undefined) return message.channel.send("Channel not found.");
                     config.changeValue(message.guild.id, "audit_log", channel);
                     message.channel.send('Updated the config!');
               } else {
                     message.channel.send("This server doesn't have a config file. Use 'n! config create' to create one.");
               }
               break;
            case 'spl':
            case 'setpubliclog':
               if(args.length < 3) return message.channel.send("You need to select a channel. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               var disabled = args[2] == "disabled" ? true : false;
               if(disabled == true) {
                     config.changeValue(message.guild.id, "public_log", "disabled");
                     return message.channel.send('Updated the config!');
               }
               if (fs.existsSync(path)) {
                     let channel = message.content.replace(/\D/g,'');
                     if(channel == "") return message.channel.send('You need to type the channel name after "#". Example: n! config setpubliclog #join-leave-log. To disable public log, type n! config spl disabled. ' + torut[Math.floor(Math.random() * torut.length)]);
                     if(message.guild.channels.cache.get(channel) === undefined) return message.channel.send("Channel not found.");
                     config.changeValue(message.guild.id, "public_log", channel);
                     message.channel.send('Updated the config!');
               } else {
                     message.channel.send("This server doesn't have a config file. Use 'n! config create' to create one.");
               }
            break;
            case 'sjm':
            case 'setjoinmessage':
               if(args.length < 3) return message.channel.send("You need to select a message. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               if (fs.existsSync(path)) {
                     try {
                        //Some very confusing regex for getting value between quotation marks
                        let regExp = /"([^"]+)"/;
                        let joinMessage = regExp.exec(message);
                        if(!joinMessage[1].includes("/m")) return message.channel.send("You need to include member's name at least once in the message. Get member's name by including '/m' in the command. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
                        config.changeValue(message.guild.id, "joinmessage", joinMessage[1]);
                        message.channel.send('Updated the config!');
                     } catch {
                        message.channel.send('You need to type the role name inside quotation marks or mention the role. Example: n! config setjoinmessage "/m just joined!". ' + errors.list[Math.floor(Math.random() * errors.list.length)]);
                     }
               } else {
                     message.channel.send("This server doesn't have a config file. Use 'n! config create' to create one.");
               }
            break;
            case 'slm':
            case 'setleavemessage':
               if(args.length < 3) return message.channel.send("You need to select a message. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               if (fs.existsSync(path)) {
                     try {
                        //Some very confusing regex for getting value between quotation marks
                        let regExp = /"([^"]+)"/;
                        let leaveMessage = regExp.exec(message);                        
                        if(!leaveMessage[1].includes("/m")) return message.channel.send("You need to include member's name at least once in the message. Get member's name by including '/m' in the command. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
                        config.changeValue(message.guild.id, "leavemessage", leaveMessage[1]);
                        message.channel.send('Updated the config!');
                     } catch {
                        message.channel.send('You need to type the role name inside quotation marks or mention the role. Example: n! config setleavemessage "/m left. This is so sad.". ' + errors.list[Math.floor(Math.random() * errors.list.length)]);
                     }
               } else {
                     message.channel.send("This server doesn't have a config file. Use 'n! config create' to create one.");
               }
            break;
            case 'smr':
            case 'setmuterole':
               if(args.length < 3) return message.channel.send("You need to select a role. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               if (fs.existsSync(path)) {
                     try {
                        //Some very confusing regex for getting value between quotation marks
                        let regExp = /"([^"]+)"/;
                        let roleName = regExp.exec(message);
                        role = message.channel.guild.roles.cache.find(role => role.name === roleName[1]);
                        if(role == undefined) return message.channel.send('Role not found!');
                        config.changeValue(message.guild.id, "muted_role", role.id);
                        message.channel.send('Updated the config!');
                     } catch {
                        try {
                           let roleName = message.mentions.roles.first();
                           config.changeValue(message.guild.id, "muted_role", roleName.id);
                           message.channel.send('Updated the config!');
                        } catch {
                           message.channel.send('You need to type the role name inside quotation marks or mention the role. Example: n! config setmuterole "kiusaaja"/@kiusaaja. ' + errors.list[Math.floor(Math.random() * errors.list.length)]);
                        }
                     }
               } else {
                     message.channel.send("This server doesn't have a config file. Use 'n! config create' to create one.");
               }
               break;
            case 'sdr':
            case 'setdefaultrole':
               if(args.length < 3) return message.channel.send("You need to select a role. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               if (fs.existsSync(path)) {
                     if(args[2] == "none") {
                        config.changeValue(message.guild.id, "default_role", "none");
                        return message.channel.send('Updated the config!');
                     }
                     try {
                        //Some very confusing regex for getting value between quotation marks
                        let regExp = /"([^"]+)"/;
                        let roleName = regExp.exec(message);
                        role = message.channel.guild.roles.cache.find(role => role.name === roleName[1]);
                        if(role == undefined) return message.channel.send('Role not found!');
                        config.changeValue(message.guild.id, "default_role", role.id);
                        message.channel.send('Updated the config!');
                     } catch {
                        try {
                           let roleName = message.mentions.roles.first();
                           config.changeValue(message.guild.id, "default_role", roleName.id);
                           message.channel.send('Updated the config!');
                        } catch {
                           message.channel.send('You need to type the role name inside quotation marks or mention the role. Example: n! config setdefaultrole "member"/@member. ' + errors.list[Math.floor(Math.random() * errors.list.length)]);
                        }
                     }
               } else {
                     message.channel.send("This server doesn't have a config file. Use 'n! config create' to create one.");
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
