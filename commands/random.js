//Automatically generated command file
const index = require('../torut');
module.exports = {
name: 'random',
execute(message, args) {
         if (args.length == 3){
            var rand1 = parseInt(args[1]);
            var rand2 = parseInt(args[2]);
            if(rand1 < rand2){
               message.channel.send("Your randomized number is " + (Math.floor(Math.random() * rand2) + rand1));
            }
            else{
               message.channel.send("The second number need to be bigger than first. " + torut[Math.floor(Math.random() * index.torut.length)]);
            }
      }
      else
      {
            message.channel.send("You are missing a value (!nobotti clear <min> <max>). " + torut[Math.floor(Math.random() * index.torut.length)]);
      }
   }
}
