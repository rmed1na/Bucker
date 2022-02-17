function getAuthData() {
    return JSON.parse(sessionStorage.getItem('auth'));
}

function setAuthData(data) {
    sessionStorage.setItem('auth', JSON.stringify(data));
}

function getUserData() {
    return JSON.parse(sessionStorage.getItem('user'));
}

function setUserData(data) {
    sessionStorage.setItem('user', JSON.stringify(data));
}

export default {
    getAuthData,
    setAuthData,
    getUserData,
    setUserData
}