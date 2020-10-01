<template>
  <div v-if="errored">
    <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
  </div>
  <div v-else>
    <div v-if="loading">Loading...</div>
    <div  v-else>
      <v-container fluid class="pt-0 grid-list-xl">
        <section-tooltip
          :title="$t('message.generalDashboard')"
          :tooltip="$t('message.dashboardOverview')"
        ></section-tooltip>
        <indexes-block :visitors="this.groupedByDays()" />
        <v-row>
          <app-card
            :heading="$t('message.visitorCollection')"
            colClasses="col-xl-8 col-lg-7 col-md-7 col-sm-6 col-12"
            customClasses="mb-0 sales-widget"
            :fullBlock="false"
          >
          </app-card>
          <app-card
            colClasses="col-xl-4 col-lg-5 col-md-5 col-sm-6 col-12"
            :heading="$t('message.visitorsummaries')"
            customClasses="general-dashboard-doughnut-chart"
          >
            <div> {{ new Date(today).getDate() }} / {{ new Date(month).toLocaleString("en-us", { month: "long" }) }} / {{ year }}</div>
            <!-- <div v-for="(items, id) in this.sortingListLogs()" :key="id" class="day">
              <h4>{{ items.date == today ? 'Today' : items.date }}: total: {{ items.data.length }}</h4>
              <div style="nowrap" v-for="(v, k) in items.data" :key="k">
                <b style="color:red;">{{ k + 1 }}.</b> Type: {{ v.type }} - Time: {{ v.date.toLocaleTimeString() }} - Body Temp: {{ v.bodyTemp }}
              </div>
            </div> -->
            <!-- <div v-for="(days, day) in this.groupedByDays()" :key="day" class="day">
              <h4>{{ day == today ? 'Today' : day }}</h4>
              <div
                v-for="(day, time) in days"
                :key="time"
              >{{ day.type }} - {{ day.date.toLocaleTimeString() }} - {{ day.bodyTemp }} - {{ day.roomTemp }}</div>
            </div> -->
            <!-- Filter by Month -->
            <div v-for="(items, id) in this.sortingListLogsByMonth()" :key="id" class="month">
              <h4>{{ items.month == month ? 'This month' : items.month }}: total: {{ items.data.length }}</h4>
              <div v-for="(v, k) in items.data" :key="k">
                <b style="color:red;">{{ k + 1 }}.</b> Visitor: {{ v.type }} - Date: {{ v.date.toLocaleDateString() }} - Total Body Temp: {{ v.bodyTemp }}
              </div>
            </div>
            <!-- <div v-for="(days, day) in this.groupedByMonth()" :key="day" class="day">
              <h4>{{ day == today ? 'Today' : day }}</h4>
              <div
                v-for="(day, time) in days"
                :key="time"
              >{{ day.type }} - {{ day.date.toLocaleDateString() }} - {{ day.bodyTemp }} - {{ day.roomTemp }}</div>
            </div> -->
            <!-- Filter by Year -->
            <!-- <div v-for="(items, id) in this.sortingListLogsByYear()" :key="id" class="year">
              <h4>{{ items.y == year ? 'This year' : items.y }}: total: {{ items.data.length }}</h4>
              <div v-for="(v, k) in items.data" :key="k">
                <b style="color:red;">{{ k + 1 }}.</b> {{ v.type }} - {{ v.date.toLocaleDateString() }} - {{ v.bodyTemp }} - {{ v.roomTemp }}
              </div>
            </div> -->
            <!-- <div v-for="(items, y) in this.groupedByYear()" :key="y" class="year">
              <h4>{{ y == year ? 'This year' : y }}</h4>
              <div
                v-for="(data, date) in items"
                :key="date"
              >{{ data.type }} - {{ data.date.toLocaleDateString() }} - {{ data.bodyTemp }} - {{ data.roomTemp }}</div>
            </div> -->
          </app-card>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// , reStructuredObject
import { groupByYears, groupByTime, groupByKey, reStructuredObj, sortDateASC, sortMonthASC, sortYearASC } from "Helpers/helpers"; //

import IndexesBlock from "../commons/fr-indexes-block-v01";

