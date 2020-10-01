<template>
  <div>
    <!-- <div class="mb-5">
      <v-btn class="error mr-3" @click="showDay()">Day</v-btn>
      <v-btn class="success mr-3" @click="showMonth()">Month</v-btn>
      <v-btn class="primary" @click="showYear()">Year</v-btn>
    </div> -->    
    <div>
      <section v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>
      <section v-else>
        <div v-if="loading">Loading...</div>
        <div v-else>
          <visitors-monthly
            :xLabel="this.xLabel[0]"
            :yLabel="this.yLabel"
            :dataSets="sortingListLogsByMonth1()"
            style="width: 100%; height: 330px;"
            v-show="selectedBtn == 'day'"
          />
          <v-row class="cart-wrap hidden-only pl-6" v-show="selectedBtn == 'day'">
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-account primary--text"></i>
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">{{ this.sumRU }}</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.employee')}}</span>
              </p>
            </v-col>
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-account-o success--text"></i>
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">{{ this.sumGuest }}</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.stranger')}}</span>
              </p>
            </v-col>
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-accounts-add error--text"></i>
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">{{ this.sumRU + sumGuest }}</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.totalVisitors')}}</span>
              </p>
            </v-col>
          </v-row>
        </div>
      </section>
      <!-- <visitors-monthly
        style="width: 100%; height: 330px;"
        :xLabel="this.xLabel[1]"
        :yLabel="this.yLabel"
        :dataSets="sortingListLogsByMonth()"
        v-show="selectedBtn == 'month'"
      />
      <v-row class="cart-wrap hidden-only pl-6" v-show="selectedBtn == 'month'">
        <v-col cols="4" class="d-custom-flex">
          <span class="mr-2">
            <i class="zmdi zmdi-account primary--text"></i>
          </span>
          <p class="mb-0">
            <span class="d-block fs-14 fw-bold">{{ this.monthSumRUs }}</span>
            <span class="d-block fs-12 grey--text fw-normal">{{$t('message.employee')}}</span>
          </p>
        </v-col>
        <v-col cols="4" class="d-custom-flex">
          <span class="mr-2">
            <i class="zmdi zmdi-account-o success--text"></i>
          </span>
          <p class="mb-0">
            <span class="d-block fs-14 fw-bold">{{ this.monthSumGuests }}</span>
            <span class="d-block fs-12 grey--text fw-normal">{{$t('message.stranger')}}</span>
          </p>
        </v-col>
        <v-col cols="4" class="d-custom-flex">
          <span class="mr-2">
            <i class="zmdi zmdi-accounts-add error--text"></i>
          </span>
          <p class="mb-0">
            <span class="d-block fs-14 fw-bold">{{ this.monthTotalVisitors }}</span>
            <span class="d-block fs-12 grey--text fw-normal">{{$t('message.totalVisitors')}}</span>
          </p>
        </v-col>
      </v-row>
      <visitors-monthly
        style="width: 100%; height: 330px;"
        :xLabel="this.xLabel[2]"
        :yLabel="this.yLabel"
        :dataSets="this.sortingListLogsByYear()"
        v-show="selectedBtn == 'year'"
      />
    <v-row class="cart-wrap hidden-only pl-6" v-show="selectedBtn == 'year'">
      <v-col cols="4" class="d-custom-flex">
        <span class="mr-2">
          <i class="zmdi zmdi-account primary--text"></i>
        </span>
        <p class="mb-0">
          <span class="d-block fs-14 fw-bold">{{ this.yearSumRUs }}</span>
          <span class="d-block fs-12 grey--text fw-normal">{{$t('message.employee')}}</span>
        </p>
      </v-col>
      <v-col cols="4" class="d-custom-flex">
        <span class="mr-2">
          <i class="zmdi zmdi-account-o success--text"></i>
        </span>
        <p class="mb-0">
          <span class="d-block fs-14 fw-bold">{{ this.yearSumGuests }}</span>
          <span class="d-block fs-12 grey--text fw-normal">{{$t('message.stranger')}}</span>
        </p>
      </v-col>
      <v-col cols="4" class="d-custom-flex">
        <span class="mr-2">
          <i class="zmdi zmdi-accounts-add error--text"></i>
        </span>
        <p class="mb-0">
          <span class="d-block fs-14 fw-bold">{{ this.yearTotalVisitors }}</span>
          <span class="d-block fs-12 grey--text fw-normal">{{$t('message.totalVisitors')}}</span>
        </p>
      </v-col>
    </v-row> -->
    </div>
  </div>
</template>
<script>
// import Vue from "vue";
import { mapGetters } from "vuex";
import VisitorsMonthly from "./VisitorsCollectionMonthly";

