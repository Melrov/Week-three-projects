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
    let activePlayerIndex;;
    let house = new House()

    function startRound() {
        console.log('starting round')
        activePlayerIndex = players.length
        dealCards()
        updateActivePlayer()
        showBtns()
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

    function getPlayerIndex(e, callback){
        let playerIndex = parseInt(e.target.id.charAt(1)) - 1;
        if (!isNaN(playerIndex)){
            callback(playerIndex)
        }
    }

    function updateActivePlayer() {
        for(let i = activePlayerIndex-1; i >= 0; i--){
            if(players[i] !== undefined){
                activePlayerIndex = i;
                console.log(players[activePlayerIndex])
                return
            }
        }
        house.play(deck, players)
    }


    function showBtns(){
        if(players[activePlayerIndex].cardPile.length === 2){
            if(players[activePlayerIndex].chips - players[activePlayerIndex].currentBet >= 0){
                doubleBtn.style.display = ''
            }
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

    function hideBtns(){
        hitBtn.style.display = 'none'
        standBtn.style.display = 'none'
        splitBtn.style.display = 'none'
        doubleBtn.style.display = 'none'
        surrenderBtn.style.display = 'none'
    }

    return {
        playerJoin: e => {
            getPlayerIndex(e, (index) => {
                players[index] = new Player(document.getElementById(`p${index+1}`));
                e.target.style.display = 'none';
            })
            console.log(players)
        },
        betLock: e => {
            getPlayerIndex(e, (index => {
                players[index].betLock = true
                console.log('betlock ' + index+1)
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
            if(players[activePlayerIndex].checkBust()){
                updateActivePlayer();
            }
            else{
                console.log(players[activePlayerIndex])
            }
            showBtns();
        },
        stand: () => {
            updateActivePlayer()
            showBtns()
        },
        split: () => {
            players[activePlayerIndex].splitHand(deck)
            showBtns()
        },
        double: () => {
            players[activePlayerIndex].double(deck)
            if(players[activePlayerIndex].checkBust()){
                updateActivePlayer();
            }
            showBtns()
        },
        surrender: () => {
            players[activePlayerIndex].surrender()
            updateActivePlayer()
            showBtns()
        }
    }


}

let current = game();