// window.addEventListener('DOMContentLoaded', () => init())

const init = () => {
    getTeams().then(teams => teams.forEach(el => makeTeamTiles(el)))
    teamSelectBttnEvent()
}

const getTeams = () => {
    return fetch('http://localhost:3000/teams').then(resp => resp.json())
}
//set up button functionality
function teamSelectBttnEvent() {
    const teamSelectBttn = document.getElementById('team-page-return')
    const teamContainer = document.getElementById('team-container')
    const playerContainer = document.getElementById('player-container')
    teamSelectBttn.addEventListener('click', () => {
        hider(playerContainer)
        teamContainer.style.display = "flex"
        teamSelectBttn.style.display = "none"
        deletePlayers()
    })
}
// function favoritePlayerBttnEvent() {
//     const favoritePlayerBttn = document.getElementById('team-page-return')
//     const teamContainer = document.getElementById('team-container')
//     const playerContainer = document.getElementById('player-container')
//     const favoriteContainer = document.getElementById('favorite-container')
//     favoritePlayerBttn.addEventListener('click', () => {
//         favoriteContainer.style.display = "flex"
//         hider(playerContainer)
//         hider(teamContainer)
//         deletePlayers()
//     })
// }

//Delete function to remove player cards from DOM
const deletePlayers = () => {
    const allPlayers = document.querySelectorAll('.sports-card-inner')
    allPlayers.forEach(el => el.remove())
}

//function to hide elements
const hider = element => {
    element.style.display = "none"
}


//Makes all the team tiles
const makeTeamTiles = teamObj => {
    //Grab necessary elements
    const teamContainer = document.getElementById('team-container')
    const playerContainer = document.getElementById('player-container')
    const favoriteContainer = document.getElementById('favorite-container')
    const teamSelectBttn = document.getElementById('team-page-return')
    
    //Create necessary elements and set relevant values
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

    //Add image into tile
    teamTile.appendChild(teamLogo)

    //Append tile to team container
    teamContainer.appendChild(teamTile)

    //Add functionality to team tile
    //Passing team id when clicked
    teamTile.addEventListener('click', e => {
        
        //hide teams and favorites
        hider(teamContainer)
        // hider(favoriteContainer)

        //display team selector return button
        teamSelectBttn.style.display = "block"

        //display playerscontainer
        playerContainer.style.display = "flex"

        //retrieve player images
        const teamIdInt = parseInt(e.target.parentNode.id,10)
        const teamPull = playerImages(teamIdInt)
        // console.log(playerImages(e.target.parentNode.id))
        //build player cards
        displayPlayers(teamIdInt,teamPull)

    })
}
//--------------------------------Makes all player cards--------------------------------------
const displayPlayers = (teamId,teamImgObj) => {
        let teamRoster = `https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster`;
        fetch(teamRoster)
        .then(resp => resp.json())
        .then(roster => {
            let rosterArray = roster.roster;
            rosterArray.forEach(player => playerCreators(player,teamImgObj))
        })
    }

const playerCreators = (players,teamImgObj) => {
    const playerContainer = document.getElementById('player-container')

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

    teamImgObj.then(playerImages => {
        cardImage.src = playerImages[players.person.fullName]
        console.log(cardImage)
    })
    
    // cardImage.src = teamImgObj.players[fullName]
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


//Function to return image src from db.json
//takes a player name and team id
//needs an array of objects made from a call to db.json
const getPlayerImage = (teamId,playerName) => {
    let playerImgPaths = playerImages(teamId)
    playerImgPaths.then(players => {
        //NEED TO DETERMINE HOW IMG ELEMENTS ARE BEING CREATED SO WE CAN CATCH THEM HERE AND SET IMAGE SOURCE
        const playerImgElement =  document.getElementById(`Img-${playerName}`)
        playerImgElement.src = players[playerName]
        playerImgElement.alt = `${playerName} Headshot`
        playerImgElement.title = `${playerName}`
    })
}

//Returns promise of object of selected team
const getTeam = (teamId) => {
    return fetch('http://localhost:3000/teams')
        .then(resp => resp.json())
        .then(teams => teams.find((el) => el.id === teamId))
    }

//Returns promise of object with list of player image paths 
const playerImages = (teamId) => {
    return getTeam(teamId).then(response => {
        console.trace(response)
        const playerImgs = {}
        response.players.forEach(el => {
            const playerName = el.espn_player_name
            const playerImg = el.player_image
            playerImgs[playerName] = playerImg
        })
        console.log(playerImgs)
        return playerImgs
        })
}

// playerImages(12)

init();
