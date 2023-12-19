if(!localStorage.getItem('token')) document.location.href = '../../auth/login.html'

async function checkAdmin() {
    // TODO поменяй на url dashboard
    const url = 'http://127.0.0.1:8000/api/admin/users'

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
        document.location.href = '../../auth/login.html'
    }
}

checkAdmin()
