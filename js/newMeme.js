const fileUpload = document.querySelector('#fileUpload');
const btnUpload = document.querySelector('.uploadButton')
let meme = null;

fileUpload.addEventListener('change', selectPic);
btnUpload.addEventListener('click', uploadMeme);

async function selectPic() {
    const file = fileUpload.files[0];
    console.log(file);
    if (file) {
        meme = file;
        const reader = new FileReader();
        reader.onload = (event) => {
            const newMeme = document.querySelector('.newMeme');
            newMeme.style.backgroundImage = `url('${event.target.result}')`
            newMeme.style.backgroundRepeat = 'no-repeat';
        }  
        reader.readAsDataURL(file);
    }
}

async function uploadMeme()
{
    try {
        if (meme) {
            const formData = new FormData;
            formData.append('meme', meme);
            const response = await fetch('http://127.0.0.1:3000/api/memes/uploadMeme', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

        } else 
        {
            alert('Válassz ki egy képet!')
        }
    } catch (error) {
        console.log(error);
    }
}