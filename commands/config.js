//Probably most complex file of Nobotti. Read at own risk.

//FINAL WARNING: THIS EVEN CONTAINS REGEXES D:

//too lazy to document this spaghetti

const Discord = require('discord.js');
const fs = require('fs')
const config = require('../utils/coreconfig')
const errors = require('../utils/errorjokes');

module.exports = {
name: 'config',
legacy: true,
execute(sender, channel, args, callback) {
   const message = args.join(" ");
   if(sender.hasPermission('ADMINISTRATOR') || sender.hasPermission('MANAGE_GUILD')) {
         if(args.length < 1) {
           callback("You need to select a function. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
            return;
         }
         let path = './serverdata/' + channel.guild.id + ".json";
         switch(args[1]){
            case 'create':
               if (fs.existsSync(path)) {
                 callback("Config file already exists.");
               } else {
                  config.createConfig(channel.guild.id, channel.guild.name, channel);
                 callback("Created the config.");
               }
               break;
            case 'clear':
               if (!fs.existsSync(path)) {
                  callback("This server doesn't have a config file. Use 'n! config create' to create one.");
               } else {
                  if(args.length < 3) callback("Are you sure? This resets the whole config file! Use 'n! config clear confirm' to confirm.");
                  if(args[2] != "confirm") callback("Are you sure? This resets the whole config file! Use 'n! config clear confirm' to confirm.");
                  config.createConfig(channel.guild.id, channel.guild.name, channel);
                 callback("Cleared the config.");
               }
               break;
            case 'raw':
               if (fs.existsSync(path)) {
                     fs.readFile("./serverdata/" + channel.guild.id + ".json", 'utf8', (err,data) => {
                        if (err) {
                           return console.log(err);
                        }
                       callback("```" + data + "```");
                     });
               } else {
                    callback("This server doesn't have a config file. Use 'n! config create' to create one.");
               }
               break;
            case 'sal':
            case 'setauditlog':
               if(args.length < 3) callback("You need to select a channel. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               var disabled = args[2] == "disabled" ? true : false;
               if(disabled == true) {
                     config.changeValue(channel.guild.id, "audit_log", "disabled");
                     callback('Updated the config!');
               }
               if (fs.existsSync(path)) {
                     let auditlogChannel = message.replace(/\D/g,'');
                     if(auditlogChannel == "") return callback('You need to type the channel name after "#". Example: n! config setauditlog #audit-log. To disable audit log, type n! config sal disabled. ' + errors.list[Math.floor(Math.random() * errors.list.length)]);
                     if(channel.guild.channels.cache.get(auditlogChannel) === undefined) return callback("Channel not found.");
                     config.changeValue(channel.guild.id, "audit_log", auditlogChannel);
                    callback('Updated the config!');
               } else {
                    callback("This server doesn't have a config file. Use 'n! config create' to create one.");
               }
               break;
            case 'spl':
            case 'setpubliclog':
               if(args.length < 3) callback("You need to select a channel. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               var disabled = args[2] == "disabled" ? true : false;
               if(disabled == true) {
                     config.changeValue(channel.guild.id, "public_log", "disabled");
                     callback('Updated the config!');
               }
               if (fs.existsSync(path)) {
                     let publiclogChannel = message.replace(/\D/g,'');
                     if(publiclogChannel == "") callback('You need to type the channel name after "#". Example: n! config setpubliclog #join-leave-log. To disable public log, type n! config spl disabled. ' + errors.list[Math.floor(Math.random() * errors.list.length)]);
                     if(channel.guild.channels.cache.get(publiclogChannel) === undefined) callback("Channel not found.");
                     config.changeValue(channel.guild.id, "public_log", publiclogChannel);
                    callback('Updated the config!');
               } else {
                    callback("This server doesn't have a config file. Use 'n! config create' to create one.");
               }
            break;
            case 'sjm':
            case 'setjoinmessage':
               if(args.length < 3) callback("You need to select a message. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               if (fs.existsSync(path)) {
                     try {
                        //Some very confusing regex for getting value between quotation marks
                        let regExp = /"([^"]+)"/;
                        let joinMessage = regExp.exec(message);
                        if(!joinMessage[1].includes("/m")) callback("You need to include member's name at least once in the message. Get member's name by including '/m' in the command. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
                        config.changeValue(channel.guild.id, "joinmessage", joinMessage[1]);
                       callback('Updated the config!');
                     } catch {
                       callback('You need to type the role name inside quotation marks or mention the role. Example: n! config setjoinmessage "/m just joined!". ' + errors.list[Math.floor(Math.random() * errors.list.length)]);
                     }
               } else {
                    callback("This server doesn't have a config file. Use 'n! config create' to create one.");
               }
            break;
            case 'slm':
            case 'setleavemessage':
               if(args.length < 3) callback("You need to select a message. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               if (fs.existsSync(path)) {
                     try {
                        //Some very confusing regex for getting value between quotation marks
                        let regExp = /"([^"]+)"/;
                        let leaveMessage = regExp.exec(message);                        
                        if(!leaveMessage[1].includes("/m")) callback("You need to include member's name at least once in the message. Get member's name by including '/m' in the command. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
                        config.changeValue(channel.guild.id, "leavemessage", leaveMessage[1]);
                       callback('Updated the config!');
                     } catch {
                       callback('You need to type the role name inside quotation marks or mention the role. Example: n! config setleavemessage "/m left. This is so sad.". ' + errors.list[Math.floor(Math.random() * errors.list.length)]);
                     }
               } else {
                    callback("This server doesn't have a config file. Use 'n! config create' to create one.");
               }
            break;
            case 'smr':
            case 'setmuterole':
               if(args.length < 3) callback("You need to select a role. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               if (fs.existsSync(path)) {
                     try {
                        //Some very confusing regex for getting value between quotation marks
                        let regExp = /"([^"]+)"/;
                        let roleName = regExp.exec(message);
                        role = channel.guild.roles.cache.find(role => role.name === roleName[1]);
                        if(role == undefined) callback('Role not found!');
                        config.changeValue(channel.guild.id, "muted_role", role.id);
                       callback('Updated the config!');
                     } catch {
                        try {
                           let roleName = message.mentions.roles.first();
                           config.changeValue(channel.guild.id, "muted_role", roleName.id);
                          callback('Updated the config!');
                        } catch {
                          callback('You need to type the role name inside quotation marks or mention the role. Example: n! config setmuterole "kiusaaja"/@kiusaaja. ' + errors.list[Math.floor(Math.random() * errors.list.length)]);
                        }
                     }
               } else {
                    callback("This server doesn't have a config file. Use 'n! config create' to create one.");
               }
               break;
            case 'sdr':
            case 'setdefaultrole':
               if(args.length < 3) callback("You need to select a role. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               if (fs.existsSync(path)) {
                     if(args[2] == "none") {
                        config.changeValue(channel.guild.id, "default_role", "none");
                        callback('Updated the config!');
                     }
                     try {
                        //Some very confusing regex for getting value between quotation marks
                        let regExp = /"([^"]+)"/;
                        let roleName = regExp.exec(message);
                        role = channel.guild.roles.cache.find(role => role.name === roleName[1]);
                        if(role == undefined) callback('Role not found!');
                        config.changeValue(channel.guild.id, "default_role", role.id);
                       callback('Updated the config!');
                     } catch {
                        try {
                           let roleName = message.mentions.roles.first();
                           config.changeValue(channel.guild.id, "default_role", roleName.id);
                          callback('Updated the config!');
                        } catch {
                          callback('You need to type the role name inside quotation marks or mention the role. Example: n! config setdefaultrole "member"/@member. ' + errors.list[Math.floor(Math.random() * errors.list.length)]);
                        }
                     }
               } else {
                    callback("This server doesn't have a config file. Use 'n! config create' to create one.");
               }
               break;
            default:
              callback("Select a valid function. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
               break;  
         }
   }
   else {
        callback("You need to have 'manage server'-permission to use config commands.");
   }
   }
}
