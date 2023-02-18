import axios from "axios"
import router from "@/router/router"

export default {
    actions: {
        /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        async login({dispatch, commit}, {username, password}) {
            const request = {
                username: username, 
                password: password
            }
            try {
                await axios.post('http://localhost:8081/login', request)
                .then((response) => {
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    commit('SET_TOKEN_TO_STATE', response.data.token);
                    commit('SET_ROLE_TO_STATE', response.data.role);
                    commit('SET_UUID_TO_STATE', response.data.uuid);
                    commit('SET_USERNAME_TO_STATE', response.data.userName);
                });
                router.push('/')
            } catch (e) {
                console.log(e)
            }
        },
     /*   login({dispatch, commit}, {username, password}) {
            console.log(dispatch, commit)
            const request = {
                username: username, 
                password: password
            }
          //  axios.post('http://localhost:8081/login', request)
            return axios.post('http://localhost:8081/login', request)
            .then((response) => {    
                localStorage.setItem('token', JSON.stringify(response.data.token));
            return response;
            }).catch((error) => {
                console.log(error)
            return error;
            });   
        },
        */
        logout() {
            localStorage.clear()
        },
        async register({dispatch, commit}, {username, password}) {
            const request = {
                username: username, 
                password: password
            }
            try {
                await axios.post('http://localhost:8081/register', request)
                .then((response) => {
                    console.log("Register success")
                });
                router.push('/login')
            } catch (e) {
                console.log('Пользователь уже зарегистрирован!')
            }
        }
    }
}