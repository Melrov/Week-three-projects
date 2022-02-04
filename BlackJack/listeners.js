let playerDivs = []

for (let i = 0; i < 5; i++) {
    playerDivs.push(document.getElementById(`p${i}`))
}

for(let i = 1; i <= playerDivs.length; i++){
    let joinBtn = document.createElement('button')
    joinBtn.id = `p${i}-join`
    joinBtn.addEventListener('click', current.playerJoin)
    playerDivs[i].append(joinBtn)
}