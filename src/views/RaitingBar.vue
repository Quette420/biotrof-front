<template>
    <div>
        <OrdersBarStatistic/>
    </div>
    
</template>

<script>

import {mapGetters} from 'vuex'
import OrdersBarStatistic from '@/views/OrdersBarStatistic.vue'

export default {
  name: 'statistic-view-vue',
  data: () => ({
    loading: true,
    orderData: null,
    statisticToggle: false
  }),
  components: {
    OrdersBarStatistic
}, async mounted () {
  try {
      await this.$store.dispatch('getAllOrdersByUuidAsync')
      await this.$store.dispatch('getAllOrders')
   } catch(e) {
      console.log('error')
   }
   
  this.loading = false;
}, computed: {
  ...mapGetters(['ROLE','GET_ALL_EMPLOYER_ORDERS', 'ORDERS', ]),
  }
}
</script>

