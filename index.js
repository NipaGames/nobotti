//Import required files and libraries
var http = require('http');  
require('dotenv').config();
const config = require('./utils/coreconfig');
const fs = require('fs')
const Discord = require('discord.js');

//Create a server just to keep the bot alive
http.createServer(function (req, res) {   
  console.log("I'm alive!")
  res.write("I'm alive!");   
  res.end(); 
}).listen(8080);


const bot = new Discord.Client();

var cards = {};

const PREFIX = 'n!';

bot.login(process.env.TOKEN);

bot.commands = new Discord.Collection();

//Get all files inside commands-folder
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

//
bot.once('ready', () =>{
    //This message will appear, if you host the bot. The more you know.
    console.log("This bot joined to your server to destroy it >:)");
    //Debug message
    bot.user.setActivity("n!help (Testing awesome new bugs...)"); 
})


bot.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    guild.systemChannel.send("Thanks for inviting me!\nNow I can take this server down and get all your private data!");
});

bot.on("messageDelete", async (messageDelete) => {
  //Store deleted messages if server has a channel for it
    config.getValue(messageDelete.guild.id, "audit_log", async(auditLog) => {

    //Check if (Nobotti's) audit logs are disabled
    if(auditLog == "disabled") return;
    var channel = messageDelete.guild.channels.cache.find(channel => channel.id === auditLog);
    if(channel != undefined) {
        //Wait for audit logs to store event information
        await Discord.Util.delayFor(900);

        //Fetch logs
        const fetchedLogs = await messageDelete.guild.fetchAuditLogs({
          limit: 6,
          type: 'MESSAGE_DELETE'
        }).catch(() => ({
          entries: []
        }));
      
        //Get entry
        const auditEntry = fetchedLogs.entries.find(a =>
          a.target.id === messageDelete.author.id &&
          a.extra.channel.id === messageDelete.channel.id &&
          Date.now() - a.createdTimestamp < 20000
        );
      
        //Get id of user who deleted the message
        const executor = auditEntry ? auditEntry.executor.id : messageDelete.author.id;
      
        const DeleteEmbed = new Discord.MessageEmbed()
          .setTitle("Message Deleted")
          .setColor("#fc3c3c")
          .addField("Author", "<@" + messageDelete.author.id + ">", true)
          .addField("Deleted By", "<@" + executor + ">", true)
          .addField("Channel", messageDelete.channel, true)
          .addField("Message content:", messageDelete.content || "None");
      
        channel.send(DeleteEmbed);
    }
    });
});

bot.on('message', message=>{
    //NOTE: prefix is going to be server-specific in future
    let sCommand = message.content.substring(PREFIX.length);
    while(sCommand.startsWith(" ")) sCommand = sCommand.substring(1);
    let args = sCommand.split(" ");

    if(!message.content.startsWith(PREFIX)) return;

    var found = false;

    //Iterate through all commands; check if specified command is found
    bot.commands.forEach(function (command) {
        if(args[0] == command.name) {
            //Execute "execute"-export of module
            command.execute(message, args);
            found = true;
        }
    });
    //Command is not found
    if (found == false) message.channel.send("I can't understand you. U have very bad grammar. :(");
});

//wtf is this

//Oh, i wanted to make blackjack command sometime ago
//NOTE: moving to blackjack-file
function setupCards() {
  throw {name : "NotImplementedError", message : "ok?"}; 
    cards[1] = "752901444473978910";
    cards[2] = "752901443928981645";
    cards[3] = "752901443429859358";
    cards[4] = "752901443908010134";
    cards[5] = "752901444440555640";
    cards[6] = "752901444168056867";
    cards[7] = "752901444729962626";
    cards[8] = "752901444981489704";
    cards[9] = "752901444637556756";
    cards[10] = "752901444335698021";
    cards[11] = "752901446130729091";
    cards[12] = "752901446441238662";
    cards[13] = "752901446499827793";
}

//NOTE: also moving to blackjack-file
function getEmoji (id) {
    return bot.emojis.cache.get(id).toString();
}