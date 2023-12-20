async function register() {
    let password = document.getElementById('password').value
    let confirmPassword = document.getElementById('confirm_password').value

    if(password !== confirmPassword) {
        document.querySelector('.error').innerHTML = `<h4 class="text-danger">Пароли не совпадают!</h4>`
        return
    }

    const url = 'http://127.0.0.1:8000/api/auth/register'

    let user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: password
    };

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    let result = await response.json()

    if(response.status === 422) {
        let errors = `<h4 class="text-warning text-center">Ошибки валидации</h4>`

        for (let error in result) {
            errors += `<p class="text-warning">${result[error]}</p>`
        }

        document.querySelector('.error').innerHTML = errors
    } else {
        let response = await fetch('http://127.0.0.1:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        });

        let result = await response.json();

        localStorage.setItem('token', 'Bearer ' + result.access_token)
        document.location.href = '../../'
    }
}
