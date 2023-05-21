import axios from "axios"
import router from "@/router/router"

import LocalStorageService from "@/services/LocalStorageService"

export default {
    state: {
        user: {
          status: '',
          role: '',
          uuid: '',
          username: ''
      }
      },
      getters: {
        ROLE(state) {
            return state.user.role;
        },
        UUID(state) {
            return state.user.uuid;
        },
        USERNAME(state) {
          return state.user.username;
        },
        USER(state) {
            return state.user;
        }
      },
      mutations: {
        SET_ROLE_TO_STATE(state, role) {
          state.user.role = role;
        },
        SET_UUID_TO_STATE(state, uuid) {
          state.user.uuid = uuid;
        },
        SET_USERNAME_TO_STATE(state, username) {
          state.user.username = username;
        },
        SET_USER_TO_STATE(state, user) {
            state.user = user
        }
      },
    actions: {
        /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        async login({dispatch, commit}, request) {
            try {
                await axios.post('http://localhost:8081/login', request)
                .then((response) => {
                    if(response.data.status != 'BANNED') {
                        localStorage.setItem('token', JSON.stringify(response.data.token));
                        localStorage.setItem('uuid', JSON.stringify(response.data.uuid));
                    //    sessionStorage.setItem('token', JSON.stringify(response.data.token));
                    //    sessionStorage.setItem('uuid', JSON.stringify(response.data.uuid));
                        commit('SET_USER_TO_STATE', response.data);
                        router.push('/')
                    }
                });
                
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
        async register({dispatch, commit}, request) {
            try {
                await axios.post('http://localhost:8081/register', request)
                .then((response) => {
                    console.log("Register success")
                });
                router.push('/login')
            } catch (e) {
                console.log('Пользователь уже зарегистрирован!')
            }
        },
        getUser({dispatch, commit}) {
            console.log('getUser called')
            return axios('http://localhost:8081/user',{
              method: 'GET',
              headers: {
                  Authorization: LocalStorageService.getToken()
              }
            })
              .then((response) => { 
            commit('SET_USER_TO_STATE', response.data);
            localStorage.setItem('uuid', JSON.stringify(response.data.uuid));
            return response;
        }).catch((error) => {
            if(error.code === 'ERR_BAD_REQUEST') {
                window.location.replace("http://localhost:8080/login")
            }
                console.log(error)
            return error;
        });
        },
        async changePassword({dispatch, commit}, request) {
            try {
                await axios.post('http://localhost:8081/change-password', request, 
                {
                    headers: {
                        Authorization: LocalStorageService.getToken()
                    }
                })
                .then((response) => {
                    console.log(response)
                    if(response.status === 200) {
                        localStorage.clear()
                        router.push('/')
                    }
                });
                
            } catch (e) {
                console.log(e)
            }
        },
    }
}