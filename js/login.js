
const form = document.getElementById('loginform');
const userName = document.getElementById('username');
const password = document.getElementById('password');
let errmessage = document.getElementById('error-msg');
let loadingMsg = document.getElementById('loadingmessage');

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    
    loadingMsg.style.display = 'block'

    const loginForm = new FormData

    loginForm.append('username', userName.value);
    loginForm.append('password', password.value);


    
    fetch('https://videohubserversideapi.onrender.com/api/login/', {
        method : 'POST',
        body : loginForm
    })
    .then((response)=> {
        if(response.ok){
            return response.json()
        }else{
            console.log('Network was not ok');
        }
    })
    .then((data)=> {
        console.log(data);
        if(data.token!== 'undefined'){
            localStorage.setItem('Token', data.token)
        }
        location.href = '/home.html'

    })
    .catch((err)=> {
        console.log(err);
        errmessage.innerHTML = 'Invalid Credentials'
        setTimeout(() => {
            errmessage.style.display = 'none'
        }, 5000);
        loadingMsg.style.display = 'none'
    })
    .finally(()=>{
        form.reset()
    })

});
