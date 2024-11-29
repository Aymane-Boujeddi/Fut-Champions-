const position1 = document.querySelector('#position')
const position2 = document.querySelector('#position442')
const reserveList = document.querySelector('.available-list')
const availablePlayers  = localStorage.getItem("players")
const players = JSON.parse(availablePlayers)
const formationCards = document.querySelectorAll('.card')
let selectedForm = ''

changeform(position1)


function changeFormation(formation,select){
    document.querySelectorAll('.formation').forEach((element)=>{element.style.display = 'none'})
    // document.querySelectorAll('.formulaire select').forEach((select)=>{select.style.display = 'none'})
    const selectedFormation = document.querySelector(formation)
    const selector = document.querySelector(select)
    selectedFormation.style.display = 'block'
    // selector.style.display = 'block'
    
}
function changeform(position1){
    document.querySelectorAll('.form').forEach((form)=>{form.style.display = 'none'})
  
    position1.addEventListener("change" , (e)=>{
        e.preventDefault()
        // console.log(position1.value)
        document.querySelectorAll('.form').forEach((form)=>{form.style.display = 'none'})
        if(position1.value == 'goalkeeper'){
            document.querySelector('#goalkeeper').style.display = 'flex'
            selectedForm = 'goalkeeper'
            addPlayerForm(selectedForm)

            
        }else {
            document.querySelector('#regular-player').style.display = 'flex'
            selectedForm = 'regular'
            addPlayerForm(selectedForm)

        }
    }) 
    // position2.addEventListener("change" , (e)=>{
    //     e.preventDefault()
    //     // console.log(position1.value)
    //     document.querySelectorAll('.form').forEach((form)=>{form.style.display = 'none'})
    //     if(position2.value == 'goalkeeper'){
    //         document.querySelector('#goalkeeper').style.display = 'flex'
    //     }else {
    //         document.querySelector('#regular-player').style.display = 'flex'
    //     }
    // }) 
    document.querySelectorAll('.form').forEach((form)=>{form.style.display = 'none'})
    console.log(selectedForm)
}


function displayPlayers(position,card){
    reserveList.innerHTML = ''
    players.forEach((player)=>{

        if(position == player.position){
           addAvailablePlayer(player,reserveList)
        // removePlayer(reserveList.querySelectorAll('.carte'))

        }
        removePlayer(reserveList.querySelectorAll('.carte'))
        
    })
    const reserveCards = reserveList.querySelectorAll('.carte')
    reserveCards.forEach((reserveCard)=>{
        reserveCard.onclick = function(e) {
              e.preventDefault()
             
                card.innerHTML = reserveCard.innerHTML
                const deleteIcon = document.createElement('div')
                deleteIcon.classList.add('delete')
                deleteIcon.innerHTML = `
                  <i class="fa-solid fa-circle-minus" style="color: #ff0000;"></i>
                `
              card.prepend(deleteIcon)
              deleteIcon.addEventListener('click', () => {
                  card.innerHTML = ` 
                      <img src="img/badge_gold.webp" id="badge" alt="gold-badge">
                    `  
              })
              reserveCard.style.display = 'none'
              
            displayPlayers(position,card)
              
           
        
        }
    })
    // const formationCards = document.querySelectorAll('.card')
    // formationCards.forEach((formationCard)=>{
    //     formationCard.onclick = function(e){
    //         let tempCard
    //         if(formationCard.classList[2] == position){
    //             tempCard = formationCard.innerHTML
    //             formationCard.innerHTML = card.innerHTML
    //             card.innerHTML = tempCard
    //         }else{
    //             alert('not the same position')
    //         }
    //     }
    // })
}
function closeContainer(selector) {
    
    const container = document.querySelector(selector)
    container.style.display = 'none'
  }
  function showContainer(selector){
    document.querySelectorAll('#pop-up').forEach((pop)=>{pop.style.display = 'none'})
    const container = document.querySelector(selector)
    if(selector == '.delete-players'){
        deletePlayer()
    }else if(selector == '.modify-players'){
        modifyPlayer()
    }
    container.style.display = 'flex'
  }
function removePlayer(reserves){
    const cardscontent = document.querySelectorAll('.card .player-name p')
    cardscontent.forEach((cardcontent)=>{
        const cardContentName = cardcontent.innerText
        reserves.forEach((reserve)=>{
            const reserveContentName = reserve.querySelector('.player-name p').innerText
            if(cardContentName == reserveContentName){
                reserve.style.display = 'none'
            }
        })
    })
 
}
function deletePlayer(){
    const playerList = document.querySelector('.delete-list')
    playerList.innerHTML= ''
    fillContainerList(playerList)
    console.log(playerList)
}
function modifyPlayer(){
    const playerList = document.querySelector('.modify-list')
    playerList.innerHTML = ''
    fillContainerList(playerList)
}

