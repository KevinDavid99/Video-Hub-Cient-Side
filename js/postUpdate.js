const postform = document.getElementById('postform');
let fileUpload = document.getElementById('file-upload');
let videoUpload = document.getElementById('video-upload');
let selectCategory = document.getElementById('categorylist');
let title = document.getElementById('title')

let loadingIcon = document.getElementById('loading')


const editData = JSON.parse(localStorage.getItem('editData'))// getting the data to be prefilled in the form

if(editData){
    title.value = editData.title
    selectCategory.value = editData.category
    videoUpload.textContent = editData.video
    fileUpload.textContent = editData.image
}

const postId = editData.postId // the post id to be updated




fetch('http://127.0.0.1:8000/api/category_post/',{
}).then(data => data.json()).then((objdata)=>{
    objdata.map(datas =>{
        console.log(datas);
        let select = document.createElement('option')
        selectCategory.appendChild(select)//taking only the category name to be in the value attribute
        select.innerHTML = datas.name
        select.value = datas.name
    })
    if(editData){
        selectCategory.value = editData.category // the category field to be prefilled
    }

    postform.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    loadingIcon.style.display = 'block'

    localStorage.removeItem('editData');

    const newTitle = document.getElementById('title').value

    const newCategory = objdata.find(category => category.name === selectCategory.value);
    

    const formData = new FormData()

    formData.append('image', fileUpload.files[0]);
    formData.append('video', videoUpload.files[0]);
    formData.append('title', newTitle);
    formData.append('category', newCategory.id);

    fetch(`http://127.0.0.1:8000/api/post_items/${postId}/`, {
        method : 'PATCH',
        body : formData,
        headers : {
            'Authorization': `Token ${localStorage.getItem('Token')}`
        }
    })
    .then((response)=>{
        
        loadingIcon.style.display = 'none'
        if(response.json()){
            location.href = '/home.html'
        }
    })
    .then((data)=> console.log(data))
    .catch(err => console.log(err));
})
}).catch(err => console.log(err))





