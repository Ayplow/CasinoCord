const cards = require('./cards');
const Discord = require('discord.js');

function draw(message) {
    cardCount = message.content.split(' ')[1];
    let deck = new cards.BuildDeck();
    let n = deck.carddraw(cardCount);
    if (n.length === 1) {
        v = 'You drew a ' + n[n.length - 1]['Rank'] + ' of ' + n[n.length - 1]['Suit'];
    } else {
        v = 'You drew';
        for (i = 0; i < n.length - 1; i++) {
            v = v + ' a ' + n[i]['Rank'] + ' of ' + n[i]['Suit'] + ',';
        }
        v = v + ' and a ' + n[n.length - 1]['Rank'] + ' of ' + n[n.length - 1]['Suit'];
    }

    message.channel.send(v);
    return deck;
}
async function addReacts(message, emojiArray) {
    for (let i = 0; i < emojiArray.length; i++) {
        await message.react(emojiArray[i]);
    }
}
async function delReacts(message, emojiArray) {
    for (let i = 0; i < emojiArray.length; i++) {
        await message.react(emojiArray[i]);
    }
}
// channel: Channel object to send the message to, though if set to Message object
// it will instead replace this
// description: string to set the embed description to
// fields: Object containing fields, keys are used as titles, and values (must be string) are contents
// The NotInline key can be set to an array of strings, which will cause the corresponding
// keys not to be inline fields
// reactions: array of reaction characters to add to the message upon send
async function newCtrlMessage(placement, description, fields, reactions) {
    embed = new Discord.RichEmbed;
    embed.setDescription(description);
    if (fields) {
        for (let i of Object.keys(fields)) {
            if (i != 'NotInline') {
                embed.addField(i, fields[i], (fields.inline && fields.NotInline.includes(i) ? false : true));
            }
        }
    }
    if (placement instanceof Discord.TextChannel) {
        message = await placement.send(embed);
    } else if (placement instanceof Discord.Message) {
        message = await placement.channel.send(embed);
        placement.delete();
    } else {
        return 'placement not TextChannel or Message object';
    }
    if (typeof reactions != 'undefined') {
        addReacts(message, reactions);
    }
    return message;
}
async function editCtrlMessage(message, description, fields, reactions) {
    embed = new Discord.RichEmbed;
    embed.setDescription(description);
    if (typeof fields != 'undefined') {
        for (let i of Object.keys(fields)) {
            if (i != 'NotInline') {
                embed.addField(i, fields[i], (fields.inline && fields.NotInline.includes(i) ? false : true));
            }
        }
    }
    await message.edit(embed);
    if (typeof reactions != 'undefined') {
        addReacts(message, reactions);
    }
    return message;
};
exports.draw = draw;
exports.addReacts = addReacts;
exports.delReacts = delReacts;
exports.newCtrlMessage = newCtrlMessage;
exports.editCtrlMessage = editCtrlMessage;
