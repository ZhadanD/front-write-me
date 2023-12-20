async function logout() {
    const url = 'http://127.0.0.1:8000/api/auth/logout'

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token')
        },
    });

    localStorage.removeItem('token')

    document.location.href = '../../auth/login.html'
}
