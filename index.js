const init = () => getTeams().then(teams => teams.forEach(el => makeTeamTiles(el)))

const getTeams = () => {
    return fetch('http://localhost:3000/teams').then(resp=>resp.json())
}
//Declare variables that are consistently referenced
const teamSelectBttn = document.getElementById('team-page-return')
const teamContainer = document.getElementById('team-container')
const playerContainer = document.getElementById('player-container')

teamSelectBttn.addEventListener('click', () =>{
    hider(playerContainer)
    teamContainer.style.display = "flex" 
    deletePlayers()
})

//Makes all the team tiles
const makeTeamTiles = teamObj => {
    
    const teamTile = document.createElement('div')
    teamTile.className = "team-card"
    teamTile.id = teamObj.id
    teamTile.style.borderColor = teamObj.colors.secondary

    const teamLogo = document.createElement('img')

    teamLogo.src = teamObj.image
    teamLogo.className = "team-logo"
    teamLogo.id = `team-${teamObj.id}`
    teamLogo.alt = `${teamObj.teamName} Logo`
    teamLogo.title = `${teamObj.teamName}`

    teamTile.appendChild(teamLogo)
    
    //Add functionality to team tile
    //Passing team id when clicked
    teamTile.addEventListener('click', () => {
        //hide teams
        hider(teamContainer)
        //display team selector return button
        teamSelectBttn.style.display = "block"
        //display playerscontainer
        playerContainer.style.display = "flex"
        //build player cards
        displayPlayers(teamObj)
    })
    //Append tile to team container
    teamContainer.appendChild(teamTile)
}

const displayPlayers = (teamObj) => {
    teamObj.players.forEach(players => playerCreators(players))
}

const playerCreators = (players) => {
    const backInfo = document.createElement("h4")
    const cardBack = document.createElement("div")
    const cardInner = document.createElement("div")
    const cardFront = document.createElement("div")
    const cardImage = document.createElement("img")
    const cardName = document.createElement("h3")
    const likeBttn = document.createElement("button")

    cardFront.className = "card__face card__face--front"
    backInfo.className = "back-info"
    cardBack.className = "card__face card__face--back"

    cardInner.id = `${players.idPlayer}`
    cardInner.className = "sports-card-inner"
    cardInner.style.borderColor = players.primary

    cardInner.onmouseover = function () {
        var colorString = '0px 8px 16px 0px ' + players.secondary
        this.style['box-shadow'] = colorString
        this.style['-webkit-box-shadow'] = colorString
        this.style['-moz-box-shadow'] = colorString
    }
    cardInner.onmouseout = function () {
        this.style['box-shadow'] = "none"
        this.style['-webkit-box-shadow'] = "none"
        this.style['-moz-box-shadow'] = "none"
    }

    cardImage.src = players.player_image
    cardImage.className = 'card-image'
    cardName.textContent = players.espn_player_name

    likeBttn.className = "like-bttn"
    likeBttn.textContent = "♥"

    backInfo.textContent = "Hey if you see this you got the card to flip"

    cardFront.append(cardImage, cardName, likeBttn)
    cardBack.append(backInfo)
    cardInner.append(cardFront, cardBack)
    playerContainer.appendChild(cardInner)


    cardInner.addEventListener("click", function () {
        cardInner.classList.toggle('is-flipped')
    })
}


//Delete function to remove player cards from DOM
const deletePlayers = () => {
    const allPlayers = document.querySelectorAll('.sports-card-inner')
    allPlayers.forEach(el => el.remove())
}

//function to hide elements
const hider = element => {
    element.style.display = "none"
}

//Call the entire app
init()
