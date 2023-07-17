
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
        let loadingmsg = document.getElementById('loadingmessage');
        if (searchResults) {
            loadingmsg.style.display = 'none'
        }
        console.log(searchResults);

        if (searchResults) {
            let eachData = '';
            searchResults.map((value) => {
                eachData += `
                    <div class="card">
                        <a href="${value.video_url}" style='text-decoration:none;'>
                        <img src="${value.image_url}" class="card__image">
                        <div class="card__content">
                            <p>${value.title}</p>
                            <small class="card__link">${value.category.name}</small>
                        </div>
                        <div>
                            <div>
                            <small class="card__date" style="font-size:large">${value.users.username}</small>
                            <small class="card__date">${value.created}</small>
                            </div>
                        </div>
                        </a>
                    </div>`;
            });
            cardsContainer.innerHTML = eachData;
        }else{
            console.log('no result');
            cardsContainer.innerHTML = '<div class="card"><h1>No result</h1></div>'
        }
    });
}



