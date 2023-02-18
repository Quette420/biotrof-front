import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

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
    
  },
  modules: {
    auth
  }
})
