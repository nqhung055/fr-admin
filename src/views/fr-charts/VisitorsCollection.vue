<template>
  <div>
    <div class="mb-5">
      <v-row>
        <v-col>
          <v-btn class="error mr-3" @click="showDay()">Day</v-btn>
          <v-btn class="success mr-3" @click="showWeek()">Week</v-btn>
          <v-btn class="primary" @click="showMonth()">Month</v-btn>
        </v-col>
        <!-- <v-row justify="center">
        <v-date-picker v-model="picker"></v-date-picker>
      </v-row> -->
        <v-col md="3">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Select Start Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
              @change="changeDate"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col md="3">
          <v-select
            v-model="numDataPoint"
            :items="dataPoint"
            label="Data Point"
            single-line
            @change="changeDate"
          >
          </v-select>
        </v-col>
        <!-- <v-spacer></v-spacer> -->
      </v-row>
    </div>
    <div v-if="errored">
        <p>{{ $t('message.getLogsError') }}</p>
      </div>
      <div v-else>
        <div v-if="loading" class="pr-4">
          {{ $t('message.loading') }}
        </div>
        <div v-else>
          <div>
            <visitors-line-chart
              :xLabel="this.xLabel[0]"
              :yLabel="this.yLabel"
              :dsLabels="this.arrLabels"
              :dsRUPoints="this.arrRUPoints"
              :dsGPoints="this.arrGPoints"
              style="width: 100%; height: 330px;"
              v-show="selectedBtn == 'daily'"
            />
            <v-row class="cart-wrap hidden-only pl-6" v-show="selectedBtn == 'daily'">
              <v-col cols="4" class="d-custom-flex">
                <span class="mr-2">
                  <i class="zmdi zmdi-account primary--text"></i>
                </span>
                <p class="mb-0">
                  <span class="d-block fs-14 fw-bold">{{ this.sumRUPoints }}</span>
                  <span class="d-block fs-12 grey--text fw-normal">{{
                    $t("message.employee")
                  }}</span>
                </p>
              </v-col>
              <v-col cols="4" class="d-custom-flex">
                <span class="mr-2">
                  <i class="zmdi zmdi-account-o warning--text"></i>
                </span>
                <p class="mb-0">
                  <span class="d-block fs-14 fw-bold">{{ this.sumGPoints }}</span>
                  <span class="d-block fs-12 grey--text fw-normal">{{
                    $t("message.stranger")
                  }}</span>
                </p>
              </v-col>
              <v-col cols="4" class="d-custom-flex">
                <span class="mr-2">
                  <i class="zmdi zmdi-accounts-add error--text"></i>
                </span>
                <p class="mb-0">
                  <span class="d-block fs-14 fw-bold">{{ this.sumRUPoints + this.sumGPoints }}</span>
                  <span class="d-block fs-12 grey--text fw-normal">{{ $t("message.totalVisitors") }}</span>
                </p>
              </v-col>
            </v-row>
            <visitors-line-chart
              style="width: 100%; height: 330px;"
              :xLabel="this.xLabel[2]"
              :yLabel="this.yLabel"
              :dsLabels="this.arrLabels"
              :dsRUPoints="this.arrRUPoints"
              :dsGPoints="this.arrGPoints"
              v-show="selectedBtn == 'weekly'"
            />
            <v-row class="cart-wrap hidden-only pl-6" v-show="selectedBtn == 'weekly'">
              <v-col cols="4" class="d-custom-flex">
                <span class="mr-2">
                  <i class="zmdi zmdi-account primary--text"></i>
                </span>
                <p class="mb-0">
                  <span class="d-block fs-14 fw-bold">{{ this.sumRUPoints }}</span>
                  <span class="d-block fs-12 grey--text fw-normal">{{
                    $t("message.employee")
                  }}</span>
                </p>
              </v-col>
              <v-col cols="4" class="d-custom-flex">
                <span class="mr-2">
                  <i class="zmdi zmdi-account-o success--text"></i>
                </span>
                <p class="mb-0">
                  <span class="d-block fs-14 fw-bold">{{ this.sumGPoints }}</span>
                  <span class="d-block fs-12 grey--text fw-normal">{{
                    $t("message.stranger")
                  }}</span>
                </p>
              </v-col>
              <v-col cols="4" class="d-custom-flex">
                <span class="mr-2">
                  <i class="zmdi zmdi-accounts-add error--text"></i>
                </span>
                <p class="mb-0">
                  <span class="d-block fs-14 fw-bold">{{
                    this.sumRUPoints + this.sumGPoints
                  }}</span>
                  <span class="d-block fs-12 grey--text fw-normal">{{
                    $t("message.totalVisitors")
                  }}</span>
                </p>
              </v-col>
            </v-row>
            <visitors-line-chart
              style="width: 100%; height: 330px;"
              :xLabel="this.xLabel[1]"
              :yLabel="this.yLabel"
              :dsLabels="this.arrLabels"
              :dsRUPoints="this.arrRUPoints"
              :dsGPoints="this.arrGPoints"
              v-show="selectedBtn == 'monthly'"
            />
            <v-row class="cart-wrap hidden-only pl-6" v-show="selectedBtn == 'monthly'">
              <v-col cols="4" class="d-custom-flex">
                <span class="mr-2">
                  <i class="zmdi zmdi-account primary--text"></i>
                </span>
                <p class="mb-0">
                  <span class="d-block fs-14 fw-bold">{{ this.sumRUPoints }}</span>
                  <span class="d-block fs-12 grey--text fw-normal">{{
                    $t("message.employee")
                  }}</span>
                </p>
              </v-col>
              <v-col cols="4" class="d-custom-flex">
                <span class="mr-2">
                  <i class="zmdi zmdi-account-o success--text"></i>
                </span>
                <p class="mb-0">
                  <span class="d-block fs-14 fw-bold">{{ this.sumGPoints }}</span>
                  <span class="d-block fs-12 grey--text fw-normal">{{
                    $t("message.stranger")
                  }}</span>
                </p>
              </v-col>
              <v-col cols="4" class="d-custom-flex">
                <span class="mr-2">
                  <i class="zmdi zmdi-accounts-add error--text"></i>
                </span>
                <p class="mb-0">
                  <span class="d-block fs-14 fw-bold">{{
                    this.sumRUPoints + this.sumGPoints
                  }}</span>
                  <span class="d-block fs-12 grey--text fw-normal">{{
                    $t("message.totalVisitors")
                  }}</span>
                </p>
              </v-col>
            </v-row>      
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VisitorsLineChart from "./VisitorsLineChart";
import {
  getCurrentAppLayout,
  groupByTime,
  groupByKey,
  reStructuredObject,
  sortDateASC,
  sortMonthASC,
  groupByYears,
  sortYearASC,
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
    url: {
      type: String,
      default: () => "",
    },
  },
  components: {
    VisitorsLineChart,
  },
  data() {
    return {
      loading: true,
      errored: false,
      panel: 0,
      selectedBtn: "daily",
      disabled: false,
      readonly: false,
      day: [10, 65, 40, 150, 40, 85, 30],
      month: [0, 65, 40, 0, 40, 85, 0],
      year: [60, 25, 150, 60, 100, 5, 60],
      dayTotalVisitors: 0,
      daySumRUs: 0,
      daySumGuests: 0,
      lstVisitors: [],
      totalVisitors: 0,
      SumRUs: 0,
      SumGuests: 0,
      monthTotalVisitors: 0,
      monthSumRUs: 0,
      monthSumGuests: 0,
      yearTotalVisitors: 0,
      yearSumRUs: 0,
      yearSumGuests: 0,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      dataPoint: [5, 10, 15, 20, 25, 30],
      numDataPoint: "",
      strFullURL: "",
      arrLabels: [],
      arrRUPoints: [],
      arrGPoints: [],
      sumRUPoints: 0,
      sumGPoints: 0,
    };
  },
  methods: {
    getCurrentAppLayoutHandler() {
      return getCurrentAppLayout(this.$router);
    },
    showDay() {
      this.dataPoint = [5, 10, 15, 20, 25, 30];
      this.numDataPoint = 5;
      this.selectedBtn = "daily";
      this.strFullURL = this.url + "&endDate=" + this.date + "&dataPointType=" + this.selectedBtn + "&dataPointNumber=" + this.numDataPoint;
      this.getVisitorSummary(this.strFullURL);
    },
    showWeek() {
      this.dataPoint = [1, 2, 3, 4, 5, 6];
      this.numDataPoint = 1;
      this.selectedBtn = "weekly";
      this.strFullURL = this.url + "&endDate=" + this.date + "&dataPointType=" + this.selectedBtn + "&dataPointNumber=" + this.numDataPoint;
      this.getVisitorSummary(this.strFullURL);
    },
    showMonth() {
      this.dataPoint = [1, 2, 3, 4, 5, 6];
      this.numDataPoint = 6;
      this.selectedBtn = "monthly";
      this.strFullURL = this.url + "&endDate=" + this.date + "&dataPointType=" + this.selectedBtn + "&dataPointNumber=" + this.numDataPoint;
      this.getVisitorSummary(this.strFullURL);
    },
    changeDate() {
      this.strFullURL = this.url + "&endDate=" + this.date + "&dataPointType=" + this.selectedBtn + "&dataPointNumber=" + this.numDataPoint;
      this.getVisitorSummary(this.strFullURL);
    },
    getParams() {
      return "&endDate=" + this.date + "&dataPointType=" + this.selectedBtn + "&dataPointNumber=" + this.numDataPoint;
    },
    reloadWithDefaultUrl(url) {
      this.getVisitorSummary(url + this.getParams());
    },
    async getVisitorSummary(url) {
      // console.log('Visitor Collection > url: ' + url);
      await this.$axios
        .get(url)
        .then(response => {
          let listLabels = []; let listRUPoints = []; let listGPoints = []; let sumRU = 0; let sumG = 0;
          Object.entries(response.data).forEach((item) => {
            listLabels.push( item[1].label); listRUPoints.push( item[1].noUser); listGPoints.push( item[1].noStranger);
            sumRU += item[1].noUser; sumG += item[1].noStranger;
          });
          this.sumRUPoints = sumRU; this.sumGPoints = sumG; this.arrLabels = listLabels; this.arrRUPoints = listRUPoints; this.arrGPoints = listGPoints;
          this.$emit('changeParams', response.data);
        })
        .catch((error) => {
          this.errored = true;
          console.log(error);
        })
        .finally(() => this.loading = false);
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
          day.date
            .getFullYear()
            .toString()
            .substring(2)
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
          day.date
            .getFullYear()
            .toString()
            .substring(2)
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
  },
  mounted() {
    // this.sumVisitorsPerDay();
    // console.log(Object.keys(this.yearData).length);
    this.numDataPoint = 5;
    this.strFullURL = this.url + "&endDate=" + this.date + "&dataPointType=" + this.selectedBtn + "&dataPointNumber=" + this.numDataPoint;
    this.getVisitorSummary(this.strFullURL);
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
      get: function() {
        return this.fDLOMAM;
      },
      set: function() {
        return this.fDLOMAM;
      },
    },
    objDLOMAM2016: {
      get: function() {
        return this.fDLOMAM2016;
      },
      set: function() {
        return this.fDLOMAM2016;
      },
    },
    objDLOFM: {
      get: function() {
        return this.fDLOFM;
      },
      set: function() {
        return this.fDLOFM;
      },
    },
    objDLOFM2019: {
      get: function() {
        return this.fDLOFM2019;
      },
      set: function() {
        return this.fDLOFM2019;
      },
    },
    objDLOJan: {
      get: function() {
        return this.fDLOJan;
      },
      set: function() {
        return this.fDLOJan;
      },
    },
    objDLOJan2018: {
      get: function() {
        return this.fDLOJan2018;
      },
      set: function() {
        return this.fDLOJan2018;
      },
    },
    objDLOYTD: {
      get: function() {
        return this.fDLOYTD;
      },
      set: function() {
        return this.fDLOYTD;
      },
    },
    objDLORT: {
      get: function() {
        return this.fDLORT;
      },
      set: function() {
        return this.fDLORT;
      },
    },
    objDLO: {
      get: function() {
        return this.fDLO;
      },
      set: function() {
        return this.fDLO;
      },
    },
    objDLOffline: {
      get: function() {
        return this.fDetectionLogsOffline;
      },
      set: function() {
        return this.fDetectionLogsOffline;
      },
    },
  },
};
</script>
<style scoped></style>
