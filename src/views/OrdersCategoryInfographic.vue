<template>
    <div id="bar-chart">
        <div>
            
        <canvas id="myCategoryChart" width="11" height="4.9"></canvas>
        
    </div>
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
                labels: [],
                datasets: [
                {
                label: 'Test',
                data: [],
                borderColor: 'rgba(255,99,132,1)',
                pointBorderColor: 'rgb(255, 0, 127)',
                borderWidth: 2,
                pointRadius: 4,
                spanGaps: true
                },
                {
                label: 'Test',
                data: [],
                borderColor: 'rgba(54,162,235,1)',
                pointBorderColor: 'rgb(0, 0, 204)',
                borderWidth: 2,
                pointRadius: 4,
                spanGaps: true
                },
                {
                label: 'Test',
                data: [],
                borderColor: 'rgba(255,206,86,1)',
                pointBorderColor: 'rgb(255, 128, 0)',
                borderWidth: 2,
                pointRadius: 4,
                spanGaps: true
                },
                {
                label: 'Test',
                data: [],
                borderColor:'rgba(75,192,192,1)',
                pointBorderColor: 'rgb(0, 204, 0)', 
                borderWidth: 2,
                pointRadius: 4,
                spanGaps: true
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
            myCategoryChart: ''
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
      this.fillCategories(orders);
      this.data.labels = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
      const ctx = document.getElementById('myCategoryChart');
    // eslint-disable-next-line
    this.myCategoryChart = new Chart(ctx, {
        type: 'line',
        data: this.data,
        options: this.options
    })
    },
    setupYearCategories(){
      this.orders = this.GET_PER_YEAR_ORDERS;
      console.log(this.orders)
      this.fillCategories(this.orders)
      this.data.labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
     
      this.myCategoryChart.reset()
      this.myCategoryChart.update()
    },
    fillCategories(orders) {
     
      let firstMap = new Map();
      let secondMap = new Map();
      let thirdMap = new Map();
      let fourthMap = new Map();
      this.setupMap(firstMap, orders, constants.categories[0]);
      this.setupMap(secondMap, orders, constants.categories[1]);
      this.setupMap(thirdMap, orders, constants.categories[2]);
      this.setupMap(fourthMap, orders, constants.categories[3]);
      this.fillYearData(firstMap);
      this.fillYearData(secondMap);
      this.fillYearData(thirdMap);
      this.fillYearData(fourthMap);
 
      this.fillDataSet(firstMap, constants.categories[0], 0)
      this.fillDataSet(secondMap, constants.categories[1], 1)
      this.fillDataSet(thirdMap, constants.categories[2], 2)
      this.fillDataSet(fourthMap, constants.categories[3], 3)

      console.log(this.data.datasets[1].data)
    },
    setupMap(map, orders, categoryName) {
      orders.map(o => {
        if(o.product.category.categoryName === categoryName) {
          const date = new Date(o.createDate)
          //const strDate = '0' + '' + JSON.stringify(date.getDate()) + '.0' + JSON.stringify(date.getMonth() + 1)
          const strDate = JSON.stringify(date.getMonth() + 1)
        if(map.has(strDate)) {
          map.set(strDate, map.get(strDate) + 1)
        } else {
          map.set(strDate, 1)
        }
        }
      }) 
    },
    fillFakeYearData(dataMap) {
     // let dat = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      for (let i = 1; i < 13; i++) {
        dataMap.set(i, 1)
      }
    },
    fillYearData(dataMap) {
     // let dat = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      for (let i = 1; i < 13; i++) {
        if(dataMap.get(JSON.stringify(i)) === undefined) {
          dataMap.set(i, 0)
        }
      }
    },
    fillDataSet(dataMap, label, dataSetNumber){ 
        console.log(dataMap)
   //     console.log(label)
    //    console.log(dataSetNumber)
      for (let i = 1; i < 13; i++) {
        
        this.data.datasets[dataSetNumber].data.push(dataMap.get(JSON.stringify(i)))
        
      }
      
    //  this.data.datasets[dataSetNumber].data = Array.from(dataMap.values);
      this.data.datasets[dataSetNumber].label = label;
      
    }
}, computed: {
    ...mapGetters([
      'ORDERS', 'GET_PER_YEAR_ORDERS', 'GET_PER_MONTH_ORDERS'
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