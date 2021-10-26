window.addEventListener('DOMContentLoaded', () => init())

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
    
    const teamContainer = document.getElementById('team-container')

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

//Append tile to team container
    teamContainer.appendChild(teamTile)

//Add functionality to team tile
    //Passing team id when clicked
    teamTile.addEventListener('click', e => {
        const playerContainer = document.getElementById('player-container')
        //hide teams
        hider(teamContainer)
        //grab team return button
        const teamSelectBttn = document.getElementById('team-page-return')
        //display team selector return button
        teamSelectBttn.style.display = "block"
        //display playerscontainer
        playerContainer.style.display = "flex"
        //build player cards
        // nirajCallbackFunction(e.target.id)
    })

}

//Makes all player cards
const nirajCallbackFunction = teamId => {
    console.log('something')
}


