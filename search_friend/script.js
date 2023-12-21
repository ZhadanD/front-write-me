function getTable(result) {
    document.getElementById('title_table').innerText = `Всего пользователей: ${result.meta.total}`

    let table = ''

    for (let i = 0; i < result.data.length; i++) {
        table += `
        <tr>
            <td width="150"><img width="150" src="/public/dist/img/man.png" alt="Аватар пользователя" class="img-circle img-fluid"></td>
            <td width="250">${result.data[i].name}</td>
            <td width="100">${result.data[i].isFriend ? '<button disabled class="btn btn-warning">Уже дружите</button>' : '<button type="button" class="btn btn-success" onclick="makeFriend(${result.data[i].id})">Подружиться</button>'}</td>
        </tr>`
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

async function getUsers(url = 'http://127.0.0.1:8000/api/users/search_friends') {
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
