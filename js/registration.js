const btnReg = document.getElementsByClassName('reg')[0];

btnReg.addEventListener('click', register);

async function register() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const psw = document.getElementById('psw').value;
    const psw2 = document.getElementById('psw2').value;

    if (psw !== psw2) {
        return alert('A két jelszó nem egyezik!');
    }

    try {
        const response = await fetch('http://127.0.0.1:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, name, psw })
        });

        //console.log(response);
        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
            alert(data.message);
            window.location.href = '../html/login.html';
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