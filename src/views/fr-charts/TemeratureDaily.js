import { Bar } from 'vue-chartjs'
import { ChartConfig } from "Constants/chart-config";
import { groupByKey } from "Helpers/helpers";

export default ({
   extends: Bar,
   props: {
      dt: {
         type: Array,
         default: []
      },
      e_label: {
         type: String,
         default: () => ""
      },
      s_label: {
         type: String,
         default: () => ""
      },
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
         arrPass: [],
         arrFail: [],
         types: [],
         labels: [],
      }
   },
   computed: {
      getDataByType() {
         return this.dataByType();
      },
      getDataByTemperatures() {
        return this.dataByTemperatures();
      },
   },
   mounted() {
      // this.getDataByType;
      this.getDataByTemperatures;
      if (Array.isArray(this.dt)) {
         this.renderChart({
            labels: this.getLabels(),
            datasets: [
               {
                  type: 'bar',
                  label: this.e_label,
                  barPercentage: 0.4,
                  categoryPercentage: 1.3,
                  backgroundColor: ChartConfig.color.success,
                  hoverBackgroundColor: ChartConfig.color.success,
                  borderWidth: 0,
                  data: this.arrPass
               },
               {
                  type: 'bar',
                  label: this.s_label,
                  barPercentage: 0.4,
                  categoryPercentage: 1.3,
                  backgroundColor: ChartConfig.color.danger,
                  hoverBackgroundColor: ChartConfig.color.danger,
                  borderWidth: 0,
                  data: this.arrFail
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
         let vm = this;
         Object.values(this.dt).forEach(elm => {
            vm.labels.push(new Date(elm.date).getDate() + '-' + new Date(elm.date).toLocaleString("en-us", { month: "short" }) + '-' + new Date(elm.date).getFullYear());
         });
         return this.labels;
      },
      dataByType() {
         let vm = this;
         let strRUObj = ""; let strGObj = ""; let strRU = ""; let strG = "";
         Object.values(this.dt).forEach(elm => {
            const dtLength = Object.keys(groupByKey(elm.data, "type")).length;
            if (dtLength === 1) {
               Object.keys(groupByKey(elm.data, "type")).forEach(key => {
                  if (String(key).toLowerCase() === "registered_user") {
                     strRU += groupByKey(elm.data, "type")[key].length + ", ";
                     strG += "0, ";
                  } else if (String(key).toLowerCase() === "stranger") {
                     strRU += "0, ";
                     strG += groupByKey(elm.data, "type")[key].length + ", ";
                  }
               });
            } else if (dtLength === 2) {
               Object.keys(groupByKey(elm.data, "type")).forEach(key => {
                  if (String(key).toLowerCase() === "registered_user") {
                     strRUObj = groupByKey(elm.data, "type")[key].length;
                  } else if (String(key).toLowerCase() === "stranger") {
                     strGObj = groupByKey(elm.data, "type")[key].length;
                  }
               });
               strRU += + strRUObj + ", ";
               strG += + strGObj + ", ";
            }
         });
         const arrRU1 = strRU.split(', ').filter(n => n)
         const arrG1 = strG.split(', ').filter(n => n)
         Object.values(arrRU1.filter(n => n)).forEach(val => {
            vm.arrRU.push(val);
         });
         Object.values(arrG1.filter(n => n)).forEach(val => {
            vm.arrFail.push(val);
         });

         return vm.arrRU, vm.arrG;
      },
      dataByTemperatures() {
         let vm = this; let totalPass = 0; let totalFail = 0; let strPassObj = ""; let strFailObj = "";
         Object.values(this.dt).forEach((elm) => {
           elm.data.forEach((item) => {
             if (35.5 <= item.bodyTemp && item.bodyTemp <= 37.5 ) {
               totalPass += 1;
             } else {
               totalFail += 1;
             }
           });
           strPassObj += totalPass.toString() + ", ";
           strFailObj += totalFail.toString() + ", ";
           totalPass = 0; totalFail = 0;
   
         });
         const arrPass1 = strPassObj.split(", ").filter((n) => n);
         const arrFail1 = strFailObj.split(", ").filter((n) => n);
         Object.values(arrPass1.filter((n) => n)).forEach((val) => {
           vm.arrPass.push(val);
         });
         Object.values(arrFail1.filter((n) => n)).forEach((val) => {
           vm.arrFail.push(val);
         });
         return vm.arrPass, vm.arrFail;
       },
   },
   components: {
      ChartConfig,
   },
   destroyed() { },
   created() {
      // this.getDatas();
   },
});