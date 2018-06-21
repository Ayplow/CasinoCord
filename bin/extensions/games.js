const cards = require('./cards');
const {
    multiReact,
} = require('./commands');
const Discord = require('discord.js');

function BlackJack(playerIds, deck) {
    this.deck = (deck == null ? new cards.BuildDeck() : deck);
    this.dealer = {};
    this.players = {};
    this.value = function (hand) {
        // TODO: Finds value of 'hand' object passed, and returns total.
        // Hand object has format [{card1},{card2}] where card is {"Rank":"value","Suit":"value"}
        total = 0;
        for (i = 0; i < hand.length; i++) {
            facecardCheck = (hand[i]['Rank'] == 'King' || hand[i]['Rank'] == 'Queen' || hand[i]['Rank'] == 'Jack' ? total += 10 : parseInt(hand[i]['Rank'], 10));
        }
        for (i = 0; i < hand.length; i++) {
            if (hand[i]['Rank'] == 'Ace') {
                if ((total + 11) < 21) {
                    total += 11;
                } else {
                    total += 1;
                }
            }
        }
    };
    this.winner = function () {
        // TODO: Evaluates all hands to find winner of game, then return winner ID, else return false
    };
    this.acecheck = function (card1, card2) {
        if (card1 === 'Ace') {
            v1 = 11;
        }
        if (card2 === 'Ace') {
            v2 = 11;
        }
        if (card1 === 'Ace' && card2 === 'Ace') {
            v1 = 11;
            v2 = 1;
        }
        return [v1, v2];
    };
    let i = 0;
    while (i < playerIds.length) {
        if (playerIds[i].bot) {
            playerIds.splice(i, 1);
        } else {
            this.players[playerIds[i]] = [];
            this.players[playerIds[i]] = this.players[playerIds[i]].concat(this.deck.carddraw(2));
            i = i + 1;
        }
    }
}
async function blackjack(message) {
    let channel = (this.temp.channels[message.channel.id] == undefined ? this.temp.channels[message.channel.id] = {} : this.temp.channels[message.channel.id]);
    if (channel.blackjack == null) {
        // Setup Code
        channel.blackjack = {};
        channel.blackjack.controlEmbed = new Discord.RichEmbed({
            'description': 'Once everyone has joined, just hit ✅!',
        });
        channel.blackjack.controlMessage = await message.channel.send(channel.blackjack.controlEmbed);
        multiReact(channel.blackjack.controlMessage, ['🙋', '✅']);
        // channel.blackjack.game = new BlackJack([message.author.id]);
    } else {
        return 'Already defined';
    }
}
async function blackjackReact(messageReaction, user) {
    let channel = (this.temp.channels[messageReaction.message.channel.id] == undefined ? this.temp.channels[messageReaction.message.channel.id] = {} : this.temp.channels[messageReaction.message.channel.id]);
    if (channel.blackjack != null) {
        if (channel.blackjack.game == null) {
            if (messageReaction.emoji == '✅') {
                channel.blackjack.game = new BlackJack(channel.blackjack.controlMessage.reactions.get('🙋').users.array());
                let s = '';
                for (j in channel.blackjack.game.players) {
                    s = s + j + ': ';
                    for (k in channel.blackjack.game.players[j]) {
                        s = s + 'A ' + channel.blackjack.game.players[j][k]['Rank'] + ' of ' + channel.blackjack.game.players[j][k]['Suit'] + ',\n';
                    }
                    //                    v = v + ' and a ' + n[n.length - 1]['Rank'] + ' of ' + n[n.length - 1]['Suit'];
                }
                channel.blackjack.controlEmbed['description'] = 'Players:\n' + s;
                channel.blackjack.controlMessage.edit(channel.blackjack.controlEmbed);
            }
        } else {}
    } else {
        return 'Blackjack game not built for this channel';
    }
}
exports.cards = cards;
exports.BlackJack = BlackJack;
exports.blackjack = blackjack;
exports.blackjackReact = blackjackReact;
/*
async def blackjack(ctx):
    global blackjack_started
    blackjack_started = True
    global player_cards,dealer_cards
    convert = mod.convert
    player_cards = []
    dealer_cards = []

    global p1,p2,e1,e2
    p1,p2,e1,e2 = mod.carddraw()

    global player_card_one,player_card_two,dealer_card_one,dealer_card_two
    player_card_one = convert[p1-1]
    player_card_two = convert[p2-1]
    dealer_card_one = convert[e1-1]
    dealer_card_two = convert[e2-1]

    player_cards.append(player_card_one)
    player_cards.append(player_card_two)
    dealer_cards.append(dealer_card_one)
    dealer_cards.append(dealer_card_two)

    global v1,v2,ev1,ev2

    v1 = mod.value(p1)
    v2 = mod.value(p2)
    ev1 = mod.value(e1)
    ev2 = mod.value(e2)

    v1,v2 = mod.acecheck(player_card_one,player_card_two,v1,v2)
    ev1,ev2 = mod.acecheck(dealer_card_one,dealer_card_two,ev1,ev2)
    global dealer_total
    dealer_total = ev1 + ev2
    global total
    total = v1 + v2
    dealer_total = dealer_total
    print_cards = {}
    for i in range(0,len(player_cards)):
        print_cards[i] = player_cards[i]

    await bot.say(" Dealers card - %s \n Your cards - %s & %s \n Your card value - %s" % (dealer_card_one,player_cards[0],player_cards[1],total))
*/