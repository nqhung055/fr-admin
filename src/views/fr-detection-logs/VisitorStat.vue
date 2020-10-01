<!-- Device Share Widget -->
<template>
  <div class="general-dashboard-doughnut-wrap">
    <div class="mb-2 pos-relative">
      <doughnut-chart-v2 :height="240" :data="arrData"></doughnut-chart-v2>
      <div class="overlay-content d-custom-flex justify-center align-items-center">
        <span class="grey--text font-2x fw-semi-bold">{{this.total}}</span>
      </div>
    </div>
    <div class="hidden-xs-only">
      <div class="d-custom-flex general-dashboard-doughnut-footer">
        <div class="fs-12 fw-normal grey--text">
          <span class="v-badge primary px-2 py-1"></span>
          <span class="d-block">65%</span>
          <span class="d-block">{{this.labels[0]}}</span>
        </div>
        <div class="fs-12 fw-normal grey--text">
          <span class="v-badge grey px-2 py-1"></span>
          <span class="d-block">25%</span>
          <span class="d-block">{{this.labels[1]}}</span>
        </div>
        <!-- <div class="fs-12 fw-normal grey--text">
          <span class="v-badge warning px-2 py-1"></span>
          <span class="d-block">10%</span>
          <span class="d-block">Android Devices</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutChartV2 from "../fr-charts/GeneralDoughnutChartV2";

export default {
   props:{
      total: {
         type: Number,
         default: () => 0
      },
      labels: {
         type: Array,
         default: () => ['', '']
      },
      data: {
         type: Array,
         default: () => [Number, Number]
      },
      bgColor: {
         type: Array,
         default: () => ['','']
      }
   },
  components: {
    DoughnutChartV2,
  },
  data() {
    return {
      arrData: {
            labels: this.labels,
            data: this.data,
            backgroundColor: this.bgColor
      },
    };
  },
};
</script>