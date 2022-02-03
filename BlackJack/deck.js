class Card {
    constructor(value, type) {
        this.value = value <= 10 ? value : 10;
        switch (type) {
            case 1:
                this.type = 'spade'
                break
            case 2:
                this.type = 'hearts'
                break
            case 3:
                this.type = 'diamonds'
                break
            case 4:
                this.type = 'clubs'
                break
            case 5:
                this.type = 'stopper'
                break
            default:
                this.type = 'number'
                break
        }
        switch (value) {
            case 1:
                this.name = 'Ace';
                break;
            case 11:
                this.name = 'Jack';
                break;
            case 12:
                this.name = 'Queen';
                break;
            case 13:
                this.name = 'King';
                break;
            default:
                break;
        }
    }
}

class Deck {
    constructor(decks = 1, cardStopper = 0) {
        this.decks = decks > 0 ? decks : 1;
        this.activePile = [];
        this.discardPile = [];
        this.cardPile = [];
        this.cardStopper = cardStopper !== 0 && this.decks > 2 ? cardStopper : false

        for (let i = 1; i <= decks; i++) {
            for (let j = 1; j <= 4; j++) {
                for (let k = 1; k <= 13; k++) {
                    this.cardPile.push(new Card(k, j))
                }
            }
        }

        this.shuffle()

    }

    shuffle() {
        let currentIndex = this.cardPile.length,
            randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this.cardPile[currentIndex], this.cardPile[randomIndex]] = [
                this.cardPile[randomIndex], this.cardPile[currentIndex]
            ];
        }

        if (this.cardStopper) {
            let index = this.cardPile.length - Math.floor(Math.random() * Math.floor(this.cardPile.length * 0.2))
            this.cardPile.splice(index, 0, new Card(0, 5));
        }

    }


}