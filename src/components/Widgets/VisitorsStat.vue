<template>
  <app-card customClasses="visitors-chart-wrap">
    <v-row class="mb-n3">
      <v-col xl="6" lg="6" md="6" cols="12" b-50>
        <div class="d-sm-flex align-items-center">
          <div class="visitors-info d-custom-flex justify-center">
            <div>
              <p class="mb-0 grey--text">Total Visitors This Month</p>
              <span class="font-xl fw-semi-bold">558</span>
              <p class="fs-12 fw-normal">
                <span class="success--text">
                  <i class="ti-arrow-up mr-2 font-md fw-bold"></i>+24%
                </span>
                <span class="grey--text">From Last Month</span>
              </p>
            </div>
          </div>
          <div class="pos-relative d-custom-flex justify-center visitors-chart">
            <stacked-bar-chart :height="250" :width="500" :data1="data1" :data2="data2"></stacked-bar-chart>
          </div>
        </div>
      </v-col>
      <v-col xl="6" lg="6" md="6" cols="12">
        <div class="d-sm-flex justify-space-between align-items-center px-5">
          <div class="visitors-info d-custom-flex justify-center">
            <div>
              <h5 class="mb-4">Visitors</h5>
              <ul class="list-unstyled pl-0">
                <li class="mb-4 d-custom-flex align-items-center">
                  <span class="v-badge rounded primary mr-2"></span>
                  <span class="fs-12 grey--text fw-normal">328 Overall Visitors</span>
                </li>
                <li class="mb-4 d-custom-flex align-items-center">
                  <span class="v-badge rounded success mr-2"></span>
                  <span class="fs-12 grey--text fw-normal">250 Employee Visiotrs</span>
                </li>
                <li class="d-custom-flex align-items-center">
                  <span class="v-badge rounded error mr-2"></span>
                  <span class="fs-12 grey--text fw-normal">78 Stranger</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="pos-relative d-custom-flex justify-center visitors-chart">
            <visitor-doughnut-chart></visitor-doughnut-chart>
          </div>
        </div>
      </v-col>
    </v-row>
  </app-card>
</template>

<script>
import StackedBarChart from "Components/Charts/StackedBarChart";
import VisitorDoughnutChart from "Components/Charts/VisitorDoughnutChart";

export default {
  data() {
    return {
      data1: [5, 32, 50, 42, 32, 46, 30, 25, 29, 21, 21, 30],
      data2: [20, 20, 12, 30, 10, 32, 28, 30, 20, 18, 18, 25],
    };
  },
  components: {
    StackedBarChart,
    VisitorDoughnutChart,
  },
};
</script>
