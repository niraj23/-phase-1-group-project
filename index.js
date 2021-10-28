// window.addEventListener('DOMContentLoaded', () => init())

const init = () => {
    getTeams().then(teams => teams.forEach(el => makeTeamTiles(el)))
    teamSelectBttnEvent()
    offenseButton()
    defenseButton()
    goalieButton()
    favoritesButton()
}

// displays must be set to none or displayPlayers() will show headings before player cards load
const offense = document.getElementById('offense')
const defense = document.getElementById('defense')
const goalie = document.getElementById('goalies')
offense.style.display = "none"
defense.style.display = "none"
goalie.style.display = "none"

const getTeams = () => {
    return fetch('http://localhost:3000/teams').then(resp => resp.json())
}

//set up button functionality
function teamSelectBttnEvent() {
    const teamSelectBttn = document.getElementById('team-page-return')
    const teamContainer = document.getElementById('team-container')
    const playerContainer = document.getElementById('player-container')
    const favoriteContainer = document.getElementById('favorite-container')

    const offense = document.getElementById('offense')
    const defense = document.getElementById('defense')
    const goalie = document.getElementById('goalies')
    teamSelectBttn.addEventListener('click', () => {
        hider(playerContainer)
        hider(favoriteContainer)
        teamContainer.style.display = "flex"
        teamSelectBttn.style.display = "none"
        offense.style.display = "none"
        defense.style.display = "none"
        goalie.style.display = "none"

        deletePlayers()
        makeTeamTiles(teamObj)
    })
}
function offenseButton() {
    const offense = document.getElementById('offense')
    const defense = document.getElementById('defense')
    const goalie = document.getElementById('goalies')
    const favorite = document.getElementById('favorite-container')
    const offenseBttn = document.getElementById('offense-button')
    offenseBttn.addEventListener('click', () => {
        offense.style.display = "block"
        defense.style.display = "none"
        goalie.style.display = "none"
        favorite.style.display = "none"
    })
}
function offenseButton() {
    const offense = document.getElementById('offense')
    const defense = document.getElementById('defense')
    const goalie = document.getElementById('goalies')
    const favorite = document.getElementById('favorite-container')
    const offenseBttn = document.getElementById('offense-button')
    offenseBttn.addEventListener('click', () => {
        offense.style.display = "flex"
        defense.style.display = "none"
        goalie.style.display = "none"
        favorite.style.display = "none"
    })
}

function defenseButton() {
    const offense = document.getElementById('offense')
    const defense = document.getElementById('defense')
    const goalie = document.getElementById('goalies')
    const favorite = document.getElementById('favorite-container')
    const defenseBttn = document.getElementById('defense-button')
    defenseBttn.addEventListener('click', () => {
        offense.style.display = "none"
        defense.style.display = "block"
        goalie.style.display = "none"
        favorite.style.display = "none"
    })
}

function goalieButton() {
    const offense = document.getElementById('offense')
    const defense = document.getElementById('defense')
    const goalie = document.getElementById('goalies')
    const favorite = document.getElementById('favorite-container')
    const goalieBttn = document.getElementById('goalie-button')
    goalieBttn.addEventListener('click', () => {
        offense.style.display = "none"
        defense.style.display = "none"
        goalie.style.display = "block"
        favorite.style.display = "none"
    })
}

function favoritesButton() {
    const offense = document.getElementById('offense')
    const defense = document.getElementById('defense')
    const goalie = document.getElementById('goalies')
    const favorite = document.getElementById('favorite-container')
    const teamContainer = document.getElementById('team-container')
    const favoritesBttn = document.getElementById('favorites-page')
    const teamSelectBttn = document.getElementById('team-page-return')
    favoritesBttn.addEventListener('click', () => {
        teamContainer.style.display = "none"
        offense.style.display = "none"
        defense.style.display = "none"
        goalie.style.display = "none"
        favorite.style.display = "flex"
        teamSelectBttn.style.display = "block"
    })
}

