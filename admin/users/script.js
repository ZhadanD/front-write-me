function getTable(result) {
    document.getElementById('title_table').innerText = `Всего пользователей: ${result.meta.total}`

    let table = ''

    for (let i = 0; i < result.data.length; i++) {
        table += `
        <tr>
            <td>${result.data[i].id}</td>
            <td>${result.data[i].name}</td>
            <td>${result.data[i].email}</td>
            <td>${result.data[i].role}</td>
            <td><button type="button" class="btn btn-danger" onclick="deleteUser(${result.data[i].id})">Удалить</button></td>
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

async function getUsers(url = 'http://127.0.0.1:8000/api/admin/users') {
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

async function createUser() {
    let newUser = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value,
        password: document.getElementById('password').value
    }

    let url = 'http://127.0.0.1:8000/api/admin/users'

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(newUser)
    });

    if(response.status === 422) {
        let errors = `<h4 class="text-warning text-center">Ошибки валидации</h4>`

        let result = await response.json()

        for (let error in result) {
            errors += `<p class="text-warning">${result[error]}</p>`
        }

        document.querySelector('#errors_or_success').innerHTML = errors
    } else if(response.status === 201) {
        let successResultText = `<h3 class="text-success text-center">Пользователь успешно создан!</h3>`

        document.querySelector('#errors_or_success').innerHTML = successResultText

        document.getElementById('name').value = ''
        document.getElementById('email').value = ''
        document.getElementById('role').value = 'user'
        document.getElementById('password').value = ''
    }
}

async function deleteUser(id) {
    let decision = confirm('Вы точно хотите удалить пользователя?')

    let url = `http://127.0.0.1:8000/api/admin/users/${id}`

    if(decision) {
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': localStorage.getItem('token')
            },
        });

        if(response.status === 204) getUsers()
    }
}
