import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import auth from './auth'
import orders from './orders'
import AuthService from "@/services/AuthService"

Vue.use(Vuex)

export default new Vuex.Store({
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
  },
  modules: {
    auth,
    orders
  }
})
