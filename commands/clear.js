//Made by NipaGames 2021

const Discord = require('discord.js');
const errors = require('../utils/errorjokes');
module.exports = {
   name: 'clear',
   legacy: true,
   execute(sender, channel, args, callback) {
      //Check perms
      if(sender.hasPermission('ADMINISTRATOR') || sender.hasPermission('MANAGE_MESSAGES')) {
         //Execute if message count is given
         if (args.length == 2){
            if (args[1] <= 99){
               poistoMäärä = parseInt(args[1]);
               channel.bulkDelete(poistoMäärä + 1, true).then(() => {
                    callback("Succesfully deleted " + poistoMäärä + " messages!");
               });
            }
            else{
              return callback("The maximum amount is 99 :(. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
            }
         }
         else
         {
         return callback("You are missing a value (!nobotti clear <value>). " + errors.list[Math.floor(Math.random() * errors.list.length)]);
         }
   }
   else {
        return callback("You do not have the permission for this command!");
   }
   }
}
