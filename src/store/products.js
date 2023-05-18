import axios from "axios"
import LocalStorageService from "@/services/LocalStorageService"

const PRODUCTS_BASE_URL = 'http://localhost:8081/api/v1/products'

export default {
    state: {
        products: []
      },
      getters: {
        PRODUCTS(state) {
            return state.products;
        }
      },
      mutations: {
        SET_PRODUCTS_TO_STATE(state, products) {
          state.products = products;
        }
      },
    actions: {
        /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        getAllProductsSync({dispatch, commit}) {
            return axios(PRODUCTS_BASE_URL, 
            {
                method: 'GET',
                headers: {
                    Authorization: LocalStorageService.getToken()
                }
            }).then((response) => {
                commit('SET_PRODUCTS_TO_STATE', response.data);
                return response;
            }).catch((error) => {
                console.log(error)
                return error;
            });
        },
        createProduct({dispatch, commit}, request) {
            console.log(request)
            return axios.post(PRODUCTS_BASE_URL, request, {
                headers: {
                    Authorization: LocalStorageService.getToken()
                }
            }).then((response) => {
                console.log('order created!')
                return response;
            }).catch((error) => {
                console.log(error)
                return error;
            });
            
        },
        updateProductQuantity({dispatch, commit}, req) {
            console.log("REQUEST " + req)
            return axios.put(PRODUCTS_BASE_URL + '/quantity', req, {
                headers: {
                    Authorization: LocalStorageService.getToken()
                }
            }).then((response) => {
                return response;
            }).catch((error) => {
                console.log(error)
                return error;
            });
        }
    }
}