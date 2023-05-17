<template>
    <div id="bar-chart">
        <div>
            
        <canvas id="myChart" width="11" height="4.9"></canvas>
        
    </div>
      <button class="btn-small btn" @click="setupAllOrdersCountGiagram">
        <i class="material-icons">Заказы за всё время</i>
      </button>
      <button class="btn-small btn" @click="setupYearlyOrdersCountDiagram">
        <i class="material-icons">В этом году</i>
      </button>
      <button class="btn-small btn" @click="setupMonthlyOrdersCountDiagram">
        <i class="material-icons">В этом месяце</i>
      </button>
      <button class="btn-small btn" @click="switchToGain">
        <i class="material-icons">Выручка</i>
      </button>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Chart from 'chart.js/auto'
import constants from '@/utils/constants'

export default {
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
            myChart: ''
        }   
    },
    async mounted () {
    try {
        await this.$store.dispatch('getAllOrders')
    } catch(e) {
      console.log('error')
    }
    const ordrs = this.ORDERS
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
      const ctx = document.getElementById('myChart');
    // eslint-disable-next-line
    this.myChart = new Chart(ctx, {
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
    },
    fillChartAllOrdersGain(orders) {
      let map = new Map()
      orders.map(o => {
        const date = new Date(o.createDate)
        //const strDate = '0' + '' + JSON.stringify(date.getDate()) + '.0' + JSON.stringify(date.getMonth() + 1)
        const strDate = JSON.stringify(date.getFullYear())
        if(map.has(strDate)) {
          map.set(strDate, map.get(strDate) + o.price)
        } else {
          map.set(strDate, o.price)
        }
      })
      this.data.labels = Array.from(map.keys());
      this.data.datasets[0].data = Array.from(map.values());
      this.data.datasets[0].label = 'Выручка' 
      this.data.datasets[0].borderColor = 'rgb(164, 214, 109)'
      this.data.datasets[0].pointBorderColor = 'rgb(153, 102, 255)'
    },
    fillYearlyOrdersCount(orders) {
      let map = new Map()
      orders.map(o => {
        const date = new Date(o.createDate)
        //const strDate = '0' + '' + JSON.stringify(date.getMonth() + 1) + '.' + JSON.stringify(date.getFullYear())
        const strDate = JSON.stringify(date.getMonth() + 1) + '.' + JSON.stringify(date.getFullYear())
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
    },
    fillYearlyOrdersGain(orders) {
      let map = new Map()
      orders.map(o => {
        const date = new Date(o.createDate)
        //const strDate = '0' + '' + JSON.stringify(date.getMonth() + 1) + '.' + JSON.stringify(date.getFullYear())
        const strDate = JSON.stringify(date.getMonth() + 1) + '.' + JSON.stringify(date.getFullYear())
        if(map.has(strDate)) {
          map.set(strDate, map.get(strDate) + o.price)
        } else {
          map.set(strDate, o.price)
        }
      })
      this.data.labels = Array.from(map.keys());
      this.data.datasets[0].data = Array.from(map.values());
      this.data.datasets[0].label = 'Выручка' 
      this.data.datasets[0].borderColor = 'rgb(164, 214, 109)'
      this.data.datasets[0].pointBorderColor = 'rgb(153, 102, 255)'
    },
    fillMonthlyOrdersCount(orders) {
      let map = new Map()
      orders.map(o => {
        const date = new Date(o.createDate)
        //const strDate = '0' + '' + JSON.stringify(date.getMonth() + 1) + '.' + JSON.stringify(date.getFullYear())
        const strDate = JSON.stringify(date.getDate()) + '.' + JSON.stringify(date.getMonth() + 1)
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
    },
    fillMonthlyOrdersGain(orders) {
      let map = new Map()
      orders.map(o => {
        const date = new Date(o.createDate)
        //const strDate = '0' + '' + JSON.stringify(date.getMonth() + 1) + '.' + JSON.stringify(date.getFullYear())
        const strDate = JSON.stringify(date.getDate()) + '.' + JSON.stringify(date.getMonth() + 1)
        if(map.has(strDate)) {
          map.set(strDate, map.get(strDate) + o.price)
        } else {
          map.set(strDate, o.price)
        }
      })
      this.data.labels = Array.from(map.keys());
      this.data.datasets[0].data = Array.from(map.values());
      this.data.datasets[0].label = 'Выручка' 
      this.data.datasets[0].borderColor = 'rgb(164, 214, 109)'
      this.data.datasets[0].pointBorderColor = 'rgb(153, 102, 255)'
    },
    setupAllOrdersCountGiagram() {
      this.currentSchema = 'ALL';
      this.orders = this.ORDERS;
      this.fillChartAllOrdersCount(this.orders)
      this.myChart.reset()
      this.myChart.update()
    },
    switchToGain() {
      if('YEAR' === this.currentSchema) {
        this.orders = this.GET_PER_YEAR_ORDERS;
        this.fillYearlyOrdersGain(this.orders)
      } else if('MONTH' === this.currentSchema) {
        this.orders = this.GET_PER_MONTH_ORDERS;
        this.fillMonthlyOrdersGain(this.orders)
      } else {
        this.orders = this.ORDERS;
        this.fillChartAllOrdersGain(this.orders)
      }
      this.myChart.update()
    },
    setupYearlyOrdersCountDiagram() {
      this.currentSchema = 'YEAR';
      this.orders = this.GET_PER_YEAR_ORDERS;
      this.fillYearlyOrdersCount(this.orders)
      this.myChart.reset()
      this.myChart.update()
    },
    setupYearlyOrdersGainDiagram() {
      this.orders = this.GET_PER_YEAR_ORDERS;
      this.fillYearlyOrdersGain(this.orders)
      this.myChart.reset()
      this.myChart.update()
    },
    setupMonthlyOrdersCountDiagram() {
      this.currentSchema = 'MONTH';
      this.orders = this.GET_PER_MONTH_ORDERS;
      this.fillMonthlyOrdersCount(this.orders)
      this.myChart.reset()
      this.myChart.update()
    },
    setupMonthlyOrdersGainDiagram() {
      this.orders = this.GET_PER_MONTH_ORDERS;
      this.fillMonthlyOrdersGain(this.orders)
      this.myChart.reset()
      this.myChart.update()
    }
}, computed: {
    ...mapGetters([
      'ORDERS', 'GET_PER_YEAR_ORDERS', 'GET_PER_MONTH_ORDERS'
    ])
}, destroyed() {
  this.myChart.destroy();
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
