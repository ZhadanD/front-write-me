async function getProfile() {
    let url = 'http://127.0.0.1:8000/api/users/profile';

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token'),
        },
    });

    if(response.status === 401) {
        localStorage.removeItem('token')
        document.location.href = 'auth/login'
    }

    let result = await response.json();

    document.getElementById('user-name').innerText = result.data.name
    document.getElementById('my-email').innerText = result.data.email
    document.getElementById('friends-counter').innerText = result.data.friendsCounter
}

getProfile()
