<template>
    <div class="main-dash-board-class">
      <div class="page-title">
        <h3>Сводка по моим заказам в этом {{ temporaryToggle ? 'году' : 'месяце' }}</h3>
        <div class="diagram-buttons" v-if="!loading">
              <button v-if="!temporaryToggle" class="btn-small btn" id="gain-button" @click="switchToYearlyOrders">
                <i class="material-icons">Данные за год</i>
              </button>
              <button v-if="temporaryToggle" class="btn-small btn"  id="count-button" @click="switchToMonthlyOrders">
                <i class="material-icons">Данные за месяц</i>
              </button>
            </div>
      </div>
  
      <MyLoader v-if="loading"/>
  
      <div v-else class="row" id="dash-row">
        <DashBoardBill 
        v-bind:sum="temporaryToggle ? GET_PER_YEAR_EMPLOYER_ORDERS.length : GET_PER_MONTH_EMPLOYER_ORDERS.length"
        v-bind:text="'зарегестрировано'"
        />
        <DashBoardInprocessBill 
        v-bind:sum="temporaryToggle ? GET_PER_YEAR_EMPLOYER_ORDERS_IN_PROCESS.length : GET_PER_MONTH_EMPLOYER_ORDERS_IN_PROCESS.length"
        v-bind:text="'в работе'"
        />
        <DashBoardClosedBill 
        v-bind:sum="temporaryToggle ? GET_PER_YEAR_EMPLOYER_ORDERS_DONE.length : GET_PER_MONTH_EMPLOYER_ORDERS_DONE.length"
        v-bind:text="'закрыто'"
        />
        <DashBoardGainBill 
        v-bind:sum="temporaryToggle ? GET_PER_YEAR_EMPLOYER_ORDER_SALES : GET_PER_MONTH_EMPLOYER_ORDER_SALES"
        v-bind:text="'выручка'"
        />
        
      </div>
      <div class="some-content">
    <div class="line-chart-cart" id="dashboard-gain-card">
        <div class="card-content black-text">
          <div class="canvas-here">
            <canvas id="dashboard-diagramm" width="9" height="5"></canvas>
            <div class="diagram-buttons" v-if="!loading">
              <button v-if="!pressed" class="btn-small btn" id="gain-button" @click="setupOrdersGain">
                <i class="material-icons">Выручка</i>
              </button>
              <button v-if="pressed" class="btn-small btn"  id="count-button" @click="setupOrdersCount">
                <i class="material-icons">Количество заказов</i>
              </button>
            </div>
          </div>
        </div>  
      </div>
      <div class="pie-chart-cart" id="dashboard-gain-card">
        <div class="doughnut-canvas-here">
            <canvas id="dashboard-line-diagramm" width="4" height="4"></canvas>
          </div>
      </div>
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
import constants from '@/utils/constants';
  
