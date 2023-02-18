import CreateOrderRequest from "@/model/CreateOrderRequest";
import axios from "axios";
import AuthService from "./AuthService";

const REPORTS_BASE_URL = 'http://localhost:8081/reports';
const ORDERS_BASE_URL = 'http://localhost:8081/api/v1/orders'

const OrderService = {
    getAllReports() {
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
    getNotShippedOrders() {
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
    }, getUserBoard() {
        return axios(ORDERS_BASE_URL + '/employer/' + AuthService.getUuid(), 
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
    }, getAllOrders() {
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
    getOrderByOrderId(id) {
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
    createOrder(productName, category, price, weight, plannedDateOfShipment, wishes) {
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
    updateOrder(order) {
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
    deleteOrder(id) {
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

export default OrderService