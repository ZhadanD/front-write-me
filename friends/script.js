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

function clearTextarea() {
    document.getElementById('message').value = ''
}

async function sendMessage() {
    let newMessage = {
        recipientId: localStorage.getItem('recipientId'),
        message: document.getElementById('message').value
    }

    let url = 'http://127.0.0.1:8000/api/messages'

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(newMessage)
    })

    if(response.status === 422) {
        let errors = `<h4 class="text-warning text-center">Ошибки валидации</h4>`

        let result = await response.json()

        for (let error in result) {
            errors += `<p class="text-warning">${result[error]}</p>`
        }

        document.querySelector('#errors_or_success').innerHTML = errors
    } else if(response.status === 201) {
        let successResultText = `<h3 class="text-success text-center">Сообщение успешно отправлено!</h3>`

        document.querySelector('#errors_or_success').innerHTML = successResultText

        clearTextarea()
    } else if(response.status === 401) document.location.href = '/auth/login'
}

function setRecipientId(id) {
    localStorage.setItem('recipientId', id)
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
                                        
                                        <button onclick="setRecipientId(${friends[i].id})" type="button" class="btn btn-success" data-toggle="modal" data-target="#modal-secondary">
                                            Отправить сообщение
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`
    }

    document.getElementById('friends').innerHTML = cardsFriends
}

showFriends()
