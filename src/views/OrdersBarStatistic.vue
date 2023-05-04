<template>
    <div id="bar-chart">
      <div>
        <canvas id="myBarChart" width="9" height="4.9"></canvas>
        </div>
        <button v-if="!categoriesAndNamesToggle" class="btn-small btn" @click="setupEmployerCategoriesChartData">
        <i class="material-icons">Категории</i>
      </button>
      <button v-if="categoriesAndNamesToggle" class="btn-small btn" @click="setupEmployerProductNamesChartData">
        <i class="material-icons">Названия добавок</i>
      </button>
      <button v-if="ROLE === 'ADMIN' && !allOrdersToggle" class="btn-small btn" @click="switchEmplAllOrders">
        <i class="material-icons">Статистика по всем пользователям</i>
      </button>
      <button v-if="ROLE === 'ADMIN' && allOrdersToggle" class="btn-small btn" @click="switchEmplAllOrders">
        <i class="material-icons">Моя статистика</i>
      </button>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Chart from 'chart.js/auto'

export default {
    
    name: 'OrdersBarStatistic',
    
    data() {
    return {
      categoriesAndNamesToggle: false,
      allOrdersToggle: false,
      currentSchema: 'MY',
      allOrders: null,
      emlpoyerOrders: null,
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] ,
          backgroundColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 205, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(221, 123, 207, 1)'
    ]
  } ]
      },
      chartOptions: {
        responsive: true
      },
      myBarChart: ''
    }
  },
    async mounted () {
        try {
      await this.$store.dispatch('getAllOrdersByUuidAsync')
      await this.$store.dispatch('getAllOrders')
   } catch(e) {
      console.log('error')
   }
    this.allOrders = this.ORDERS
    this.emlpoyerOrders = this.GET_ALL_EMPLOYER_ORDERS
    
    this.setupDiagram(this.emlpoyerOrders)
}, methods: {
  setupDiagram(orders) {
    this.fillProductNamesChartData(orders)
    const ctx = document.getElementById('myBarChart');
    this.myBarChart = new Chart(ctx, {
        type: 'bar',
        data: this.chartData,
        options: this.chartOptions
    })
  },
  setupEmployerProductNamesChartData() {
    let currentOrderData;
    if(this.currentSchema === 'MY') {
      currentOrderData = this.GET_ALL_EMPLOYER_ORDERS
    } else {
      currentOrderData = this.ORDERS
    }
    this.fillProductNamesChartData(currentOrderData);
    this.myBarChart.update()
    this.categoriesAndNamesToggle = !this.categoriesAndNamesToggle
  },
  setupEmployerCategoriesChartData() {
    let currentOrderData;
    if(this.currentSchema === 'MY') {
      currentOrderData = this.GET_ALL_EMPLOYER_ORDERS
    } else {
      currentOrderData = this.ORDERS
    }
    this.fillCategoriesChartData(currentOrderData);
    this.myBarChart.update()
    this.categoriesAndNamesToggle = !this.categoriesAndNamesToggle
  },
  fillCategoriesChartData(orders) {
    console.log(orders)
    let map = new Map()
      orders.map(o => {
        if(map.has(o.product.category.categoryName)) {
          map.set(o.product.category.categoryName, map.get(o.product.category.categoryName) + 1)
        } else {
          map.set(o.product.category.categoryName, 1)
        }
      })
      this.chartData.labels = Array.from(map.keys());
      this.chartData.datasets[0].data = Array.from(map.values());
      this.chartData.datasets[0].label = 'Количество заказов'
  },
  fillProductNamesChartData(orders) {
    console.log(orders)
    let map = new Map()
      orders.map(o => {
        if(map.has(o.product.productName)) {
          map.set(o.product.productName, map.get(o.product.productName) + 1)
        } else {
          map.set(o.product.productName, 1)
        }
      })
      this.chartData.labels = Array.from(map.keys());
      this.chartData.datasets[0].data = Array.from(map.values());
      this.chartData.datasets[0].label = 'Количество заказов'
  },
  switchEmplAllOrders() {
    let currentOrderData;
    if(this.currentSchema === 'MY') {
      this.currentSchema = 'ALL'
      currentOrderData = this.ORDERS
    } else {
      this.currentSchema = 'MY'
      currentOrderData = this.GET_ALL_EMPLOYER_ORDERS
    }
    if(this.categoriesAndNamesToggle) {
      this.fillCategoriesChartData(currentOrderData)
    } else {
      this.fillProductNamesChartData(currentOrderData)
    }
    this.myBarChart.update()
    this.allOrdersToggle = !this.allOrdersToggle
  },
  setupAllCategoriesChartData() {
    this.allOrders = this.ORDERS
    this.fillCategoriesChartData(this.allOrders);
    this.myBarChart.update()
    this.allOrdersToggle = !this.allOrdersToggle
  }
},computed: {
  ...mapGetters(['GET_ALL_EMPLOYER_ORDERS', 'ORDERS', 'ROLE'])
}, destroyed() {
  this.myBarChart.destroy();
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
