import { Line } from "vue-chartjs";
import { ChartConfig } from "Constants/chart-config";
import { groupByKey } from "Helpers/helpers"; //countGroupedByKey, sumValues,

const lineTension = lineTension;
const borderWidth = 3;
const pointRadius = 7;
const pointBorderWidth = 2;

export default {
  extends: Line,
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
    dsLabels: {
      type: Array,
      default: [],
    },
    dsRUPoints: {
      type: Array,
      default: [],
    },
    dsGPoints: {
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
              scaleLabel: {
                display: true,
                labelString: this.yLabel,
              },
              gridLines: {
                display: true,
                drawBorder: false,
              },
              ticks: {
                // reverse: false,
                stepSize: 100,
                display: true,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: this.xLabel,
              },
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                display: true,
              },
            },
          ],
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
    let lbls = [];
    let types = ["registered_user", "stranger"];
    let guest = [];
    let registeredUser = [];
    // Object.values(this.dataSets).forEach(ds => {
    //   console.log('label: ' + ds.label);
    // });
    if (this.xLabel.includes("day")) {
      // Object.values(this.dataSets).forEach((elm) => {
      //   lbls.push(elm.date);
      //   Object.keys(groupByKey(elm.data, "type")).forEach((key) => {
      //     if (types.indexOf(key) === -1) types.push(key);
      //     if (String(key).toLowerCase() === "employee")
      //       registeredUser.push(
      //         Object.values(groupByKey(elm.data, "type")[key]).length
      //       );
      //     else
      //       guest.push(Object.values(groupByKey(elm.data, "type")[key]).length);
      //   });
      // });
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
        labels: this.dsLabels,
        datasets: [
          {
            label:
              String(types[0]).toLowerCase() === "registered_user" ? "Residents" : "Guests",
            lineTension,
            borderColor:
              String(types[0]).toLowerCase() === "registered_user" ? ChartConfig.color.primary : ChartConfig.color.warning,
            pointBorderColor:
              String(types[0]).toLowerCase() === "registered_user" ? ChartConfig.color.primary : ChartConfig.color.warning,
            pointBorderWidth,
            pointRadius,
            fill: false,
            pointBackgroundColor:
              String(types[0]).toLowerCase() === "registered_user" ? ChartConfig.color.primary : ChartConfig.color.warning,
            borderWidth,
            data:
              String(types[0]).toLowerCase() === "registered_user" ? this.dsRUPoints : this.dsGPoints,
          },
          {
            label:
              String(types[1]).toLowerCase() === "stranger"
                ? "Guests"
                : "Registered Users",
            lineTension,
            borderColor:
              String(types[1]).toLowerCase() === "stranger"
                ? ChartConfig.color.warning
                : ChartConfig.color.primary,
            pointBorderColor:
              String(types[1]).toLowerCase() === "stranger"
                ? ChartConfig.color.warning
                : ChartConfig.color.primary,
            pointBorderWidth,
            pointRadius,
            fill: false,
            pointBackgroundColor:
              String(types[1]).toLowerCase() === "stranger"
                ? ChartConfig.color.warning
                : ChartConfig.color.primary,
            borderWidth,
            data:
              String(types[1]).toLowerCase() === "stranger"
                ? guest
                : registeredUser,
          },
        ],
      },
      this.options
    );
  },
  methods: {},
};