export default {
  data() {
    return {
      loading: true,
      errored: false,
      logs: [],
      today:
        new Date().getDate() +
        "-" +
        new Date().toLocaleString("en-us", { month: "short" }) +
        "-" +
        new Date().getFullYear().toString().substring(2),
      month:
        new Date().toLocaleString("en-us", { month: "long" }) +
        "-" +
        new Date().getFullYear().toString(),
      year:
        new Date().getFullYear().toString(),
    };
  },
  components: {
    IndexesBlock,
  },
  mounted() {
    this.getLogs();
    // Object.entries(this.groupedByDays()).forEach((key) => {
    //   console.log('Group by Date: ' + key[0]);    
    // })    
    // console.log('Sort list Logs by month: ' + this.sortingListLogsByMonth().length);
    // for (let index = 0; index < this.sortingListLogs().length; index++) {
      // const element = this.sortingListLogs()[index];
      // console.log('Date: ' + element.date + ' - Data: ' + element.data.length);
      // Object.values(element.data).forEach((v) => {
      //   console.log('detection log: ' + v.date );
      // });
    // }
    // this.groupedByMonth();
    // console.log('Group by month: ' + this.groupedByMonth());
    
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
    async getLogs() {
      await this.$axios
        .get(`/logs?pageIndex=0&pageSize=1000000`)
        .then((response) => {
          return this.logs = response.data.rows;
        })
        .catch((error) => {
          this.errored = true;
          console.log(error);
        })
        .finally(() => this.loading = false);
    },
    groupByType() {
      return groupByKey(JSON.parse(JSON.stringify([this.objDLO.rows, this.objDLORT.rows])), "type");
    },
    groupedByDays() {
      return groupByTime(
        // reStructuredObject(JSON.parse(JSON.stringify([this.objDLOYTD.rows, this.objDLO.rows, this.objDLORT.rows]))),
        reStructuredObj(this.logs),
        (day) =>
          day.date.getDate() +
          "-" +
          day.date.toLocaleString("en-us", { month: "short" }) +
          "-" +
          day.date.getFullYear().toString().substring(2)
      );      
    },
    groupedByMonth() {
      // console.log(this.fDLOYTD.rows);
      return groupByTime(
        // reStructuredObject(JSON.parse(JSON.stringify([ this.objDLOYTD.rows, this.objDLO.rows, this.objDLORT.rows, this.objDLOJan.rows, this.objDLOFM.rows, this.objDLOMAM.rows]))),
        // reStructuredObject(JSON.parse(JSON.stringify([ this.objDLOMAM2016.rows ]))),
        reStructuredObj(this.logs),
        (day) => day.date.toLocaleString("en-us", { month: "long" }) + "-" +
          day.date.getFullYear().toString()
      );
    },
    groupedByYear() {
      return groupByYears(
        // reStructuredObject(JSON.parse(JSON.stringify([ this.objDLORT.rows, this.objDLOYTD.rows, this.objDLO.rows, this.objDLOJan.rows, this.objDLOFM.rows, this.objDLOMAM.rows, this.objDLOJan2018.rows, this.objDLOFM2019.rows, this.objDLOMAM2016.rows ]))),
        reStructuredObj(this.logs),
        (day) => day.date.getFullYear().toString()
      );
    },
    sortingListLogs() {
      let listLogs = [];
      // console.log('sortingListLogs -> groupedByDays: ' + Object.entries(this.groupedByDays()).length);
      for (let [key, item] of Object.entries(this.groupedByDays())) {
        // console.log('sortingListLogs -> key: ' + key + ' - sortingListLogs -> Item: ' + item);
        listLogs.push({
          date: String(key),
          data: item,
        });
      }
      return sortDateASC(listLogs);
    },
    sortingListLogsByMonth() {
      let listLogs = [];
      // console.log('sortingListLogsByMonth -> groupedByMonth: ' + Object.entries(this.groupedByMonth()).length);
      for (let [key, item] of Object.entries(this.groupedByMonth())) {
        // console.log('sortingListLogsByMonth -> key: ' + key + ' - sortingListLogsByMonth -> Item: ' + item);
        listLogs.push({
          month: String(key),
          data: item,
        });
      }
      return sortMonthASC(listLogs);
    },
    sortingListLogsByYear() {
      let listLogs = [];
      for (let [key, item] of Object.entries(this.groupedByYear())) {
        // console.log('sortingListLogsByYear -> key: ' + key + ' - Item: ' + item);
        listLogs.push({
          y: String(key),
          data: item,
        });
      }
      return sortYearASC(listLogs);
    },
  },
};
</script>