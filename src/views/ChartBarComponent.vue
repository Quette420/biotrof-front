<template>
    <div>
        <div class="mychart">
        <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
    </div>

    </div>
    
  </template>
  
  <script>

  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'ChartBarComponent',
    components: { Bar },
    props: {
      statuses: {
      type: Array,
      required: true
    },
      orders: {
        type: Array,
        required: true
    }
  },
    data() {
  
      return {
        chartData: {
          labels: 
            this.statuses.map(s => s.label),
          datasets: [ { 
           label: 'Заказы',
            data: [
              this.orders.filter(o => o.stage === this.statuses[0].label).length,
              this.orders.filter(o => o.stage === this.statuses[1].label).length,
              this.orders.filter(o => o.stage === this.statuses[2].label).length, 
              this.orders.filter(o => o.stage === this.statuses[3].label).length, 
              this.orders.filter(o => o.stage === this.statuses[4].label).length] 
            } 
          ]
        },
        chartOptions: { 
            responsive: true,
            backgroundColor: [
                    'rgba(242,2,2,0.6)',
                    'rgba(242,106,2,0.6)',
                    'rgba(210,242,2,0.6)',
                    'rgba(16,161,23,0.6)',
                    'rgba(14,125,235,0.6)'
                ],
            borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54,162,235,1)',
                    'rgba(255,206,86,1)',
                    'rgba(75,192,192,1)',
                    'rgba(153,102,255,1)',
                    'rgba(255,159,64,1)'
                ],
        }
      }
    }
  }
  </script>

  <style>
.mychart {
    width:800px !important;
    height:400px !important;
    margin-left: auto;
    margin-right: auto;
    width: 1em
}

  </style>