
const form = document.getElementById('loginform');
const userName = document.getElementById('username');
const password = document.getElementById('password');
let errmessage = document.getElementById('error-msg')

form.addEventListener('submit', (event)=>{
    event.preventDefault()

    const loginForm = new FormData

    loginForm.append('username', userName.value);
    loginForm.append('password', password.value);

    
    fetch('http://127.0.0.1:8000/api/login/', {
        method : 'POST',
        body : loginForm
    })
    .then((response)=> {
        if(response.ok){
            return response.json()
        }else{
            console.log('Network response was not ok');
        }
    })
    .then((data)=> {
        console.log(data);
        if(data.token!== 'undefined'){
            localStorage.setItem('Token', data.token)
        }
        location.href = '/index.html'

    })
    .catch((err)=> {
        console.log(err);
        errmessage.innerHTML = 'Invalid Credentials'
        setTimeout(() => {
            errmessage.style.display = 'none'
        }, 5000);
    })
    .finally(()=>{
        form.reset()
    })

});



