import axios from "axios"
import AuthService from '@/services/AuthService'
import DateService from '@/services/DateService'
import CreateOrderRequest from "@/model/CreateOrderRequest";
/*eslint no-unused-vars: ["error", { "args": "none" }]*/

const REPORTS_BASE_URL = 'http://localhost:8081/reports';
const ORDERS_BASE_URL = 'http://localhost:8081/api/v1/orders'

export default {
    state: {
        ordersArray: [],
        ordersByUuid: []
      },
      getters: {
        ORDERS(state) {
            return state.ordersArray;
        },
        GET_ALL_EMPLOYER_ORDERS(state) {
            //let arr = state.orders.ordersArray.filter(order => order.employerUuid === state.auth.user.uuid);
            return state.ordersByUuid;
        },
        GET_PER_WEEK_EMPLOYER_ORDERS(state) {
            let now = new Date();
            let arr = state.ordersByUuid.filter(order => DateService.getStartOfWeek(now) <= new Date(order.createDate) && new Date(order.createDate) <= DateService.getEndOfWeek(now));
            return arr;
        },
        GET_PER_MONTH_EMPLOYER_ORDERS(state) {
            return state.ordersByUuid;
        },
        GET_PER_YEAR_EMPLOYER_ORDERS(state) {
            return state.ordersByUuid;
        },
        GET_PER_WEEK_EMPLOYER_ORDERS_IN_PROCESS(state) {
            let now = new Date();
            let arr = state.ordersByUuid.filter(order => DateService.getStartOfWeek(now) <= new Date(order.createDate) && new Date(order.createDate) <= DateService.getEndOfWeek(now));
            return arr.filter(order => order.stage != 'DONE');
        },
        GET_PER_WEEK_EMPLOYER_ORDERS_DONE(state) {
            let now = new Date();
            let arr = state.ordersByUuid.filter(order => DateService.getStartOfWeek(now) <= new Date(order.createDate) && new Date(order.createDate) <= DateService.getEndOfWeek(now));
            return arr.filter(order => order.stage === 'DONE');
        }
      },
      mutations: {
        SET_ORDERS_TO_STATE(state, orders) {
            state.ordersArray = orders
        },
        SET_ORDERS_BY_UUID_TO_STATE(state, orders) {
            state.ordersByUuid = orders
        }
      },
    actions: {
        getAllReports({dispatch, commit}) {
            return axios(REPORTS_BASE_URL, {
                method: 'GET',
                headers: {
                    Authorization: AuthService.getToken()
                }
            }).then((response) => {
                return response;
            }).catch((error) => {
                console.log(error)
                return error;
            });
        },
        getNotShippedOrders({dispatch, commit}) {
            return axios(ORDERS_BASE_URL + '/shipment', 
            {
                method: 'GET',
                headers: {
                    Authorization: AuthService.getToken()
                }
            }).then((response) => {
                return response;
            }).catch((error) => {
                console.log(error)
                return error;
            });
        },
        getAllOrdersByUuid({dispatch, commit}) {
            return axios('http://localhost:8081/api/v1/orders/employer/' + AuthService.getUuid(), 
            {
                method: 'GET',
                headers: {
                    Authorization: AuthService.getToken()
                }
            }).then((response) => {
                commit('SET_ORDERS_BY_UUID_TO_STATE', response.data);
                return response;
            }).catch((error) => {
                console.log(error)
                return error;
            });
        },
         getAllOrders({dispatch, commit}) {
            console.log('getAllOrders called')
            return axios(ORDERS_BASE_URL, 
                {
                method: 'GET',
                headers: {
                    Authorization: AuthService.getToken()
                }
            }).then((response) => {
                commit('SET_ORDERS_TO_STATE', response.data);
                return response;
            }).catch((error) => {
                console.log(error)
                return error;
            });
        },
        getOrderByOrderId({dispatch, commit}, id) {
            return axios(ORDERS_BASE_URL + id, 
                {
                method: 'GET',
                headers: {
                    Authorization: AuthService.getToken()
                }
            }).then((response) => {
                return response;
            }).catch((error) => {
                console.log(error)
                return error;
            });
        },
        CREATE_ORDER({dispatch, commit}, req) {
            let request = new CreateOrderRequest();
            request = req
            request.employerUuid = AuthService.getUuid()
            return axios.post(ORDERS_BASE_URL, request, {
                headers: {
                    Authorization: AuthService.getToken()
                }
            }).then((response) => {
                console.log('order created!')
                return response;
            }).catch((error) => {
                console.log(error)
                return error;
            });
        },
        updateOrder({dispatch, commit}, order) {
            return axios.put(ORDERS_BASE_URL + order.id, order, {
                headers: {
                    Authorization: AuthService.getToken()
                }
            }).then((response) => {
                return response;
            }).catch((error) => {
                console.log(error)
                return error;
            });
        },
        deleteOrder({dispatch, commit}, id) {
            return axios.delete(ORDERS_BASE_URL + id, {
                headers: {
                    Authorization: AuthService.getToken()
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