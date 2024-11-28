const position1 = document.querySelector('#position433')
const position2 = document.querySelector('#position442')
const reserveList = document.querySelector('.reserve-list')
const availablePlayers  = localStorage.getItem("players")
const players = JSON.parse(availablePlayers)
const formationCards = document.querySelectorAll('.card')

changeform(position1,position2)


function changeFormation(formation,select){
    document.querySelectorAll('.formation').forEach((element)=>{element.style.display = 'none'})
    document.querySelectorAll('.formulaire select').forEach((select)=>{select.style.display = 'none'})
    const selectedFormation = document.querySelector(formation)
    const selector = document.querySelector(select)
    selectedFormation.style.display = 'block'
    selector.style.display = 'block'
    
}
function changeform(position1,position2){
    document.querySelectorAll('.form').forEach((form)=>{form.style.display = 'none'})

    position1.addEventListener("change" , (e)=>{
        e.preventDefault()
        // console.log(position1.value)
        document.querySelectorAll('.form').forEach((form)=>{form.style.display = 'none'})
        if(position1.value == 'goalkeeper'){
            document.querySelector('#goalkeeper').style.display = 'flex'
        }else {
            document.querySelector('#regular-player').style.display = 'flex'
        }
    }) 
    position2.addEventListener("change" , (e)=>{
        e.preventDefault()
        // console.log(position1.value)
        document.querySelectorAll('.form').forEach((form)=>{form.style.display = 'none'})
        if(position2.value == 'goalkeeper'){
            document.querySelector('#goalkeeper').style.display = 'flex'
        }else {
            document.querySelector('#regular-player').style.display = 'flex'
        }
    }) 
    document.querySelectorAll('.form').forEach((form)=>{form.style.display = 'none'})
}


function displayPlayers(position,card){
    reserveList.innerHTML = ''
    players.forEach((player)=>{

        if(position == player.position){
           addPlayer(player)
           
        }
        
        
        
    })
    // swapPlayer(reserveList.querySelectorAll('.carte'),card)
    const reserveCards = reserveList.querySelectorAll('.carte')
    // console.log(reserveCards)
    reserveCards.forEach((reserveCard)=>{
        // console.log(reserveCard)
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
                card.innerHTML = ` <div class="card">
                

                    <img src="img/badge_gold.webp" alt="gold-badge">
                  
                  </div>`  
            })
            reserveCard.style.display = 'none'
        
            
            
        }
        
            
              
               
            
        
    })
}
function deletePlayer(reserves){
    const cardscontent = document.querySelectorAll('.card .player-name p')
    console.log(cardscontent)
    // console.log(reserves)
    cardscontent.forEach((cardcontent)=>{
        // console.log(cardcontent.innerText)
        const cardContentName = cardcontent.innerText
        reserves.forEach((reserve)=>{
            const reserveContentName = reserve.querySelector('.player-name p').innerText
            // console.log(reserve.querySelector('.player-name p').innerText)
            if(cardContentName == reserveContentName){
                reserve.style.display = 'none'
            }
        })
    })
    
    


    // console.log(reserveCard)
    // const reserveName = reserveCard.querySelector('.player-name p').textContent
    // document.querySelectorAll('.card').forEach((carte)=>{
    //     console.log(reserveName)
    //     console.log(carte)
    //     const cardPara = carte.querySelector('.player-name p')
    //     // console.log(cardName)
    //         if(cardPara){
    //             const cardName = cardPara.textContent
    //             if(cardName === reserveCard ){
    //                 reserveCard.style.display = 'none'
    //             }
    //         }
        
    // })
}
// function swapPlayer(reserveCards,card) {
    
// }
function addPlayer(player){
    if(player.position == 'GK'){
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
          <div class="carte reserve">
             
     
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
        reserveList.appendChild(newDiv)

    }else{
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
          <div class="carte reserve">
             
     
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
        reserveList.appendChild(newDiv)
    }
}

formationCards.forEach((card)=>{
    reserveList.innerHTML = ''
    // removeFocus(formationCards)
    card.onclick = function(e){
        // card.classList.add('focus')
        // console.log(card.querySelector('#badge'))
        displayPlayers(card.classList[2],card)
        deletePlayer(reserveList.querySelectorAll('.carte'))
        // console.log(reserveList.querySelectorAll('.carte .player-name p'))
        if(reserveList.children.length == 0){
            reserveList.textContent =  'no player in this position'
        }
    }
})

// function removeFocus(formationCards) {
//     formationCards.forEach((card)=>{
//         card.classList.remove('focus')
//     })
// }

