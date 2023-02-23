<template>
    <div>
      <div class="page-title">
        <h3>Сводка по всем заказам</h3>
      </div>
  
      <MyLoader v-if="loading"/>
  
      <div v-else class="row">
        <WeeklyBill 
        v-bind:sum="GET_PER_WEEK_ORDERS.length"
        v-bind:in-process="GET_PER_WEEK_ORDERS_IN_PROCESS.length"
        v-bind:closed="GET_PER_WEEK_ORDERS_DONE.length"
        />
        <MounthBill 
        v-bind:sum="GET_PER_MONTH_ORDERS.length"
        v-bind:in-process="GET_PER_MONTH_ORDERS_IN_PROCESS.length"
        v-bind:closed="GET_PER_MONTH_ORDERS_DONE.length"
        />
        <YearBill 
        v-bind:sum="GET_PER_YEAR_ORDERS.length"
        v-bind:in-process="GET_PER_YEAR_ORDERS_IN_PROCESS.length"
        v-bind:closed="GET_PER_YEAR_ORDERS_DONE.length"
        />
        <HomeCurrency 
        v-bind:weekly-sum="GET_PER_WEEK_ORDERS_SALES"
        v-bind:weekly-in-process="GET_PER_WEEK_ORDERS_SALES_IN_PROCESS"
        v-bind:weekly-closed="GET_PER_WEEK_ORDERS_SALES_IN_DONE"
        v-bind:monthly-sum="GET_PER_MONTH_ORDERS_SALES"
        v-bind:monthly-in-process="GET_PER_MONTH_ORDERS_SALES_IN_PROCESS"
        v-bind:monthly-closed="GET_PER_MONTH_ORDERS_SALES_IN_DONE"
        v-bind:yearly-sum="GET_PER_YEAR_ORDERS_SALES"
        v-bind:yearly-in-process="GET_PER_YEAR_ORDERS_SALES_IN_PROCESS"
        v-bind:yearly-closed="GET_PER_YEAR_ORDERS_SALES_IN_DONE"
        />
      </div>
    </div>
  </template>
  
  <script>
  
  import MyLoader from '@/components/app/MyLoader.vue';
  import WeeklyBill from '@/components/WeeklyBill.vue';
  import MounthBill from '@/components/MounthBill.vue';
  import YearBill from '@/components/YearBill.vue';
  import HomeCurrency from '@/components/HomeCurrency.vue';
  import {mapActions, mapGetters} from 'vuex'
  
  export default {
    name: 'general-statistic',
    data: () => ({
      loading: true,
      orderData: null
    }),
    components: {
      WeeklyBill,
      MounthBill,
      YearBill,
      HomeCurrency,
      MyLoader
  },methods:{ 
    ...mapActions([
        'getAllOrders'
        ])
  }, mounted () {
    this.getAllOrders().then(
      (response) => {
      if(response.data) {
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
      'GET_ALL_ORDERS', 
      'GET_PER_WEEK_ORDERS', 'GET_PER_WEEK_ORDERS_IN_PROCESS', 'GET_PER_WEEK_ORDERS_DONE', 'GET_PER_WEEK_ORDERS_SALES', 'GET_PER_WEEK_ORDERS_SALES_IN_PROCESS', 'GET_PER_WEEK_ORDERS_SALES_IN_DONE',
      'GET_PER_MONTH_ORDERS','GET_PER_MONTH_ORDERS_IN_PROCESS', 'GET_PER_MONTH_ORDERS_DONE', 'GET_PER_MONTH_ORDERS_SALES', 'GET_PER_MONTH_ORDERS_SALES_IN_PROCESS', 'GET_PER_MONTH_ORDERS_SALES_IN_DONE',
      'GET_PER_YEAR_ORDERS', 'GET_PER_YEAR_ORDERS_IN_PROCESS', 'GET_PER_YEAR_ORDERS_DONE', 'GET_PER_YEAR_ORDERS_SALES', 'GET_PER_YEAR_ORDERS_SALES_IN_PROCESS', 'GET_PER_YEAR_ORDERS_SALES_IN_DONE'
      ]),
    }
  }
  </script>