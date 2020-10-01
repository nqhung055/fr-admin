// Sales Widget
import { Bar } from 'vue-chartjs'
import { ChartConfig } from "Constants/chart-config";
export default ({
   extends: Bar,
   props: ['data1', 'data2'],
   data: function () {
      return {
         options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
               yAxes: [{
                  stacked: true,
                  ticks: {
                     display: false
                  },
                  gridLines: {
                     display: false,
                     drawBorder: false
                  }
               }],
               xAxes: [{
                  stacked: true,
                  ticks: {
                     padding: 10
                  },
                  gridLines: {
                     display: false,
                     drawBorder: false
                  },
                  display: true
               }]
            },
            legend: {
               display: false
            }
         }
      }
   },
   mounted() {
      this.renderChart({
         labels: ['28-08-2020', '27-08-2020', '26-08-2020', '25-08-2020', '24-08-2020', '23-08-2020', '22-08-2020', '21-08-2020'],
         datasets: [
            {
               type: 'bar',
               label: 'Employee',
               backgroundColor: ChartConfig.color.success,
               hoverBackgroundColor: ChartConfig.color.success,
					borderWidth: 0,
					barPercentage: 0.3,
               categoryPercentage: 2,
               data: this.data1
            },
            {
               type: 'bar',
               label: 'Stranger',
               backgroundColor: ChartConfig.lineChartAxesColor,
               hoverBackgroundColor: ChartConfig.lineChartAxesColor,
					borderWidth: 0,
					barPercentage: 0.3,
               categoryPercentage: 2,
               data: this.data2
            }
         ]
      }, this.options)
   }
})
