const position = document.querySelector('#position')
const position2 = document.querySelector('#position442')
const reserveList = document.querySelector('.available-list')
// const players  = 
const availablePlayers = JSON.parse(localStorage.getItem("players"))
const formationCards = document.querySelectorAll('.card')
let selectedForm = ''
// const availablePlayers = []

// console.log(typeof availablePlayers)
changeform(position)


function changeFormation(formation,select){
    document.querySelectorAll('.formation').forEach((element)=>{element.style.display = 'none'})
    // document.querySelectorAll('.formulaire select').forEach((select)=>{select.style.display = 'none'})
    const selectedFormation = document.querySelector(formation)
    const selector = document.querySelector(select)
    selectedFormation.style.display = 'block'
    // selector.style.display = 'block'
    
}
function changeform(position){
    document.querySelectorAll('.form').forEach((form)=>{form.style.display = 'none'})
    
    position.addEventListener("change" , (e)=>{
        position.querySelector('option:first-child').style.display = 'none'
        e.preventDefault()
        const player = []
        const playerPosition = position.value
       handleForm(playerPosition,player)
    }) 
    
    document.querySelectorAll('.form').forEach((form)=>{form.style.display = 'none'})
    // console.log(selectedForm)
}
function handleForm(position,player){
    document.querySelectorAll('.form').forEach((form)=>{form.style.display = 'none'})
    if(position == 'none'){
        document.querySelectorAll('.form').forEach((form)=>{form.style.display = 'none'})

    }
    else if(position == 'GK'){
        document.querySelector('#goalkeeper').style.display = 'flex'
        selectedForm = 'goalkeeper'
        addPlayerForm(selectedForm,player)

    }else {
        document.querySelector('#regular-player').style.display = 'flex'
        selectedForm = 'regular'
        addPlayerForm(selectedForm,player)

    }
}


