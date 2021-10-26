window.addEventListener('DOMContentLoaded', () => init())

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
    teamTile.addEventListener('click', e => {
        //hide teams
        hider(teamContainer)
        //display team selector return button
        teamSelectBttn.style.display = "block"
        //display playerscontainer
        playerContainer.style.display = "flex"
        //build player cards
        nirajCallbackFunction(e.target.id)
    })
    //Append tile to team container
    teamContainer.appendChild(teamTile)
}

//Makes all player cards
const nirajCallbackFunction = teamId => {
    console.log('something')
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