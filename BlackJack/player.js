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
            this.currentBet = 0
            return true
        }
        return false
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
        this.isActiveLeft = true
    }

    giveCard(deck) {
        if (!this.split) {
            super.giveCard(deck)
            this.checkSplit()
        } else {
            if (this.isActiveLeft) {
                this.splitPileL.push(deck.getCard())
            }
        }
    }

    evalSplitValue() {
        if (this.isActiveLeft) {
            this.leftCardTotal = 0;
            this.leftAceTotal = 0;
            this.splitPileL.forEach(card => {
                this.leftCardTotal += card.value;
                if (card.name === 'Ace') {
                    this.leftAceTotal += 10
                } else {
                    this.leftAceTotal += card.value
                }
            })
            this.checkBust()
        } else {
            this.rightCardTotal = 0;
            this.rightAceTotal = 0;
            this.splitPileL.forEach(card => {
                this.rightCardTotal += card.value;
                if (card.name === 'Ace') {
                    this.rightAceTotal += 10
                } else {
                    this.rightAceTotal += card.value
                }
            })
            this.checkBust()
        }
    }

    checkSplit() {
        if (this.cardPile.length === 2 && this.chips - this.currentBet !== 0) {
            if (this.cardPile[0].value === this.cardPile[1].value) {
                this.splitAvailable = true
                return true
            }
            return false
        } else {
            this.splitAvailable = false
            return false
        }
    }

    checkBust() {
        if (!this.split) {
            super.checkBust()
        } else {
            return this.splitCheckBust()
        }
    }
    splitCheckBust() {
        if (this.isActiveLeft) {
            if (this.splitPileL.aceTotal > 21 && this.splitPileL.cardTotal > 21) {
                this.leftBust = true
                this.betL = 0
                return true
            }
            return false
        } else {
            if (this.splitPileR.aceTotal > 21 && this.splitPileR.cardTotal > 21) {
                this.rightBust = true
                this.betR = 0
                return true
            }
            return false
        }
    }

    discardHand(deck) {
        if (!this.split) {
            super.discardHand(deck)
        } else {
            deck.discardHand(this.splitPileL)
            this.splitPileL = []
            deck.discardHand(this.splitPileR)
            this.splitPileR = []
        }
    }

    lockBet() {
        this.betLock = !this.betLock
    }

    splitHand(deck) {
        if (this.splitAvailable) {
            this.split = true
            this.splitAvailable = false

            this.splitPileL.push(this.cardPile[0])
            this.splitPileR.push(this.cardPile[1])
            this.cardPile = []

            this.betL = this.currentBet;
            this.betR = this.currentBet;
            this.chips -= this.currentBet
            this.currentBet = 0;

            this.splitPileL.push(deck.getCard())
            this.splitPileR.push(deck.getCard())
        }
    }

    double() {
        if (chips - this.currentBet >= 0) {
            this.chips -= this.currentBet
            this.currentBet *= 2
            this.giveCard(deck)
        }
    }

    surrender() {
        this.chips += this.currentBet / 2;
        this.bust = true;
    }

}


class House extends Person {
    constructor(div) {
        super(div)
    }

    houseWin(players) {
        players.forEach(player => {
            if (player !== undefined && !player.bust) {
                if (player.cardTotal >= this.cardTotal) {
                    return false
                }
                if (player.aceTotal <= 21 && player.aceTotal > this.cardTotal) {
                    return false
                }
            }
        })
        return true
    }

    play(deck, players) {
        let running = true
        while (running) {
            if (this.checkBust() && !this.houseWin(players)) {
                if (this.cardTotal < 17 || this.aceTotal < 17) {
                    this.giveCard(deck)
                } else {
                    running = false
                }
            } else {
                running = false
            }
        }
        if (this.houseWin(players)) {
            players.forEach(player => {
                if (player !== undefined) {
                    player.currentBet = 0;
                    player.discardHand(deck)
                }
            })
        }

    }

}