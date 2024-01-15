async function makeFriend(friendId) {
    let url = 'http://dvzh07mail.temp.swtest.ru/api/users/make_friend'

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
            friendId: friendId
        })
    });

    if(response.status === 401) document.location.href = '/auth/login/index.html'

    let result = await response.json()

    if(response.status === 422) alert(result.friendId[0])

    if(response.status === 201) {
        document.getElementById(friendId).innerHTML = '<button disabled class="btn btn-warning">Уже дружите</button>'
    }
}

function getTable(result) {
    document.getElementById('title_table').innerText = `Всего пользователей: ${result.meta.total}`

    let table = ''

    for (let i = 0; i < result.data.length; i++) {
        table += `
        <hr>
        <div class="row mb-2">
            <div class="col">
                <img src="/public/dist/img/man.png" alt="Аватар пользователя" style="max-width: 130px" class="img-circle img-fluid">
            </div>
            <div class="col">
                <div class="col">
                    ${result.data[i].name}
                </div>
                <div class="col" id="${result.data[i].id}">
                    ${result.data[i].isFriend ? '<button disabled class="btn btn-warning">Уже дружите</button>' : `<button type="button" class="btn btn-success" onclick="makeFriend(${result.data[i].id})">Подружиться</button>`}
                </div>
            </div>
        </div>`
    }

    document.getElementById('table_users').innerHTML = table
}

function getPagination(result) {
    let pagination = ''

    pagination += `<li class="page-item"><a class="page-link" onclick="getUsers('${result.links.first}')">&laquo;</a></li>`

    for (let i = 1; i < result.meta.links.length - 1; i++) {
        pagination += `<li class="page-item ${result.meta.links[i].active ? 'active' : ''}"><a class="page-link" onclick="getUsers('${result.meta.links[i].url}')">${result.meta.links[i].label}</a></li>`
    }

    pagination += `<li class="page-item"><a class="page-link" onclick="getUsers('${result.links.last}')">&raquo;</a></li>`

    document.getElementById('my_pagination').innerHTML = pagination
}

async function getUsers(url = 'http://dvzh07mail.temp.swtest.ru/api/users/search_friends') {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token')
        },
    });

    let result = await response.json()

    getTable(result)

    getPagination(result)
}

getUsers()
