
const form = document.getElementById('loginform');
const userName = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2')
let errmessage = document.getElementById('error-msgs')
let loadingMsg = document.getElementById('loadingmessage');


form.addEventListener('submit', (event)=>{
    event.preventDefault()

    loadingMsg.style.display = 'block'

    const loginForm = new FormData

    loginForm.append('username', userName.value);
    loginForm.append('password', password.value);

    fetch('https://videohubserversideapi.onrender.com/api/register/', {
        method : 'POST',
        body : loginForm,
    })
    .then((response) => {
        if(response.ok){
            location.href = '/index.html'
            return response.json()
        }else{
            console.log('Network response was not ok');
        }
    }
    ).then(data =>{
        console.log(data);
        if(data){
            if(data.username){
                errmessage.innerHTML = `Please do not use white space inbetween your name.${data.username.slice(0, 20)}`
                setTimeout(() => {
                    errmessage.style.display = 'none'
                }, 5000);
            }
            if(password.value !== password2.value){
                errmessage.innerHTML = `Password do not match`
                setTimeout(() => {
                    errmessage.style.display = 'none'
                }, 5000);
                console.log(password2.value, password.value);
            }else{
                return password
            }
        }
        // console.log(password2.value, password.value);
    })
    .catch((error) => {
        console.error('ERR: ' + error)
        errmessage.innerHTML = error
        setTimeout(() => {
            errmessage.style.display = 'none'
        }, 5000);
        loadingMsg.style.display = 'none'
    })
    .finally(()=> form.reset())

});
