async function getChats() {
    let url = 'http://dvzh07mail.temp.swtest.ru/api/messages/chats';

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token'),
        },
    });

    if (response.status === 401) {
        localStorage.removeItem('token')
        document.location.href = '/auth/login/index.html'
    }

    let result = await response.json()

    return result.data
}

async function getMessagesChat(chatId) {
    let url = 'http://dvzh07mail.temp.swtest.ru/api/messages/chats/' + chatId;

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token'),
        },
    });

    if (response.status === 401) {
        localStorage.removeItem('token')
        document.location.href = '/auth/login/index.html'
    }

    let result = await response.json()

    return result.data
}

async function showMessagesChatInModal(chatId) {
    let messages = await getMessagesChat(chatId)
    let result = ''

    for (let i = 0; i < messages.length; i++) {
        if(messages[i].my) {
            result += `
            <div class="direct-chat-msg right">
                                                <img class="direct-chat-img" src="/public/dist/img/man.png" alt="Аватар текущего пользователя">
                                                <div class="direct-chat-text">
                                                    ${messages[i].message}
                                                </div>
                                            </div>
            `
        } else {
            result += `
            <div class="direct-chat-msg">
                                                <img class="direct-chat-img" src="/public/dist/img/man.png" alt="Аватар отправителя">
                                                <div class="direct-chat-text">
                                                    ${messages[i].message}
                                                </div>
                                            </div>
            `
        }
    }

    document.querySelector('.direct-chat-messages').innerHTML = result
}

function closeChat() {
    clearInterval(localStorage.getItem('timerIdForChat'))
}

async function showMessagesChat(chatId, interlocutorId) {
    localStorage.setItem('interlocutorId', interlocutorId)

    await showMessagesChatInModal(chatId)

    let timerId = setInterval(async () => await showMessagesChatInModal(chatId), 2000)
    localStorage.setItem('timerIdForChat', timerId)
}

async function sendMessage() {
    let newMessage = {
        recipientId: localStorage.getItem('interlocutorId'),
        message: document.getElementById('message').value
    }

    let url = 'http://dvzh07mail.temp.swtest.ru/api/messages'

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
        let result = await response.json()

        let myNewMessage = `
            <div class="direct-chat-msg right">
                                                <img class="direct-chat-img" src="/public/dist/img/man.png" alt="Аватар текущего пользователя">
                                                <div class="direct-chat-text">
                                                    ${result.data.message}
                                                </div>
                                            </div>
            `

        document.querySelector('.direct-chat-messages').innerHTML += myNewMessage

        document.getElementById('message').value = ''
    } else if(response.status === 401) document.location.href = '/auth/login/index.html'
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
                                    <button onclick="showMessagesChat(${chats[i].chatId}, ${chats[i].interlocutorId})" type="button" class="btn btn-success" data-toggle="modal" data-target="#modal-secondary">
                                        Пообщаться
                                    </button>
                                </div>
                            </div>`
    }

    document.getElementById('chats').innerHTML = cardsChats
}

showChats()

setInterval(async () => await showChats(), 2000)
