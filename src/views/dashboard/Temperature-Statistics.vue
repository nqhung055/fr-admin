<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid class="pt-0 grid-list-xl">
      <div v-if="errored">
        <p>{{ $t('message.getLogsError') }}</p>
      </div>
      <div v-else>
        <div v-if="loading" class="pr-4">{{ $t('message.loading') }}</div>
        <div  v-else>
            <indexes-block :visitors="this.groupedByDays()" />
            <!-- Monthly -->
            <v-row>              
              <app-card
                :heading="$t('message.temperatureScreeningMonthly')"
                colClasses="col-xl-8 col-lg-7 col-md-7 col-sm-6 col-12"
                customClasses="mb-0 sales-widget"
                :fullBlock="false"
              >
                <temperature-monthly class="mb-5" :height="330" :dt="this.sumTemperaturesByMonth()" :e_label="$t('message.pass')" :s_label="$t('message.failed')"/>
                <v-row class="cart-wrap hidden-only pl-6">
                  <v-col cols="4" class="d-custom-flex">
                    <span class="mr-2">
                      <i class="zmdi zmdi-account success--text"></i>
                    </span>
                    <p class="mb-0">
                      <span class="d-block fs-14 fw-bold">{{ sumPass }}</span>
                      <span class="d-block fs-12 grey--text fw-normal">{{$t('message.pass')}}</span>
                    </p>
                  </v-col>
                  <v-col cols="4" class="d-custom-flex">
                    <span class="mr-2">
                      <i class="zmdi zmdi-account-o error--text"></i>
                    </span>
                    <p class="mb-0">
                      <span class="d-block fs-14 fw-bold">{{ sumFail }}</span>
                      <span class="d-block fs-12 grey--text fw-normal">{{$t('message.failed')}}</span>
                    </p>
                  </v-col>
                  <v-col cols="4" class="d-custom-flex">
                    <span class="mr-2">
                      <i class="zmdi zmdi-accounts-add primary--text"></i>
                    </span>
                    <p class="mb-0">
                      <span class="d-block fs-14 fw-bold">{{ sumPass + sumFail }}</span>
                      <span class="d-block fs-12 grey--text fw-normal">{{$t('message.totalPassVsFail')}}</span>
                    </p>
                  </v-col>
              </v-row>
              </app-card>
              <app-card
                colClasses="col-xl-4 col-lg-5 col-md-5 col-sm-6 col-12"
                :heading="$t('message.monthlyStatistics')"
                customClasses="app-card device-share-widget"
              >
                <screening-statistics-monthly :arrData="Values" :arrLabel="Labels" :backgroundColors="bgColors" />
              </app-card>
            </v-row>
            <!-- Daily -->
            <v-row>
              <app-card
                :heading="$t('message.temperatureScreeningDaily')"
                colClasses="col-xl-8 col-lg-7 col-md-7 col-sm-6 col-12"
                customClasses="mb-0 sales-widget"
                :fullBlock="false"
              >
                <temperature-daily class="mb-5" :height="330" :dt="this.sumTemperaturesByDay()" :e_label="$t('message.pass')" :s_label="$t('message.failed')"/>
                <v-row class="cart-wrap hidden-only pl-6">
                  <v-col cols="4" class="d-custom-flex">
                    <span class="mr-2">
                      <i class="zmdi zmdi-account success--text"></i>
                    </span>
                    <p class="mb-0">
                      <span class="d-block fs-14 fw-bold">{{ d_sumPass }}</span>
                      <span class="d-block fs-12 grey--text fw-normal">{{$t('message.pass')}}</span>
                    </p>
                  </v-col>
                  <v-col cols="4" class="d-custom-flex">
                    <span class="mr-2">
                      <i class="zmdi zmdi-account-o error--text"></i>
                    </span>
                    <p class="mb-0">
                      <span class="d-block fs-14 fw-bold">{{ d_sumFail }}</span>
                      <span class="d-block fs-12 grey--text fw-normal">{{$t('message.failed')}}</span>
                    </p>
                  </v-col>
                  <v-col cols="4" class="d-custom-flex">
                    <span class="mr-2">
                      <i class="zmdi zmdi-accounts-add primary--text"></i>
                    </span>
                    <p class="mb-0">
                      <span class="d-block fs-14 fw-bold">{{ d_sumPass + d_sumFail }}</span>
                      <span class="d-block fs-12 grey--text fw-normal">{{$t('message.totalPassVsFail')}}</span>
                    </p>
                  </v-col>
              </v-row>
              </app-card>
              <app-card
                colClasses="col-xl-4 col-lg-5 col-md-5 col-sm-6 col-12"
                :heading="$t('message.dailyStatistics')"
                customClasses="app-card device-share-widget"
              >
                <screening-statistics-daily :arrData="d_Values" :arrLabel="d_Labels" :backgroundColors="d_bgColors" />
              </app-card>
            </v-row>
            <!-- Hourly -->
            <v-row>
              <app-card
                :heading="$t('message.temperatureScreeningHourly')"
                colClasses="col-xl-8 col-lg-7 col-md-7 col-sm-6 col-12"
                customClasses="mb-0 sales-widget"
                :fullBlock="false"
              >
                <temperature-hourly class="mb-5" :height="330" :dt="this.sumTemperaturesByHour()" :e_label="$t('message.pass')" :s_label="$t('message.failed')"/>
                <v-row class="cart-wrap hidden-only pl-6">
                  <v-col cols="4" class="d-custom-flex">
                    <span class="mr-2">
                      <i class="zmdi zmdi-account success--text"></i>
                    </span>
                    <p class="mb-0">
                      <span class="d-block fs-14 fw-bold">{{ h_sumPass }}</span>
                      <span class="d-block fs-12 grey--text fw-normal">{{$t('message.pass')}}</span>
                    </p>
                  </v-col>
                  <v-col cols="4" class="d-custom-flex">
                    <span class="mr-2">
                      <i class="zmdi zmdi-account-o error--text"></i>
                    </span>
                    <p class="mb-0">
                      <span class="d-block fs-14 fw-bold">{{ h_sumFail }}</span>
                      <span class="d-block fs-12 grey--text fw-normal">{{$t('message.failed')}}</span>
                    </p>
                  </v-col>
                  <v-col cols="4" class="d-custom-flex">
                    <span class="mr-2">
                      <i class="zmdi zmdi-accounts-add primary--text"></i>
                    </span>
                    <p class="mb-0">
                      <span class="d-block fs-14 fw-bold">{{ h_sumPass + h_sumFail }}</span>
                      <span class="d-block fs-12 grey--text fw-normal">{{$t('message.totalPassVsFail')}}</span>
                    </p>
                  </v-col>
              </v-row>
              </app-card>
              <app-card
                colClasses="col-xl-4 col-lg-5 col-md-5 col-sm-6 col-12"
                :heading="$t('message.hourlyStatistics')"
                customClasses="app-card device-share-widget"
              >
                <temperature-statistics-hourly :arrData="h_Values" :arrLabel="h_Labels" :backgroundColors="h_bgColors" />
              </app-card>
            </v-row>
            <v-row>
              <app-card
                heading=""
                colClasses="col-xl-8 col-lg-7 col-md-7 col-sm-6 col-12"
                customClasses="mb-0 sales-widget"
                :fullBlock="false"
              >
                <!-- <div> {{ new Date(today).getDate() }} / {{ new Date(month).toLocaleString("en-us", { month: "long" }) }} / {{ year }}</div> -->
                <!-- Filter by Month -->
                <!-- <div v-for="(items, id) in this.sumTemperaturesByMonth()" :key="id" class="month">
                  <h4>{{ items.month == month ? 'This month' : items.month }}: total: {{ items.data.length }}</h4>
                  <div v-for="(v, k) in items.data" :key="k">
                    <b style="color:red;">{{ k + 1 }}.</b> Device: {{ v.deviceId }} - Visitor: {{ v.type }} - Date: {{ v.date.toLocaleDateString() }} - Body Temp: {{ v.bodyTemp }}
                  </div>
                </div> -->
                <!-- Filter by Day -->
                <!-- <div v-for="(items, id) in this.d_data" :key="id" class="day">
                  <h4>{{ items.date == today ? 'This day' : items.date }}: total: {{ items.data.length }}</h4>
                  <div v-for="(v, k) in items.data" :key="k">
                    <b style="color:red;">{{ k + 1 }}.</b> Visitor: {{ v.type }} - Date: {{ v.date.toLocaleDateString() }} - Total Body Temp: {{ v.bodyTemp }}
                  </div>
                </div> -->
                <!-- Filter by Hour -->
                <!-- <div v-for="(items, id) in this.h_data" :key="id" class="hour">
                  <h4>{{ items.hour }}: total: {{ items.data.length }}</h4>
                  <div v-for="(v, k) in items.data" :key="k">
                    <b style="color:red;">{{ k + 1 }}.</b> Visitor: {{ v.type }} - Hour: {{ v.hour }} - Total Body Temp: {{ v.bodyTemp }}
                  </div>
                </div> -->
              </app-card>
              <app-card
                colClasses="col-xl-4 col-lg-5 col-md-5 col-sm-6 col-12"
                heading=""
                customClasses="general-dashboard-doughnut-chart"
              >
                <!-- Filter by Hour -->
                <!-- <div v-for="(days, hour) in this.groupedByHour()" :key="hour" class="hour">
                  <h4>{{ hour }}</h4>
                  <div
                    v-for="(day, time) in days"
                    :key="time"
                  ><b style="color:red;">{{ time + 1 }}.</b> Visitor: {{ day.type }} - Hour: {{ day.hour }} - Total Body Temp: {{ day.bodyTemp }}</div>
                </div> -->
                <!-- Filter by Days -->
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
                <!-- <div v-for="(items, id) in this.sortingListLogsByMonth()" :key="id" class="month">
                  <h4>{{ items.month == month ? 'This month' : items.month }} / total: {{ items.data.length }}</h4>
                  <div v-for="(v, k) in items.data" :key="k">
                    <b style="color:red;">{{ k + 1 }}.</b> Visitor: {{ v.type }} - Date: {{ v.date.toLocaleDateString() }} - Body Temp: {{ v.bodyTemp }}
                  </div>
                </div> -->
                <!-- <div v-for="(days, day) in this.groupedByMonth()" :key="day" class="day">
                  <h4>{{ day == today ? 'Today' : day }}: total: {{ days.length }}</h4>
                  <div
                    v-for="(day, key) in days"
                    :key="key"
                  ><b style="color:red;">{{ key + 1 }}.</b> {{ day.type }} - {{ day.date.toLocaleDateString() }} - {{ day.bodyTemp }}</div>
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
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { ChartConfig } from "Constants/chart-config";
import { groupByYears, groupByDateTime, groupByTime, groupByKey, reStructuredObj, sortHourASC, sortDateASC, sortMonthASC, sortYearASC } from "Helpers/helpers";

