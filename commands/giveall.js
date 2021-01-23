module.exports = {
    name: 'giveall',
    execute(message, args) {
        if(message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_ROLES')) {
            var role = message.mentions.roles.first();
            if(role == undefined) {
                return;
            }
            else {
                message.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.add(role));
                message.channel.send("Gave roles to everyone!");
            }
        } else {return message.channel.send("You are missing permissions!");}
    }
}