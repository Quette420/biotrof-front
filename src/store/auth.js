import axios from "axios"
import router from "@/router/router"
import AuthService from "@/services/AuthService"

export default {
    actions: {
        async login({dispatch, commit}, {username, password}) {
            console.log(dispatch.getToken)
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
        getUser({dispatch, commit}) {
            console.log(dispatch.getToken)
            return axios('http://localhost:8081/user',{
              method: 'GET',
              headers: {
                  Authorization: AuthService.getToken()
              }
            })
              .then((response) => { 
              commit('SET_TOKEN_TO_STATE', response.data.token);
              commit('SET_ROLE_TO_STATE', response.data.role);
              commit('SET_UUID_TO_STATE', response.data.uuid);
              commit('SET_USERNAME_TO_STATE', response.data.userName);
            return response;
        }).catch((error) => {
                console.log(error)
            return error;
        });
        }
    }
}