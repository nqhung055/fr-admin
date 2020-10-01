<template>
  <div>
    <v-container fluid class="pt-0 grid-list-xl">
      <section-tooltip
        :title="$t('message.generalDashboard')"
        :tooltip="$t('message.dashboardOverview')"
      ></section-tooltip>
      <!-- Indexes by day -->
      <!-- <v-row>
        <app-card colClasses="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-12">
          <indexes-per-day
            :title="$t('message.employee')"
            value_class="primary--text d-block fw-bold"
            value="52"
            :diameter_value="95"
            :completed_steps_value="60"
            :total_steps_value="100"
            start_color_value="#3B7CFF"
            stop_color_value="#1E3C72"
            :stroke_width_value="4"
            inner_stroke_color_value="#EAEAEA"
            i_class="ti-arrow-up"
            body
            :status="1"
          ></indexes-per-day>
        </app-card>
        <app-card colClasses="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-12">
          <indexes-per-day
            :title="$t('message.stranger')"
            value_class="warning--text d-block fw-bold"
            value="49"
            :diameter_value="95"
            :completed_steps_value="40"
            :total_steps_value="100"
            start_color_value="#FD7266"
            stop_color_value="#F7981C"
            :stroke_width_value="4"
            inner_stroke_color_value="#EAEAEA"
            i_class="ti-arrow-down"
            body
            :status="1"
          ></indexes-per-day>
        </app-card>
        <app-card colClasses="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-12">
          <indexes-per-day
            :title="$t('message.bodyTemperature')"
            value_class="info--text d-block fw-bold"
            value="28.70"
            :diameter_value="95"
            :completed_steps_value="90"
            :total_steps_value="100"
            start_color_value="#007ADF"
            stop_color_value="#00ecbc"
            :stroke_width_value="4"
            inner_stroke_color_value="#EAEAEA"
            i_class="ti-arrow-up"
            body
            :status="1"
          ></indexes-per-day>
        </app-card>
        <app-card colClasses="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-12">
          <indexes-per-day
            :title="$t('message.roomTemperature')"
            value_class="error--text d-block fw-bold"
            value="29.12"
            :diameter_value="95"
            :completed_steps_value="500"
            :total_steps_value="1000"
            start_color_value="#00D0BD"
            stop_color_value="#FF3739"
            :stroke_width_value="4"
            inner_stroke_color_value="#EAEAEA"
            i_class="ti-arrow-down"
            body
            :status="1"
          ></indexes-per-day>
        </app-card>
      </v-row>-->
      <!-- <indexes-block /> -->
      <v-row>
        <app-card
          :heading="$t('message.visitorCollection')"
          colClasses="col-xl-8 col-lg-7 col-md-7 col-sm-6 col-12"
          customClasses="mb-0 sales-widget"
          :fullBlock="false"
        >
          <visitors-collection
            :xLabel="$t('message.byTimes').split(', ')"
            :yLabel="$t('message.hundredUnits')"
            :types="visitorTypes"
          ></visitors-collection>
          <v-row class="cart-wrap hidden-only pl-6">
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-account primary--text"></i>
                <!-- shopping-cart-plus -->
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">{{ this.filteredByTypes[0].length }}</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.employee')}}</span>
              </p>
            </v-col>
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-account-o success--text"></i>
                <!-- -eye -->
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">{{ this.filteredByTypes[1].length }}</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.stranger')}}</span>
              </p>
            </v-col>
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-accounts-add error--text"></i>
                <!-- equalizer -->
              </span>
              <p class="mb-0">
                <span
                  class="d-block fs-14 fw-bold"
                >{{ this.filteredByTypes[0].length + this.filteredByTypes[1].length }}</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.totalVisitors')}}</span>
              </p>
            </v-col>
          </v-row>
        </app-card>
        <!-- Visitor Summaries -->
        <app-card
          colClasses="col-xl-4 col-lg-5 col-md-5 col-sm-6 col-12"
          :heading="$t('message.visitorsummaries')"
          customClasses="general-dashboard-doughnut-chart"
        >
          <visitor-stat
            :total="Number(this.totalLogs)"
            :labels="visitorTypes"
            :data="[filteredByTypes[0].length, filteredByTypes[1].length]"
            :bgColor="[ChartConfig.color.lightGrey, ChartConfig.color.primary]"
          />
        </app-card>
      </v-row>
      <!-- Stranger vs Employee visiting -->
      <v-row>
        <app-card
          :heading="$t('message.visitorCollection')"
          colClasses="col-xl-8 col-lg-7 col-md-7 col-sm-6 col-12"
          customClasses="mb-0 sales-widget"
        >
          <general-visitor-chart
            class="mb-5"
            :height="330"
            :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug']"
            :e_label="$t('message.employee')"
            :e_dataset="[45, 32, 50, 42, 32, 46, 30, 25]"
            :s_label="$t('message.stranger')"
            :s_dataset="[10, 20, 12, 30, 10, 32, 28, 30]"
          />
          <v-row class="cart-wrap hidden-only pl-6">
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-account primary--text"></i>
                <!-- shopping-cart-plus -->
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">52</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.employee')}}</span>
              </p>
            </v-col>
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-account-o success--text"></i>
                <!-- -eye -->
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">49</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.stranger')}}</span>
              </p>
            </v-col>
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-accounts-add error--text"></i>
                <!-- equalizer -->
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">101</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.totalVisitors')}}</span>
              </p>
            </v-col>
          </v-row>
        </app-card>
        <app-card
          colClasses="col-xl-4 col-lg-5 col-md-5 col-sm-6 col-12"
          :heading="$t('message.visitorsummaries')"
          customClasses="general-dashboard-doughnut-chart"
        >
          <div>{{ this.sumGroupedLogs }}</div>
          <!-- <div v-for="(days, day) in groupedDays" :key="day" class="day">
            <h4>{{ day == today ? 'Today' : day }}</h4>
            <div>{{ bindListLogs }}</div>
            <div
              v-for="(day, time) in days"
              :key="time"
            >{{ day.type }} - {{ day.date.toLocaleTimeString() }} - {{ day.bodyTemp }} - {{ day.roomTemp }}</div>
          </div> -->
        </app-card>
      </v-row>
      <!-- Pass vs Fail temperature -->
      <v-row>
        <app-card
          :heading="$t('message.temperatureScreening')"
          colClasses="col-xl-8 col-lg-7 col-md-7 col-sm-6 col-12 flex"
          customClasses="mb-0 sales-widget"
        >
          <general-column-chart />
          <v-row class="cart-wrap hidden-only pl-6">
            <v-col cols="2" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-invert-colors primary--text"></i>
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">52</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.pass')}}</span>
              </p>
            </v-col>
            <v-col cols="2" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-invert-colors-off error--text"></i>
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">49</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.failed')}}</span>
              </p>
            </v-col>
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-male-female success--text"></i>
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">101</span>
                <span
                  class="d-block fs-12 grey--text fw-normal"
                >{{$t('message.totalScreeningPassed')}}</span>
              </p>
            </v-col>
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-nature-people error--text"></i>
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">101</span>
                <span
                  class="d-block fs-12 grey--text fw-normal"
                >{{$t('message.totalScreeningFailed')}}</span>
              </p>
            </v-col>
          </v-row>
        </app-card>
        <app-card
          :heading="$t('message.statisticsByDay')"
          colClasses="col-xl-4 col-lg-5 col-md-5 col-sm-6 col-12"
          customClasses="mb-0 sales-widget"
        >
          <index-statistics />
        </app-card>
        <!-- <v-col xl="4" lg="4" md="5" sm="6" cols="12">
          <top-selling></top-selling>
        </v-col>-->
        <!-- Category Sales -->
        <!-- <app-card
          :heading="$t('message.categorySales')"
          colClasses="col-xl-8 col-lg-8 col-md-7 col-sm-6 col-12"
          customClasses="mb-0"
          contentCustomClass="pt-0"
        >
          <category-sale></category-sale>
          <div class="footer-flex">
            <v-spacer></v-spacer>
            <span class="grey--text d-custom-flex align-items-center">
              <i class="zmdi zmdi-replay mr-2"></i>
              <span class="fs-12 fw-normal">{{$t('message.updated10MinAgo')}}</span>
            </span>
          </div>
        </app-card>-->
      </v-row>
    </v-container>
  </div>
