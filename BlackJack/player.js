class Person{
    constructor(){
        this.cardPile = [];
        this.cardTotal = 0;
        this.aceTotal = 0;
        this.bust = false
    }

    evalCardValue(){
        this.cardTotal = 0;
        this.aceTotal = 0;
        this.cardPile.forEach(card =>{
            this.cardTotal += card.value;
            if(card.name === 'Ace'){
                this.aceTotal += 10
            }
            else{
                this.aceTotal += card.value
            }
        })
        this.checkBust()
    }

    checkBust(){
        if(this.aceTotal > 21 && this.cardTotal > 21){
            this.bust = true
        }
    }

    /**
     * 
     * @param {Deck} deck takes in the current deck then takes the top card from the deck and adds it to the players hand
     */
    giveCard(deck){
        this.cardPile.push(deck.getCard())
        this.evalCardValue()
    }

    /**
     * 
     * @param {Deck} deck takes in current deck then clears the players hand and adds those cards to the decks discard pile
     */
    discardHand(deck){
        deck.discardHand(this.cardPile)
        this.cardPile = []
    }
}

/**
 * 
 * @param {number} chips optional: default 1000 -- how many chips the player will start with
 */
class Player extends Person{
    constructor(chips = 1000){
        super()
        this.chips = chips;
        this.currentBet = 0;
    }

    checkBust(){
        if(this.aceTotal > 21 && this.cardTotal > 21){
            this.bust = true
            this.currentBet = 0
        }
    }
    

}


class House extends Person{
    constructor(){
        super()
    }
    
}