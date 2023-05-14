<template>
    <div id="bar-chart">
        <div>
            
        <canvas id="myChartByYear" width="11" height="4.9"></canvas>
        
    </div>
     
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Chart from 'chart.js/auto'
import constants from '@/utils/constants'

export default {
    props: {
        year: {
      type: Number,
      default() {
        2023
    }}},
    data() {
        return{   
      statuses: constants.statuses,
      orders: [],
      currentSchema: '',
            data:{
                labels: ['Red','Blue','Yellow','Green','Purple','Orange'],
                datasets: [{
                label: 'Test',
                data: [12,19,3,5,2,3],
                backgroundColor: [
                    'rgba(255,99,132,0.2)',
                    'rgba(54,162,235,0.2)',
                    'rgba(255,206,86,0.2)',
                    'rgba(75,192,192,0.2)',
                    'rgba(153,102,255,0.2)',
                    'rgba(255,159,64,0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54,162,235,1)',
                    'rgba(255,206,86,1)',
                    'rgba(75,192,192,1)',
                    'rgba(153,102,255,1)',
                    'rgba(255,159,64,1)'
                ],
                borderWidth: 2,
                pointRadius: 3
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
            myChartByYear: ''
        }   
    },
    async mounted () {
    try {
        console.log(this.year)
        await this.$store.dispatch('getAllOrdersByYearAsync', this.year)
    } catch(e) {
      console.log('error')
    }
    const ordrs = this.GET_ALL_ORDERS_BY_YEAR
    this.orders = ordrs.map(order => {
    // eslint-disable-next-line
    Object.entries(this.statuses).forEach(([key, value]) => {
    if(order.stage === value.value) {
      order.stage = value.label
      order.typeClass = value.color
    }
    });  
      return {
        ...order
       }
    })
    console.log(this.orders)
    this.setupAllOrdersDiagram(this.orders);
       
}, methods: {
    setupAllOrdersDiagram(orders) {
      this.fillChartAllOrdersCount(orders);
      const ctx = document.getElementById('myChartByYear');
    // eslint-disable-next-line
    this.myChartByYear = new Chart(ctx, {
        type: 'line',
        data: this.data,
        options: this.options
    })
    },
    fillChartAllOrdersCount(orders) {
      let map = new Map()
      orders.map(o => {
        const date = new Date(o.createDate)
        //const strDate = '0' + '' + JSON.stringify(date.getDate()) + '.0' + JSON.stringify(date.getMonth() + 1)
        const strDate = JSON.stringify(date.getFullYear())
        if(map.has(strDate)) {
          map.set(strDate, map.get(strDate) + 1)
        } else {
          map.set(strDate, 1)
        }
      })
      this.data.labels = Array.from(map.keys());
      this.data.datasets[0].data = Array.from(map.values());
      this.data.datasets[0].label = 'Количество заказов'
      this.data.datasets[0].borderColor = 'rgb(153, 102, 255)'
      this.data.datasets[0].pointBorderColor = 'rgb(242, 12, 116)'
    }
}, computed: {
    ...mapGetters([
      'GET_ALL_ORDERS_BY_YEAR'
    ])
}, destroyed() {
  this.myChartByYear.destroy();
}
}
</script>

<style>
.bar-chart {
    display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
}

</style>
