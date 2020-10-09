<template>
  <v-row>
    <v-col xl="3" lg="3" md="6" sm="12" cols="6" class="stats-widget-v3">
      <!--  +5% from yesterday -->
      <dashboard-index-stats :title="$t('message.totalResident')" :value="this.usersPerDay" :body="this.usersYtd" :status="this.usersPerDay >= this.usersYtd ? 1 : 0"></dashboard-index-stats>
    </v-col>
    <v-col xl="3" lg="3" md="6" sm="12" cols="6" class="stats-widget-v3">
      <dashboard-index-stats :title="$t('message.currentTotalPeople')" :value="this.guestsPerDay" :body="this.guestsYtd" :status="this.guestsPerDay >= this.guestsYtd ? 1 : 0"></dashboard-index-stats>
    </v-col>
    <v-col xl="3" lg="3" md="6" sm="12" cols="6" class="stats-widget-v3">
      <!-- -2% from yesterday -->
      <dashboard-index-stats
        :title="$t('message.currentTotalResidents')"
        :value="this.totalEmp"
        :body="String(this.totalEmpYtd)"
        :status="this.totalEmp >= this.totalEmpYtd ? 1 : 0"
      ></dashboard-index-stats>
    </v-col>
    <v-col xl="3" lg="3" md="6" sm="12" cols="6" class="stats-widget-v3">
      <dashboard-index-stats
        :title="$t('message.currentTotalGuests')"
        :value="this.totalGuest"
        :body="this.totalGuestYtd"
        :status="this.totalGuest >= this.totalGuestYtd ? 1 : 0"
      ></dashboard-index-stats>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import DashboardIndexStats from "./DashboardIndexStats";
import {groupByTime, reStructuredObject, groupByKey, sortDateASC } from "Helpers/helpers"
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
  },
  components: {
    DashboardIndexStats,
  },
  mounted() {
    this.sortingListLogs();
    this.ytd.setDate(this.ytd.getDate() -1);
    this.getTotalByKey();
    this.getSumByToday();
    this.totalEmpYtd = this.totalEmp - this.usersPerDay;
    this.totalGuestYtd = this.totalGuest - this.guestsPerDay;
    console.log("data: " + this.data);
  },
  data() {
    return {
      visitors: {
        type: Array,
        default: () => []
      },
      totalEmpYtd: 0, totalGuestYtd: 0, totalEmp: 0, totalGuest: 0, usersYtd: 0, guestsYtd: 0, usersPerDay: 0, guestsPerDay: 0, ytd: new Date(),
    };
  },
  computed: {
    ...mapGetters(["fDLOMAM", "fDLOMAM2016", "fDLOFM", "fDLOFM2019", "fDLOJan", "fDLOJan2018", "fDLOYTD", "fDLORT", "fDLO", "fDetectionLogsOnline1", "fDetectionLogsOffline" ]),
    objDLOMAM: {
      get: function () {
        return this.fDLOMAM;
      },
      set: function () {
        return this.fDLOMAM;
      },
    },
    objDLOMAM2016: {
      get: function () {
        return this.fDLOMAM2016;
      },
      set: function () {
        return this.fDLOMAM2016;
      },
    },
    objDLOFM: {
      get: function () {
        return this.fDLOFM;
      },
      set: function () {
        return this.fDLOFM;
      },
    },
    objDLOFM2019: {
      get: function () {
        return this.fDLOFM2019;
      },
      set: function () {
        return this.fDLOFM2019;
      },
    },
    objDLOJan: {
      get: function () {
        return this.fDLOJan;
      },
      set: function () {
        return this.fDLOJan;
      },
    },
    objDLOJan2018 : {
      get: function () {
        return this.fDLOJan2018;
      },
      set: function () {
        return this.fDLOJan2018;
      },
    },
    objDLOYTD: {
      get: function () {
        return this.fDLOYTD;
      },
      set: function () {
        return this.fDLOYTD;
      },
    },
    objDLORT: {
      get: function () {
        return this.fDLORT;
      },
      set: function () {
        return this.fDLORT;
      },
    },
    objDLO: {
      get: function () {
        return this.fDLO;
      },
      set: function () {
        return this.fDLO;
      },
    },
    objDLOffline: {
      get: function () {
        return this.fDetectionLogsOffline;
      },
      set: function () {
        return this.fDetectionLogsOffline;
      },
    },
  },
  methods: {
    groupedByDays() {
      return groupByTime(
        reStructuredObject(JSON.parse(JSON.stringify([this.objDLOYTD.rows, this.objDLO.rows, this.objDLORT.rows]))),
        (day) =>
          day.date.getDate() +
          "-" +
          day.date.toLocaleString("en-us", { month: "short" }) +
          "-" +
          day.date.getFullYear().toString().substring(2)
      );      
    },
    sortingListLogs() {
      let listLogs = [];
      for (let [key, item] of Object.entries(this.groupedByDays())) {
        listLogs.push({
          date: String(key),
          data: item,
        });
      }
      this.visitors = sortDateASC(listLogs)
      // console.log('Visitors: ' + this.visitors);
      return this.visitors;
    },    
    getTotalByKey() {
      Object.values(this.visitors).forEach((visitor) => {
        Object.keys(groupByKey(visitor.data, "type")).forEach((key) => {
          if (String(key).toLowerCase() === "employee") {
            this.totalEmp += Object.values(groupByKey(visitor.data, "type")[key]).length;
          } else {
            this.totalGuest += Object.values(groupByKey(visitor.data, "type")[key]).length;
          }
        });
      });
    },
    getSumByToday() {
      Object.values(this.visitors).forEach((visitor) => {
        if (new Date(visitor.date).toLocaleDateString() === new Date().toLocaleDateString()) {
          Object.keys(groupByKey(visitor.data, "type")).forEach((key) => {
            if (String(key).toLowerCase() === "employee"){
              // console.log(Object.values(groupByKey(visitor.data, "type")[key]).length);
              this.usersPerDay = Object.values(groupByKey(visitor.data, "type")[key]).length;
            }
            else
              this.guestsPerDay = Object.values(groupByKey(visitor.data, "type")[key]).length;
          });
        } else if (new Date(visitor.date).toLocaleDateString() === new Date(this.ytd).toLocaleDateString()) {
          Object.keys(groupByKey(visitor.data, "type")).forEach((key) => {
            if (String(key).toLowerCase() === "employee")
              this.usersYtd = Object.values(groupByKey(visitor.data, "type")[key]).length;
            else
              this.guestsYtd = Object.values(groupByKey(visitor.data, "type")[key]).length;
          });
        }
      });
    },
  }
};
</script>
