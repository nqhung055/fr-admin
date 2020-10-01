import { Bar } from 'vue-chartjs'
import { ChartConfig } from "Constants/chart-config";

import { groupByKey } from "Helpers/helpers";

export default ({
   extends: Bar,
   props: {
      dt: {
         type: Array,
         default: []
      }
   },
   data: function () {
      return {
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
         logs: [],
         currMonth: new Date().toLocaleString('en-us', { month: 'long' }),
         dataByMonth: [],
         labels: [],
         arrRU: [],
         arrG: [],
      }
   },
   computed: {
      Labels() {         
         return this.getLabels();
      },
      Datas() {
         return this.getDatas();
      },
   },
   mounted() {
      this.Datas;
      if (Array.isArray(this.dt)) {
         let dataRU = []; let dataGuest = []; let months = []; let types = [];
         Object.values(this.dt).forEach((elm) => {
            months.push(new Date(elm.month).toLocaleString("en-us", { month: "short" }));
            Object.keys(groupByKey(elm.data, "type")).forEach((key) => {
               if (types.indexOf(key) === -1) types.push(key);
               if (String(key).toLowerCase() === "registered_user") dataRU.push(Object.values(groupByKey(elm.data, "type")[key]).length);
               else dataGuest.push(Object.values(groupByKey(elm.data, "type")[key]).length);
            });
         });
         this.renderChart({
            labels: this.Labels,
            datasets: [

               {
                  type: 'bar',
                  label: String(types[0]).toLowerCase() === "registered_user" ? "Registered Users" : "Guests",
                  barPercentage: 0.4,
                  categoryPercentage: 1.3,
                  backgroundColor: String(types[0]).toLowerCase() === "registered_user" ? ChartConfig.color.primary : ChartConfig.lineChartAxesColor,
                  hoverBackgroundColor: String(types[0]).toLowerCase() === "registered_user" ? ChartConfig.color.primary : ChartConfig.lineChartAxesColor,
                  borderWidth: 0,
                  data: String(types[0]).toLowerCase() === "registered_user" ? dataRU : dataGuest
               },
               {
                  type: 'bar',
                  label: String(types[1]).toLowerCase() === "stranger" ? "Guests" : "Registered Users",
                  barPercentage: 0.4,
                  categoryPercentage: 1.3,
                  backgroundColor: String(types[1]).toLowerCase() === "stranger" ? ChartConfig.lineChartAxesColor : ChartConfig.color.primary,
                  hoverBackgroundColor: String(types[1]).toLowerCase() === "stranger" ? ChartConfig.lineChartAxesColor : ChartConfig.color.primary,
                  borderWidth: 0,
                  data: String(types[1]).toLowerCase() === "stranger" ? dataGuest : dataRU,
               }
            ]
         }, this.options);
      } else {
         console.log('Data is empty!');
         return;
      }
   },
   methods: {
      getLabels() {
         Object.values(this.dt).forEach(elm => {
            this.labels.push(new Date(elm.month).toLocaleString("en-us", { month: "short" }));
         });
         return this.labels;
      },
      getDatas() {
         Object.values(this.dt).forEach((elm) => {
            Object.keys(groupByKey(elm.data, "type")).forEach((key) => {
               if (String(key).toLowerCase() === "registered_user") this.arrRU.push(Object.values(groupByKey(elm.data, "type")[key]).length);
               else this.arrG.push(Object.values(groupByKey(elm.data, "type")[key]).length);
            });
         });
         console.log('arrRU: ' + this.arrRU.length + '- arrG: ' + this.arrG.length);
      },
   },
   components: {
      ChartConfig,
   },
   destroyed() {}
});