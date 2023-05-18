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
      productNames: [],
      currentSchema: '',
      colorPointer: 0,
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
    if(!this.productNames.includes(order.product.productName)) {
        this.productNames.push(order.product.productName)
    }
    });  
      return {
        ...order
       }
    })
    this.setupAllOrdersDiagram(this.orders); 
}, methods: {
    setupAllOrdersDiagram(orders) {
      this.fillProducts(orders);
      this.data.labels = this.createLabels();
      const ctx = document.getElementById('myCategoryChart');
    // eslint-disable-next-line
        this.myCategoryChart = new Chart(ctx, {
        type: 'line',
        data: this.data,
        options: this.options
    })
    },
    fillProducts(orders) {
    for(let i = 0; i < this.productNames.length; i++) {
        this.createDataSet(this.productNames[i]);
        let map = new Map();
        this.setupMap(map, orders, this.productNames[i]);
        this.fillYearData(map);
        this.fillDataSet(map, this.productNames[i], i)
    }
    },
    setupMap(map, orders, productName) {
      orders.map(o => {
        if(o.product.productName === productName) {
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
    fillYearData(dataMap) {
     // let dat = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      for (let i = 1; i < 13; i++) {
        if(dataMap.get(JSON.stringify(i)) === undefined) {
          dataMap.set(i, 0)
        }
      }
    },
    fillDataSet(dataMap, label, dataSetNumber){ 
     //   console.log(dataMap)
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