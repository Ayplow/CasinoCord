const Discord = require('discord.js');

const bot = new Discord.Client();
bot.cfg = require('../data/botconfig');
bot.data = require('../data/botdata');
bot.commands = require('./extensions/commands');
bot.games = require('./extensions/games');
bot.temp = {
    'guilds': {},
    'channels': {},
};

bot.on('messageReactionAdd', async function(messageReaction, user) {
    if (user.bot == false) {
        if (bot.temp.channels[messageReaction.message.channel.id].blackjack.controlMessage == messageReaction.message) {
            bot.games.blackjackReact.apply(bot, [messageReaction, user]);
        }
    }
});
bot.on('messageReactionRemove', async function(messageReaction, user) {
    if (user.bot == false) {
        if (bot.temp.channels[messageReaction.message.channel.id].blackjack.controlMessage == messageReaction.message) {
            bot.games.blackjackReact.apply(bot, [messageReaction, user]);
        }
    }
});
bot.on('ready', async () => {
    console.log('Floodgates are open for business!\n');
});
bot.on('message', async function(message) {
    if (message.content.charAt(0) === bot.cfg.prefix) {
        let cmdArray = message.content.split(' ');
        let cmdData = message.content.slice(message.content.indexOf(' ') + 1, -1);
        let cmd = cmdArray[0].slice(1);
        switch (cmd) {
            case 'blackjack':
                bot.games.blackjack.apply(bot, [message]);
                console.log();
                break;
        }
    }
    console.log(message.author.username + ': ' + message.content);
});
exports.bot = bot;
