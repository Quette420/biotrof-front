<template>
    <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>

import { mapGetters } from 'vuex'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    
    name: 'BarChart',
    components: { Bar },
    data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
    async mounted () {
        try {
      await this.$store.dispatch('getAllOrdersByUuidAsync')
      await this.$store.dispatch('getAllOrders')
   } catch(e) {
      console.log('error')
   }
}, methods: {

},computed: {
  ...mapGetters(['GET_ALL_EMPLOYER_ORDERS', 'ORDERS' ])
}
}
</script>

<style>
.my-chart-id {
    display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
}

</style>
