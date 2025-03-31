const btnLogin = document.getElementsByClassName('login')[0];

btnLogin.addEventListener('click', login);

async function login() {
    const email = document.getElementById('email').value;
    const psw = document.getElementById('psw').value;

    console.log(email, psw);
    
    try {
        const response = await fetch('http://127.0.0.1:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, psw }),
            credentials: 'include' // engedélyezi a sütik fogadását
        });
        console.log(response);
        const data = await response.json()
        
        if (response.ok) {
            alert(data.message);
            window.location.href = '../html/home.html';
        } else if (data.errors) {
            let errorMessage = '';
            data.errors.forEach(sor => {
                errorMessage += `${sor.error}\n`;
            });
            alert(errorMessage);
        } else if (data.error) {
            alert(data.error);
        } else {
            alert('Ismeretlen hiba');
        }
    } catch (error) {
        console.log(error);
    }
}