</template>

<script>
// Getters
import { mapGetters } from "vuex";

// charts component
import VisitorsCollection from "../fr-charts/GeneralVisitorsCollection";
import GeneralVisitorChart from "../fr-charts/GeneralChartV2";

// // widgets
// import IndexesOnDate from "../fr-detection-logs/GeneralIndexesOnDate";
// import IndexesPerDay from "../fr-detection-logs/GeneralIndexesPerDay";
// import IndexesBlock from "../commons/fr-indexes-block";
/* import TopSelling from "Components/Widgets/TopSelling";
import CategorySale from "Components/Widgets/CategorySales"; */
import VisitorStat from "../fr-detection-logs/VisitorStat";
import GeneralColumnChart from "../fr-charts/GeneralColumnChart";
import IndexStatistics from "../commons/fr-statistics";

import { ChartConfig } from "Constants/chart-config";

function groupByKey(arr, key) {
  const result = {};
  // console.log('groupBy -> array: ' + arr.length);
  arr.forEach((item) => {
    if (!result[item[key]]) {
      result[item[key]] = [];
    }
    result[item[key]].push(item);
  });
  // console.log('Result: ' + result);
  return result;
}

function countGroupedByKey(arr, key) {
  var i = 0;
  // console.log('Count Grouped By Key: ' + key);

  arr.forEach((elm) => {
    // console.log('Count Grouped By Key: ' + elm.type);

    if (String(elm.type).toLowerCase() === key) i++;
  });
  // console.log('countGroupedByKey -> total: ' + i);
  return i;
}

