import axios from "axios"
import AuthService from '@/services/AuthService'
import CreateOrderRequest from "@/model/CreateOrderRequest";

const REPORTS_BASE_URL = 'http://localhost:8081/reports';
const ORDERS_BASE_URL = 'http://localhost:8081/api/v1/orders'

export default {
    actions: {
        /*eslint no-unused-vars: ["error", { "args": "none" }]*/
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
        }, getUserBoard({dispatch, commit}, UUID) {
            return axios(ORDERS_BASE_URL + '/employer/' + UUID, 
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
        }, getAllOrders({dispatch, commit}) {
            return axios(ORDERS_BASE_URL, 
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
        createOrder({dispatch, commit}, productName, category, price, weight, plannedDateOfShipment, wishes) {
            const request = new CreateOrderRequest(productName, category, price, weight, plannedDateOfShipment, wishes, AuthService.getUuid());
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