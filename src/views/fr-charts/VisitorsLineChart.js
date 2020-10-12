import { Line } from "vue-chartjs";
import { ChartConfig } from "Constants/chart-config";

const lineTension = lineTension;
const borderWidth = 3;
const pointRadius = 7;
const pointBorderWidth = 2;

export default {
  extends: Line,
  props: {
    xLabel: {
      type: String,
      default: "x-Axes",
    },
    yLabel: {
      type: String,
      default: "y-Axes",
    },
    dsLabels: {
      type: Array,
      default: [],
    },
    dsRUPoints: {
      type: Array,
      default: [],
    },
    dsGPoints: {
      type: Array,
      default: [],
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
    };
  },
  computed: {},
  mounted() {
    // console.log('xLabel: ' + this.xLabel);
    let types = ["residents","stranger"];
    this.renderChart(
      {
        labels: this.dsLabels,
        datasets: [
          {
            label: String(types[0]).toLowerCase() === "residents" ? "Residents" : "Guests",
            lineTension,
            borderColor: String(types[0]).toLowerCase() === "residents" ? ChartConfig.color.primary : ChartConfig.color.warning,
            pointBorderColor: String(types[0]).toLowerCase() === "residents" ? ChartConfig.color.primary : ChartConfig.color.warning,
            pointBorderWidth,
            pointRadius,
            fill: false,
            pointBackgroundColor: String(types[0]).toLowerCase() === "residents" ? ChartConfig.color.primary : ChartConfig.color.warning,
            borderWidth,
            data: String(types[0]).toLowerCase() === "residents" ? this.dsRUPoints : this.dsGPoints,
          },
          {
            label: String(types[1]).toLowerCase() === "stranger" ? "Guests" : "Residents",
            lineTension,
            borderColor: String(types[1]).toLowerCase() === "stranger" ? ChartConfig.color.warning : ChartConfig.color.primary,
            pointBorderColor: String(types[1]).toLowerCase() === "stranger" ? ChartConfig.color.warning : ChartConfig.color.primary,
            pointBorderWidth,
            pointRadius,
            fill: false,
            pointBackgroundColor: String(types[1]).toLowerCase() === "stranger" ? ChartConfig.color.warning : ChartConfig.color.primary,
            borderWidth,
            data: String(types[1]).toLowerCase() === "stranger" ? this.dsGPoints : this.dsRUPoints,
          },                    
        ],
      },
      this.options
    );
  },
  methods: {},
};