function groupByDate(array, fn) {
  let result = {};

  array.forEach((item) => {
    let key = fn(item);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);
  });

  sortTimeASC(result);

  return result;
}

function sortTimeASC(rst) {
  Object.values(rst).forEach((el) => {
    // console.log('sortTimeASC: ' + el)
    el.sort(function (a, b) {
      return a.date.getTime() - b.date.getTime();
    });
  });
}

function sortDateArrayASC(rst) {
  rst.sort((a, b) => {
    return new Date(a) - new Date(b);
  });
  return rst;
}

function sortDateASC(rst) {
  // console.log('sortDateASC: ' + rst.id)
  rst.sort((a, b) => {
    // console.log('sortDateASC -> a: ' + a.id);
    // console.log('sortDateASC -> b: ' + b.id);
    return new Date(a.date) - new Date(b.date);
  });
  return rst;
}

let data = [
  {
    id: "50",
    date: "2020-07-29T10:30:34.000Z",
    bodyTemp: 36.4,
    roomTemp: 25.06,
    type: "STRANGER",
  },
  {
    id: "49",
    date: "2020-07-29T10:31:02.000Z",
    bodyTemp: 36.4,
    roomTemp: 25.11,
    type: "STRANGER",
  },
  {
    id: "48",
    date: "2020-07-29T10:31:29.000Z",
    bodyTemp: 36.3,
    roomTemp: 25.14,
    type: "EMPLOYEE",
  },
  {
    id: "47",
    date: "2020-07-29T10:31:34.000Z",
    bodyTemp: 36.6,
    roomTemp: 25.1,
    type: "STRANGER",
  },
  {
    id: "46",
    date: "2020-07-29T10:32:34.000Z",
    bodyTemp: 36.3,
    roomTemp: 25.22,
    type: "STRANGER",
  },
  {
    id: "45",
    date: "2020-07-29T10:32:39.000Z",
    bodyTemp: 36.4,
    roomTemp: 25.17,
    type: "EMPLOYEE",
  },
];
let sumsArray = {};
data.forEach((item) => {
  let sums = sumsArray[item.type];
  if (sums) {
    sums.bodyTemp += item.bodyTemp;
    sums.roomTemp += item.roomTemp;
  } else {
    sumsArray[item.type] = {
      type: item.type,
      bodyTemp: item.bodyTemp,
      roomTemp: item.roomTemp,
    };
  }
});
// console.log(sumsArray);
function sumValues(arr, key) {
  var total = 0;
  arr.forEach((e) => {
    total += e[key];
  });
  return total;
}
export default {
  components: {
    VisitorsCollection,
    GeneralVisitorChart,
    // IndexesPerDay,
    // IndexesBlock,
    VisitorStat,
    GeneralColumnChart,
    IndexStatistics,
  },
  async mounted() {
    // this.getLogsFromData();
    // this.lstDetectionFromData = this.objDLOffline;
    // this.visitorTypes = [ this.filteredByTypes[0][0]["type"] , this.filteredByTypes[1][0]["type"] ];
    /* this.visitorTypes.forEach(element => {
      console.log('. visitorType: ' + element);
    }); */
    /* this.filteredByTypes.forEach(element =>{
      element.forEach(item => {
        console.log('. visitorType: ' + item.type);
      })
    }); */
    // const listOfTypes = Object.keys(this.groupByType);
    // console.log('filteredByTypes: ' + this.filteredByTypes.length + "\r\nobjDLOffline: " + this.objDLOffline.rows.length);
    this.totalLogs = this.objDLOffline.rows.length;
    Object.keys(this.groupByType).forEach((key) => {
      // console.log(' =========== ' + key + ' =========== ');
      this.visitorTypes.push(key);
      /* const times = this.groupByType[key]
      times.forEach(time => {
        console.log(time.detectionTime + ' ' + time.fromDevice)
      }) */
    });

    /* for (let [key, item] of Object.entries(this.objDLOffline.rows)) {
      this.detectionDays.push({
        date: new Date(item.detectionTime),
        title: item.bodyTemperature,
        id: key,
      });
    } */

    for (let [key, item] of Object.entries(this.objDLO.rows)) {
      // console.log('Item: ' + item);
      // console.log('key: ' + key);
      this.detectionDays.push({
        id: key,
        date: new Date(item.detectionTime),
        bodyTemp: Number(item.bodyTemperature),
        roomTemp: Number(item.roomTemperature),
        type: String(item.type),
      });
    }

    // this.bindingListDates();
    // this.bindingListLogs();

    // this.bindListLogs;
    // let i = 0;
    Object.values(this.bindListLogs).forEach((el) => {
      // console.log('i: ' + i);
      // if (i > 0) return;
      /* console.log('. bindListLogs: ' + el.date);
      console.log('. bindListLogs: ' + el.value); */
      // sumValues(el.value);
      this.sumGroupedLogs.push({
        date: String(el.date),
        totalEmp: countGroupedByKey(el.value, "employee"),
        totalUsr: countGroupedByKey(el.value, "stranger"),
        bodyTemp: Number(sumValues(el.value, "bodyTemp")),
        roomTemp: Number(sumValues(el.value, "roomTemp")),
      });
      // console.log(
      //   "sumGroupedLogs -> bodyTemp: " + this.sumGroupedLogs[0]["bodyTemp"]
      // );
      // console.log(
      //   "sumGroupedLogs -> roomTemp: " + this.sumGroupedLogs[0]["roomTemp"]
      // );
      // i++;
    });
    /* this.visitorTypes.forEach(val => {
        console.log('. visitorType: ' + val);
    }); */
    // console.log('Type: ' + this.groupByType.EMPLOYEE);
    //  = [this.types[0][0]["type"], this.types[1][0]["type"]],
    /* console.log(
      "lstDetectionFromData: " + this.lstDetectionFromData.rows.length + "\r\n"
      + "Stranger total: " + this.filteredByTypes[0][0]["type"] + "\r\n"
      + "Employee total: " + this.filteredByTypes[1][0]["type"]
    ); */

    /* console.log(
      "lstDetectionFromAPI1: " + this.fDetectionLogsOnline1.rows[0]["type"]
    ); */

    // get DL from API
    /* await this.$axios
      .get(`/logs?pageIndex=0&pageSize=1000000`)
      .then((response) => {
        this.lstDetectionFromAPI = response.data;
        console.log('Rows: ' + this.lstDetectionFromAPI.count)
      })
      .catch((error) => console.log(error)); */
  },
  data() {
    return {
      blog: {
        id: 3,
        thumbnail: "/static/img/blog-3.jpg",
        title: "lorem ipsum is simply dummy text",
        body:
          "Consectetur adipisicing elit. Ullam expedita, necessitatibus sit exercitationem aut quo quos inventore similique nulla minima distinctio illo iste dignissimos vero nostrum, magni pariatur delectus natus.",
        date: "1-jun-2018",
      },
      ChartConfig,
      labels: ["A", "B", "C", "D", "E", "F", "J", "K", "L", "M", "N", "P"],
      totalEarnings: [30, 50, 25, 55, 44, 60, 30, 20, 40, 20, 40, 44],
      onlineRevenue: [30, 50, 25, 55, 44, 60, 30, 20, 40, 20, 40, 44],
      newCustomers: [30, 50, 25, 55, 44, 60, 30, 20, 40, 20, 40, 44],
      lstDetectionFromData: null,
      lstDetectionFromAPI: Object,
      xLabel: [],
      visitorTypes: [],
      totalLogs: Number,
      detectionDays: [],
      sumGroupedTemp: [],
      arrDates: [],
      lstLogs: [],
      sumGroupedLogs: [],
      today:
        new Date().getDate() +
        "-" +
        new Date().toLocaleString("en-us", { month: "short" }) +
        "-" +
        new Date().getFullYear().toString().substring(2),
    };
  },
  computed: {
    ...mapGetters(["fDLO", "fDetectionLogsOnline1", "fDetectionLogsOffline"]),
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
    filteredByTypes() {
      let arrRU = [],
        arrGuest = [];

      arrRU = this.objDLOffline.rows.filter(
        (item) => item.type.toLowerCase().trim() === "stranger"
      );
      arrGuest = this.objDLOffline.rows.filter(
        (item) => item.type.toLowerCase().trim() === "employee"
      );

      return [arrRU, arrGuest];
    },
    groupByType() {
      return groupByKey(this.objDLOffline.rows, "type");
    },
    groupedDays() {
      return groupByDate(
        this.detectionDays,
        (day) =>
          day.date.getDate() +
          "-" +
          day.date.toLocaleString("en-us", { month: "short" }) +
          "-" +
          day.date.getFullYear().toString().substring(2)
      );
      //return groupByDate(this.detectionDays, day => day.date.toDateString());
    },
    sumGroupByObj() {
      /* Object.values(this.groupedDays).forEach(elm => {
        console.log('elm: ' + elm);
        elm.forEach(item => {
          console.log('item: ' + item.bodyTemp);
        })
      }); */
      /* Object.keys(this.groupedDays).forEach((key) => {
        console.log('key: ' + key);
      }); */
      let sumGroupedTemp = {};
      for (let [key, values] of Object.entries(this.groupedDays)) {
        console.log("key: " + key);
        // console.log('values: ' + values.length);
        values.forEach((item) => {
          let sums = sumGroupedTemp[item.bodyTemp];
          if (sums) {
            sums.bodyTemp += item.bodyTemp;
            // sums.valore += item.qty * item.price;
          } else {
            sumGroupedTemp[item.bodyTemp] = {
              bodyTemp: item.bodyTemp,
              // qty: item.qty,
              // value: item.qty * item.price,
            };
          }
        });
      }
      return 0;
    },
    bindListLogs() {
      let listLogs = [];
      // console.log('bindingListLogs -> groupedDays: ' + Object.entries(this.groupedDays).length);
      for (let [key, item] of Object.entries(this.groupedDays)) {
        // console.log('bindingListLogs -> Item: ' + item);
        // console.log('bindingListLogs -> key: ' + key);
        listLogs.push({
          date: String(key),
          value: item,
        });
      }
      // sortDateASC(listLogs)
      return sortDateASC(listLogs);
    },
    /* byTypes() {
      let filtered = [];
      filtered = this.objDLOffline.rows.map((item) => {
        item.stranger = item.type.filter(
          (value) => value.type.toLowerCase().trim() === "stranger"
        );
        item.employee = item.type.filter(
          (value) => value.type.toLowerCase().trim() === "employee"
        );
        return item;
      });
      return filtered;
    }, */
    /* filteredByTypes() {
    let filtered = [];
      filtered = this.objDLOffline.rows.map((item) => {
      item.stranger = item.rows.filter(value => value.type === 'stranger')
      item.employee = item.rows.filter(value => value.type === 'employee')
        item.stranger = item.type.toLowerCase().trim() === 'stranger';
        item.employee = item.type.toLowerCase().trim() === 'employee';
        return item;
    })
      return filtered;
    }, */
  },
  methods: {
    async returnDLFromAPI() {
      await this.$axios
        .get(`/logs?pageIndex=0&pageSize=1000000`)
        .then((response) => {
          this.lstDetectionFromAPI = response.data;
        })
        .catch((error) => console.log(error));
    },
    getLogsFromData() {
      if (this.fDetectionLogs !== null) {
        this.lstDetectionFromData = this.fDetectionLogsOffline.rows;
        console.log("Get Logs from data: ");
      }
    },
    bindingListDates() {
      Object.keys(this.groupedDays).forEach((key) => {
        this.arrDates.push(key);
      });
      sortDateArrayASC(this.arrDates);
    },
    bindingListLogs() {
      for (let [key, item] of Object.entries(this.groupedDays)) {
        // console.log('bindingListLogs -> Item: ' + item);
        // console.log('bindingListLogs -> key: ' + key);
        this.lstLogs.push({
          id: key,
          value: Array(item),
        });
      }
      /* for (let [key, value] of Object.entries(this.groupedDays)) {
        this.lstLogs.push({
            id: key,
            value: Array(value)
        });
      } */

      // console.log('bindingListLogs: ' + this.lstLogs);
    },
  },
};
</script>
