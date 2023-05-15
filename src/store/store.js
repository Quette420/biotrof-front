import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import orders from './orders'
import products from './products'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    
  },
  mutations: {
    
  },
  actions: {
  
  },
  modules: {
    auth,
    orders,
    products
  }
})