function addAvailablePlayer(player,container){
    if(player.position == 'GK'){
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
          <div class="carte">
             
     
             <img src="img/badge_gold.webp" id="badge" alt="gold-badge">
                       <div class="card-content">
                         <div class="player-position">
                             <p>${player.position} </p>
                         </div>
                         <div class="player-photo">
                             <img src="${player.photo}" id="player-photo" alt="">
                         </div>
                         <div class="player-info">
                             <p>${player.rating} </p>
                             <div class="country">
                                 <img src="${player.flag}" id="player-country" alt="">
                             </div>
                             <div class="club">
                                 <img src="${player.logo}" id="logo" alt="">
                             </div>
                         </div>
                         <div class="player-name">
                             <p>${player.name}</p>
                         </div>
                         <div class="player-stats">
                             <div class="stats">
                                 <p>DIV<span>${player.diving}</span></p>
                                 <p>HAN <span>${player.handling}</span></p>
                                 <p>KIC <span>${player.kicking}</span></p>
                                 <p>REF <span>${player.reflexes}</span></p>
                                 <p>SPE <span>${player.speed}</span></p>
                                 <p>PoS <span>${player.positioning}</span></p>
                             </div>
                             
     
                         </div>
                       </div>
                       </div>
         
        `
        container.appendChild(newDiv)

    }else{
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
          <div class="carte">
             
     
             <img src="img/badge_gold.webp" id="badge" alt="gold-badge">
                       <div class="card-content">
                         <div class="player-position">
                             <p>${player.position} </p>
                         </div>
                         <div class="player-photo">
                             <img src="${player.photo}" id="player-photo" alt="">
                         </div>
                         <div class="player-info">
                             <p>${player.rating} </p>
                             <div class="country">
                                 <img src="${player.flag}" id="player-country" alt="">
                             </div>
                             <div class="club">
                                 <img src="${player.logo}" id="logo" alt="">
                             </div>
                         </div>
                         <div class="player-name">
                             <p>${player.name}</p>
                         </div>
                         <div class="player-stats">
                             <div class="stats">
                                 <p>SHO <span>${player.shooting}</span></p>
                                 <p>PAS <span>${player.passing}</span></p>
                                 <p>DRI <span>${player.dribbling}</span></p>
                                 <p>PAC <span>${player.pace}</span></p>
                                 <p>DEF <span>${player.defending}</span></p>
                                 <p>PHY <span>${player.physical}</span></p>
                             </div>
                             
     
                         </div>
                       </div>
                       </div>
         
        `
        container.appendChild(newDiv)
    }
}
function fillContainerList(container){
    players.forEach((player)=>{
        addAvailablePlayer(player,container)
    })
}

formationCards.forEach((card)=>{
    reserveList.innerHTML = ''
    card.onclick = function(e){
        displayPlayers(card.classList[2],card)
        
        // removePlayer(reserveList.querySelectorAll('.carte'))

        if(reserveList.children.length == 0){
            reserveList.textContent =  'No players in this position'
        }
    }
})
function animateCard(card){

}
function addPlayerForm(formType){
    if(formType == 'goalkeeper'){
        const formGk = document.querySelector('#goalkeeper')
        const playerName = document.getElementById("playerName").value
        const overall = document.getElementById("overall").value
        const diving = document.getElementById("diving").value
        const handling = document.getElementById("handling").value
        const kicking = document.getElementById("kicking").value
        const reflexes = document.getElementById("reflexes").value
        const speed = document.getElementById("speed").value
        const positioning = document.getElementById("positioning").value
        const playerCountry = document.getElementById("playerCountry").value
        const playerClub = document.getElementById("playerClub").value
        const playerPhoto = document.getElementById("playerPhoto").value
        const countryFlag = document.getElementById("countryFlag").value
        const clubLogo = document.getElementById("clubLogo").value

        console.log(formGk)
        formGk.onsubmit = function(e) {
            e.preventDefault()

            const goalkeeper = {
                "name": playerName,
                "photo": playerPhoto,
                "position": "GK",
                "nationality": playerCountry,
                "flag": countryFlag,
                "club": playerClub,
                "logo": clubLogo,
                "rating": overall,
                "diving": diving,
                "handling": handling,
                "kicking": kicking,
                "reflexes": reflexes,
                "speed": speed,
                "positioning": positioning
            }
            
        }
        



    }else {
        const formRegular = document.querySelector('#regular-player')
        console.log(formRegular)
        const playerName = document.getElementById("playerName").value
        const overall = document.getElementById("overall").value
        const shooting = document.getElementById("shooting").value
        const passing = document.getElementById("passing").value
        const dribbling = document.getElementById("dribbling").value
        const pace = document.getElementById("pace").value
        const defence = document.getElementById("defence").value
        const physique = document.getElementById("physique").value
        const playerCountry = document.getElementById("playerCountry").value
        const playerClub = document.getElementById("playerClub").value
        const playerPhoto = document.getElementById("playerPhoto").value
        const countryFlag = document.getElementById("countryFlag").value
        const clubLogo = document.getElementById("clubLogo").value
        const position = document.getElementById("position").value

        const player = {
            "name": playerName,
            "photo": playerPhoto,
            "position": position, 
            "nationality": playerCountry,
            "flag": countryFlag,
            "club": playerClub,
            "logo": clubLogo,
            "rating": overall,
            "shooting": shooting,
            "passing": passing,
            "dribbling": dribbling,
            "pace": pace,
            "defence": defence,
            "physique": physique
        }



    }
}






