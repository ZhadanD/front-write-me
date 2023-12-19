function logout() {
    localStorage.removeItem('token')
    document.location.href = '../auth/login.html'
}
