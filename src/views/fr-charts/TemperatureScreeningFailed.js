// Doughnut Chart

import { Doughnut } from "vue-chartjs";
import { ChartConfig } from "Constants/chart-config";

export default {
  extends: Doughnut,
  data() {
    return {
      options: {
        cutoutPercentage: 70,
        legend: {
          display: false,
          position: "bottom",
        },
      },
    };
  },
  mounted() {
    this.renderChart(
      {
        labels: ["Pass", "Failed"],
        datasets: [
          {
            data: [250, 70],
            backgroundColor: [
              ChartConfig.color.success,
              ChartConfig.color.danger,
            ],
            borderWidth: [0, 0, 0],
            hoverBackgroundColor: [ChartConfig.color.success],
          },
        ],
      },
      this.options
    );
  },
};
