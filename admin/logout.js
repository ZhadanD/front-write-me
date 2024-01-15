async function logout() {
    const url = 'http://dvzh07mail.temp.swtest.ru/api/auth/logout'

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token')
        },
    });

    localStorage.removeItem('token')

    document.location.href = '../auth/login/index.html'
}
