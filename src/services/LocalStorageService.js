const LocalStorageService = {
    logout() {
        console.log('LOGOUT EXECUTING')
        localStorage.clear();
    },
    isLoggedIn() {
        return localStorage.getItem('token') !== null && localStorage.getItem('uuid') !== null;
    },
    getToken() {
        const token = localStorage.getItem('token');
        return token.substring(1, token.length - 1);
    },
    getUuid() {
        const uuid = localStorage.getItem('uuid');
        return uuid.substring(1, uuid.length - 1);
    },
    getRole() {
        const role = localStorage.getItem('role');
        return role.substring(1, role.length - 1);
    }
}

export default LocalStorageService