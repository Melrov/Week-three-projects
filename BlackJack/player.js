class Person {
    constructor(div) {
        this.cardPile = [];
        this.cardTotal = 0;
        this.aceTotal = 0;
        this.bust = false
        this.div = div
    }

    evalCardValue() {
        this.cardTotal = 0;
        this.aceTotal = 0;
        this.cardPile.forEach(card => {
            this.cardTotal += card.value;
            if (card.name === 'Ace') {
                this.aceTotal += 10
            } else {
                this.aceTotal += card.value
            }
        })
        this.checkBust()
    }

    checkBust() {
        if (this.aceTotal > 21 && this.cardTotal > 21) {
            this.bust = true
        }
    }

    /**
     * 
     * @param {Deck} deck takes in the current deck then takes the top card from the deck and adds it to the players hand
     */
    giveCard(deck) {
        this.cardPile.push(deck.getCard())
        this.evalCardValue()
    }

    /**
     * 
     * @param {Deck} deck takes in current deck then clears the players hand and adds those cards to the decks discard pile
     */
    discardHand(deck) {
        deck.discardHand(this.cardPile)
        this.cardPile = []
    }
}

/**
 * 
 * @param {htmlElement} div the html element container of the player
 * @param {number} chips optional: default 1000 -- how many chips the player will start with
 */
class Player extends Person {
    constructor(div, chips = 1000) {
        super(div)
        this.chips = chips;
        this.currentBet = 0;
        this.betLock = false

        this.split = false
        this.splitAvailable = false

        this.splitPileL = []
        this.leftAceTotal = 0;
        this.leftCardTotal = 0;
        this.leftBust = false;
        this.betL = 0;

        this.splitPileR = []
        this.rightAceTotal = 0;
        this.rightCardTotal = 0;
        this.rightBust = false;
        this.betR = 0;
    }

    giveCard(deck) {
        if (!this.split) {
            super.giveCard(deck)
            this.checkSplit()
        } else {

        }
    }

    checkSplit() {
        if (this.cardPile.length === 2 && this.chips - this.currentBet !== 0) {

        } else {
            this.splitAvailable = false
            return false
        }
    }

    checkBust() {
        if (!this.split) {
            if (this.aceTotal > 21 && this.cardTotal > 21) {
                this.bust = true
                this.currentBet = 0
            }
        }
        else{

        }
    }

    lockBet() {
        this.betLock = !this.betLock
    }

    splitHand(deck) {
        if (this.splitAvailable) {
            this.split = true
            this.splitAvailable = false

            this.splitPileL = this.cardPile[0]
            this.splitPileR = this.cardPile[1]
            this.cardPile = []

            this.betL = this.currentBet;
            this.betR = this.currentBet;
            this.chips -= this.currentBet
            this.currentBet = 0;

            this.splitPileL.push(deck.getCard())
            this.splitPileR.push(deck.getCard())
        }
    }

}


class House extends Person {
    constructor(div) {
        super(div)
    }

}