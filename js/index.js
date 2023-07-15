const toggleBtn = document.getElementsByClassName('togglebtn')[0]
const navBarLinks = document.getElementsByClassName('navbarlinks')[0]




//This is for the hambuger menu toggle button
toggleBtn.addEventListener('click', ()=>{
    navBarLinks.classList.toggle('active')
} )



const userId = Number(localStorage.getItem('UserId')) // This variable takes the authenticated user id stored in localStorage


fetch('http://127.0.0.1:8000/api/post_items/', {
    method : 'GET',
    headers : {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('Token')}`, // taking the authenticcated user toen to access all data
    }
}).then((data)=>{
    return data.json()
}).then(alldata =>{
    console.log(alldata);

    let eachData = ''
    alldata.map(values=>{
        eachData +=
        `
        
        <div class="card" data-id="${values.id}">
            <a href="${values.video_url}" class="card__video">
            <img src="${values.image_url}" class="card__image">
            </a>
                <div class="card__content">
                    <p class='card_title'>
                        ${values.title}
                    </p>
                    <a href="#"><small class="card__link">${values.category.name}</small></a>
                    <small class="card__date" style="font-size:large">${values.users.username}</small><br>
        `;

                    if(values.users.id === userId){ // Checks If the authenticated Post author(user) id is equal to the same authenticated user id in loalStorage
                        eachData +=
                        `
                        <a class='option' href="#" id="edit-post">Edit</a>
                        <a class='option' href="" id="delete-post">Delete</a>
                        `
                    }
                    eachData +=
                    `
                </div>
        </div>
    `



    })
    document.getElementById('cards').innerHTML = eachData
})







//----------------------SEARCH FUNCTIONALITY--------------------//



const searchedWord = document.getElementById('searchedWord')
const searchBtn = document.getElementById('search')


searchBtn.addEventListener('click', ()=>{
    const searchValue = searchedWord.value
    location.href = `/index.html?search=${encodeURIComponent(searchValue)}`
})
    
    const urlWordSearch = window.location.search
    const urlWord = new URLSearchParams(urlWordSearch)

    const searchedWords = urlWord.get('search')
    
    if(searchedWords){
        const cardsContainer = document.getElementById('cards');

        fetch(`http://127.0.0.1:8000/api/post_items/search/?search=${searchedWords}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('Token')}`,
            },
        }).then((response) => {
            return response.json();
        }).then((searchResults) => {
            console.log(searchResults);

            if (searchResults) {
                let eachData = '';
                searchResults.map((values) => {
                    eachData += `
                        <div class="card">
                            <a href="${values.video_url}" style='text-decoration:none;'>
                            <img src="${values.image_url}" class="card__image">
                            <div class="card__content">
                                <p>${values.title}</p>
                                <small class="card__link">${values.category.name}</small>
                            </div>
                            <div>
                                <div>
                                <small class="card__date" style="font-size:large">${values.users.username}</small>
                                <small class="card__date">${values.created}</small>
                                </div>
                            </div>
                            </a>
                        </div>`;
                });
                cardsContainer.innerHTML = eachData;
            }else if(!searchResults) {
                cardsContainer.innerHTML = 'Word not found'
            }
        });
    }







// -----------------------DELETE POST FUNCTIONALITY---------------------------//


let btnCards = document.getElementById('cards')
btnCards.addEventListener('click', (e)=>{
    // console.log(e.target.id);
    // e.preventDefault()
    let deleteBtn = e.target.id == 'delete-post'
    let editBtn = e.target.id == 'edit-post'


    if(deleteBtn){
        let cardDiv = e.target.closest('.card')
        let cardContent = cardDiv.dataset.id
        
        
        fetch(`http://127.0.0.1:8000/api/post_items/${cardContent}/`,{
            method : 'DELETE',
            headers : {
                'Authorization': `Token ${localStorage.getItem('Token')}`,
            },

        })
        .then((res) => {
            console.log(res);
            return res.json()
        })
        .then(()=> location.reload())
        .catch(err => console.log(err))
    }
    if(editBtn){

        let cardDiv = e.target.closest('.card')
        let cardContent = cardDiv.dataset.id

        let contnt = e.target.closest('.card')
        let titleContent = contnt.querySelector('.card_title').textContent
        let imageContent = contnt.querySelector('.card__image').src
        let videoContent = contnt.querySelector('.card__video').href
        let categContent = contnt.querySelector('.card__link').textContent

        localStorage.setItem('editData', JSON.stringify({
            postId : cardContent,
            title: titleContent.slice(24),
            image: imageContent.slice(75),
            video: videoContent.slice(77),
            category: categContent
          }));
          

          location.href = 'postUpdate.html'
    }

})

fetch('http://127.0.0.1:8000/api/user/', {
    method : 'GET',
    headers : {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('Token')}`, // taking the authenticcated user toen to access all data
    }
}).then((response)=> response.json())
.then((data)=>{
    console.log(data);
    localStorage.setItem('UserId', data.id)
    localStorage.setItem('Username', data.username)
}).catch((err)=> console.log(err))



