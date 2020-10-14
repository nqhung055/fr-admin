<!-- Bar Chart -->
<template>
  <div v-if="errored">
    <p>{{ $t('message.getLogsError') }}</p>
  </div>
  <div v-else>
    <div v-if="loading" class="pr-4">
      {{ $t('message.loading') }}
    </div>
    <div v-else>
      <div>
        <!-- <ECharts :options="bar" id="barChart" style="width:100%; height:400px"></ECharts> -->
        <temperature-summary class="mb-5" :xLabel="this.xLabel[0]" :yLabel="this.yLabel" style="width: 100%; height: 400px;" :arrRU="this.arrRUFPoints"  :arrG="this.arrGFPoints"  :arrLabels="this.lstLabels" :e_label="$t('message.employee')" :s_label="$t('message.stranger')"/>
        <v-row class="cart-wrap hidden-only pl-6" justify="center">
          <v-col cols="4" class="d-custom-flex">
            <span class="mr-2">
              <i class="zmdi zmdi-account primary--text"></i>
            </span>
            <p class="mb-0">
              <span class="d-block fs-14 fw-bold">{{ sumRUFPoints }}</span>
              <span class="d-block fs-12 grey--text fw-normal">Registered User Failed</span>
            </p>
          </v-col>
          <v-col cols="4" class="d-custom-flex">
            <span class="mr-2">
              <i class="zmdi zmdi-account-o warning--text"></i>
            </span>
            <p class="mb-0">
              <span class="d-block fs-14 fw-bold">{{ sumGFPoints }}</span>
              <span class="d-block fs-12 grey--text fw-normal">Guest Failed</span>
            </p>
          </v-col>
          <v-col cols="2" class="d-custom-flex">
            <span class="mr-2">
              <i class="zmdi zmdi-male-female success--text"></i>
            </span>
            <p class="mb-0">
              <span class="d-block fs-14 fw-bold">{{ sumRUFPoints + sumGFPoints }}</span>
              <span
                class="d-block fs-12 grey--text fw-normal"
              >Total Failed</span>
            </p>
          </v-col>
          <!-- <v-col cols="2" class="d-custom-flex">
            <span class="mr-2">
              <i class="zmdi zmdi-nature-people error--text"></i>
            </span>
            <p class="mb-0">
              <span class="d-block fs-14 fw-bold">101</span>
              <span
                class="d-block fs-12 grey--text fw-normal"
              >{{$t('message.guestFailed')}}</span>
            </p>
          </v-col> -->
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
// import ECharts from "vue-echarts";
// import "echarts/lib/chart/bar";
// import "echarts/lib/component/title";
import TemperatureSummary from "./TemperatureSummary";
import { ChartConfig } from "Constants/chart-config";
import {} from "Helpers/helpers";

export default {
  extends: Bar,
  name: "Temperature-Collection",
  props: {
    xLabel: {
      type: Array,
      default: () => ["x-Axes"],
    },
    yLabel: {
      type: String,
      default: () => "y-Axes",
    },
    url: {
      type: String,
      default: () => "",
    },
  },
  components: {
    // ECharts,
    TemperatureSummary
  },
  data() {
    return {
      loading: true,
      errored: false,
      selectedBtn: "daily",
      strFullURL: "",
      lstLabels: [],
      arrRUFPoints: [],
      arrGFPoints: [],
      arrPPoints: [],
      arrFPoints: [],
      sumPPoints: 0,
      sumFPoints: 0,
      date: new Date().toISOString().substr(0, 10),
      numDataPoint: "",
      strLabels: "",
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
              }
            }]
        },
        legend: {
            display: false
        }
      },
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
          data: ["Registered User", "Guest"],
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: this.arrLabels
          // ["2020-10-13", "2020-10-12", "2020-10-11", "2020-10-13"],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: [
          {
            name: "Registered User",
            type: "bar",
            data: [400, 700, 1400, 900],
          },
          {
            name: "Guest",
            type: "bar",
            data: [600, 350, 400, 900],
          },
        ],
      },
    };
  },
  mounted() {
    this.numDataPoint = 14;
    this.strFullURL = this.url + "&endDate=" + this.date + "&dataPointType=" + this.selectedBtn + "&dataPointNumber=" + this.numDataPoint;
    this.getTemperatureSummary(this.strFullURL);
    // this.BuildChart();
  },
  methods: {
    showDay() {
      this.selectedBtn = "daily";
      this.strFullURL = this.url + "&endDate=" + this.date + "&dataPointType=" + this.selectedBtn + "&dataPointNumber=" + this.numDataPoint;
      this.getTemperatureSummary(this.strFullURL);
    },
    showWeek() {
      this.selectedBtn = "weekly";
      this.strFullURL = this.url + "&endDate=" + this.date + "&dataPointType=" + this.selectedBtn + "&dataPointNumber=" + this.numDataPoint;
      this.getTemperatureSummary(this.strFullURL);
    },
    showMonth() {
      this.selectedBtn = "monthly";
      this.strFullURL = this.url + "&endDate=" + this.date + "&dataPointType=" + this.selectedBtn + "&dataPointNumber=" + this.numDataPoint;
      this.getTemperatureSummary(this.strFullURL);
    },
    changeDate() {
      this.strFullURL = this.url + "&endDate=" + this.date + "&dataPointType=" + this.selectedBtn + "&dataPointNumber=" + this.numDataPoint;
      this.getTemperatureSummary(this.strFullURL);
    },
    getParams() {
      return "&endDate=" + this.date + "&dataPointType=" + this.selectedBtn + "&dataPointNumber=" + this.numDataPoint;
    },
    reloadWithDefaultUrl(url) {
      this.getTemperatureSummary(url);
    },
    async getTemperatureSummary(url) {
      // console.log('Temperature Collection > url: ' + url);
      await this.$axios
        .get(url)
        .then((response) => {
          let arrLabels = []; let listRUFPoints = []; let listGFPoints = []; let sumRUF = 0; let sumGF = 0;
          Object.keys(response.data).forEach((key) => {
            if (key==="registered") {
              Object.entries(response.data[key]).forEach((ru) => {
                sumRUF += ru[1]["failed"];
                listRUFPoints.push(ru[1]["failed"]);
                arrLabels.push(ru[1]["label"]);
              });
            } else {
              Object.entries(response.data[key]).forEach((g) => {
                sumGF += g[1]["failed"];
                listGFPoints.push(g[1]["failed"]);
              });
            }

          });
          this.sumRUFPoints = sumRUF;
          this.sumGFPoints = sumGF;
          this.lstLabels = arrLabels;
          this.arrRUFPoints = listRUFPoints;
          this.arrGFPoints = listGFPoints;
      })
      .catch((error) => {
        this.errored = true;
        console.log(error);
      })
      .finally(
        () => (this.loading = false),
      );
    },
    BuildChart() {
      this.renderChart({
        labels: ["Registerd User", "Guest"],
        datasets: [
            {
              type: 'bar',
              label: ["Registered User"],
              barPercentage: 0.4,
              categoryPercentage: 1.3,
              backgroundColor: ChartConfig.color.primary,
              hoverBackgroundColor: ChartConfig.color.primary,
              borderWidth: 0,
              data: this.arrPPoints
            },
            {
              type: 'bar',
              label: ["Guest"],
              barPercentage: 0.4,
              categoryPercentage: 1.3,
              backgroundColor: ChartConfig.color.warning,
              hoverBackgroundColor: ChartConfig.color.warning,
              borderWidth: 0,
              data: this.arrFPoints
            }
        ]
      }, this.options);
    },
  }
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