import {
  getCurrentAppLayout,
  groupByTime,
  groupByKey,
  reStructuredObject,
  sortDateASC,
  sortMonthASC,
  groupByYears,
  sortYearASC,
  // sortHourASC,
  reStructuredObj,
} from "Helpers/helpers";

export default {
  props: {
    xLabel: {
      type: Array,
      default: () => ["x-Axes"],
    },
    yLabel: {
      type: String,
      default: () => "y-Axes",
    },
  },
  components: {
    VisitorsMonthly,
  },
  data() {
    return {
      loading: true,
      errored: false,
      logs: null,
      panel: 0,
      selectedBtn: "day",
      disabled: false,
      readonly: false,
      day: [10, 65, 40, 150, 40, 85, 30],
      month: [0, 65, 40, 0, 40, 85, 0],
      year: [60, 25, 150, 60, 100, 5, 60],
      dayTotalVisitors: 0,
      daySumRUs: 0,
      daySumGuests: 0,
      monthTotalVisitors: 0,
      monthSumRUs: 0,
      monthSumGuests: 0,
      yearTotalVisitors: 0,
      yearSumRUs: 0,
      yearSumGuests: 0,
      hourTotalVisitors: 0,
      hourSumRUs: 0,
      hourSumGuests: 0,
      dataByMonth:[],
      sumRU: 0,
      sumGuest:0,      

    };
  },
  methods: {
    async getLogs() {
        await this.$axios.get(`/logs?pageIndex=0&pageSize=1000000`).then((response) => {
          this.logs = response.data.rows;
        })
        .catch((error) => {
          this.errored = true;
          console.log(error);
        })
        .finally(() => this.loading = false);
    },
    getCurrentAppLayoutHandler() {
      return getCurrentAppLayout(this.$router);
    },
    showDay() {
      this.selectedBtn = "day";
    },
    showMonth() {
      this.selectedBtn = "month";
    },
    showYear() {
      this.selectedBtn = "year";
    },
    groupByType() {
      return groupByKey(
        JSON.parse(JSON.stringify([this.objDLO.rows, this.objDLORT.rows])),
        "type"
      );
    },
    groupedByDays() {
      return groupByTime(
        reStructuredObject(
          JSON.parse(
            JSON.stringify([
              this.objDLOYTD.rows,
              this.objDLO.rows,
              this.objDLORT.rows,
            ])
          )
        ),
        (day) =>
          day.date.getDate() +
          "-" +
          day.date.toLocaleString("en-us", { month: "short" }) +
          "-" +
          day.date.getFullYear().toString().substring(2)
      );
    },
    groupedByDays1() {
      return groupByTime(
        reStructuredObject(
          JSON.parse(
            JSON.stringify([
              this.objDLOYTD.rows,
              this.objDLO.rows,
              this.objDLORT.rows,
            ])
          )
        ),
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
      let sumEmp = 0;
      let sumGuest = 0;

      for (let [key, item] of Object.entries(this.groupedByDays1())) {
        listLogs.push({
          date: String(key),
          data: item,
        });
        Object.keys(groupByKey(item, "type")).forEach((key1) => {
          if (key1.toLowerCase() === "employee")
            sumEmp += Object.values(groupByKey(item, "type")[key1]).length;
          else sumGuest += Object.values(groupByKey(item, "type")[key1]).length;
        });
      }
      this.daySumRUs = sumEmp;
      this.daySumGuests = sumGuest;
      this.dayTotalVisitors = sumEmp + sumGuest;
      // console.log("Emp: " + sumEmp + " - Guest: " + sumGuest);
      return sortDateASC(listLogs);
    },
    sumVisitorsPerDay() {
      Object.values(this.sortingListLogs()).forEach((elm) => {
        Object.keys(groupByKey(elm.data, "type")).forEach((key) => {
          if (String(key).toLowerCase() === "employee")
            this.sumRUs += Object.values(
              groupByKey(elm.data, "type")[key]
            ).length;
          else
            this.sumGuests += Object.values(
              groupByKey(elm.data, "type")[key]
            ).length;
        });
      });
      // this.totalVisitors = this.sumRUs + this.sumGuests;
      // console.log('Total: ' + this.totalVisitors + ' - RUs: ' + this.sumRUs + ' - Guest: ' + this.sumGuests);
    },
    groupedByMonth() {
      return groupByTime(
        reStructuredObject(
          JSON.parse(
            JSON.stringify([
              this.objDLOYTD.rows,
              this.objDLO.rows,
              this.objDLORT.rows,
              this.objDLOJan.rows,
              this.objDLOFM.rows,
              this.objDLOMAM.rows,
            ])
          )
        ),
        (day) =>
          day.date.toLocaleString("en-us", { month: "long" }) +
          "-" +
          day.date.getFullYear().toString()
      );
    },
    sortingListLogsByMonth() {
      let listLogs = [];
      let tEmp = 0;
      let tG = 0;
      for (let [key, item] of Object.entries(this.groupedByMonth())) {
        listLogs.push({
          month: String(key),
          data: item,
        });
        Object.keys(groupByKey(item, "type")).forEach((key1) => {
          if (key1.toLowerCase() === "employee")
            tEmp += Object.values(groupByKey(item, "type")[key1]).length;
          else tG += Object.values(groupByKey(item, "type")[key1]).length;
        });
      }
      this.monthSumRUs = tEmp;
      this.monthSumGuests = tG;
      this.monthTotalVisitors = tEmp + tG;
      // console.log("Emp: " + tEmp + " - Guest: " + tG);
      return sortMonthASC(listLogs);
    },
    groupedByYear() {
      return groupByYears(
        reStructuredObject(
          JSON.parse(
            JSON.stringify([
              this.objDLORT.rows,
              this.objDLOYTD.rows,
              this.objDLO.rows,
              this.objDLOJan.rows,
              this.objDLOFM.rows,
              this.objDLOMAM.rows,
              this.objDLOJan2018.rows,
              this.objDLOFM2019.rows,
              this.objDLOMAM2016.rows,
            ])
          )
        ),
        (day) => day.date.getFullYear().toString()
      );
    },
    sortingListLogsByYear() {
      let listLogs = [];
      let tEmp = 0;
      let tG = 0;
      for (let [key, item] of Object.entries(this.groupedByYear())) {
        listLogs.push({
          y: String(key),
          data: item,
        });
        Object.keys(groupByKey(item, "type")).forEach((key1) => {
          if (key1.toLowerCase() === "employee")
            tEmp += Object.values(groupByKey(item, "type")[key1]).length;
          else tG += Object.values(groupByKey(item, "type")[key1]).length;
        });
      }
      this.yearSumRUs = tEmp;
      this.yearSumGuests = tG;
      this.yearTotalVisitors = tEmp + tG;
      return sortYearASC(listLogs);
    },
    groupedByMonth1() {
      return groupByTime(
        reStructuredObj(this.logs),
        (day) =>
          day.date.toLocaleString("en-us", { month: "long" }) +
          "-" +
          new Date().getFullYear().toString()
      );
    },
    sortingListLogsByMonth1() {
      let listLogs = [];
      for (let [key, item] of Object.entries(this.groupedByMonth1(this.logs))) {
        listLogs.push({
          month: String(key),
          data: item,
        });
      }
      return sortMonthASC(listLogs);
    },
    
  },
  async mounted() {
    this.getLogs();
    // let types = []; let totalRU = 0; let totalGuest = 0;
    // const dlResponse = await this.$axios
    // .get(`/logs?pageIndex=0&pageSize=1000000`)
    // .catch(error => {
    //   console.log(error)
    //   this.errored = true
    // })
    // .finally(() => this.loading = false);
    // if (dlResponse.status === 200) {
    //   this.logs = dlResponse.data.rows;
    //   this.dataByMonth = this.sortingListLogsByMonth1(this.groupedByMonth1(this.logs));
    //   Object.values(this.dataByMonth).forEach((elm) => {
    //      Object.keys(groupByKey(elm.data, "type")).forEach((key) => {
    //         if (types.indexOf(key) === -1) types.push(key);
    //         if (String(key).toLowerCase() === "registered_user") totalRU += Object.values(groupByKey(elm.data, "type")[key]).length;
    //         else totalGuest += Object.values(groupByKey(elm.data, "type")[key]).length;
    //      });
    //   });
    //   this.sumRU = totalRU;
    //   this.sumGuest = totalGuest;
    //   Object.values(this.dataByMonth).forEach(elm=>{
    //     console.log('mounted -> month: ' + elm.month);
    //   });
    // } else {
    //   Vue.notify({
    //     group: "loggedIn",
    //     type: "error",
    //     text: "Can not get Dectection logs. Please try again later!",
    //   });
    // }
  },
  computed: {
    ...mapGetters([
      "fDLOMAM",
      "fDLOMAM2016",
      "fDLOFM",
      "fDLOFM2019",
      "fDLOJan",
      "fDLOJan2018",
      "fDLOYTD",
      "fDLORT",
      "fDLO",
      "fDetectionLogsOnline1",
      "fDetectionLogsOffline",
    ]),
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
    objDLOJan2018: {
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
};
</script>
<style scoped>
</style>