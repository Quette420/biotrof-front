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
      orders: [],
      colorPointer: 0,
      currentSchema: '',
            data:{
                labels: [],
                datasets: []
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
    Object.entries(constants.statuses).forEach(([key, value]) => {
    if(order.stage === value.value) {
      order.stage = value.label
      order.typeClass = value.color
    }
    });  
      return {
        ...order
       }
    })
    
    this.setupAllOrdersDiagram(this.orders);

       
}, methods: {
    setupAllOrdersDiagram(orders) {
      this.fillCategories(orders);
      this.data.labels = this.createLabels();
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
  
      this.fillCategories(this.orders)
      this.data.labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
     
      this.myCategoryChart.reset()
      this.myCategoryChart.update()
    },
    fillCategories(orders) {
      for(let i = 0; i < constants.categories.length; i++) {
        this.createDataSet(constants.categories[i]);
        let map = new Map();
        this.setupMap(map, orders, constants.categories[i]);
        this.fillYearData(map);
        this.fillDataSet(map, constants.categories[i], i)
    }
    },
    setupMap(map, orders, categoryName) {
      orders.map(o => {
        if(o.product.category.categoryName === categoryName) {
          const date = new Date(o.createDate)
          //const strDate = '0' + '' + JSON.stringify(date.getDate()) + '.0' + JSON.stringify(date.getMonth() + 1)
          const strDate = JSON.stringify(date.getMonth() + 1)
          console.log(JSON.stringify(date.getMonth() + 1) + '.' + JSON.stringify(date.getFullYear()))
        if(map.has(strDate)) {
          map.set(strDate, map.get(strDate) + 1)
        } else {
          map.set(strDate, 1)
        }
        }
      }) 
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
       // console.log(dataMap)
   //     console.log(label)
    //    console.log(dataSetNumber)
      for (let i = 1; i < 13; i++) {
        
        this.data.datasets[dataSetNumber].data.push(dataMap.get(JSON.stringify(i)))
        
      }
      
    //  this.data.datasets[dataSetNumber].data = Array.from(dataMap.values);
      this.data.datasets[dataSetNumber].label = label;
      
    },
    createDataSet(dataSetName) {
        const dataSet = {
                label: dataSetName,
                data: [],
                borderColor: constants.graphicColors[this.colorPointer],
                pointBorderColor: constants.graphicColors[this.colorPointer],
                borderWidth: 2,
                pointRadius: 4,
                spanGaps: true
        }
        if(this.colorPointer === 6) {
            this.colorPointer = 0;
        } else {
            this.colorPointer++;
        }
        this.data.datasets.push(dataSet);
        return dataSet;
    },
    createLabels() {
      const month = new Date().getMonth() + 1;
      let labels = [];
      for(let i = 1; i <= month; i++) {
        if(i < 10) {
          labels.push(JSON.stringify(0) + JSON.stringify(i));
        } else {
          labels.push(JSON.stringify(i));
        }
      }
      return labels;
    },
    createLabelsWithFullYear() {
      const date = new Date();
      const month = new Date().getMonth() + 1;
      let labels = [];
      for(let i = 1; i <= month; i++) {
        if(i < 10) {
          labels.push(JSON.stringify(0) + JSON.stringify(date.getMonth() + 1) + '.' + JSON.stringify(date.getFullYear()));
        } else {
          labels.push(JSON.stringify(i));
        }
      }
      return labels;
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