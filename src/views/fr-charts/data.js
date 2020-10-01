import Vue from "vue";
import { ChartConfig } from "Constants/chart-config";

export const registeredTemperatureData = {
   label: 'Employee',
   timelines: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug'
   ],
   body: [45, 42, 51, 19, 50, 30, 22, 20, 45, 35, 40, 37],
   room: [32, 28, 40, 38, 32, 42, 39, 15, 9, 17, 20, 41]
}
export const unregisteredTemperatureData = {
   label: 'Stranger',
   timelines: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug'
   ],
   body: [45, 42, 51, 19, 50, 30, 22, 20, 45, 35, 40, 37],
   room: [32, 28, 40, 38, 32, 42, 39, 15, 9, 17, 20, 41]
}
export const temperatureData = {
   registered: 'Registered',
   unregistered: 'Unregistered',
   timelines: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
   ],
   body: [45, 42, 51, 19, 50, 30, 22, 20, 45, 35, 40, 37],
   room: [32, 28, 40, 38, 32, 42, 39, 15, 9, 17, 20, 41]
}
export const detectionLogsFromAPI = new Vue({
   data() {
      return {
         results: null,
      };
   },
   async mounted() {
      await this.$axios
         .get(`/logs?pageIndex=0&pageSize=1000000`)
         .then((response) => {
            this.results = response.data;
            console.log('results: ' + this.results.rows.length);
         })
         .catch(error => console.log(error));
      // this.dlFromAPI();
   },
   methods: {
      /* async dlFromAPI() {
          const dlResponse = await this.$axios.get(`/logs?pageIndex=0&pageSize=1000000`)
          if (dlResponse.status === 200) {
              this.results = dlResponse.data
          } else {
              Vue.notify({
                  group: "loggedIn",
                  type: "error",
                  text: "Can not get data list. Please try again later!",
              })
          }
      } */
   }
});

export const indexStatistics  = [
   {
      icon : "cc GOLOS primary--text",
      name : "Visitors",
      color : "primary",
      duration : "last 4 days",
      market_cap : "95",
      chartLabel : ["A", "B", "C", "D", "E"],
      data:[1, 26, 8, 22, 1],
      percentage:'5.3%',
      percentageColor:'success',
      percentageIcon:'zmdi zmdi-long-arrow-up',
      chartBorderColor : ChartConfig.color.primary
   },
   {
      icon : "cc GOLOS-alt success--text",
      name : "Strangers",
      color : "success",
      duration : "last 4 days",
      market_cap : "45",
      chartLabel : ["A", "B", "C", "D", "E"],
      data:[29, 5, 26, 10, 21],
      percentage:'4.43%',
      percentageColor:'success',
      percentageIcon:'zmdi zmdi-long-arrow-up',
      chartBorderColor: '#43a047',
     
   },
   {
      icon : "cc GDC error--text",
      name : "Total Employee",
      color : "warn",
      duration : "last 4 days",
      market_cap : "50",
      chartLabel : ["A", "B", "C", "D", "E"],
      data:[1, 26, 8, 22, 1],
      percentage:'-2.3%',
      percentageColor:'success',
      percentageIcon:'zmdi zmdi-long-arrow-down',
      chartBorderColor: '#e53935',
      
   },
   {
      icon : "cc GDC-alt info--text",
      name : "Total Stranger",
      color : "accent",
      duration : "last 4 days",
      market_cap : "45",
      chartLabel : ["A", "B", "C", "D", "E"],
      data:[29, 5, 26, 10, 21],
      percentage:'-3.2%',
      percentageColor:'error',
      percentageIcon:'zmdi zmdi-long-arrow-down',
      chartBorderColor: '#0097a7',
     
   }
]
