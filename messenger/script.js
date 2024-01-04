async function getChats() {
    let url = 'http://127.0.0.1:8000/api/messages/chats';

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

async function showChats() {
    let chats = await getChats()

    let cardsChats = ''

    for (let i = 0; i < chats.length; i++) {
        cardsChats += `
        <div class="row mb-4 border-bottom border-success pt-3 pb-3">
                                <div class="col">
                                <div class="row">
                                    <div class="col">
                                        <img class="img-circle" width="150" src="/public/dist/img/man.png" alt="Аватар пользователя">
                                    </div>
                                    <div class="col">
                                        <h4>${chats[i].username}</h4>
                                    </div>
                                </div>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modal-secondary">
                                        Пообщаться
                                    </button>
                                </div>
                            </div>`
    }

    document.getElementById('chats').innerHTML = cardsChats
}

showChats()
