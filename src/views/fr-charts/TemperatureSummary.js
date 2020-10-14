import { Bar } from "vue-chartjs";
import { ChartConfig } from "Constants/chart-config";

const lineTension = lineTension;
// const borderWidth = 3;
// const pointRadius = 7;
// const pointBorderWidth = 2;

export default {
  extends: Bar,
  props: {
    xLabel: {
      type: String,
      default: "x-Axes",
    },
    yLabel: {
      type: String,
      default: "y-Axes",
    },
    arrRU: {
      type: Array,
      default: []
   },
   arrG: {
      type: Array,
      default: []
   },
   arrLabels: {
    type: Array,
    default: []
 },
   e_label: {
      type: String,
      default: () => ""
   },
   s_label: {
      type: String,
      default: () => ""
   },
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: this.yLabel,
              },
              gridLines: {
                display: true,
                drawBorder: false,
              },
              ticks: {
                // reverse: false,
                stepSize: 100,
                display: true,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: this.xLabel,
              },
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                display: true,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      bar: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
           yAxes: [{
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: this.yLabel,
              },
              ticks: {
                 display: true
              },
              gridLines: {
                 display: true,
                 drawBorder: true
              }
           }],
           xAxes: [{
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: this.xLabel,
              },
              ticks: {
                 padding: 10,
                 display: true
              },
              gridLines: {
                 display: false,
                 drawBorder: false
              }
           }]
        },
        legend: {
           display: false
        }
     },
    };
  },
  computed: {},
  watch: {
    arrLabels: function() {
      this.renderChartTemperature();
    }
  },
  mounted() {
    // let types = ["residents","stranger"];
    this.renderChartTemperature();
  },
  methods: {
    renderChartTemperature() {
      this.renderChart(
        {
          labels: this.arrLabels,
          datasets: [
            {
              type: 'bar',
              label: this.e_label,
              barPercentage: 0.4,
              categoryPercentage: 1.3,
              backgroundColor: ChartConfig.color.primary,
              hoverBackgroundColor: ChartConfig.color.primary,
              borderWidth: 0,
              data: this.arrRU
            },
            {
              type: 'bar',
              label: this.s_label,
              barPercentage: 0.4,
              categoryPercentage: 1.3,
              backgroundColor: ChartConfig.color.warning,
              hoverBackgroundColor: ChartConfig.color.warning,
              borderWidth: 0,
              data: this.arrG
            }
          ]
        },
        this.bar
      );
    }
  },
};
