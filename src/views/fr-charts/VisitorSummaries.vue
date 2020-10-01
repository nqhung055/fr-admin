<template>
  <div>
    <!-- <ul class="list-unstyled pl-0 server-status-widget referral-widget">
      <li v-for="referral in referrals" :key="referral.id">
        <div class="d-custom-flex justify-space-between">
          <h5 class="mb-0 grey--text">{{referral.count}}</h5>
          <span class="fs-12 grey--text fw-normal">{{referral.from}}</span>
        </div>
        <v-progress-linear :value="referral.value" height="5" color="primary"></v-progress-linear>
      </li>
    </ul>-->
    <ul class="list-unstyled pl-0 server-status-widget referral-widget">
      <!-- <li v-for="log in this.logs" :key="log.id">
        <div class="d-custom-flex justify-space-between">
          <h5 class="mb-0 grey--text">{{log.userId}}</h5>
          <span class="fs-12 grey--text fw-normal">{{log.fromDevice}}</span>
        </div>
        <v-progress-linear :value="log.value" height="5" color="primary"></v-progress-linear>
      </li>-->
      <li>
        <div class="d-custom-flex justify-space-between">
          <h5 class="mb-0 grey--text">{{this.totalRegisters}}</h5>
          <span class="fs-12 grey--text fw-normal">Employee</span>
        </div>
        <v-progress-linear :value="this.totalRegisters" height="5" color="primary"></v-progress-linear>
      </li>
      <li>
        <div class="d-custom-flex justify-space-between">
          <h5 class="mb-0 grey--text">{{this.totalUnregistereds}}</h5>
          <span class="fs-12 grey--text fw-normal">Stranger</span>
        </div>
        <v-progress-linear :value="this.totalUnregistereds" height="5" color="primary"></v-progress-linear>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { temperatureData, detectionLogsFromAPI } from "./data";

export default {
  data() {
    return {
      referrals: [
        {
          id: 1,
          from: "Visits From Facebook",
          value: 70,
          count: 23488,
        },
        {
          id: 2,
          from: "Visits From Twitter",
          value: 65,
          count: 11000,
        },
        {
          id: 3,
          from: "Visits From Search",
          value: 65,
          count: 11000,
        },
        {
          id: 4,
          from: "Direct Visits",
          value: 45,
          count: 32000,
        },
        {
          id: 5,
          from: "From Google Search",
          value: 85,
          count: 65000,
        },
      ],
      registeredLogs: [],
      unregisteredLogs: [],
      detectionLogsFromAPI,
      temperatureData,
      totalVisitors: 0,
      totalRegisters: 0,
      totalUnregistereds: 0,
    };
  },
  computed: {},
  mounted() {
    for (var i = 0; i < detectionLogsFromAPI.length; i++) {
        if(detectionLogsFromAPI[i].type === "STRANGER")
          this.totalRegisters ++;
        else this.totalUnregistereds ++;
      }
    // this.dlFromAPI();
    // this.getLogs();
    // this.logs = this.detectionLogsFromAPI;

    // console.log('Logs length: ' + this.temperatureData.timelines);
    // console.log("Logs length: " + this.logs.length);
    /* for (var i = 0; i < this.detectionLogsFromAPI.length; i++) {
      if (this.logs[i].type === "STRANGER"){
        this.registeredLogs.push(this.logs[i])
        this.totalRegisters++;
      }
      else
      {
        this.unregisteredLogs.push(this.logs[i])
        this.totalUnregistereds++;
      }
    } */
    // console.log("registeredLogs length: " + this.registeredLogs.length);

    // console.log("unregisteredLogs length: " + this.unregisteredLogs.length);

    // this.data = VisitorSummaries.rows;
  },
  components: {
    // VisitorSummaries,
  },
  methods: {
    /* async getLogs() {
      let totalLogs = 0;
       await this.$axios
         .get(`/logs?pageIndex=0&pageSize=1000000`)
         .then((response) => {
            this.results = response.data;
            console.log('Visitor Summaries -> results: ' + this.results.rows.length);
         })
         .catch(error => console.log(error));
      return totalLogs;
    }, */
    async dlFromAPI() {
      const dlResponse = await this.$axios.get(`/logs?pageIndex=0&pageSize=1000000`);
      if (dlResponse.status === 200) {
        this.logs = dlResponse.data.rows;
        console.log('Visitor Summaries -> logs: ' + this.logs.length);
      } else {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Can not get data list. Please try again later!",
        });
      }
    },
  },
};
</script>
