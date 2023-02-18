import axios from "axios"
import router from "@/router/router"

import AuthService from "@/services/AuthService"

export default {
    state: {
        user: {
          token: '',
          role: '',
          uuid: '',
          username: ''
      }
      },
      getters: {
        TOKEN(state) {
            return state.user.token;
        },
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
        SET_TOKEN_TO_STATE(state, token) {
          state.user.token = token;
        },
        SET_ROLE_TO_STATE(state, role) {
          state.user.role = role;
        },
        SET_UUID_TO_STATE(state, uuid) {
          state.user.uuid = uuid;
        },
        SET_USERNAME_TO_STATE(state, username) {
          state.user.username = username;
        }
      },
    actions: {
        /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        async login({dispatch, commit}, request) {
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
              commit('SET_USERNAME_TO_STATE', response.data.username);
            return response;
        }).catch((error) => {
                console.log(error)
            return error;
        });
        }
    }
}