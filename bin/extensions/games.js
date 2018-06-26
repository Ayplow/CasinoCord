const cards = require('./cards');
const {
    addReacts,
    delReacts,
    newCtrlMessage,
    editCtrlMessage,
} = require('./commands');
const Discord = require('discord.js');
const dealer = require('../../data/dealer.json');

function BlackJack(playerIds, deck) {
    this.deck = (deck == null ? new cards.BuildDeck() : deck);
    this.hit = function(player) {
        this.players[player].push(this.deck.carddraw(1)[0]);
    };
    this.stick = function(player) {

    };
    this.value = function(player) {
        // TODO: Finds value of 'hand' object passed, and returns total.
        // Hand object has format [{card1},{card2}] where card is {"Rank":"value","Suit":"value"}
        hand = this.players[player];
        let total = 0;
        for (let i of hand) {
            if (i['Rank'] == 'Ace') {
                total = ((total + 11) < 21 ? total += 11 : total += 1);
            } else {
                ['King', 'Queen', 'Jack'].includes(i['Rank']) ? total += 10 : total += parseInt(i['Rank'], 10);
            }
        }
        return total;
    };
    this.stringify = function(player) {
        let str = '';
        for (let j of this.players[player]) {
            str += 'A ' + j['Rank'] + ' of ' + j['Suit'] + ',\n';
        }
        return str;
    };
    this.winner = function() {
        // TODO: Evaluates all hands to find winner of game, then return winner ID, else return false
        let bestPlayer = '';
        let bestScore = 0;
        let dealerScore = this.value(this.dealer);
        for (let i of Object.keys(this.players)) {
            e = this.value(this.players[i]);
            if (e > bestScore) {
                bestPlayer = i;
                bestScore = e;
            }
        }
        if (bestScore > dealerScore) {
            return bestPlayer;
        } else {
            return false;
        }
    };
    this.dealer = [];
    this.players = {};
    for (let i of playerIds) {
        this.players[i] = [];
    }
    for (let i = 0; i < 2; i++) {
        for (let j of playerIds) {
            this.players[j].push(this.deck.carddraw(1)[0]);
        }
        this.dealer.push(this.deck.carddraw(1)[0]);
    }
}
async function blackjackCmd(message) {
    let channel = (!(message.channel.id in this.temp.channels) ? this.temp.channels[message.channel.id] = message.channel : this.temp.channels[message.channel.id]);
    if (!('blackjack' in channel)) {
        // Setup Code
        channel.blackjack = {};
        channel.blackjack.controlMessage = await newCtrlMessage(message.channel, 'Once everyone has joined, just hit ✅!', {}, ['🙋', '✅', '❌']);
        // channel.blackjack.game = new BlackJack([message.author.id]);
    } else {
        return 'Already defined';
    }
}
async function blackjackReact(messageReaction, user) {
    let channel = (!(messageReaction.message.channel.id in this.temp.channels) ? this.temp.channels[messageReaction.message.channel.id] = messageReaction.message.channel : this.temp.channels[messageReaction.message.channel.id]);
    if ('blackjack' in channel) {
        switch (messageReaction.emoji.name) {
            case '✅':
                await blackjackSetup.apply(this);
                break;
            case '❌':
                blackjackDestroy.apply(this, [user.username]);
                break;
            case '🔃':
                channel.blackjack.game.hit(user.id);
                fields = {};
                for (let i in channel.blackjack.game.players) {
                    fields[this.users.get(i).username] = channel.blackjack.game.stringify(i);
                }
                editCtrlMessage(channel.blackjack.controlMessage, user.username + ' hit!', fields);
                break;
            case '⏹':
                channel.blackjack.game.stick(user.id);
                break;
        }
    } else {
        return 'Blackjack game not built for this channel';
    }

    function blackjackDestroy(user) {
        if ('game' in channel.blackjack) {
            editCtrlMessage(channel.blackjack.controlMessage, 'Game over', {
                'Ended by:': user,
            });
        } else {
            channel.blackjack.controlMessage.delete();
        }
        delete channel['blackjack'];
    }
    async function blackjackSetup() {
        if (!('game' in channel.blackjack)) {
            playerIds = [];
            for (let [i, j] of await channel.blackjack.controlMessage.reactions.get('🙋').fetchUsers()) {
                if (!(j.bot)) {
                    playerIds.push(i);
                }
            }
            if (playerIds.length > 0) {
                channel.blackjack.game = new BlackJack(playerIds);
                fields = {};
                for (let i in channel.blackjack.game.players) {
                    fields[this.users.get(i).username] = channel.blackjack.game.stringify(i);
                }
                channel.blackjack.controlMessage = await newCtrlMessage(channel.blackjack.controlMessage, 'Game started', fields, ['🔃', '⏹', '❌']);
            }
        }
    }
};


exports.cards = cards;
exports.BlackJack = BlackJack;
exports.blackjackCmd = blackjackCmd;
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

    await bot.say(" Dealers card - %s \n Your cards - %s & %s \n Your card value - %s" % (dealer_card_one,player_cards[0],player_cards[1],total)) #*/
