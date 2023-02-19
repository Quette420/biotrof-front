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
            return state.ordersByUuid;
        },
        GET_PER_WEEK_EMPLOYER_ORDERS(state) {
            let now = new Date();
            return state.ordersByUuid.filter(order => order.createDate != null && DateService.getStartOfWeek(new Date()) <= new Date(order.createDate) && new Date(order.createDate) <= DateService.getEndOfWeek(now));
        },
        GET_PER_WEEK_EMPLOYER_ORDERS_IN_PROCESS(state) {
            let now = new Date();
            return state.ordersByUuid.filter(order => order.createDate != null && DateService.getStartOfWeek(new Date()) <= new Date(order.createDate) && new Date(order.createDate) <= DateService.getEndOfWeek(now))
            .filter(order => order.price != null).filter(order => order.stage != 'DONE');
        },
        GET_PER_WEEK_EMPLOYER_ORDERS_DONE(state) {
            let now = new Date();
            return state.ordersByUuid.filter(order => order.createDate != null && DateService.getStartOfWeek(new Date()) <= new Date(order.createDate) && new Date(order.createDate) <= DateService.getEndOfWeek(now))
            .filter(order => order.price != null).filter(order => order.stage === 'DONE');
        },
        GET_PER_WEEK_EMPLOYER_ORDER_SALES(state) {
            let sum = 0;
            let now = new Date();
            state.ordersByUuid.filter(order => order.createDate != null && DateService.getStartOfWeek(new Date()) <= new Date(order.createDate) && new Date(order.createDate) <= DateService.getEndOfWeek(now))
            .filter(order => order.price != null).forEach(order => {
                sum += order.price
            });
            return sum;
        },
        GET_PER_WEEK_EMPLOYER_ORDER_SALES_IN_PROCESS(state) {
            let sum = 0;
            let now = new Date();
            state.ordersByUuid.filter(order => order.createDate != null && DateService.getStartOfWeek(new Date()) <= new Date(order.createDate) && new Date(order.createDate) <= DateService.getEndOfWeek(now))
            .filter(order => order.price != null).filter(order => order.stage != 'DONE').forEach(order => {
                sum += order.price
            });
            return sum;
        },
        GET_PER_WEEK_EMPLOYER_ORDER_SALES_IN_DONE(state) {
            let sum = 0;
            let now = new Date();
            state.ordersByUuid.filter(order => order.createDate != null && DateService.getStartOfWeek(new Date()) <= new Date(order.createDate) && new Date(order.createDate) <= DateService.getEndOfWeek(now))
            .filter(order => order.price != null).filter(order => order.stage === 'DONE').forEach(order => {
                sum += order.price 
            });
            return sum;
        },
        GET_PER_MONTH_EMPLOYER_ORDERS(state) {
            const now = new Date()
            const month = now.getMonth();
            const year = now.getFullYear();
            return state.ordersByUuid.filter(order => order.createDate != null && new Date(order.createDate).getMonth() === month && new Date(order.createDate).getFullYear() === year);
        },
        GET_PER_MONTH_EMPLOYER_ORDERS_IN_PROCESS(state) {
            const now = new Date()
            const month = now.getMonth();
            const year = now.getFullYear();
            return state.ordersByUuid.filter(order => order.createDate != null && new Date(order.createDate).getMonth() === month && new Date(order.createDate).getFullYear() === year).filter(order => order.stage != 'DONE');
        },
        GET_PER_MONTH_EMPLOYER_ORDERS_DONE(state) {
            const now = new Date()
            const month = now.getMonth();
            const year = now.getFullYear();
            return state.ordersByUuid.filter(order => order.createDate != null && new Date(order.createDate).getMonth() === month && new Date(order.createDate).getFullYear() === year).filter(order => order.stage === 'DONE');
        },
        GET_PER_MONTH_EMPLOYER_ORDER_SALES(state) {
            let sum = 0;
            const now = new Date()
            const month = now.getMonth();
            const year = now.getFullYear();
            let arr = state.ordersByUuid.filter(order => order.createDate != null && new Date(order.createDate).getMonth() === month && new Date(order.createDate).getFullYear() === year && order.price != null)
            arr.forEach(order => {
                sum += order.price
            });
            return sum;
        },
        GET_PER_MONTH_EMPLOYER_ORDER_SALES_IN_PROCESS(state) {
            let sum = 0;
            const now = new Date()
            const month = now.getMonth();
            const year = now.getFullYear();
            let arr = state.ordersByUuid.filter(order => order.createDate != null && new Date(order.createDate).getMonth() === month && new Date(order.createDate).getFullYear() === year && order.price != null)
            .filter(order => order.stage != 'DONE')
            arr.forEach(order => {
                sum += order.price
            });
            return sum;
        },
        GET_PER_MONTH_EMPLOYER_ORDER_SALES_IN_DONE(state) {
            let sum = 0;
            const now = new Date()
            const month = now.getMonth();
            const year = now.getFullYear();
            let arr = state.ordersByUuid.filter(order => order.createDate != null && new Date(order.createDate).getMonth() === month && new Date(order.createDate).getFullYear() === year && order.price != null)
            .filter(order => order.stage === 'DONE')
            arr.forEach(order => {
                sum += order.price
            });
            return sum;
        },
        GET_PER_YEAR_EMPLOYER_ORDERS(state) {
            const now = new Date()
            const year = now.getFullYear();
            return state.ordersByUuid.filter(order => order.createDate != null && year === new Date(order.createDate).getFullYear());
        },
        GET_PER_YEAR_EMPLOYER_ORDERS_IN_PROCESS(state) {
            const now = new Date()
            const year = now.getFullYear();
            return state.ordersByUuid.filter(order => order.createDate != null && year === new Date(order.createDate).getFullYear()).filter(order => order.stage != 'DONE');
        },
        GET_PER_YEAR_EMPLOYER_ORDERS_DONE(state) {
            const now = new Date()
            const year = now.getFullYear();
            return state.ordersByUuid.filter(order => order.createDate != null && year === new Date(order.createDate).getFullYear()).filter(order => order.stage === 'DONE');
        },
        GET_PER_YEAR_EMPLOYER_ORDER_SALES(state) {
            let sum = 0;
            const now = new Date()
            const year = now.getFullYear();
            state.ordersByUuid.filter(order => order.createDate != null && year === new Date(order.createDate).getFullYear())
            .filter(order => order.price != null).forEach(order => {
                sum += order.price
            });
            return sum;
        },
        GET_PER_YEAR_EMPLOYER_ORDER_SALES_IN_PROCESS(state) {
            let sum = 0;
            const now = new Date()
            const year = now.getFullYear();
            state.ordersByUuid.filter(order => order.createDate != null && year === new Date(order.createDate).getFullYear())
            .filter(order => order.price != null).filter(order => order.stage != 'DONE').forEach(order => {
                sum += order.price
            });
            return sum;
        },
        GET_PER_YEAR_EMPLOYER_ORDER_SALES_IN_DONE(state) {
            let sum = 0;
            const now = new Date()
            const year = now.getFullYear();
            state.ordersByUuid.filter(order => order.createDate != null && year === new Date(order.createDate).getFullYear())
            .filter(order => order.price != null).filter(order => order.stage === 'DONE').forEach(order => {
                sum += order.price 
            });
            return sum;
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