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
        v-bind:sum="GET_PER_MONTH_EMPLOYER_ORDER_SALES_IN_DONE"
        v-bind:text="'Выручка'"
        />
        
      </div>
      <canvas id="dashboard-diagramm" width="160" height="50"></canvas>
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
    data:{
                labels: [],
                datasets: [
                  {
                label: 'Заказы',
                data: [],
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
                borderWidth: 2
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
        const date = new Date(o.createDate).getDate()
        if(this.data.labels.includes(date)) {
          sum++;
        } else {
          if(this.data.labels.length) {
            this.data.datasets[0].data.push(sum)
            sum = 1
          }
          this.data.labels.push(date)
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
      width:800px !important;
    height:400px !important;
}
</style>