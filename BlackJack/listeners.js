let playerJoinDivs = []
let playerLockBetDivs = []
for (let i = 1; i <= 5; i++) {
    playerJoinDivs.push(document.getElementById(`p${i}-join`))
    playerLockBetDivs.push(document.getElementById(`p${i}-lockBet`))
}

for(let i = 0; i < playerJoinDivs.length; i++){
    playerJoinDivs[i].addEventListener('click', current.playerJoin)
    playerLockBetDivs[i].addEventListener('click', current.betLock)
}

let hit = document.getElementById('hit')
hit.addEventListener('click', current.hit)

let stand = document.getElementById('stand')
stand.addEventListener('click', current.stand)

let split = document.getElementById('split')
split.addEventListener('click', current.split)

let double = document.getElementById('double')
double.addEventListener('click', current.double)

let surrender = document.getElementById('surrender')
surrender.addEventListener('click', current.surrender)