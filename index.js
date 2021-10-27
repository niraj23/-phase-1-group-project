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


// Landon's code section

const fetchTeamsArray = () => {
    fetch('https://statsapi.web.nhl.com/api/v1/teams')
    .then(resp => resp.json())
    .then(teams => {
        let teamsArray = teams.teams;
        teamsArray.forEach(team => {
            fetchRoster(team);
        })
    })
};
fetchTeamsArray()

const fetchRoster = (team) => {
    let teamURL = team.link;
    let teamRoster = `https://statsapi.web.nhl.com${teamURL}/roster`;
    fetch(teamRoster)
    .then(resp => resp.json())
    .then(roster => {
        let rosterArray = roster.roster;
        rosterArray.forEach(player => parsePlayerStats(player))
    })
}
// all previous lines should be unnecessary once parsePlayerStats function (below) is passed to Niraj's players.forEach

const parsePlayerStats = (player) => {
    let playerName = player.person.fullName;
    let id = player.person.id;
    let playerPosition = player.position.name;

    let playerURL = player.person.link;
    let playerStats = `https://statsapi.web.nhl.com${playerURL}/stats?stats=statsSingleSeason&season=20202021`;

    fetch(playerStats)
    .then(resp => resp.json())
    .then(stats => {

        let statsArray = stats.stats[0].splits[0].stat;
        
        const createPlayerStats = (statsArray) => {

            let playerPositionAbbrev = player.position.code;

            // return differing stats object if player is a goalie
            if (playerPositionAbbrev === 'G') {
                let playerObject = {
                    "timeOnIce": statsArray.timeOnIce,
                    "shutouts": statsArray.shutouts,
                    "saves": statsArray.saves,
                    "games": statsArray.games
                };
                createGoalieCard(playerObject, playerName, playerPosition, id);
            } else {
                let playerObject = {
                    "assists": statsArray.assists,
                    "shots": statsArray.shots,
                    "goals": statsArray.goals,
                    "timeOnIce": statsArray.timeOnIce,
                    "games": statsArray.games
                };
                createPlayerCard(playerObject, playerName, playerPosition, id);
            }
        }
        createPlayerStats(statsArray);
    })
    .catch(error => console.log('Error:', error))
}

const createGoalieCard = (playerObject, playerName, playerPosition, id) => {
    let statsList = `
    <ul>
        <li>Name: ${playerName}</li>
        <li>Position: ${playerPosition}</li>
        <li>Time on Ice: ${playerObject.timeOnIce}</li>
        <li>Shutouts: ${playerObject.shutouts}</li>
        <li>Saves: ${playerObject.saves}</li>
        <li>Games: ${playerObject.games}</li>
    </ul>`;
    console.log(statsList);
};

const createPlayerCard = (playerObject, playerName, playerPosition, id) => {
    let statsList = `
    <ul>
        <li>Name: ${playerName}</li>
        <li>Position: ${playerPosition}</li>
        <li>Time on Ice: ${playerObject.timeOnIce}</li>
        <li>Shots: ${playerObject.shots}</li>
        <li>Goals: ${playerObject.goals}</li>
        <li>Assists: ${playerObject.assists}</li>
        <li>Games: ${playerObject.games}</li>
    </ul>`;
    console.log(statsList);
}
