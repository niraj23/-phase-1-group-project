window.addEventListener('DOMContentLoaded', () => init())

const init = () => getTeams().then(teams => teams.forEach(el => makeTeamTiles(el)))

const getTeams = () => {
    return fetch('http://localhost:3000/teams').then(resp=>resp.json())
}

const makeTeamTiles = teamObj => {
    const teamContainer = document.getElementById('team-container')

    const teamTile = document.createElement('div')
    teamTile.className = "team-card"
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
        teamContainer.style.display = "None"
        document.getElementById('player-container').style.display = "flex"
    })
        //callback function to be provided by Niraj

    //Append tile to team container
    teamContainer.appendChild(teamTile)

}
