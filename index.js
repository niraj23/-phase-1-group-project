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
    teamContainer.appendChild(teamTile)

    
    teamTile.addEventListener('click', () => {
        teamContainer.style.display = "None"
        let playerContainer  = document.getElementById('player-container')
        playerContainer.style.display = "flex";
        
        teamObj.players.forEach(function(players) {
            const card = document.createElement("div");
            const backInfo = document.createElement("h4")
            const cardBack = document.createElement("div")
            const cardInner = document.createElement("div");
            const cardFront = document.createElement("div");
            const cardImage = document.createElement("img");
            const cardName = document.createElement("h3");
            const likeBttn = document.createElement("button");

            cardInner.className = "sports-card-inner";
            cardFront.className = "card__face card__face--front";
            backInfo.className = "back-info";
            cardBack.className = "card__face card__face--back";
        
            card.id = `${players.idPlayer}`;
            card.className = "sports-card";
            card.style.borderColor = players.primary;

            card.onmouseover = function() {
            var colorString = '0px 8px 16px 0px ' + players.secondary;
            this.style['box-shadow'] = colorString;
            this.style['-webkit-box-shadow'] = colorString;
            this.style['-moz-box-shadow'] = colorString;
            }  
            card.onmouseout = function() {
            this.style['box-shadow'] = "none";
            this.style['-webkit-box-shadow'] = "none";
            this.style['-moz-box-shadow'] = "none";
            }
            
            cardImage.src = players.player_image;
            cardImage.className = 'card-image';
            cardName.textContent = players.espn_player_name;
        
            likeBttn.className = "like-bttn";
            likeBttn.textContent = "♥";

            backInfo.textContent = "Hey if you see this you got the card to flip";
        
            cardFront.append(cardImage, cardName, likeBttn);
            cardBack.append(backInfo);
            cardInner.append(cardFront, cardBack);
            card.appendChild(cardInner);
            playerContainer.appendChild(card);
        
    
    cardInner.addEventListener("click", function () {
        cardInner.classList.toggle('is-flipped');
    })

});
})
}
