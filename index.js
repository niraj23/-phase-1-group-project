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
    return fetch('https://hockey-team-server.herokuapp.com/teams').then(resp => resp.json())
}

//set up button functionality
function teamSelectBttnEvent() {
    const teamSelectBttn = document.getElementById('team-page-return')
    const offenseSelectBttn = document.getElementById('offense-button')
    const defenseSelectBttn = document.getElementById('defense-button')
    const goalieSelectBttn = document.getElementById('goalie-button')
    const teamContainer = document.getElementById('team-container')
    const playerContainer = document.getElementById('player-container')
    const favoriteContainer = document.getElementById('favorite-container')
    const favoritesBttn = document.getElementById('favorites-page')

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

        offenseSelectBttn.style.display = "none"
        defenseSelectBttn.style.display = "none"
        goalieSelectBttn.style.display = "none"
        favoritesBttn.style.display = "inline-block"

        deletePlayers()
        makeTeamTiles()
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
    const offenseSelectBttn = document.getElementById('offense-button')
    const defenseSelectBttn = document.getElementById('defense-button')
    const goalieSelectBttn = document.getElementById('goalie-button')
    const offense = document.getElementById('offense')
    const defense = document.getElementById('defense')
    const goalie = document.getElementById('goalies')
    const favorite = document.getElementById('favorite-container')
    const teamContainer = document.getElementById('team-container')
    const favoritesBttn = document.getElementById('favorites-page')
    const teamSelectBttn = document.getElementById('team-page-return')
    favoritesBttn.addEventListener('click', () => {
        buildFavorites()
        teamContainer.style.display = "none"
        offense.style.display = "none"
        defense.style.display = "none"
        goalie.style.display = "none"
        offenseSelectBttn.style.display = "none"
        defenseSelectBttn.style.display = "none"
        goalieSelectBttn.style.display = "none"
        deletePlayers()
        favorite.style.display = "flex"
        teamSelectBttn.style.display = "block"
        favoritesBttn.style.display = "none"
    
    })
}

//Delete function to remove player cards from DOM
const deletePlayers = () => {
    // const allPlayers = document.querySelectorAll('div.position-lineup > div.sports-card-inner')
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
        
        //handle button display functionality when team is selected
        const offenseSelectBttn = document.getElementById('offense-button')
        const defenseSelectBttn = document.getElementById('defense-button')
        const goalieSelectBttn = document.getElementById('goalie-button')
        offenseSelectBttn.style.display = "inline-block"
        defenseSelectBttn.style.display = "inline-block"
        goalieSelectBttn.style.display = "inline-block"

        //hide teams and favorites
        hider(teamContainer)
        hider(favoriteContainer)
        //display team selector return button
        teamSelectBttn.style.display = "block"
        //display playerscontainer
        playerContainer.style.display = "flex"
        //retrieve player images
        const parentId = parseInt(e.target.parentNode.id,10)
        const childId = parseInt(e.target.id,10)
        const teamIdInt = childId || parentId;
        const teamPull = playerImages(teamIdInt)
        const teamColorPull = colorTeams(teamIdInt)

        // const teamIdInt = parseInt(e.target.parentNode.id,10)
        // const teamPull = playerImages(teamIdInt)
        // const teamColorPull = colorTeams(teamIdInt)
        
        // console.log(playerImages(e.target.parentNode.id))
        //build player cards
        displayPlayers(teamIdInt,teamPull, teamColorPull)

    })
}
//--------------------------------Makes all player cards--------------------------------------
// Set this as default for now
let defaultImage = 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=200&h=146'

