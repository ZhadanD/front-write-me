async function getDashboard() {
    let url = 'http://dvzh07mail.temp.swtest.ru/api/admin/dashboard'

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('token')
        },
    });

    return await response.json()
}

async function showDashboard() {
    let dashboardData = await getDashboard()

    document.getElementById('usersCounter').innerText = dashboardData.data.usersCounter
}

showDashboard()
