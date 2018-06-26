function BuildDeck(ranks, suits, shuffled, jokers) {
    this.ranks = (ranks == null ? ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'] : ranks);
    this.suits = (suits == null ? ['Hearts', 'Diamonds', 'Clubs', 'Spades'] : suits);
    this.shuffled = (shuffled == null ? true : shuffled);
    this.jokers = (jokers == null ? 0 : jokers);
    this.cards = [];
    this.carddraw = function(n) {
        let m = (n == null ? 4 : n);
        let v = [];
        for (i = 0; i < m && this.cards[0] != null; i++) {
            v[i] = this.cards[this.cards.length-1];
            this.cards.splice(this.cards.length-1, 1);
        }
        return v;
    };
    this.cardadd = function(v) {
        let n = 0;
        while (n < v.length) {
            this.cards.unshift(v[n]);
            n++;
        }
        return n;
    };
    this.shuffle = function() {
        let i = this.cards.length;
        while (i > 0) {
            let index = Math.floor(Math.random() * i);
            i -= 1;
            let temp = this.cards[i];
            this.cards[i] = this.cards[index];
            this.cards[index] = temp;
        }
    };
    for (let n = 0; n < this.suits.length; n++) {
        for (let m = 0; m < this.ranks.length; m++) {
            this.cards.push({
                'Rank': this.ranks[m],
                'Suit': this.suits[n],
            });
        }
    }
    if (this.shuffled) {
        this.shuffle();
    }
    if (this.jokers != null) {
        for (let i = 0; i < this.jokers; i++) {
            this.cards.push({
                'Rank': 'Joker',
                'Suit': 'NaN',
            });
        }
    }
}

exports.BuildDeck = BuildDeck;
