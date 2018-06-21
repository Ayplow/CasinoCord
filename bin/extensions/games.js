const cards = require('./cards');

function BlackJack(playerIds, deck, ranknames) {
    this.deck = (deck == null ? new cards.BuildDeck() : deck);
    this.ranknames = (ranknames == null ? ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'] : ranknames);
    this.dealer = {};
    this.players = {};
    this.value = function(n) {
        // TODO: Make a function to evalute a full hand's score (likely remove acecheck in the meantime) and return total, maybe return true if is blackjack?
        if (this.deck.ranks[p - 1] === 'Jack' || ranks[p - 1] === 'King' || ranks[p - 1] == 'Queen') {
            v = 10;
        } else {
            v = p;
        }
        return v;
    };
    this.winner = function() {
        // Evaluates all hands to find winner of game, then return winner ID, else return false
    };
    this.acecheck = function(card1, card2) {
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
    for (i = 0; i < playerIds.length; i++) {
        this.players[playerIds[i]] = [];
        this.players[playerIds[i]].push(this.deck.carddraw(2));
    }
}
exports.BlackJack = BlackJack;
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
