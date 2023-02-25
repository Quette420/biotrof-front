<template>
    <div>
      <div class="page-title">
        <h3>Сводка по моим заказам в этом месяце</h3>
      </div>
  
      <MyLoader v-if="loading"/>
  
      <div v-else class="row" id="dash-row">
        <DashBoardBill 
        v-bind:sum="GET_PER_MONTH_EMPLOYER_ORDERS.length"
        v-bind:text="'создано'"
        />
        <DashBoardInprocessBill 
        v-bind:sum="GET_PER_MONTH_EMPLOYER_ORDERS_IN_PROCESS.length"
        v-bind:text="'в работе'"
        />
        <DashBoardClosedBill 
        v-bind:sum="GET_PER_MONTH_EMPLOYER_ORDERS_DONE.length"
        v-bind:text="'закрыто'"
        />
        <DashBoardGainBill 
        v-bind:sum="GET_PER_MONTH_EMPLOYER_ORDER_SALES"
        v-bind:text="'выручка'"
        />
        
      </div>
      <canvas id="dashboard-diagramm" width="160" height="50"></canvas>
      <div id="diagram-buttons">
        <button v-if="!pressed" class="btn-small btn" id="gain-button"
            @click="setupOrdersGain">
              <i class="material-icons">Выручка</i>
            </button>
            <button v-if="pressed" class="btn-small btn"  id="count-button"
            @click="setupOrdersCount">
              <i class="material-icons">Все заказы</i>
            </button>
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
import Chart from 'chart.js/auto'
  
  export default {
    name: 'main-dashboard',
    data: () => ({
      loading: true,
      orderData: [],
      pressed: false,
      data:{
                labels: [],
                datasets: [
                  {
                label: 'Количество заказов',
                data: [],
                borderColor: 'rgb(153, 102, 255)',
                borderWidth: 4,
                tension: 0.1,
                fill: false,
                pointBorderColor: 'rgb(242, 12, 116)',
                pointHoverRadius: 6,
                }
            ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
            myChart: ''
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
        ]),
    setupDiagram(orders) {
     let sum = 1;
      orders.map(o => {
      //  console.log(new Date(o.createDate).getMonth() + 1)
        const date = new Date(o.createDate)
        const strDate = JSON.stringify(date.getDate()) + '.' + JSON.stringify(date.getMonth() + 1)
        if(this.data.labels.includes(strDate)) {
          sum++;
        } else {
          if(this.data.labels.length) {
            this.data.datasets[0].data.push(sum)
            sum = 1
          }
          this.data.labels.push(strDate)
        }
      })
      this.data.datasets[0].data.push(sum)
      const context = document.getElementById('dashboard-diagramm')
    // eslint-disable-next-line
        this.myChart = new Chart(context, {
            type: 'line',
            data: this.data,
            options: this.options
        })
    },
    setupOrdersCount() {
     let map = new Map()
      this.orderData.map(o => {
        const date = new Date(o.createDate)
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
      this.myChart.update()
      this.pressed = !this.pressed
    },
    setupOrdersGain() {
      let map = new Map()
      this.orderData.map(o => {
        const date = new Date(o.createDate)
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
      this.myChart.update()
      this.pressed = !this.pressed
    },
    changePressed() {
      this.pressed = !this.pressed
    }
  }, async mounted () {
  try {
      await this.$store.dispatch('getAllOrdersByUuidAsync')
   } catch(e) {
      console.log('error')
   }
    this.orderData = this.GET_PER_MONTH_EMPLOYER_ORDERS
    this.setupDiagram(this.orderData)
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

.dashboard-diagramm {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      width:80% !important;
      height:40% !important;
}
</style>