//Delete function to remove player cards from DOM
const deletePlayers = () => {
    const allPlayers = document.querySelectorAll('div.position-lineup > div.sports-card-inner')
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
    const teamSelectBttn = document.getElementById('team-page-return') 
    const defense = document.getElementById('defense')
    const goalie = document.getElementById('goalies')
    const favoriteContainer = document.getElementById('favorite-container')
    
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
        hider(favoriteContainer)
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
// Set this as default for now
let defaultImage = 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=200&h=146'

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
        const offense = document.getElementById('offense')
        const defense = document.getElementById('defense')
        const goalie = document.getElementById('goalies')
        const backInfo = document.createElement("h4")
        const cardBack = document.createElement("div")
        const cardInner = document.createElement("div")
        const cardFront = document.createElement("div")
        const cardImage = document.createElement("img")
        const cardName = document.createElement("h2")
        const likeBttn = document.createElement("button")
        const cardHeader = document.createElement('div')
    
        teamImgObj.then(playerImages => {
            if(playerImages[players.person.fullName] === undefined){
                cardImage.src = defaultImage
            }else{
            cardImage.src = playerImages[players.person.fullName]
            }
            
            
    
        cardFront.className = "card__face card__face--front"
        backInfo.className = "back-info"
        cardBack.className = "card__face card__face--back"
        cardHeader.className = "card-header"
    
        cardInner.id = `${players.person.id}`
        cardInner.className = "sports-card-inner"
        cardInner.style.borderColor = playerImages['primary'];
        cardInner.style.borderRadius = '20px';

    
        cardInner.onmouseover = function () {
            var colorString = '0px 8px 16px 0px ' + playerImages['secondary'];
            this.style['box-shadow'] = colorString
            this.style['-webkit-box-shadow'] = colorString
            this.style['-moz-box-shadow'] = colorString
        }
        cardInner.onmouseout = function () {
            this.style['box-shadow'] = "none"
            this.style['-webkit-box-shadow'] = "none"
            this.style['-moz-box-shadow'] = "none"
        }
    
       
        
        // cardImage.src = teamImgObj.players[fullName]
        cardImage.className = 'card-image'
        cardImage.style.backgroundColor = playerImages['primary'];
        cardImage.style.border = '5px solid' + playerImages['secondary'];
        cardName.textContent = players.person.fullName
    
        likeBttn.className = "like-bttn"
        likeBttn.textContent = "♥"
    
        likeBttn.addEventListener('click', function favorites(e) {
            const favoriteContainer = document.getElementById('favorite-container')
            let clonedDiv = cardInner.cloneNode(true);  
            favoriteContainer.append(clonedDiv)
            e.preventDefault();
        })

        parsePlayerStats(players).then(data => {
            backInfo.innerHTML = data;
        })
    
        let position = players.position.code;
    
    
        cardHeader.append(cardImage, cardName, likeBttn)
        cardFront.append(cardHeader)
        cardBack.append(backInfo)
        cardInner.append(cardFront, cardBack)
        
        if (position === 'C' || position === 'R' || position === 'L') {
            offense.append(cardInner)
            // playerContainer.appendChild(offense)
        }else if(position === 'D'){
            defense.append(cardInner)
            // playerContainer.appendChild(defense)
        }else{
            goalie.append(cardInner)
            // playerContainer.appendChild(goalie)
        }
    

        offense.style.display = 'inline-block'
        defense.style.display = 'inline-block'
        goalie.style.display = 'inline-block'
    
        cardInner.addEventListener("click", function () {
            cardInner.classList.toggle('is-flipped')
        })
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

const playerImages = () => {
    return getTeams().then(response => {
        const playerImgs = {}
        response.forEach(team => {
            console.log(team)
            const players = team.players || []
            players.forEach(player => {
                const playerName = player.espn_player_name
                const playerImg = player.player_image
                playerImgs[playerName] = playerImg
                // playerImgs['primary'] = player.primary
                // playerImgs['secondary'] = player.secondary
            })
        // console.log(playerImgs)
        })
    return playerImgs
    })
}
    const parsePlayerStats = (player) => {
        let playerName = player.person.fullName;
        let id = player.person.id;
        let playerPosition = player.position.name;
    
        let playerURL = player.person.link;
        let playerStats = `https://statsapi.web.nhl.com${playerURL}/stats?stats=statsSingleSeason&season=20202021`;
    
        return fetch(playerStats)
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
                    return createGoalieCard(playerObject, playerName, playerPosition, id);
                } else {
                    let playerObject = {
                        "assists": statsArray.assists,
                        "shots": statsArray.shots,
                        "goals": statsArray.goals,
                        "timeOnIce": statsArray.timeOnIce,
                        "games": statsArray.games
                    };
                    return createPlayerCard(playerObject, playerName, playerPosition, id);
                }
            }
            return createPlayerStats(statsArray);
        })

        .catch(error => {
            let errorMessage = 'Player stats unavailable at this time.'
            return errorMessage
        })
    }
    
    const createGoalieCard = (playerObject, playerName, playerPosition, id) => {
        let statsList = `
        ${playerName.toUpperCase()}
        <h4>${playerPosition}</h4>
        <h5>Player Stats</h5>
        <table>
            <tr>
                <td>Time on Ice:</td>
                <td class="stat-value">${playerObject.timeOnIce}</td>
            </tr>
            <tr>
                <td>Shutouts:</td>
                <td class="stat-value">${playerObject.shutouts}</td>
            </tr>
            <tr>
                <td>Saves:</td>
                <td class="stat-value">${playerObject.saves}</td>
            </tr>
            <tr>
                <td>Games:</td>
                <td class="stat-value">${playerObject.games}</td>
            </tr>
        </table>`;
        return statsList;
    };
    
    const createPlayerCard = (playerObject, playerName, playerPosition, id) => {
        let statsList = `
        ${playerName.toUpperCase()}
        <h4>${playerPosition}</h4>
        <h5>Player Stats</h5>
        <table>
            <tr>
                <td>Time on Ice:</td>
                <td class="stat-value">${playerObject.timeOnIce}</td>
            </tr>
            <tr>
                <td>Shots:</td>
                <td class="stat-value">${playerObject.shots}</td>
            </tr>
            <tr>
                <td>Goals:</td>
                <td class="stat-value">${playerObject.goals}</td>
            </tr>
            <tr>
                <td>Assists:</td>
                <td class="stat-value">${playerObject.assists}</td>
            </tr>
            <tr>
                <td>Games:</td>
                <td class="stat-value">${playerObject.games}</td>
            </tr>
            
        </table>`;
        return statsList;
    }
    // playerImages(12)
    
    init();
    
    