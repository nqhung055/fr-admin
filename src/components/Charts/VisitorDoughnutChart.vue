<!-- Doughnut Chart -->
<template>
  <ECharts :options="pie" style="width:300px; height:260px"></ECharts>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/title";
import { ChartConfig } from "Constants/chart-config";

export default {
  components: {
    ECharts,
  },
  data() {
    return {
      pie: {
        backgroundColor: "transparent",
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        color: [
          ChartConfig.color.success,
          ChartConfig.color.danger,
        ],
        series: [
          {
            name: "Visitors",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            data: [
              {
                value: 548,
                name: "Employee",
              },
              {
                value: 210,
                name: "Stranger",
              }
            ],
            label: {
              normal: {
                show: false,
                position: "center",
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "20",
                  fontWeight: "bold",
                },
              },
            },
            labelLine: {
              normal: {
                show: true,
              },
            },
          },
        ],
      },
    };
  },
};
</script>
