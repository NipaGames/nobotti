const errors = require('../utils/errorjokes');
module.exports = {
   name: 'random',
   legacy: true,
   execute(sender, channel, args, callback) {
         if (args.length == 3){
            //
            var rand1 = parseInt(args[1]);
            var rand2 = parseInt(args[2]);
            if(rand1 < rand2){
               //Get the random number
              callback("Your randomized number is " + (Math.floor(Math.random() * rand2) + rand1));
            }
            else{
              callback("The second number need to be bigger than first. " + errors.list[Math.floor(Math.random() * errors.list.length)]);
            }
      }
      else
      {
           callback("You are missing a value (!nobotti clear <min> <max>). " + errors.list[Math.floor(Math.random() * errors.list.length)]);
      }
   }
}
