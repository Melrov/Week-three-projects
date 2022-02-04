//axios.get('./deck.js').then(res => console.log(res.data))

const game = () => {
    let runningRound = false
    let deck = new Deck()
    let players = [undefined, undefined, undefined, undefined, undefined]
    let player = new Player()
    let house = new House()

    house.giveCard(deck)
    player.giveCard(deck)
    house.giveCard(deck)
    player.giveCard(deck)

    console.log(house)
    console.log(player)

    const board = document.getElementById('board')
    let hitBtn = document.createElement('button')
    hitBtn.innerText = 'hello'
    hitBtn.addEventListener('click', () => {
        player.giveCard(deck)
        console.log(player)
    })
    board.append(hitBtn)
    // document.getElementById('a').addEventListener('click', (e) => {
    //     e.target.id
    // })

    function runRound(){
        dealCards()

    }

    function dealCards(){
        for(let i = 0; i < 2; i++){

            house.giveCard(deck)

            for(let j = players.length-1; j >= 0; j--){
                if(player[j] !== undefined){
                    players[j].giveCard(deck)
                }
            }

        }
    }

    function()
    
    return{
        startRound: () => {
            if(!runningRound){
                runRound()
            }
        },
        hit: (e){

        }
    }

    
}

let current = game();