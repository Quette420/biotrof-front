<template>
  <div>
    <div class="page-title">
      <h3>Статистика по {{ statisticToggle ? 'всем заказам' : 'моим заказам' }}</h3>
      <div class="diagram-buttons" v-if="!loading && ROLE === 'ADMIN'">
              <button v-if="!statisticToggle" class="btn-small btn" id="gain-button" @click="switchToGeneralStatistic">
                <i class="material-icons">Общая статистика</i>
              </button>
              <button v-if="statisticToggle" class="btn-small btn"  id="count-button" @click="switchToMyStatistic">
                <i class="material-icons">Моя статистика</i>
              </button>
            </div>
    </div>

    <MyLoader v-if="loading"/>

    <div v-else class="row">
      <WeeklyBill 
      v-bind:sum="!statisticToggle ? GET_PER_WEEK_EMPLOYER_ORDERS.length : GET_PER_WEEK_ORDERS.length"
      v-bind:in-process="!statisticToggle ? GET_PER_WEEK_EMPLOYER_ORDERS_IN_PROCESS.length : GET_PER_WEEK_ORDERS_IN_PROCESS.length"
      v-bind:closed="!statisticToggle ? GET_PER_WEEK_EMPLOYER_ORDERS_DONE.length : GET_PER_WEEK_ORDERS_DONE.length"
      />
      <MounthBill 
      v-bind:sum="!statisticToggle ? GET_PER_MONTH_EMPLOYER_ORDERS.length : GET_PER_MONTH_ORDERS.length"
      v-bind:in-process="!statisticToggle ? GET_PER_MONTH_EMPLOYER_ORDERS_IN_PROCESS.length : GET_PER_MONTH_ORDERS_IN_PROCESS.length"
      v-bind:closed="!statisticToggle ? GET_PER_MONTH_EMPLOYER_ORDERS_DONE.length : GET_PER_MONTH_ORDERS_DONE.length"
      />
      <YearBill 
      v-bind:sum="!statisticToggle ? GET_PER_YEAR_EMPLOYER_ORDERS.length : GET_PER_YEAR_ORDERS.length"
      v-bind:in-process="!statisticToggle ? GET_PER_YEAR_EMPLOYER_ORDERS_IN_PROCESS.length : GET_PER_YEAR_ORDERS_IN_PROCESS.length"
      v-bind:closed="!statisticToggle ? GET_PER_YEAR_EMPLOYER_ORDERS_DONE.length : GET_PER_YEAR_ORDERS_DONE.length"
      />
      <HomeCurrency 
      v-bind:weekly-sum="!statisticToggle ? GET_PER_WEEK_EMPLOYER_ORDER_SALES : GET_PER_WEEK_ORDERS_SALES"
      v-bind:weekly-waiting-for-payment="!statisticToggle ? GET_PER_WEEK_EMPLOYER_ORDER_SALES_WAITING_FOR_PAYMENT : GET_PER_WEEK_ORDERS_SALES_WAITING_FOR_PAYMENT"
      v-bind:weekly-signing="!statisticToggle ? GET_PER_WEEK_EMPLOYER_ORDER_SALES_CONTRACT_SIGNING : GET_PER_WEEK_ORDERS_SALES_CONTRACT_SIGNING"
      v-bind:weekly-manufacture="!statisticToggle ? GET_PER_WEEK_EMPLOYER_ORDER_SALES_MANUFACTURE : GET_PER_WEEK_ORDERS_SALES_MANUFACTURE"
      v-bind:weekly-ready-for-shipment="!statisticToggle ? GET_PER_WEEK_EMPLOYER_ORDER_SALES_READY_FOR_SHIPMENT : GET_PER_WEEK_ORDERS_SALES_READY_FOR_SHIPMENT"
      v-bind:weekly-closed="!statisticToggle ? GET_PER_WEEK_EMPLOYER_ORDER_SALES_IN_DONE : GET_PER_WEEK_ORDERS_SALES_IN_DONE"
      v-bind:monthly-sum="!statisticToggle ? GET_PER_MONTH_EMPLOYER_ORDER_SALES : GET_PER_MONTH_ORDERS_SALES"
      v-bind:monthly-waiting-for-payment="!statisticToggle ? GET_PER_MONTH_EMPLOYER_ORDER_SALES_WAITING_FOR_PAYMENT : GET_PER_MONTH_ORDERS_SALES_WAITING_FOR_PAYMENT"
      v-bind:monthly-signing="!statisticToggle ? GET_PER_MONTH_EMPLOYER_ORDER_SALES_CONTRACT_SIGNING : GET_PER_MONTH_ORDERS_SALES_CONTRACT_SIGNING"
      v-bind:monthly-manufacture="!statisticToggle ? GET_PER_MONTH_EMPLOYER_ORDER_SALES_MANUFACTURE : GET_PER_MONTH_ORDERS_SALES_MANUFACTURE"
      v-bind:monthly-ready-for-shipment="!statisticToggle ? GET_PER_MONTH_EMPLOYER_ORDER_SALES_READY_FOR_SHIPMENT : GET_PER_MONTH_ORDERS_SALES_READY_FOR_SHIPMENT"
      v-bind:monthly-closed="!statisticToggle ? GET_PER_MONTH_EMPLOYER_ORDER_SALES_IN_DONE : GET_PER_MONTH_ORDERS_SALES_IN_DONE"
      v-bind:yearly-sum="!statisticToggle ? GET_PER_YEAR_EMPLOYER_ORDER_SALES : GET_PER_YEAR_ORDERS_SALES"
      v-bind:yearly-waiting-for-payment="!statisticToggle ? GET_PER_YEAR_EMPLOYER_ORDER_SALES_WAITING_FOR_PAYMENT : GET_PER_YEAR_ORDERS_SALES_WAITING_FOR_PAYMENT"
      v-bind:yearly-signing="!statisticToggle ? GET_PER_YEAR_EMPLOYER_ORDER_SALES_CONTRACT_SIGNING : GET_PER_YEAR_ORDERS_SALES_CONTRACT_SIGNING"
      v-bind:yearly-manufacture="!statisticToggle ? GET_PER_YEAR_EMPLOYER_ORDER_SALES_MANUFACTURE : GET_PER_YEAR_ORDERS_SALES_MANUFACTURE"
      v-bind:yearly-ready-for-shipment="!statisticToggle ? GET_PER_YEAR_EMPLOYER_ORDER_SALES_READY_FOR_SHIPMENT : GET_PER_YEAR_ORDERS_SALES_READY_FOR_SHIPMENT"
      v-bind:yearly-closed="!statisticToggle ? GET_PER_YEAR_EMPLOYER_ORDER_SALES_IN_DONE : GET_PER_YEAR_ORDERS_SALES_IN_DONE"
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
import {mapGetters} from 'vuex'

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
   switchToGeneralStatistic() {
    this.statisticToggle = !this.statisticToggle;
  },
  switchToMyStatistic() {
    this.statisticToggle = !this.statisticToggle;
  } 
}, async mounted () {
  try {
      await this.$store.dispatch('getAllOrdersByUuidAsync')
      await this.$store.dispatch('getAllOrders')
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
    ,'ORDERS', 
    'GET_PER_WEEK_ORDERS', 'GET_PER_WEEK_ORDERS_IN_PROCESS', 'GET_PER_WEEK_ORDERS_DONE', 'GET_PER_WEEK_ORDERS_SALES', 'GET_PER_WEEK_ORDERS_SALES_IN_PROCESS',  'GET_PER_WEEK_ORDERS_SALES_WAITING_FOR_PAYMENT','GET_PER_WEEK_ORDERS_SALES_CONTRACT_SIGNING','GET_PER_WEEK_ORDERS_SALES_MANUFACTURE','GET_PER_WEEK_ORDERS_SALES_READY_FOR_SHIPMENT', 'GET_PER_WEEK_ORDERS_SALES_IN_DONE',
    'GET_PER_MONTH_ORDERS','GET_PER_MONTH_ORDERS_IN_PROCESS', 'GET_PER_MONTH_ORDERS_DONE', 'GET_PER_MONTH_ORDERS_SALES', 'GET_PER_MONTH_ORDERS_SALES_IN_PROCESS',  'GET_PER_MONTH_ORDERS_SALES_WAITING_FOR_PAYMENT','GET_PER_MONTH_ORDERS_SALES_CONTRACT_SIGNING','GET_PER_MONTH_ORDERS_SALES_MANUFACTURE','GET_PER_MONTH_ORDERS_SALES_READY_FOR_SHIPMENT', 'GET_PER_MONTH_ORDERS_SALES_IN_DONE',
    'GET_PER_YEAR_ORDERS', 'GET_PER_YEAR_ORDERS_IN_PROCESS', 'GET_PER_YEAR_ORDERS_DONE', 'GET_PER_YEAR_ORDERS_SALES', 'GET_PER_YEAR_ORDERS_SALES_IN_PROCESS', 'GET_PER_YEAR_ORDERS_SALES_WAITING_FOR_PAYMENT','GET_PER_YEAR_ORDERS_SALES_CONTRACT_SIGNING','GET_PER_YEAR_ORDERS_SALES_MANUFACTURE','GET_PER_YEAR_ORDERS_SALES_READY_FOR_SHIPMENT', 'GET_PER_YEAR_ORDERS_SALES_IN_DONE'
    ]),
  }
}
</script>