if(!localStorage.getItem('token')) document.location.href = '../auth/login/index.html'

async function checkAdmin() {
    const url = 'http://dvzh07mail.temp.swtest.ru/api/admin/dashboard'

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token')
        },
    });

    let result = await response.json();

    if(result.error === 'Forbidden') document.location.href = '../'
    else if (result.error === 'Unauthorized') {
        localStorage.removeItem('token')
        document.location.href = '../auth/login/index.html'
    }
}

checkAdmin()
