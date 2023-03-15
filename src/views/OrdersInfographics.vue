<template>
    <div id="bar-chart">
        <div>
            
        <canvas id="myChart" width="9" height="4.9"></canvas>
        
    </div>
      <button class="btn-small btn" @click="setupAllOrdersCountGiagram">
        <i class="material-icons">Все заказы</i>
      </button>
      <button class="btn-small btn" @click="setupYearlyOrdersCountDiagram">
        <i class="material-icons">За этот год</i>
      </button>
      <button class="btn-small btn" @click="calculateDiagramm3">
        <i class="material-icons">За этот месяц</i>
      </button>
      <button class="btn-small btn" @click="setupAllOrdersGainDiagram">
        <i class="material-icons">Выручка</i>
      </button>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Chart from 'chart.js/auto'

export default {
    data() {
        return{
            products: [
      { label: 'Целлобактерин®+',
        value: 'Cillobakterin+'
      },
      { label: 'Заслон®',
        value: 'Zaslon'
      },
      { label: 'Биотроф®',
        value: 'Biotrof'
      },
      { label: 'Агротроф®',
        value: 'Agrotrof'
      },
      { label: 'Интесан®',
        value: 'Intesan'
      }
            ],
            categories: [
      { label: 'Кормовые добавки',
        value: 'FeedAdditives'
      },
      { label: 'Сорбенты от микотоксикозов',
        value: 'SorbentsForMycotoxicosis'
      },
      { label: 'Биопрепараты и силосные закваски для заготовки кормов',
        value: 'BiologicsAndSilageFerments'
      },
      { label: 'Биопрепараты для переработки навоза и биодезодорации',
        value: 'BiologicalProductsForManureProcessing'
      }
            ],
            statuses: [
      { label: 'Не оплачено',
        value: 'WAITING_FOR_PAYMENT',
        color: 'red'
      },
      { label: 'Подписание',
        value: 'CONTRACT_SIGNING',
        color:  'orange'
      },
      { label: 'Изготовление',
        value: 'MANUFACTURE',
        color: 'yellow'
      },
      { label: 'Готово к отгрузке',
        value: 'READY_FOR_SHIPMENT',
        color: 'green'
      },
      { label: 'Отгружено',
        value: 'DONE',
        color: 'blue'
      }
            ],
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
    Object.entries(this.products).forEach(([key, value]) => {
    if(order.productName === value.value) {
      order.productName = value.label
    }
    });
    // eslint-disable-next-line
    Object.entries(this.categories).forEach(([key, value]) => {
    if(order.category === value.value) {
      order.category = value.label
    }
    })
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
    calculateDiagramm () {
        console.log()
        this.data.labels = ['Ожидает оплаты','На подписании','Изготовление','Готово к отгрузке','Отгрузка','Отгружено']
        this.data.datasets[0].label = 'Статистика по заказам'
        this.data.datasets[0].data[0] = 30
        this.data.datasets[0].data[1] = 2
        this.data.datasets[0].data[3] = 5
        this.data.datasets[0].data[4] = 22
        this.data.datasets[0].data[5] = 9
        this.data.datasets[0].data[6] = 15
        this.myChart.update()
    },
    calculateDiagramm2 () {
        console.log()
        this.data.labels = ['Январь','Февраль','Апрель','Май','Июнь','Июль', 'Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
        this.data.datasets[0].label = 'Статистика за год'
        this.data.datasets[0].data = [100, 120, 130, 140, 150, 160, 130, 100, 120, 130, 140, 150, 160]
        this.myChart.update()
    },
    calculateDiagramm3 () {
        console.log()
        this.data.labels = ['1','2','3','4','5','6', '7','8','9','10','11','12','13','14','15','16','17', '18','19','20','21','22','23','24','25','26','27','28','29','30','31']
        this.data.datasets[0].label = 'Статистика за месяц'
        this.data.datasets[0].data = [100, 120, 130, 140, 150, 160, 130, 100, 120, 130, 110, 190, 50, 75, 170, 66, 99, 200, 100, 120, 130, 140, 190, 110, 120, 100, 100, 120, 130, 140, 150]
        this.myChart.update()
    },
    setupAllOrdersCountGiagram() {
      this.currentSchema = 'ALL';
      this.orders = this.ORDERS;
      this.fillChartAllOrdersCount(this.orders)
      this.myChart.reset()
      this.myChart.update()
    },
    setupAllOrdersGainDiagram() {
      if('YEAR' === this.currentSchema) {
        this.orders = this.GET_PER_YEAR_ORDERS;
        this.fillYearlyOrdersGain(this.orders)
      } else if('MONTH' === this.currentSchema) {
        this.orders = this.GET_PER_YEAR_ORDERS;
        this.fillYearlyOrdersGain(this.orders)
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
    }
}, computed: {
    ...mapGetters([
      'ORDERS', 'GET_PER_YEAR_ORDERS'
    ])
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