function displayPlayers(position,card){
    reserveList.innerHTML = ''
    availablePlayers.forEach((player)=>{

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

    if(selector == '.formulaire'){
        position.selectedIndex = 0
        container.querySelectorAll('.form').forEach(form=>{form.style.display = 'none'})
    }
    
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
    removePlayer(playerList.querySelectorAll('.carte')) //call this methode to remove players if they are in the formation if they are in the formation you cannot delete nor modify them
    playerList.querySelectorAll('.carte').forEach((playerCard)=>{
        playerCard.onclick = function(e){
            e.preventDefault()
            const playerCardName = playerCard.querySelector('.player-name p').innerText
            availablePlayers.forEach((player,index)=>{
                let deleteConfirm
                
                if(player.name === playerCardName){
                    deleteConfirm = confirm("Do you really want to delete this Player ?")
                    
                }
                if(deleteConfirm){
                    availablePlayers.splice(index,1)
                    localStorage.setItem("players",JSON.stringify(availablePlayers))
                    // fillContainerList(playerList)
                    document.querySelector('.delete-players').style.display = 'none'
                    // console.log(availablePlayers)
                }
            })
        }
    })
}
function modifyPlayer(){
    const playerList = document.querySelector('.modify-list')
    playerList.innerHTML = ''
    fillContainerList(playerList)
    removePlayer(playerList.querySelectorAll('.carte'))
    playerList.querySelectorAll('.carte').forEach((playerCard)=>{
        playerCard.onclick = function(e){
            e.preventDefault()
            document.querySelector('.modify-players').style.display = 'none'
            const playerCardName = playerCard.querySelector('.player-name p').innerText
            availablePlayers.forEach(player=>{
                if(player.name === playerCardName && player.position == 'GK'){
                    playerPosition = 'goalkeeper'
                    editPlayerForm(player.position,player)
                    localStorage.setItem("players",JSON.stringify(availablePlayers))

                }else if(player.name === playerCardName){
                    playerPosition = 'regular'
                    editPlayerForm(player.position,player)
                    localStorage.setItem("players",JSON.stringify(availablePlayers))

                }
               
            })
        }
    })

}
function editPlayerForm(playerPosition,player){
    document.querySelector('.formulaire').style.display = 'flex'
    document.querySelectorAll('.form').forEach((form)=>{form.style.display = 'none'})
    if(playerPosition == 'none'){
        document.querySelectorAll('.form').forEach((form)=>{form.style.display = 'none'})
    }
    else if(playerPosition == 'GK'){
        document.querySelector('#goalkeeper').style.display = 'flex'
    }else {
        document.querySelector('#regular-player').style.display = 'flex'
    }
    
    const position = document.querySelector('.formulaire #position')
    console.log(playerPosition)
    position.value = playerPosition
    if(position.value == 'GK'){
        const formGKbtn = document.querySelector('#goalkeeper button')
        const formGK = document.querySelector('#goalkeeper')
       

            const playerName = document.getElementById("playerName")
            const overall = document.getElementById("overall")
            const diving = document.getElementById("diving")
            const handling = document.getElementById("handling")
            const kicking = document.getElementById("kicking")
            const reflexes = document.getElementById("reflexes")
            const speed = document.getElementById("speed")
            const positioning = document.getElementById("positioning")
            const playerCountry = document.getElementById("playerCountry")
            const playerClub = document.getElementById("playerClub")
            const playerPhoto = document.getElementById("playerPhoto")
            const countryFlag = document.getElementById("countryFlag")
            const clubLogo = document.getElementById("clubLogo")


            playerName.value = player.name
            overall.value = player.rating
            diving.value = player.diving
            handling.value = player.handling
            kicking.value = player.kicking
            reflexes.value = player.reflexes
            speed.value = player.speed
            positioning.value = player.positioning
            playerCountry.value = player.nationality
            playerClub.value = player.club
            playerPhoto.value = player.photo
            clubLogo.value = player.logo
            countryFlag.value = player.flag

        formGKbtn.onsubmit = function(e) {
            e.preventDefault()
            player.name = playerName.value
player.rating = overall.value
player.diving = diving.value
player.handling = handling.value
player.kicking = kicking.value
player.reflexes = reflexes.value
player.speed = speed.value
player.positioning = positioning.value
player.nationality = playerCountry.value
player.club = playerClub.value
player.photo = playerPhoto.value
player.logo = clubLogo.value
player.flag = countryFlag.value
            alert("player modified successfully")
            formGK.reset()
        }

    
    }else {
        const formRegularbtn = document.querySelector('#regular-player button')
        const formRegular = document.querySelector('#regular-player')
        
            const playerName = document.getElementById("playerName")
            const overall = document.getElementById("overall")
            const shooting = document.getElementById("shooting")
            const passing = document.getElementById('passing')
            const dribbling = document.getElementById("dribbling")
            const pace = document.getElementById("pace")
            const defence = document.getElementById("defence")
            const physique = document.getElementById("physique")
            const playerCountry = document.getElementById("playerCountry")
            const playerClub = document.getElementById("playerClub")
            const playerPhoto = document.getElementById("playerPhoto")
            const countryFlag = document.getElementById("countryFlag")
            const clubLogo = document.getElementById("clubLogo")
            const position = document.getElementById("position")
        

            playerName.value = player.name
            overall.value = player.rating
            shooting.value = player.shooting
            passing.value = player.passing
            dribbling.value = player.dribbling
            pace.value = player.pace
            defence.value = player.defending
            physique.value = player.physical
            playerCountry.value = player.nationality
            playerClub.value = player.club
            playerPhoto.value = player.photo
            clubLogo.value = player.logo
            countryFlag.value = player.flag
            position.value = player.position

        formRegular.onsubmit = function(e) {
            e.preventDefault()
            player.name = playerName.value
            player.rating = overall.value
            player.shooting = shooting.value
            player.passing = passing.value
            player.dribbling = dribbling.value
            player.pace = pace.value
            player.defending = defence.value
            player.physical = physique.value
            player.nationality = playerCountry.value
            player.club = playerClub.value
            player.photo = playerPhoto.value
            player.logo = clubLogo.value
            player.flag = countryFlag.value
            player.position = position.value

            console.log(player)
            


alert("player modified successfully")
formRegular.reset()

        }
    }


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
                                 <p>HAN<span>${player.handling}</span></p>
                                 <p>KIC<span>${player.kicking}</span></p>
                                 <p>REF<span>${player.reflexes}</span></p>
                                 <p>SPE<span>${player.speed}</span></p>
                                 <p>POS<span>${player.positioning}</span></p>
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
    container.innerHTML = ''
    // console.log(availablePlayers)
    availablePlayers.forEach((player)=>{
        // console.log(player)
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

function addPlayerForm(formType,playerForm) {
    const errorMessages = document.querySelectorAll('span')
    errorMessages.forEach(span=>span.remove())
    if (formType === 'goalkeeper') {
        const formGK = document.querySelector('#goalkeeper')
        formGK.onsubmit = function(e) {
            e.preventDefault()

            const playerName = document.getElementById("playerName")
            const overall = document.getElementById("overall")
            const diving = document.getElementById("diving")
            const handling = document.getElementById("handling")
            const kicking = document.getElementById("kicking")
            const reflexes = document.getElementById("reflexes")
            const speed = document.getElementById("speed")
            const positioning = document.getElementById("positioning")
            const playerCountry = document.getElementById("playerCountry")
            const playerClub = document.getElementById("playerClub")
            const playerPhoto = document.getElementById("playerPhoto")
            const countryFlag = document.getElementById("countryFlag")
            const clubLogo = document.getElementById("clubLogo")

            if (formFieldValidation(playerName, overall, diving, handling, kicking, reflexes, speed, positioning, playerCountry, playerClub, playerPhoto, countryFlag, clubLogo)) {
                const newGoalkeeper = {
                    name: playerName.value,
                    photo: playerPhoto.value,
                    position: "GK",
                    nationality: playerCountry.value,
                    flag: countryFlag.value,
                    club: playerClub.value,
                    logo: clubLogo.value,
                    rating: overall.value,
                    diving: diving.value,
                    handling: handling.value,
                    kicking: kicking.value,
                    reflexes: reflexes.value,
                    speed: speed.value,
                    positioning: positioning.value
                }

                availablePlayers.push(newGoalkeeper)
                alert("Player added successfully")
                formGK.reset() 
            } else {
                alert("Please fill out all required fields correctly.")
            }
        }
    } else {
        const formRegular = document.querySelector('#regular-player')
        formRegular.onsubmit = function(e) {
            e.preventDefault()
            const playerName = document.getElementById("playerName")
            const overall = document.getElementById("overall")
            const shooting = document.getElementById("shooting")
            const passing = document.getElementById('passing')
            const dribbling = document.getElementById("dribbling")
            const pace = document.getElementById("pace")
            const defence = document.getElementById("defence")
            const physique = document.getElementById("physique")
            const playerCountry = document.getElementById("playerCountry")
            const playerClub = document.getElementById("playerClub")
            const playerPhoto = document.getElementById("playerPhoto")
            const countryFlag = document.getElementById("countryFlag")
            const clubLogo = document.getElementById("clubLogo")
            const position = document.getElementById("position")

            if (formFieldValidation(playerName, overall, shooting, passing , dribbling, pace, defence, physique, playerCountry, playerClub, playerPhoto, countryFlag, clubLogo,)) {
                const newPlayer = {
                    name: playerName.value,
                    photo: playerPhoto.value,
                    position: position.value,
                    nationality: playerCountry.value,
                    flag: countryFlag.value,
                    club: playerClub.value,
                    logo: clubLogo.value,
                    rating: overall.value,
                    shooting: shooting.value,
                    passing: passing.value,
                    dribbling: dribbling.value,
                    pace: pace.value,
                    defending: defence.value,
                    physical: physique.value
                }

                availablePlayers.push(newPlayer)
                alert("Player added successfully")
                formRegular.reset()
            }
            else if(formFieldValidation(playerName, overall, diving, handling, kicking, reflexes, speed, positioning, playerCountry, playerClub, playerPhoto, countryFlag, clubLogo) && player !== 'newplayer') {
                playerForm.name = playerName.value
                playerForm.photo = playerPhoto.value
                playerForm.position = position.value
                playerForm.nationality =  playerCountry.value,
                playerForm.flag = countryFlag.value
                playerForm.club = playerClub.value
                playerForm.logo = clubLogo.value
                playerForm.rating = overall.value
                playerForm.diving = diving.value
                playerForm.handling = handling.value
                playerForm.kicking = kicking.value
                playerForm.reflexes = reflexes.value
                playerForm.speed = speed.value
                playerForm.positioning = positioning.value
                
                availablePlayers.push(playerForm)
        } else {
                alert("Please fill out all required fields correctly.")
            }
        }
    }
    const formInputs = document.querySelectorAll("input")
    formInputs.forEach(input => {
        input.addEventListener("input", (e) => {
            e.preventDefault()
            const existingError = input.nextElementSibling
            if (existingError && existingError.tagName === "SPAN") {
                existingError.remove()
            }
            if (input.value === "") {
                input.classList.remove('correct')
                input.classList.add('wrong')
                showErrorMessage(input, "This Field is required")
            }
            else if (input.id === "playerName" && !textValidation(input.value)) {
                input.classList.remove('correct')
                input.classList.add('wrong')
                showErrorMessage(input, "Invalid name format (letters only)")
            }
            else if (input.id === "playerName" && !preventNameRepetition(input.value)) {
                input.classList.remove('correct')
                input.classList.add('wrong')
                showErrorMessage(input, "This player already exists")
            }
            else if (input.id === "playerCountry" && !textValidation(input.value)) {
                input.classList.remove('correct')
                input.classList.add('wrong')
                showErrorMessage(input, "Invalid country format (letters only)")
            }
            else if (input.id === "playerClub" && !textValidation(input.value)) {
                input.classList.remove('correct')
                input.classList.add('wrong')
                showErrorMessage(input, "Invalid club format (letters only)")
            }else if(input.type === 'number' && input.value > 99){
                input.classList.remove('correct')
                input.classList.add('wrong')
                showErrorMessage(input, "Max  (99)")
            
            }
            else if(input.type === 'number' && input.value < 30){
                input.classList.remove('correct')
                input.classList.add('wrong')
                showErrorMessage(input, "Min (30)")
            
            }
            else if(input.type === 'number' && input.id == 'overall' && input.value < 50){
                input.classList.remove('correct')
                input.classList.add('wrong')
                showErrorMessage(input, "Min (50)")
            }
            else {
                input.classList.remove('wrong')
                input.classList.add('correct')
            }
        })
    })
}


function preventNameRepetition(playerName){
    const playerExists = availablePlayers.find(player => playerName.toLowerCase() === player.name.toLowerCase())
    if (playerExists) {
        return false
    }
    return true
}

function textValidation(inputText){
    const namePattern = /^[A-Za-z\s]+$/
     if(namePattern.test(inputText) ) {
        return true
     }else{
        return false
     }
}

function formFieldValidation(playerName, input1 , input2  , input3 , input4 , input5 , input6 ,input7 , country , club , photoUrl , countryUrl , clubUrl){
    let isValid = true 
    if (!preventNameRepetition(playerName.value)) {
        isValid = false
    } else if (!textValidation(playerName.value)) {
        showErrorMessage(playerName, "Invalid name format (letters only).")
        isValid = false
    }else if(!textValidation(country.value)){
        showErrorMessage(country , "Invalid country format (letters only)")
        isValid = false
    }else if(!textValidation(club.value)){
        showErrorMessage(club , "Invalid club format (letters only)")
        isValid = false
    }

    const inputsText = [playerName , country, club , photoUrl , countryUrl , clubUrl]
    const inputsNumber = [input1 , input2 , input3 , input4 , input5 , input6 , input7]

    inputsText.forEach(input => {
        if (input.value == '') {
            isValid = false
            showErrorMessage(input, "This Field is required")
            // input.style.outlineColor = 'red'
            input.classList.add('wrong')
        }
    })
    inputsNumber.forEach(input=>{
        if (input.value == '') {
            isValid = false
            showErrorMessage(input, "This Field is required")
            // input.style.outlineColor = 'red'
            input.classList.add('wrong')
        }else if(input.value > 99){
            input.classList.remove('correct')
            input.classList.add('wrong')
            showErrorMessage(input, "Max  (99)")
            isValid = false
        
        }
        else if(input.id !== 'overall' && input.value < 30){
            input.classList.remove('correct')
            input.classList.add('wrong')
            showErrorMessage(input, "Min (30)")
        
        }
        else if(input.id == 'overall' && input.value < 50){
            input.classList.remove('correct')
            input.classList.add('wrong')
            showErrorMessage(input, "Min (50)")
        }
    })

    return isValid
}

function showErrorMessage(input , message){
    const span = document.createElement('span')
    
    span.classList.add(input.id)
    span.textContent = message
    span.style.color = 'red'
    
    input.insertAdjacentElement('afterend', span)
}






