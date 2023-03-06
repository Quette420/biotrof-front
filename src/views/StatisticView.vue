<template>
  <div>
    <div class="page-title">
      <h3>Сводка по моим заказам</h3>
      <div class="diagram-buttons" v-if="!loading && ROLE === 'ADMIN'">
              <button v-if="!statisticToggle" class="btn-small btn" id="gain-button" >
                <i class="material-icons">Общая статистика</i>
              </button>
              <button v-if="statisticToggle" class="btn-small btn"  id="count-button" >
                <i class="material-icons">Моя статистика</i>
              </button>
            </div>
    </div>

    <MyLoader v-if="loading"/>

    <div v-else class="row">
      <WeeklyBill 
      v-bind:sum="GET_PER_WEEK_EMPLOYER_ORDERS.length"
      v-bind:in-process="GET_PER_WEEK_EMPLOYER_ORDERS_IN_PROCESS.length"
      v-bind:closed="GET_PER_WEEK_EMPLOYER_ORDERS_DONE.length"
      />
      <MounthBill 
      v-bind:sum="GET_PER_MONTH_EMPLOYER_ORDERS.length"
      v-bind:in-process="GET_PER_MONTH_EMPLOYER_ORDERS_IN_PROCESS.length"
      v-bind:closed="GET_PER_MONTH_EMPLOYER_ORDERS_DONE.length"
      />
      <YearBill 
      v-bind:sum="GET_PER_YEAR_EMPLOYER_ORDERS.length"
      v-bind:in-process="GET_PER_YEAR_EMPLOYER_ORDERS_IN_PROCESS.length"
      v-bind:closed="GET_PER_YEAR_EMPLOYER_ORDERS_DONE.length"
      />
      <HomeCurrency 
      v-bind:weekly-sum="GET_PER_WEEK_EMPLOYER_ORDER_SALES"
      v-bind:weekly-waiting-for-payment="GET_PER_WEEK_EMPLOYER_ORDER_SALES_WAITING_FOR_PAYMENT"
      v-bind:weekly-signing="GET_PER_WEEK_EMPLOYER_ORDER_SALES_CONTRACT_SIGNING"
      v-bind:weekly-manufacture="GET_PER_WEEK_EMPLOYER_ORDER_SALES_MANUFACTURE"
      v-bind:weekly-ready-for-shipment="GET_PER_WEEK_EMPLOYER_ORDER_SALES_READY_FOR_SHIPMENT"
      v-bind:weekly-closed="GET_PER_WEEK_EMPLOYER_ORDER_SALES_IN_DONE"
      v-bind:monthly-sum="GET_PER_MONTH_EMPLOYER_ORDER_SALES"
      v-bind:monthly-waiting-for-payment="GET_PER_MONTH_EMPLOYER_ORDER_SALES_WAITING_FOR_PAYMENT"
      v-bind:monthly-signing="GET_PER_MONTH_EMPLOYER_ORDER_SALES_CONTRACT_SIGNING"
      v-bind:monthly-manufacture="GET_PER_MONTH_EMPLOYER_ORDER_SALES_MANUFACTURE"
      v-bind:monthly-ready-for-shipment="GET_PER_MONTH_EMPLOYER_ORDER_SALES_READY_FOR_SHIPMENT"
      v-bind:monthly-closed="GET_PER_MONTH_EMPLOYER_ORDER_SALES_IN_DONE"
      v-bind:yearly-sum="GET_PER_YEAR_EMPLOYER_ORDER_SALES"
      v-bind:yearly-waiting-for-payment="GET_PER_YEAR_EMPLOYER_ORDER_SALES_WAITING_FOR_PAYMENT"
      v-bind:yearly-signing="GET_PER_YEAR_EMPLOYER_ORDER_SALES_CONTRACT_SIGNING"
      v-bind:yearly-manufacture="GET_PER_YEAR_EMPLOYER_ORDER_SALES_MANUFACTURE"
      v-bind:yearly-ready-for-shipment="GET_PER_YEAR_EMPLOYER_ORDER_SALES_READY_FOR_SHIPMENT"
      v-bind:yearly-closed="GET_PER_YEAR_EMPLOYER_ORDER_SALES_IN_DONE"
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
  name: 'statistic-view-vue',
  data: () => ({
    loading: true,
    orderData: null,
    statisticToggle: false
  }),
  components: {
    WeeklyBill,
    MounthBill,
    YearBill,
    HomeCurrency,
    MyLoader
},methods:{ 
  ...mapActions([
      'getAllOrdersByUuid'
      ])
}, async mounted () {
  try {
      await this.$store.dispatch('getAllOrdersByUuidAsync')
   } catch(e) {
      console.log('error')
   }
  this.loading = false;
}, computed: {
  ...mapGetters([
    'ROLE',
    'GET_ALL_EMPLOYER_ORDERS', 
    'GET_PER_WEEK_EMPLOYER_ORDERS', 'GET_PER_WEEK_EMPLOYER_ORDERS_IN_PROCESS', 'GET_PER_WEEK_EMPLOYER_ORDERS_DONE', 'GET_PER_WEEK_EMPLOYER_ORDER_SALES', 'GET_PER_WEEK_EMPLOYER_ORDER_SALES_IN_PROCESS',  'GET_PER_WEEK_EMPLOYER_ORDER_SALES_WAITING_FOR_PAYMENT','GET_PER_WEEK_EMPLOYER_ORDER_SALES_CONTRACT_SIGNING','GET_PER_WEEK_EMPLOYER_ORDER_SALES_MANUFACTURE','GET_PER_WEEK_EMPLOYER_ORDER_SALES_READY_FOR_SHIPMENT', 'GET_PER_WEEK_EMPLOYER_ORDER_SALES_IN_DONE',
    'GET_PER_MONTH_EMPLOYER_ORDERS','GET_PER_MONTH_EMPLOYER_ORDERS_IN_PROCESS', 'GET_PER_MONTH_EMPLOYER_ORDERS_DONE', 'GET_PER_MONTH_EMPLOYER_ORDER_SALES', 'GET_PER_MONTH_EMPLOYER_ORDER_SALES_IN_PROCESS',  'GET_PER_MONTH_EMPLOYER_ORDER_SALES_WAITING_FOR_PAYMENT','GET_PER_MONTH_EMPLOYER_ORDER_SALES_CONTRACT_SIGNING','GET_PER_MONTH_EMPLOYER_ORDER_SALES_MANUFACTURE','GET_PER_MONTH_EMPLOYER_ORDER_SALES_READY_FOR_SHIPMENT', 'GET_PER_MONTH_EMPLOYER_ORDER_SALES_IN_DONE',
    'GET_PER_YEAR_EMPLOYER_ORDERS', 'GET_PER_YEAR_EMPLOYER_ORDERS_IN_PROCESS', 'GET_PER_YEAR_EMPLOYER_ORDERS_DONE', 'GET_PER_YEAR_EMPLOYER_ORDER_SALES', 'GET_PER_YEAR_EMPLOYER_ORDER_SALES_IN_PROCESS', 'GET_PER_YEAR_EMPLOYER_ORDER_SALES_WAITING_FOR_PAYMENT','GET_PER_YEAR_EMPLOYER_ORDER_SALES_CONTRACT_SIGNING','GET_PER_YEAR_EMPLOYER_ORDER_SALES_MANUFACTURE','GET_PER_YEAR_EMPLOYER_ORDER_SALES_READY_FOR_SHIPMENT', 'GET_PER_YEAR_EMPLOYER_ORDER_SALES_IN_DONE'
    ]),
  }
}
</script>