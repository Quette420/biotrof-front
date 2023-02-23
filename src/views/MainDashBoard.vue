<template>
    <div>
      <div class="page-title">
        <h3>В этом месяце</h3>
      </div>
  
      <MyLoader v-if="loading"/>
  
      <div v-else class="row" id="dash-row">
        <DashBoardBill 
        v-bind:sum="GET_PER_MONTH_EMPLOYER_ORDERS.length"
        v-bind:text="'заказов зарегистрировано'"
        />
        <DashBoardInprocessBill 
        v-bind:sum="GET_PER_MONTH_EMPLOYER_ORDERS_IN_PROCESS.length"
        v-bind:text="'заказов в работе'"
        />
        <DashBoardClosedBill 
        v-bind:sum="GET_PER_MONTH_EMPLOYER_ORDERS_DONE.length"
        v-bind:text="'заказов закрыто'"
        />
        <DashBoardGainBill 
        v-bind:sum="GET_PER_MONTH_EMPLOYER_ORDER_SALES"
        v-bind:text="'Выручка'"
        />
      </div>
    </div>
  </template>
  
  <script>
  
import MyLoader from '@/components/app/MyLoader.vue';
import DashBoardBill from '@/components/DashBoardBill.vue';
import DashBoardGainBill from '@/components/DashBoardGainBill.vue';
import DashBoardInprocessBill from '@/components/DashBoardInprocessBill.vue'
import DashBoardClosedBill from '@/components/DashBoardClosedBill.vue'
import {mapActions, mapGetters} from 'vuex'
  
  export default {
    name: 'main-dashboard',
    data: () => ({
      loading: true,
      orderData: [],
      statuses: [
        { label: 'Не оплачено',
          value: 'WAITING_FOR_PAYMENT',
          color: 'red'
        },
        { label: 'Подписание',
          value: 'CONTRACT_SIGNING',
          color:  'orange'
        },
        { label: 'Изготовление',
          value: 'MANUFACTURE',
          color: 'lime'
        },
        { label: 'Готово к отгрузке',
          value: 'READY_FOR_SHIPMENT',
          color: 'green'
        },
        { label: 'Отгружено',
          value: 'DONE',
          color: 'blue'
        }
    ]
    }),
    components: {
      DashBoardBill,
      DashBoardGainBill,
      DashBoardInprocessBill,
      DashBoardClosedBill,
      MyLoader
  },methods:{ 
    ...mapActions([
        'getAllOrdersByUuid'
        ])
  }, mounted () {
    this.getAllOrdersByUuid().then(
      (response) => {
      if(response.data) {
        this.orderData = response.data
        console.log('Orders arrived!')
      }
    },
      (error) => {
        console.log(error);
    }
  );
    this.loading = false;
  }, computed: {
    ...mapGetters([
      'GET_ALL_EMPLOYER_ORDERS', 
      'GET_PER_WEEK_EMPLOYER_ORDERS', 'GET_PER_WEEK_EMPLOYER_ORDERS_IN_PROCESS', 'GET_PER_WEEK_EMPLOYER_ORDERS_DONE', 'GET_PER_WEEK_EMPLOYER_ORDER_SALES', 'GET_PER_WEEK_EMPLOYER_ORDER_SALES_IN_PROCESS', 'GET_PER_WEEK_EMPLOYER_ORDER_SALES_IN_DONE',
      'GET_PER_MONTH_EMPLOYER_ORDERS','GET_PER_MONTH_EMPLOYER_ORDERS_IN_PROCESS', 'GET_PER_MONTH_EMPLOYER_ORDERS_DONE', 'GET_PER_MONTH_EMPLOYER_ORDER_SALES', 'GET_PER_MONTH_EMPLOYER_ORDER_SALES_IN_PROCESS', 'GET_PER_MONTH_EMPLOYER_ORDER_SALES_IN_DONE',
      'GET_PER_YEAR_EMPLOYER_ORDERS', 'GET_PER_YEAR_EMPLOYER_ORDERS_IN_PROCESS', 'GET_PER_YEAR_EMPLOYER_ORDERS_DONE', 'GET_PER_YEAR_EMPLOYER_ORDER_SALES', 'GET_PER_YEAR_EMPLOYER_ORDER_SALES_IN_PROCESS', 'GET_PER_YEAR_EMPLOYER_ORDER_SALES_IN_DONE'
      ]),
    }
  }
  </script>

  <style>
.dash-row {
  display: flex;
}
</style>