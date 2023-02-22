<template>
    <div id="bar-chart">
        <div>
        <canvas id="myChart" width="20"></canvas>
        <button class="btn-small btn" 
            @click="calculateDiagramm">
              <i class="material-icons"></i>
            </button>
            <button class="btn-small btn" 
            @click="calculateDiagramm2">
              <i class="material-icons"></i>
            </button>
            <button class="btn-small btn" 
            @click="calculateDiagramm3">
              <i class="material-icons"></i>
            </button>
    </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'
export default {
    data() {
        return{
           
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
                borderWidth: 2
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
    mounted() {
        const ctx = document.getElementById('myChart')
    // eslint-disable-next-line
        this.myChart = new Chart(ctx, {
            type: 'line',
            data: this.data,
            options: this.options
        })
       
}, methods: {
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
    }
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
    canvas#myChart{

  

}

</style>
