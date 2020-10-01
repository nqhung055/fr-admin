<template>
  <div>
    <div class="mb-5">
      <v-btn class="error mr-3" @click="showDay()">Day</v-btn>
      <v-btn class="success mr-3" @click="showMonth()">Month</v-btn>
      <v-btn class="primary" @click="showYear()">Year</v-btn>
    </div>
    <div>
      <!-- <visitors-line-chart
        :xLabel = this.xLabel[0]
        :yLabel = this.yLabel
        :types="types"
        :labels = this.labels
        :dataSets = this.data
        style="width: 100%; height: 330px;"
        v-show="selectedBtn == 'day'"
      ></visitors-line-chart>
      <visitors-line-chart
        style="width: 100%; height: 330px;"
        :xLabel = this.xLabel[1]
        :yLabel = this.yLabel
        :types="types"
        :labels = this.labels
        :dataSets = this.data
        v-show="selectedBtn == 'month'"
      ></visitors-line-chart>
      <visitors-line-chart
        style="width: 100%; height: 330px;"
        :xLabel = this.xLabel[2]
        :yLabel = this.yLabel
        :types= this.types
        :labels = this.labels
        :dataSets = this.data
        v-show="selectedBtn == 'year'"
      ></visitors-line-chart> -->
      <visitors-line-chart
        xLabel="Selected by day"
        yLabel="Hundred units"
        :types="['Emloyee','Stranger']"
        :labels="['17-08-2020', '18-08-2020', '19-08-2020', '20-08-2020', '21-08-2020', '22-08-2020', '23-08-2020']"
        :dataSets="[[40, 65, 40, 150, 40, 85, 30], [0, 90, 110, 0, 60, 5, 77]]"
        style="width: 100%; height: 330px;"
        v-show="selectedBtn == 'day'"
      ></visitors-line-chart>
      <visitors-line-chart
        style="width: 100%; height: 330px;"
        xLabel="Selected by month"
        yLabel="Hundred units"
        :types="['Emloyee','Stranger']"
        :labels="['1-08-2020', '2-08-2020', '3-08-2020', '4-08-2020', '5-08-2020', '6-08-2020', '7-08-2020', '8-08-2020', '9-08-2020', '10-08-2020']"
        :dataSets="[[60, 25, 150, 60, 100, 5, 60, 130, 55, 10], [10, 75, 0, 30, 90, 15, 120, 100, 5, 60]]"
        v-show="selectedBtn == 'month'"
      ></visitors-line-chart>
      <visitors-line-chart
        style="width: 100%; height: 330px;"
        xLabel="Selected by year"
        yLabel="Hundred units"
        :types="['Emloyee','Stranger']"
        :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept']"
        :dataSets="[[60, 25, 150, 60, 100, 5, 60, 130, 55], [10, 75, 0, 30, 90, 15, 120, 100, 5]]"
        v-show="selectedBtn == 'year'"
      ></visitors-line-chart>
    </div>
  </div>
</template>
<script>
import VisitorsLineChart from "./GeneralVisitorsLineChart";
// import CourseData from "Views/course/dasRta.js";
import { getCurrentAppLayout } from "Helpers/helpers";

export default {
  props: {
    xLabel: {
      type: Array,
      default: () => ["x-Axes"],
    },
    yLabel: {
      type: String,
      default: () => "y-Axes",
    },
    types: {
      type: Array,
      default: () =>  [String, String]
    },
    labels: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    VisitorsLineChart,
  },
  data() {
    return {
      panel: 0,
      selectedBtn: "day",
      disabled: false,
      readonly: false,
      day: [10, 65, 40, 150, 40, 85, 30],
      month: [0, 65, 40, 0, 40, 85, 0],
      year: [60, 25, 150, 60, 100, 5, 60],
    };
  },
  methods: {
    getCurrentAppLayoutHandler() {
      return getCurrentAppLayout(this.$router);
    },
    showDay() {
      this.selectedBtn = "day";
    },
    showMonth() {
      this.selectedBtn = "month";
    },
    showYear() {
      this.selectedBtn = "year";
    },
  },
  mounted() {
    // this.types.forEach(item => {
    //   console.log('Type: ' + item);
    // });
  },
  computed: {
  },
};
</script>
<style scoped>
</style>