const displayPlayers = (teamId,teamImgObj,teamColorObj) => {
        let teamRoster = `https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster`;
        fetch(teamRoster)
        .then(resp => resp.json())
        .then(roster => {
            let rosterArray = roster.roster;
            rosterArray.forEach(player => playerCreators(player,teamImgObj,teamColorObj))
        })
    }
    const playerCreators = (players,teamImgObj, teamColorObj) => {
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
        const textHeader = document.createElement('div')
    
        teamImgObj.then(playerImages => {
            if(playerImages[players.person.fullName] === undefined){
                cardImage.src = defaultImage
            }else{
            cardImage.src = playerImages[players.person.fullName]
            }        
        teamColorObj.then(colorTeams => {            
    
        cardFront.className = "card__face card__face--front"
        backInfo.className = "back-info"
        cardBack.className = "card__face card__face--back"
        cardHeader.className = "card-header"

        textHeader.className = "text-header"
    
        cardInner.id = `${players.person.id}`
        cardInner.className = "sports-card-inner"
        cardInner.style.borderColor = colorTeams['primary'];
        cardInner.style.borderRadius = '20px';

    
        cardInner.onmouseover = function () {
            var colorString = '0px 8px 16px 0px ' + colorTeams['secondary'];
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
        cardImage.style.backgroundColor = colorTeams['primary'];
        cardImage.style.border = '5px solid' + colorTeams['secondary'];
        cardName.textContent = players.person.fullName
    
        likeBttn.className = "like-bttn"
        likeBttn.textContent = "♥"
    
        likeBttn.addEventListener('click', function favorites(e) {
            const favoriteContainer = document.getElementById('favorite-container')
            let clonedDiv = cardInner.cloneNode(true);  
            favoriteContainer.append(clonedDiv)

            let favoritePlayerId = parseInt(e.target.parentNode.parentNode.parentNode.id);
            let favoritePlayerCard = e.target.parentNode.parentNode.parentNode.innerHTML;
            // let favoritePlayerCardBack = e.target.parentNode.parentNode.nextSibling.innerHTML;
            
            addFavorite(favoritePlayerId,favoritePlayerCard,/*favoritePlayerCardBack*/)
            // e.preventDefault(playerId);
        })

        parsePlayerStats(players).then(data => {
            backInfo.innerHTML = data;
        })
    
        let position = players.position.code;
    
        cardHeader.append(cardImage, cardName, likeBttn, textHeader)
        cardFront.append(cardHeader)
        cardBack.append(backInfo)
        cardInner.append(cardFront, cardBack)
        
        if (position === 'C' || position === 'R' || position === 'L') {

            textHeader.textContent = 'OFFENSE'
            offense.append(cardInner)
        }else if(position === 'D'){
            textHeader.textContent = 'DEFENSE'
            defense.append(cardInner)
        }else{
            textHeader.textContent = 'GOALIES'
            goalie.append(cardInner)
        }
    

        offense.style.display = 'inline-block'
        defense.style.display = 'inline-block'
        goalie.style.display = 'inline-block'
    
        cardInner.addEventListener("dblclick", function () {
            cardInner.classList.toggle('is-flipped')
        })
    })
    })
    }
    
    
//Function to return image src from db.json
//takes a player name and team id
//needs an array of objects made from a call to db.json

//Returns promise of object of selected team
const getTeam = (teamId) => {
    return fetch('https://hockey-team-server.herokuapp.com/teams')
        .then(resp => resp.json())
        .then(teams => teams.find((el) => el.id === teamId))
    }

//Returns promise of object with list of player image paths 


const playerImages = () => {
    return getTeams().then(response => {
        const playerImgs = {}
        response.forEach(team => {
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

const colorTeams = async (teamId) => {
    const response = await getTeam(teamId)
    const playerColors = {}
    playerColors['primary'] = response.colors.primary
    playerColors['secondary'] = response.colors.secondary
    return playerColors
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

//Favorite PLayers Persistence
//Add posting functionality when favorited
//Add fetch call to populate faovrites page when selected.

const addFavorite = (playerId,cardFront,/*cardBack*/) => {
    //making post
    const favoritePlayer = {
        "id" : playerId,
        "card" : cardFront,
        //"cardBack" : cardBack
    }
    fetch('https://hockey-team-server.herokuapp.com/favorites', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(favoritePlayer)
    })  
}

function buildFavorites(){
    const favoritesContainer = document.getElementById('favorite-container')
    getFavorites()
    .then(favorites => favorites.forEach(player => {

        //Need to create div of class "sports-card-inner" and id of <json obj id>
        let cardElement = document.createElement('div')
        cardElement.id = player.id
        cardElement.className = 'sports-card-inner'
        cardElement.style.borderRadius = "20px"
        cardElement.style.boxShadow = "none";
        //set innerHTML to resp.cardFront
        cardElement.innerHTML = player.card

        let deleteBttn = cardElement.querySelector('button.like-bttn')
        deleteBttn.innerText = "X"
        deleteBttn.addEventListener('click', (e) => {
            let deleteId = cardElement.id
            e.target.parentNode.parentNode.parentNode.remove();
            fetch(`https://hockey-team-server.herokuapp.com/favorites/${deleteId}`, {
                method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                }
            })
        }),
        favoritesContainer.appendChild(cardElement)

        cardElement.addEventListener("click", function () {
            cardElement.classList.toggle('is-flipped')
        })

        }))
}

const getFavorites = () => {
    return fetch('https://hockey-team-server.herokuapp.com/favorites')
    .then(resp => resp.json())
}
    init()
