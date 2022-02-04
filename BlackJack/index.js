//axios.get('./deck.js').then(res => console.log(res.data))

const game = () => {
    let hitBtn = document.getElementById('hit')
    let standBtn = document.getElementById('stand')
    let splitBtn = document.getElementById('split')
    let doubleBtn = document.getElementById('double')
    let surrenderBtn = document.getElementById('surrender')
    let runningRound = false
    let deck = new Deck()
    let players = [undefined, undefined, undefined, undefined, undefined]
    let activePlayerIndex = -1;
    let house = new House()

    function startRound() {
        dealCards()

    }

    function dealCards() {
        for (let i = 0; i < 2; i++) {

            house.giveCard(deck)

            for (let j = players.length - 1; j >= 0; j--) {
                if (players[j] !== undefined) {
                    players[j].giveCard(deck)
                }
            }

        }
    }

    function playerHit(index) {
        if(players[index].split === true){

        }
        else{
            players[index].giveCard(deck)
        }
    }

    function getPlayerIndex(e, callback){
        let playerIndex = parseInt(e.target.id.charAt(1)) - 1;
        if (!isNaN(playerIndex) && players[playerIndex] !== undefined){
            callback(playerIndex)
        }
    }

    function showBtns(){
        if(players[activePlayerIndex].cardPile.length === 2){
            doubleBtn.style.display = ''
            surrenderBtn.style.display = ''
        }
        else{
            doubleBtn.style.display = 'none'
            surrenderBtn.style.display = 'none'
        }
        if(players[activePlayerIndex].checkSplit()){
            splitBtn.style.display = ''
        }
        else{
            splitBtn.style.display = 'none'
        }
        hitBtn.style.display = ''
        standBtn.style.display = ''
    }

    return {
        playerJoin: e => {
            getPlayerIndex(e, (index) => {
                players[index] = new Player(document.getElementById(`p${index+1}`));
                e.target.style.display = 'none';
            })
        },
        betLock: e => {
            getPlayerIndex(e, (index => {
                players[index].betLock = true
            }))
            
            if (!runningRound) {
                let undefCount = 0;
                let playerLockCount = 0;
                players.forEach(player => {
                    if (player === undefined) {
                        undefCount++
                    } else if (player.betLock) {
                        playerLockCount++
                    }
                })
                if (undefCount + playerLockCount === 5) {
                    startRound()
                } else {
                    //tell all player to lock in their bets
                }
            }
        },
        addBet: e => {

        },


        hit: () => {
            players[activePlayerIndex].giveCard(deck)
        },
        stand: () => {

        },
        split: () => {
            players[activePlayerIndex].splitHand(deck)
        }
    }


}

let current = game();