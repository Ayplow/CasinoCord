function buildDeck(ranks, suits, jokers) {
    this.ranks = (ranks == null ? ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"] : ranks)
    this.suits = (suits == null ? ["Hearts", "Diamonds", "Clubs", "Spades"] : suits)
    this.jokers = (jokers == null ? 0 : jokers)
    this.carddraw = function (n) {
        let n = (n == null ? 4 : n)
        let v = []
        for (i = 0; i < n && this.cards[0] != null; i++) {
            card = Math.floor(Math.random() * this.cards.length)
            v[i] = this.cards[card]
            this.cards.splice(card, 1)
        }
        return v
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

exports.buildDeck = buildDeck;