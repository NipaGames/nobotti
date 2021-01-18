var http = require('http');  

http.createServer(function (req, res) {   
  console.log("I'm alive!")
  res.write("I'm alive!");   
  res.end(); 
}).listen(8080);


const dotenv = require('dotenv');

const config = require('./utils/coreconfig');
const fs = require('fs')
const Discord = require('discord.js');

const bot = new Discord.Client();

var cards = {};

const PREFIX = 'n!';

bot.login(process.env.TOKEN).catch(err => {
  dotenv.config({ path: 'C:/.tokens/nobotti/.env' });
  bot.login(process.env.TOKEN);
}
);

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

bot.once('ready', () =>{
    console.log("This bot joined to your server to destroy it >:)");
    bot.user.setActivity("n!help (Testing awesome new things...)"); 

    setupCards();
})


bot.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    guild.systemChannel.send("Thanks for inviting me!\nNow I can take this server down and get all your private data!");
});

bot.on("messageDelete", async (messageDelete) => {
    config.getValue(messageDelete.guild.id, "audit_log", async(auditLog) => {

    if(auditLog == "disabled") return;
    var channel = messageDelete.guild.channels.cache.find(channel => channel.id === auditLog);
    if(channel != undefined) {
        await Discord.Util.delayFor(900);

        const fetchedLogs = await messageDelete.guild.fetchAuditLogs({
          limit: 6,
          type: 'MESSAGE_DELETE'
        }).catch(() => ({
          entries: []
        }));
      
        const auditEntry = fetchedLogs.entries.find(a =>
          a.target.id === messageDelete.author.id &&
          a.extra.channel.id === messageDelete.channel.id &&
          Date.now() - a.createdTimestamp < 20000
        );
      
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
    if(message.content.toLowerCase().includes("hyvää joulua")) return message.channel.send("Kiitos samoin!");
    let sCommand = message.content.substring(PREFIX.length);
    while(sCommand.startsWith(" ")) sCommand = sCommand.substring(1);
    let args = sCommand.split(" ");

    if(!message.content.startsWith(PREFIX)) return;

    var found = false;

    bot.commands.forEach(function (command) {
        if(args[0] == command.name) {
            command.execute(message, args);
            found = true;
        }
    });
    if (found == false) message.channel.send("I can't understand you. U have very bad grammar. :(");
});

function setupCards() {
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

function getEmoji (id) {
    return bot.emojis.cache.get(id).toString();
}