const cards = require('./cards');

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
async function createControlBox(channelid, message, reactList) {
    controlMessage = await bot.channels.get(channelid).send(message);
    for (i = 0; i < reactList; i++) {
        controlMessage.react(reactList[i]);
    }
    return controlMessage;
}
async function multiReact(message, emojiArray) {
    for (i = 0; i < emojiArray.length; i++) {
        await message.react(emojiArray[i]);
    }
}
exports.draw = draw;
exports.createControlBox = createControlBox;
exports.multiReact = multiReact;
