//axios.get('./deck.js').then(res => console.log(res.data))

const game = () => {
    let hitBtn = document.getElementById('hit')
    let standBtn = document.getElementById('stand')
    let splitBtn = document.getElementById('split')
    let doubleBtn = document.getElementById('double')
    let surrenderBtn = document.getElementById('surrender')

    let playerScoreDiv = []
    let playerChipsDiv = []
    for (let i = 1; i <= 5; i++) {
        playerScoreDiv.push(document.getElementById(`p${i}-score`))
        playerChipsDiv.push(document.getElementById(`p${i}-chips`))
    }

    let playerBetSec = document.querySelectorAll('.bet-sec')
    let houseDiv = document.getElementById('house-cards')
    let houseScoreDiv = document.getElementById('house-score')
    let arrows = document.querySelectorAll('.arrow')
    let betzone = document.querySelectorAll('.chip-drop-zone')

    let runningRound = false
    let deck = new Deck()
    let players = [undefined, undefined, undefined, undefined, undefined]
    let activePlayerIndex;
    let house = new House()

    function startRound() {
        runningRound = true
        hideBetSec()
        hideAllPlayerCards()
        console.log('starting round')
        activePlayerIndex = players.length
        dealCards()
        showHouseCard()
        showPlayerScore()
        updateActivePlayer()
        showBtns()
    }

    function dealCards() {
        for (let i = 0; i < 2; i++) {

            house.giveCard(deck)

            for (let j = players.length - 1; j >= 0; j--) {
                if (players[j] !== undefined) {
                    players[j].giveCard(deck)
                    showPlayerCard(j)
                }
            }

        }
    }

    function getPlayerIndex(e, callback) {
        let playerIndex = parseInt(e.target.id.charAt(1)) - 1;
        if (!isNaN(playerIndex)) {
            callback(playerIndex)
        }
    }

    function showHouseCard() {
        console.log(houseScoreDiv)
        houseDiv.innerText = house.cardPile[0].cardText
        houseScoreDiv.innerText = house.cardPile[0].value
        houseScoreDiv.style.display = 'inline-block'
        houseDiv.style.backgroundColor = 'white'
        houseDiv.style.border - '2px solid black'
        houseScoreDiv.style.backgroundColor = 'gray'
    }


    function showPlayerScore() {
        for (let i = 0; i < players.length; i++) {
            if (players[i] !== undefined) {
                playerScoreDiv[i].style.display = 'inline-block'
                playerScoreDiv[i].innerText = players[i].aceTotal === players[i].cardTotal ? `${players[i].cardTotal}` : players[i].aceTotal > 21 ? `${players[i].cardTotal}` : `${players[i].cardTotal} / ${players[i].aceTotal}`
                if (players[i].cardTotal > 21) {
                    playerScoreDiv[i].style.backgroundColor = "red"
                } else {
                    playerScoreDiv[i].style.backgroundColor = "gray"
                }
            }
        }
    }

    function updateActivePlayer() {
        for (let i = activePlayerIndex - 1; i >= 0; i--) {
            if (players[i] !== undefined) {
                activePlayerIndex = i;
                console.log(players[activePlayerIndex])
                showArrows()
                return
            }
        }
        console.log('--------------')
        console.log(players[activePlayerIndex])
        console.log(house)
        activePlayerIndex = -1
        showArrows()
        house.play(deck, players, houseDiv, houseScoreDiv, playerScoreDiv)
        for (let i = 0; i < 5; i++) {
            if (players[i] !== undefined) {
                playerBetSec[i].childNodes[3].innerText = players[i].chips
                clearBetZone(i)
            }
        }
        runningRound = false
        unLockBets()
        showBetSec()
    }

    function unLockBets() {
        players.forEach(player => {
            if (player !== undefined) {
                player.betLock = false
            }
        })
    }

    function showBtns() {
        if (runningRound) {
            if (players[activePlayerIndex].cardPile.length === 2) {
                if (players[activePlayerIndex].chips - players[activePlayerIndex].currentBet >= 0) {
                    doubleBtn.style.display = 'inline-block'
                }
                surrenderBtn.style.display = 'inline-block'
            } else {
                doubleBtn.style.display = 'none'
                surrenderBtn.style.display = 'none'
            }
            if (players[activePlayerIndex].checkSplit()) {
                splitBtn.style.display = 'inline-block'
            } else {
                splitBtn.style.display = 'none'
            }
            hitBtn.style.display = 'inline-block'
            standBtn.style.display = 'inline-block'
        } else {
            hideBtns()
        }
    }

    function hideBtns() {
        hitBtn.style.display = 'none'
        standBtn.style.display = 'none'
        splitBtn.style.display = 'none'
        doubleBtn.style.display = 'none'
        surrenderBtn.style.display = 'none'
    }

    function showPlayerCard(i = activePlayerIndex) {
        console.log(players[i].cardPile)
        let span = document.createElement('span')
        if (players[i].cardPile.length !== 1) span.style.position = 'absolute';
        if(players[i].cardPile.length === 1) span.style.paddingTop = '5px'
        span.style.top = `${(players[i].cardPile.length - 1) * 3}px`
        span.style.left = `${(players[i].cardPile.length - 1) * 22}px`
        span.style.transform = `rotate(${(players[i].cardPile.length - 1) * 6}deg)`
        let typeNum = players[i].cardPile[players[i].cardPile.length - 1].typeNum
        span.style.color = typeNum > 2 ? 'red' : 'black'
        span.style.zIndex = '200'
        span.innerText = players[i].cardPile[players[i].cardPile.length - 1].cardText
        span.style.backgroundColor = 'white'
        span.style.border = '2px solid black'
        players[i].div.append(span)
    }

    function hideAllPlayerCards() {
        players.forEach(player => {
            if (player !== undefined) {
                console.log(player.div.childNodes)
                if (player.div.childNodes && player.div.childNodes.length > 0) {
                    //console.log(main.childNodes.length);
                    for (let i = player.div.childNodes.length - 1; i >= 0; i--) {
                        player.div.childNodes[i].remove();
                    }
                }
            }
        })
    }

    function showArrows() {
        arrows.forEach(arrow => {
            arrow.style.display = 'none'
        })
        if (activePlayerIndex !== -1) {
            arrows[activePlayerIndex].style.display = 'inline-block'
        }
    }

    function hideBetSec() {
        playerBetSec.forEach(sec => {
            sec.style.display = 'none'
        })
    }

    function showBetSec() {
        for (let i = 0; i < players.length; i++) {
            if (players[i] !== undefined) {
                playerBetSec[i].style.display = 'flex'
            }
        }
    }

    function clearBetZone(index) {
        if (betzone[index].childNodes.length > 0) {
            for (let i = betzone[index].childNodes.length - 1; i >= 0; i--) {
                betzone[index].childNodes[i].remove()
            }
        }
    }

    function showBetChips(index) {
        clearBetZone(index)
        let bet = players[index].currentBet

        for (let i = Math.floor(bet / 500); i > 0; i--) {
            bet -= 500
            let appendChip = document.createElement('img')
            appendChip.src = `./public/images/500-chip.png`
            appendChip.classList.add('chip-img-bet')
            betzone[index].append(appendChip)
        }
        for (let i = Math.floor(bet / 100); i > 0; i--) {
            bet -= 100
            let appendChip = document.createElement('img')
            appendChip.src = `./public/images/100-chip.png`
            appendChip.classList.add('chip-img-bet')
            betzone[index].append(appendChip)
        }
        for (let i = Math.floor(bet / 50); i > 0; i--) {
            bet -= 50
            let appendChip = document.createElement('img')
            appendChip.src = `./public/images/50-chip.png`
            appendChip.classList.add('chip-img-bet')
            betzone[index].append(appendChip)
        }
        for (let i = Math.floor(bet / 10); i > 0; i--) {
            bet -= 10
            let appendChip = document.createElement('img')
            appendChip.src = `./public/images/10-chip.png`
            appendChip.classList.add('chip-img-bet')
            betzone[index].append(appendChip)
        }
        for (let i = Math.floor(bet / 5); i > 0; i--) {
            bet -= 5
            let appendChip = document.createElement('img')
            appendChip.src = `./public/images/5-chip.png`
            appendChip.classList.add('chip-img-bet')
            betzone[index].append(appendChip)
        }
    }

    return {
        playerJoin: e => {
            getPlayerIndex(e, (index) => {
                playerBetSec[index].style.display = 'flex'
                players[index] = new Player(document.getElementById(`p${index+1}-hand`));
                e.target.style.display = 'none';
            })
            console.log(players)
        },
        betLock: e => {
            getPlayerIndex(e, (index => {
                players[index].betLock = true
                playerBetSec[index].style.display = 'none'
                console.log('betlock ' + (index + 1))
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
            let index = parseInt(e.target.id.charAt(1)) - 1


            if (players[index].chips - parseInt(e.target.id.substr(8)) >= 0) {
                players[index].addBet(parseInt(e.target.id.substr(8)))
            }
            playerBetSec[index].childNodes[3].innerText = players[index].chips

            showBetChips(index)

        },


        hit: () => {
            if (runningRound) {
                players[activePlayerIndex].giveCard(deck)
                showPlayerScore()
                showPlayerCard()
                console.log(players[activePlayerIndex])
                if (players[activePlayerIndex].checkBust() || players[activePlayerIndex].cardTotal === 21 || players[activePlayerIndex].aceTotal === 21) {
                    updateActivePlayer();
                } else {

                }
                showBtns();
            }
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
            showBetChips(activePlayerIndex)
            showPlayerScore()
            showPlayerCard()
            console.log(players[activePlayerIndex])
            if (players[activePlayerIndex].checkBust()) {
                updateActivePlayer();
            }
            showBtns()
        },
        surrender: () => {
            players[activePlayerIndex].surrender()
            playerScoreDiv[activePlayerIndex].style.backgroundColor = 'red'
            updateActivePlayer()
            showBtns()
        }
    }


}

let current = game();