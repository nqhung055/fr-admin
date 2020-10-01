import { Doughnut } from "vue-chartjs";
import { ChartConfig } from "Constants/chart-config";

export default {
  extends: Doughnut,
  props: { 
    dt: { 
       type: Array,
       default: []
    },
    lbl: { 
      type: Array,
      default: []
   }
 },
  data() {
    return {
      options: {
        cutoutPercentage: 70,
        legend: {
          display: false,
          position: "bottom",
        },
      },
    };
  },
  mounted() {
    this.renderChart(
      {        
        labels: this.lbl,
        datasets: [
          {
            data: this.dt,
            backgroundColor: this.lbl[0] === "registered user" ? [ ChartConfig.color.success, ChartConfig.color.danger] : [ ChartConfig.color.danger, ChartConfig.color.success],
            borderWidth: [0, 0, 0],
            hoverBackgroundColor: [ChartConfig.color.lightGrey],
          },
        ],
      },
      this.options
    );
  },
  methods: {
    newArr(vals){
      let newLst = [];
      Object.values(vals).forEach((val) =>{
        newLst.push(val);
        // console.log('Val: ' + (val / this.total * 100).toFixed(2));
      });
      return newLst;
    },
    setBgColor(lbls) {
      let str = ""
      Object.values(lbls).forEach(v=> {
        if (String(v).toLowerCase() === "registered user") {
          str = "[ChartConfig.color.success, ChartConfig.color.danger]"
        } else {
          str = "[ChartConfig.color.danger, ChartConfig.color.success]"
        }
      });
      return str;
    }
  },
  computed: {
    
  },
};
