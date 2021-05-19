const Discord = require('discord.js');
const fs = require('fs');
const errors = require('../utils/errorjokes');
module.exports = {
name: 'mute',
legacy: true,
execute(sender, channel, args, callback) {
      const message = args.join(" ");
      if(sender.hasPermission('ADMINISTRATOR') || sender.hasPermission('MANAGE_ROLES')) {
         fs.readFile("./serverdata/" + channel.guild.id + ".json", 'utf8', (err,data) => {
            if (err) {
            return console.log(err);
            }
            var list = JSON.parse(data);
            if(list.muted_role == "none") return console.log("You need to select muted-role. Use !n config smr/setmutedrole for that.");
            var role = channel.guild.roles.cache.find(role => role.id === list.muted_role);
            if(role == undefined) {
              callback("Cannot find muted-role on the config from the server. Maybe check it is typed correctly? " + errors.list[Math.floor(Math.random() * errors.list.length)]);
            }
            else {
               var user = channel.guild.members.cache.get(message.replace(/\D/g,''));
               user.roles.add(role).catch(error => {
                     callback("I am missing permissions!");
               }).then(value => {
                     if(value != undefined) {
                       callback("Muted " + user.displayName + "!");
                     }
               });
            }
         });
      }
   }
}
