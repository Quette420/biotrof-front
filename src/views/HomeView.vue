<template>
  <div>
    <div class="page-title">
      <h3>Сводка по моим заказам</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <MyLoader v-if="loading"/>

    <div v-else class="row">
      <WeeklyBill 
      v-bind:sum="GET_PER_WEEK_EMPLOYER_ORDERS.length"
      v-bind:in-process="GET_PER_WEEK_EMPLOYER_ORDERS_IN_PROCESS.length"
      v-bind:closed="GET_PER_WEEK_EMPLOYER_ORDERS_DONE.length"
      />
      <MounthBill />
      <YearBill />
      <HomeCurrency />
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
  name: 'home-vue',
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
      'getAllOrdersByUuid'
      ])
}, mounted () {
  this.getAllOrdersByUuid().then(
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
    'GET_ALL_EMPLOYER_ORDERS', 'GET_PER_WEEK_EMPLOYER_ORDERS', 'GET_PER_WEEK_EMPLOYER_ORDERS_IN_PROCESS', 'GET_PER_WEEK_EMPLOYER_ORDERS_DONE'
    ]),
  }
}
</script>