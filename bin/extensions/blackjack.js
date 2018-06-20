module.exports = {
    carddraw: function (n, Deck) {
        return carddraw(n, Deck)
    },
    acecheck: function () {
        return acecheck()
    },
    value: function () {
        return value()
    }
}



function deck(ranks, suits, jokers) {
    if (ranks == null) {
        this.ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
    } else {
        this.ranks = ranks
    }
    if (suits == null) {
        this.suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
    } else {
        this.suits = suits
    }
    if (jokers == null){
        this.jokers = 0;
    } else {
        this.jokers = jokers
    }
    this.cards = []
    for (n in this.suits) {
        for (m in this.ranks) {
            this.cards.push({
                "Rank": this.ranks[m],
                "Suit": this.suits[n]
            })
        }
    }
    if (this.jokers != null) {
        for (i = 0; i < this.jokers; i++) {
            this.cards.push({
                "Rank": "Joker",
                "Suit": "NaN"
            })
        }
    }
}

function value(n) {
    if (ranks[p - 1] === "Jack" || ranks[p - 1] === "King" || ranks[p - 1] == "Queen") {
        v = 10
    } else {
        v = p
    }
    return v
}

function carddraw(n, Deck) {
    if (n == null) {
        n = 4
    }
    if (Deck == null) {
        var Deck = new deck();
    }
    v = []
    for (i = 0; i < n && Deck.cards[0] != null; i++) {
        card = Math.floor(Math.random() * Deck.cards.length)
        v[i] = Deck.cards[card]
        Deck.cards.splice(card,1)
    }
    return v
}

function acecheck(card1, card2, v1, v2) {
    if (card1 === "Ace") {
        v1 = 11
    }
    if (card2 === "Ace") {
        v2 = 11
    }
    if (card1 === "Ace" && card2 === "Ace") {
        v1 = 11;
        v2 = 1;
    }
    return [v1, v2]
}