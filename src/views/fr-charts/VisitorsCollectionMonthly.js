import { Bar } from "vue-chartjs"; //Line, 
import { ChartConfig } from "Constants/chart-config";
import { groupByKey } from "Helpers/helpers"; //countGroupedByKey, sumValues,

export default {
  extends: Bar,
  props: {
    xLabel: {
      type: String,
      default: "x-Axes",
    },
    yLabel: {
      type: String,
      default: "y-Axes",
    },
    dataSets: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              stacked: true,
              ticks: {
                  display: false
              },
              gridLines: {
                  display: false,
                  drawBorder: false
              }
            },
          ],
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
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {},
  mounted() {
    if(Array.isArray(this.dataSets)) {
      let lbls = []; let types = []; let guest = []; let registeredUser = [];
      // console.log('data: ' + Object.values(this.dataSets).length);
      Object.values(this.dataSets).forEach((elm)=>{
        console.log('VisitorCollectioMonthly -> month: ' + elm.month);
      });
      if (this.xLabel.includes("day")) {
        Object.values(this.dataSets).forEach((elm) => {
          lbls.push(elm.date);
          Object.keys(groupByKey(elm.data, "type")).forEach((key) => {
            if (types.indexOf(key) === -1) types.push(key);
            if (String(key).toLowerCase() === "employee")
              registeredUser.push(
                Object.values(groupByKey(elm.data, "type")[key]).length
              );
            else
              guest.push(Object.values(groupByKey(elm.data, "type")[key]).length);
            // console.log('Type: ' + String(key).toLowerCase() + ' - Items: ' + Object.values(groupByKey(elm.data, "type")[key]).length);
          });
        });
      } else if (this.xLabel.includes("month")) {
        Object.values(this.dataSets).forEach((elm) => {
          lbls.push(new Date(elm.month).toLocaleString("en-us", { month: "short"}));
          Object.keys(groupByKey(elm.data, "type")).forEach((key) => {
            if (types.indexOf(key) === -1) types.push(key);
            if (String(key).toLowerCase() === "employee")
              registeredUser.push(
                Object.values(groupByKey(elm.data, "type")[key]).length
              );
            else
              guest.push(Object.values(groupByKey(elm.data, "type")[key]).length);
          //   console.log('Month - Type: ' + String(key).toLowerCase() + ' - Items: ' + Object.values(groupByKey(elm.data, "type")[key]).length);
          });
        });
      } else if (this.xLabel.includes("year")) {
        Object.values(this.dataSets).forEach((elm) => {
          lbls.push(elm.y);
          Object.keys(groupByKey(elm.data, "type")).forEach((key) => {
            if (types.indexOf(key) === -1) types.push(key);
            if (String(key).toLowerCase() === "employee")
              registeredUser.push(
                Object.values(groupByKey(elm.data, "type")[key]).length
              );
            else
              guest.push(Object.values(groupByKey(elm.data, "type")[key]).length);
            // console.log('Type: ' + String(key).toLowerCase() + ' - Items: ' + Object.values(groupByKey(elm.data, "type")[key]).length);
          });
        });
      }
      this.renderChart(
        {
          labels: lbls,
          datasets: [
            {
              type: 'bar',
              label: String(types[0]).toLowerCase() === "registered_user" ? "Registered Users" : "Guests",
              barPercentage: 0.4,
              categoryPercentage: 1.3,
              backgroundColor: String(types[0]).toLowerCase() === "registered_user" ? ChartConfig.color.primary : ChartConfig.lineChartAxesColor,
              hoverBackgroundColor: String(types[0]).toLowerCase() === "registered_user" ? ChartConfig.color.primary : ChartConfig.lineChartAxesColor,
              borderWidth: 0,
              data: String(types[0]).toLowerCase() === "registered_user" ? registeredUser : guest 
           },
           {
              type: 'bar',
              label: String(types[1]).toLowerCase() === "stranger" ? "Guests" : "Registered Users",
              barPercentage: 0.4,
              categoryPercentage: 1.3,
              backgroundColor: String(types[1]).toLowerCase() === "stranger" ? ChartConfig.lineChartAxesColor : ChartConfig.color.primary,
              hoverBackgroundColor: String(types[1]).toLowerCase() === "stranger" ? ChartConfig.lineChartAxesColor : ChartConfig.color.primary,
              borderWidth: 0,
              data: String(types[1]).toLowerCase() === "stranger" ? guest : registeredUser,
           }
          ],
        },
        this.options
      );
    } else {
     console.log('Data is empty!');
     return;
    }    
  },
  methods: {},
};
