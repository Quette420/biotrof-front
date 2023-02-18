import axios from 'axios'

const AuthService = {
    register(request) {
        return axios.post('http://localhost:8081/register', request)
            .then((response) => { 
        return response;
    }).catch((error) => {
            console.log(error)
        return error;
    });
    },
    login(request) {
        return axios.post('http://localhost:8081/login', request)
            .then((response) => {    
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('role', JSON.stringify(response.data.role));
        localStorage.setItem('uuid', JSON.stringify(response.data.uuid));
        localStorage.setItem('username', JSON.stringify(response.data.username))
        return response;
    }).catch((error) => {
        console.log(error)
        return error;
    });
    },
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

export default AuthService