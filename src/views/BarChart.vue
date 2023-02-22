<template>
    <div id="bar-chart">
        <div>
        <canvas id="myChart" width="20"></canvas>
        <canvas id="myChart2"></canvas>
    </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'
export default {
    mounted() {
        const ctx = document.getElementById('myChart')
    // eslint-disable-next-line
        const myChart = new Chart(ctx, {
            type: 'line',
            data:{
                labels: ['Red','Blue','Yellow','Green','Purple','Orange'],
                datasets: [{
                label: 'Голоса',
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
                borderWidth: 5
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
        const ctx2 = document.getElementById('myChart2')
    // eslint-disable-next-line
        const myChart2 = new Chart(ctx2, {
            type: 'line',
            data:{
                labels: ['','','','','',''],
                datasets: [{
                label: 'Голоса',
                data: [8,11,3,21,9,11],
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
                borderWidth: 5
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
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

    width:500px !important;
    height:300px !important;
  

}
canvas#myChart2{

width:500px !important;
height:400px !important;
margin-left: 25%;
margin-top: 0%;
width: 1em;
}
</style>
