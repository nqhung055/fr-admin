import Vue from 'vue'
import moment from 'moment'
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data() {
    return {
      arrBodyData: [],
      arrRoomData: [],
      arrTimeData: [],
      gradient1: null,
      gradient2: null,
      options: {
        scales: {
          yAxes: [{
            gridLines: {
              display: true,
              drawBorder: false
            },
            ticks: {
              stepSize: 0.5
            }
          }],
          xAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  async mounted() {
    let ctx = this.$refs.canvas.getContext('2d')
    let _stroke = ctx.stroke
    ctx.stroke = function () {
      ctx.save()
      ctx.shadowColor = 'rgba(0,0,0,0.6)'
      ctx.shadowBlur = 22
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 15
      _stroke.apply(this, arguments)
      ctx.restore()
    }

    this.gradient1 = this.$refs.canvas.getContext('2d').createLinearGradient(1000, 0, 100, 0)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(1000, 0, 100, 0)

    this.gradient1.addColorStop(0, '#1E3C72')
    this.gradient1.addColorStop(1, '#3B7CFF')

    this.gradient2.addColorStop(0, '#F7981C')
    this.gradient2.addColorStop(1, '#F56074')
    
    const dlResponse = await this.$axios.get(`/logs?pageIndex=0&pageSize=1000000`);

    if (dlResponse.status === 200) {
      // console.log('Status: ' + dlResponse.status);
      const detectionlogs = dlResponse.data.rows;
      for (var i = 0; i < detectionlogs.length; i++) {
        if(i === 10) break;
        //detectionTime
        this.arrBodyData.push(detectionlogs[i] ? detectionlogs[i].bodyTemperature : '');
        this.arrRoomData.push(detectionlogs[i] ? detectionlogs[i].roomTemperature : '');
        this.arrTimeData.push(detectionlogs[i] ? moment(String(detectionlogs[i].detectionTime)).format('DD-MM-YYYY') : '');
        // this.arrTimeData.push(detectionlogs[i] ? formatCompat(detectionlogs[i].detectionTime) : '');
        // console.log(i + '. Time: ' + detectionlogs[i].detectionTime);
      }
    } else {
      Vue.notify({
        group: "loggedIn",
        type: "error",
        text: "Can not get Dectection logs. Please try again later!",
      });
    }

    /* try {
      const logs = await this.$axios.get("/logs");
      if (logs.status === 200) {
        var bodyArray = [];
        var roomArray = [];
        var timeArray = [];
        for (var i = 0; i < this.logs.data.rows.length; i++) {
          if(i === 10) break;
          //detectionTime
          bodyArray.push(this.logs.data.rows[i] ? this.logs.data.rows[i].bodyTemperature : '');
          roomArray.push(this.logs.data.rows[i] ? this.logs.data.rows[i].roomTemperature : '');
          timeArray.push(this.logs.data.rows[i] ? this.logs.data.rows[i].detectionTime : '');
        }
      } else {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Can not get detection logs. Please reload page!",
        });
      }
    } catch (e) {
      console.error(e);
    } */

    this.renderChart({
      // labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      labels: this.arrTimeData,
      datasets: [
        {
          label: 'Room Temperature',
          lineTension: 0.4,
          borderColor: this.gradient2,
          pointBorderColor: this.gradient2,
          pointBorderWidth: 2,
          pointRadius: 7,
          fill: false,
          pointBackgroundColor: '#FFF',
          borderWidth: 3,
          data: this.arrRoomData
          // data: [2200, 2100, 1950, 1600, 800, 350, 250, 650, 1200, 1900, 2900, 3100]
        },
        {
          label: 'Body Temperature',
          lineTension: 0.4,
          borderColor: this.gradient1,
          pointBorderColor: this.gradient1,
          pointBorderWidth: 2,
          pointRadius: 7,
          fill: false,
          fillColor: 'Black',
          pointBackgroundColor: '#FFF',
          borderWidth: 3,
          data: this.arrBodyData
          // data: [500, 1100, 1600, 2000, 2500, 2600, 2300, 1900, 1500, 1100, 750, 850]
        }
      ]
    }, this.options)
  }
}
