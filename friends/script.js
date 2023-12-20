async function getFriends() {
    let url = 'http://127.0.0.1:8000/api/users/friends';

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token'),
        },
    });

    if (response.status === 401) {
        localStorage.removeItem('token')
        document.location.href = '/auth/login'
    }

    let result = await response.json()

    return result.data
}

async function showFriends() {
    let friends = await getFriends()

    let cardsFriends = ''

    for (let i = 0; i < friends.length; i++) {
        cardsFriends += `
        <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                            <div class="card bg-light d-flex flex-fill">
                                <div class="card-body pt-3">
                                    <div class="row">
                                        <div class="col-7">
                                            <h2 class="lead"><b>${friends[i].name}</b></h2>
                                        </div>
                                        <div class="col-5 text-center">
                                            <img src="/public/dist/img/man.png" alt="Аватар пользователя" class="img-circle img-fluid">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
    }

    document.getElementById('friends').innerHTML = cardsFriends
}

showFriends()
