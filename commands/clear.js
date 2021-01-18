//Made by NipaGames 2021

const Discord = require('discord.js');
const errors = require('../utils/errorjokes');
module.exports = {
name: 'clear',
execute(message, args) {
      //Check perms
      if(message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_MESSAGES')) {
         //Execute if message count is given
         if (args.length == 2){
            if (args[1] <= 99){
               poistoMäärä = parseInt(args[1]);
               message.channel.bulkDelete(poistoMäärä + 1).then(value => {
                     message.channel.send("Succesfully deleted " + poistoMäärä + " messages!");
               });
            }
            else{
               message.channel.send("The maximum amount is 99 :(. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
            }
         }
         else
         {
         message.channel.send("You are missing a value (!nobotti clear <value>). " + errors.list[Math.floor(Math.random() * errors.list.length)]);
         }
   }
   else {
         message.channel.send("You do not have the permission for this command!");
   }
   }
}
