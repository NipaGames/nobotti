//Automatically generated command file
const Discord = require('discord.js');
const fs = require('fs');
const errors = require('../utils/errorjokes');
module.exports = {
name: 'mute',
execute(message, args) {
      if(message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MUTE_MEMBERS')) {
         fs.readFile("./serverdata/" + message.guild.id + ".json", 'utf8', (err,data) => {
            if (err) {
            return console.log(err);
            }
            var list = JSON.parse(data);
            if(list.muted_role == "none") return console.log("You need to select muted-role. Use !n config smr/setmutedrole for that.");
            var role = message.guild.roles.cache.find(role => role.id === list.muted_role);
            if(role == undefined) {
               message.channel.send("Cannot find muted-role on the config from the server. Maybe check it is typed correctly? " + errors.list[Math.floor(Math.random() * errors.list.length)]);
            }
            else {
               var user = message.mentions.members.first();
               user.roles.add(role).catch(error => {
                     return message.channel.send("I am missing permissions!");
               }).then(value => {
                     if(value != undefined) {
                        message.channel.send("Muted " + user.displayName + "!");
                     }
               });
            }
         });
      }
   }
}