import IndexesBlock from "../commons/fr-indexes-block-v01";
import temperatureMonthly from "../fr-charts/PassVsFailTemperatures";
import ScreeningStatisticsMonthly from "../fr-charts/ScreeningStatisticsMonthly";
import temperatureDaily from "../fr-charts/TemeratureDaily";
import ScreeningStatisticsDaily from "../fr-charts/ScreeningStatisticsDaily";
import temperatureHourly from "../fr-charts/TemperatureHourly";
import TemperatureStatisticsHourly from "../fr-charts/ScreeningStatisticsDaily";

export default {
  data() {
    return {
      loading: true,
      errored: false,
      logs: [],
      m_data: [],
      bgColors: [],
      Labels: [],
      Values: [],
      devices: [],
      types:[],
      sumPass: 0,
      sumFail: 0,
      d_data: [],
      d_bgColors: [],
      d_Labels: [],
      d_Values: [],
      d_sumPass: 0,
      d_sumFail: 0,
      h_data: [],
      h_bgColors: [],
      h_Labels: [],
      h_Values: [],
      h_sumPass: 0,
      h_sumFail: 0,
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
      ChartConfig,
    };
  },
  components: {
    IndexesBlock,
    temperatureMonthly,
    ScreeningStatisticsMonthly,
    temperatureDaily,
    ScreeningStatisticsDaily,
    temperatureHourly,
    TemperatureStatisticsHourly,
  },
  mounted() {
    this.getLogs();
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
    GetDataByMonth() {
      return this.dataByMonth();
    },
  },
  methods: {
    async getLogs() {
      // http://13.229.132.84:5566/logs?pageIndex=0&pageSize=1000000&deviceId=RLX-0110017&from_date=01/09/2020&to_date=30/09/2020&userId=
      await this.$axios
        .get(`/logs?pageIndex=0&pageSize=1000000&deviceId=&from_date=&to_date=&userId=`)
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
      return groupByKey(this.logs, "type");
    },
    groupedByHour() {
      return groupByDateTime(reStructuredObj(this.logs), (day) => day.date.getHours() + ':00, ' + day.date.getDate()+"-" + day.date.toLocaleString("en-us", { month: "short" }) +"-" + day.date.getFullYear().toString().substring(2));
    },
    groupedByDays() {
      return groupByTime(
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
      return groupByTime(
        reStructuredObj(this.logs),
        (day) => day.date.toLocaleString("en-us", { month: "long" }) + "-" + day.date.getFullYear().toString()
      );
    },
    groupedByYear() {
      return groupByYears(
        reStructuredObj(this.logs),
        (day) => day.date.getFullYear().toString()
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
      return sortDateASC(listLogs);
    },
    sortingListLogsByMonth() {
      let listLogs = []; let vm = this; let visitorTypes = []; let arrValues = []; let totalRU = 0; let totalGuest = 0; let arrColors = []; let arrLabels = [];
      for (let [key, item] of Object.entries(this.groupedByMonth())) {
        Object.keys(groupByKey(item, "type")).forEach((key) => {
          if (visitorTypes.indexOf(key) === -1) visitorTypes.push(key);
          if (String(key).toLowerCase() === "registered_user") totalRU += Object.values(groupByKey(item, "type")[key]).length;
          else totalGuest += Object.values(groupByKey(item, "type")[key]).length;
        });
        vm.sumRU = totalRU;
        vm.sumGuest = totalGuest;
        listLogs.push({ month: String(key), data: item });
      }
      Object.values(visitorTypes).forEach(val => {
        if(String(val).toLowerCase() === "registered_user") {
          arrValues.push(totalRU);
          arrLabels.push("Registered Users");
          arrColors.push(ChartConfig.color.primary);
        } else {
          arrValues.push(totalGuest);
          arrLabels.push("Guests");
          arrColors.push(ChartConfig.color.lightGrey);
        }
      });
      vm.Values = arrValues;
      vm.bgColors = arrColors;
      vm.Labels = arrLabels;
      vm.m_data = sortMonthASC(listLogs);      
      return vm.m_data;
    },
    sumTemperaturesByMonth() {
      let listLogs = []; let vm = this; let devices = []; let arrValues = []; let totalPass = 0; let totalFail = 0; let arrColors = []; let arrLabels = [];
      for (let [key, items] of Object.entries(this.groupedByMonth())) {
        Object.keys(groupByKey(items, "deviceId")).forEach((key) => { if (devices.indexOf(key) === -1) devices.push(key);  });
        items.forEach(item => {
          if (35.5 <= item.bodyTemp && item.bodyTemp <= 37.5 ) totalPass += 1;
          else totalFail += 1;
        });
        listLogs.push({ month: String(key), data: items });
      }
      vm.sumPass = totalPass;
      vm.sumFail = totalFail;
      arrValues.push(totalPass);
      arrLabels.push("Passed");
      arrColors.push(ChartConfig.color.success);
      arrValues.push(totalFail);
      arrLabels.push("Failed");
      arrColors.push(ChartConfig.color.danger);
      vm.Values = arrValues;
      vm.bgColors = arrColors;
      vm.Labels = arrLabels;
      vm.m_data = sortMonthASC(listLogs);      
      return vm.m_data;
    },
    sortingListLogsByDay() {
      let listLogs = []; let vm = this; let visitorTypes = []; let arrValues = []; let totalRU = 0; let totalGuest = 0; let arrColors = []; let arrLabels = [];
      for (let [key, item] of Object.entries(this.groupedByDays())) {
        Object.keys(groupByKey(item, "type")).forEach((key) => {
          if (visitorTypes.indexOf(key) === -1) visitorTypes.push(key);
          if (String(key).toLowerCase() === "registered_user") totalRU += Object.values(groupByKey(item, "type")[key]).length;
          else totalGuest += Object.values(groupByKey(item, "type")[key]).length;
        });
        vm.d_sumRU = totalRU;
        vm.d_sumGuest = totalGuest;
        listLogs.push({ date: String(key), data: item });
      }
      Object.values(visitorTypes).forEach(val => {
        if(String(val).toLowerCase() === "registered_user") {
          arrValues.push(totalRU);
          arrLabels.push("Registered Users");
          arrColors.push(ChartConfig.color.primary);
        } else {
          arrValues.push(totalGuest);
          arrLabels.push("Guests");
          arrColors.push(ChartConfig.color.lightGrey);
        }
      });
      vm.d_Values = arrValues;
      vm.d_bgColors = arrColors;
      vm.d_Labels = arrLabels;
      vm.d_data = sortDateASC(listLogs);      
      return vm.d_data;
    },
    sumTemperaturesByDay() {
      let listLogs = []; let vm = this; let devices = []; let totalPass = 0; let totalFail = 0; let arrValues = []; let arrColors = []; let arrLabels = [];
      for (let [key, items] of Object.entries(this.groupedByDays())) {
        Object.keys(groupByKey(items, "deviceId")).forEach((key) => { if (devices.indexOf(key) === -1) devices.push(key);  });
        items.forEach(item => {
          if (35.5 <= item.bodyTemp && item.bodyTemp <= 37.5 ) totalPass += 1;
          else totalFail += 1;
        });
        listLogs.push({ date: String(key), data: items });
      }

      vm.d_sumPass = totalPass;
      vm.d_sumFail = totalFail;
      arrValues.push(totalPass);
      arrLabels.push("Passed");
      arrColors.push(ChartConfig.color.success);
      arrValues.push(totalFail);
      arrLabels.push("Failed");
      arrColors.push(ChartConfig.color.danger);
      vm.d_Values = arrValues;
      vm.d_bgColors = arrColors;
      vm.d_Labels = arrLabels;
      vm.d_data = sortDateASC(listLogs);      
      return vm.d_data;
    },
    sortingListLogsByHour() {
      let listLogs = []; let vm = this; let visitorTypes = []; let arrValues = []; let totalRU = 0; let totalGuest = 0; let arrColors = []; let arrLabels = [];
      for (let [key, item] of Object.entries(this.groupedByHour())) {
        Object.keys(groupByKey(item, "type")).forEach((key) => {
          if (visitorTypes.indexOf(key) === -1) visitorTypes.push(key);
          if (String(key).toLowerCase() === "registered_user") totalRU += Object.values(groupByKey(item, "type")[key]).length;
          else totalGuest += Object.values(groupByKey(item, "type")[key]).length;
        });
        vm.h_sumRU = totalRU;
        vm.h_sumGuest = totalGuest;
        listLogs.push({ hour: String(key), data: item });
      }
      Object.values(visitorTypes).forEach(val => {
        if(String(val).toLowerCase() === "registered_user") {
          arrValues.push(totalRU);
          arrLabels.push("Registered Users");
          arrColors.push(ChartConfig.color.primary);
        } else {
          arrValues.push(totalGuest);
          arrLabels.push("Guests");
          arrColors.push(ChartConfig.color.lightGrey);
        }
      });
      vm.h_Values = arrValues;
      vm.h_bgColors = arrColors;
      vm.h_Labels = arrLabels;
      vm.h_data = sortHourASC(listLogs);      
      return vm.h_data;
    },    
    sumTemperaturesByHour() {
      let listLogs = []; let vm = this; let devices = []; let totalPass = 0; let totalFail = 0; let arrValues = []; let arrColors = []; let arrLabels = [];
      for (let [key, items] of Object.entries(this.groupedByHour())) {
        Object.keys(groupByKey(items, "deviceId")).forEach((key) => { if (devices.indexOf(key) === -1) devices.push(key);  });
        items.forEach(item => {
          if (35.5 <= item.bodyTemp && item.bodyTemp <= 37.5 ) totalPass += 1;
          else totalFail += 1;
        });
        listLogs.push({ hour: String(key), data: items });
      }
      vm.h_sumPass = totalPass;
      vm.h_sumFail = totalFail;
      arrValues.push(totalPass);
      arrLabels.push("Passed");
      arrColors.push(ChartConfig.color.success);
      arrValues.push(totalFail);
      arrLabels.push("Failed");
      arrColors.push(ChartConfig.color.danger);
      vm.h_Values = arrValues;
      vm.h_bgColors = arrColors;
      vm.h_Labels = arrLabels;
      vm.h_data = sortHourASC(listLogs);      
      return vm.h_data;
    },    
    dataByMonth() {
      let vm = this;
      // let strE = "";
      Object.values(vm.m_data).forEach((elm) => {
        vm.m_labels.push(new Date(elm.month).toLocaleString("en-us", {month: "short"}));                        
      });      
      // console.log(strE);
      return vm.m_labels;
    },
    sortingListLogsByYear() {
      let listLogs = [];
      for (let [key, item] of Object.entries(this.groupedByYear())) {
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