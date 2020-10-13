<!-- Bar Chart -->
<template>
  <ECharts :options="bar" id="barChart" style="width:100%; height:400px"></ECharts>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
import { ChartConfig } from "Constants/chart-config";

export default {
  name: "buyers-stats",
  components: {
    ECharts,
  },
  data() {
    return {
      bar: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        color: [ChartConfig.color.primary, ChartConfig.color.warning],
        legend: {
          data: ["Series A", "Series B"],
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: ["2020-10-13", "2020-10-12", "2020-10-11", "2020-10-13"],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: [
          {
            name: "Series A",
            type: "bar",
            data: [400, 700, 1400, 900],
          },
          {
            name: "Series B",
            type: "bar",
            data: [600, 350, 400, 900],
          },
        ],
      },
    };
  },
};
</script>
<style scoped>
#barChart > :first-child {
  width: 100% !important;
}

#barChart > :first-child :first-child {
  width: 100% !important;
}
</style>