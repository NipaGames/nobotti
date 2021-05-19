//why this even exists
module.exports = {
    name: 'hi',
    description: "This is like the coolest command ever",
    execute(sender, channel, args, callback) {
        callback('Hi!');
    }
}