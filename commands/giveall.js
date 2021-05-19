module.exports = {
    name: 'giveall',
    legacy: true,
    execute(sender, channel, args, callback) {
        const message = args.join(" ");
        if(sender.hasPermission('ADMINISTRATOR') || sender.hasPermission('MANAGE_ROLES')) {
            var role = channel.guild.roles.cache.get(message.replace(/\D/g,''));
            if(role == undefined) {
                return callback("Role is not defined!");
            }
            else {
                channel.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.add(role)).then({});
                callback("Gave roles to everyone!");
            }
        } else {callback("You are missing permissions!");}
    }
}