export default {
  name: 'main-dashboard',
  data: () => ({
  loading: true,
  orderData: [],
  pressed: false,
  temporaryToggle: false,
  data:{
    labels: [],
    datasets: [
      {
        label: 'Количество заказов',
        data: [],
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 3,
        tension: 0.1,
        fill: false,
        pointBorderColor: 'rgb(242, 12, 116)',
        pointHoverRadius: 4,
        pointRadius: 3
      }
    ]},
  pieData:{
    labels: constants.statusesLabels,
    datasets: [{
    label: 'My First Dataset',
    data: [10, 20, 15, 19, 16],
    backgroundColor: [
    'rgba(242,2,2,0.7)',
    'rgba(242,106,2,0.7)',
    'rgba(210,242,2,0.7)',
    'rgba(16,161,23,0.7)',
    'rgba(14,125,235,0.7)'
    ],
    hoverOffset: 4
  }]},
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
    myChart: '',
    myPieChart: ''
  }),
  components: {
    DashBoardBill,
    DashBoardGainBill,
    DashBoardInprocessBill,
    DashBoardClosedBill,
    MyLoader
  },
  methods:{ 
    ...mapActions(['getAllOrdersByUuid']),
    setupDiagram(orders) {
     this.fillMonthlyChartData(orders)
      const context = document.getElementById('dashboard-diagramm')
    // eslint-disable-next-line
        this.myChart = new Chart(context, {
            type: 'line',
            data: this.data,
            options: this.options
        })
    },
    fillMonthlyChartData(orders) {
      let map = new Map()
      orders.map(o => {
        const date = new Date(o.createDate)
        //const strDate = '0' + '' + JSON.stringify(date.getDate()) + '.0' + JSON.stringify(date.getMonth() + 1)
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
    fillYearlyChartData(orders) {
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
    setupOrdersCount() {
      this.fillMonthlyChartData(this.orderData)
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
    setupPieDiagram(orders) {
      this.fillPieData(orders)
      const context = document.getElementById('dashboard-line-diagramm')
    // eslint-disable-next-line
        this.myPieChart = new Chart(context, {
            type: 'doughnut',
            data: this.pieData,
            options: this.options
        })
    },
    fillPieData(orders) {
      let waitingForPayment = 0;
        let contractSigning = 0;
        let manufacture = 0;
        let readyForShipment = 0;
        let done = 0;
      orders.map(o => {
        if(o.stage === 'WAITING_FOR_PAYMENT') {
          waitingForPayment += 1
        } else if(o.stage === 'CONTRACT_SIGNING') {
          contractSigning ++
        } else if(o.stage === 'MANUFACTURE') {
          manufacture ++
        } else if(o.stage === 'READY_FOR_SHIPMENT') {
          readyForShipment ++
        } else {
          done++
        }
      })
      this.pieData.datasets[0].data[0] = waitingForPayment
      this.pieData.datasets[0].data[1] = contractSigning
      this.pieData.datasets[0].data[2] = manufacture
      this.pieData.datasets[0].data[3] = readyForShipment
      this.pieData.datasets[0].data[4] = done
    },
    switchToMonthlyOrders() {
      this.orderData = this.GET_PER_MONTH_EMPLOYER_ORDERS

      this.fillMonthlyChartData(this.orderData)
      this.myChart.reset()
      this.myChart.update()

      this.fillPieData(this.orderData)
      this.myPieChart.reset()
      this.myPieChart.update()

      this.temporaryToggle = !this.temporaryToggle
    },
    switchToYearlyOrders() {
      this.orderData = this.GET_PER_YEAR_EMPLOYER_ORDERS

      this.fillYearlyChartData(this.orderData)
      this.myChart.reset()
      this.myChart.update()

      this.fillPieData(this.orderData)
      this.myPieChart.reset()
      this.myPieChart.update()

      this.temporaryToggle = !this.temporaryToggle
}
  }, async mounted () {
  try {
      await this.$store.dispatch('getAllOrdersByUuidAsync')
   } catch(e) {
      console.log('error')
   }
    this.orderData = this.GET_PER_MONTH_EMPLOYER_ORDERS
    this.setupDiagram(this.orderData)
    this.setupPieDiagram(this.orderData)
    this.loading = false;
  }, computed: {
    ...mapGetters([
      'GET_ALL_EMPLOYER_ORDERS', 
      'GET_PER_WEEK_EMPLOYER_ORDERS', 'GET_PER_WEEK_EMPLOYER_ORDERS_IN_PROCESS', 'GET_PER_WEEK_EMPLOYER_ORDERS_DONE', 'GET_PER_WEEK_EMPLOYER_ORDER_SALES', 'GET_PER_WEEK_EMPLOYER_ORDER_SALES_IN_PROCESS', 'GET_PER_WEEK_EMPLOYER_ORDER_SALES_IN_DONE',
      'GET_PER_MONTH_EMPLOYER_ORDERS','GET_PER_MONTH_EMPLOYER_ORDERS_IN_PROCESS', 'GET_PER_MONTH_EMPLOYER_ORDERS_DONE', 'GET_PER_MONTH_EMPLOYER_ORDER_SALES', 'GET_PER_MONTH_EMPLOYER_ORDER_SALES_IN_PROCESS', 'GET_PER_MONTH_EMPLOYER_ORDER_SALES_IN_DONE',
      'GET_PER_YEAR_EMPLOYER_ORDERS', 'GET_PER_YEAR_EMPLOYER_ORDERS_IN_PROCESS', 'GET_PER_YEAR_EMPLOYER_ORDERS_DONE', 'GET_PER_YEAR_EMPLOYER_ORDER_SALES', 'GET_PER_YEAR_EMPLOYER_ORDER_SALES_IN_PROCESS', 'GET_PER_YEAR_EMPLOYER_ORDER_SALES_IN_DONE'
      ]),
    }, destroyed() {
  this.myChart.destroy();
  this.myPieChart.destroy();
}
  }
</script>

<style>
.dash-row {
  display: flex;
}

.some-content {
  display: flex;
  margin-left: 0.6%; 
  margin-right: 0;
  height: 30%;
  padding: 2;
}

.doughnut-canvas-here{
  display: flex;
  flex-wrap: wrap;
  margin-right: 0px;
  margin-left: 0px;  
  margin-top: 0px;   
  height: 95%;
  justify-content: center;
}

.canvas-here {
  display: flex;
  flex-wrap: wrap;
  margin-right: 0px;
  margin-left: 0px;  
  margin-top: 0px;   
}

.diagram-buttons {
  right: 4em !important;
}

.main-dash-board-class {
  align-items: center;
  justify-content: space-between;
  padding: 1em;
}

.line-chart-cart{
  width: 55%;
  height: auto;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0px 0px 8px -4px #000000;
  flex-wrap: wrap;
  width:60% !important;
  height:40% !important;
  margin-right: 22px;
  margin-left: 0px;  
  margin-top: 0px;  
  border-radius: 5px;
}

.pie-chart-cart {
  width: 37.4%; 
  height: auto;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 8px -4px #000000;
  flex-wrap: wrap;

  margin-right: 0px;
  margin-left: 0px;  
  margin-top: 0px;  
  border-radius: 5px;
}
</style>