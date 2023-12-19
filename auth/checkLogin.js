async function getToken() {
    const url = 'http://127.0.0.1:8000/api/auth/login'

    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    let result = await response.json();

    if(result.error) {
        document.querySelector('.error').innerHTML = `<h4 class="text-danger">Неверные учетные данные</h4>`
    } else {
        localStorage.setItem('token', 'Bearer ' + result.access_token)
        document.location.href = '../'
    }
}
