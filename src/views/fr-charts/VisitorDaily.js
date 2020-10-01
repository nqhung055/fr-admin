import { Bar } from 'vue-chartjs'
import { ChartConfig } from "Constants/chart-config";

import { groupByKey } from "Helpers/helpers";

export default ({
   props: { 
      dt: { 
         type: Array,
         default: []
      }
   },
   extends: Bar,
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
         currDay: new Date().toLocaleDateString(),
         dataByDay: [],
      }
   },
   computed: {
      
   },
   async mounted() {
      if(Array.isArray(this.dt)) {
         let dataRU = []; let dataGuest = []; let days = []; let types = [];
         Object.values(this.dt).forEach((elm) => {
            days.push(new Date(elm.date).getDate() + '-' + new Date(elm.date).toLocaleString("en-us", { month: "short" }) + '-' + new Date(elm.date).getFullYear());
            Object.keys(groupByKey(elm.data, "type")).forEach((key) => {
               if (types.indexOf(key) === -1) types.push(key);
               if (String(key).toLowerCase() === "registered_user") dataRU.push(Object.values(groupByKey(elm.data, "type")[key]).length);
               else dataGuest.push(Object.values(groupByKey(elm.data, "type")[key]).length);
            });
         });
         this.renderChart({
            labels: days,
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
   methods: {},
   components: {
      ChartConfig,
   },
})
