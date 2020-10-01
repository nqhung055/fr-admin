<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid grid-list-xl pt-0>
      <indexes-block />
      <div v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </div>
      <div v-else>
        <div v-if="loading">Loading...</div>
        <div  v-else>
          <!-- Monthly -->
          <v-row>        
            <app-card
              :heading="$t('message.visitorMonthly')"
              colClasses="col-xl-8 col-lg-8 col-md-7 col-sm-6 col-12"
              customClasses="mb-0"
              contentCustomClass="pt-0"
            >        
              <!-- <div>
                <div class="w-30">
                  Choose Month<v-select
                    class="mb-5"
                    v-model="currMonth"
                    :items="month"
                    menu-props="auto"
                    label="Select"
                    hide-details
                    prepend-icon="zmdi zmdi-calendar-note"
                    single-line
                  ></v-select>
                </div>
              </div>-->
              <visitor-monthly class="mb-5" :height="330" :dt="sortingListLogsByMonth()" />
              <v-row class="cart-wrap hidden-only pl-6">
                <v-col cols="4" class="d-custom-flex">
                  <span class="mr-2">
                    <i class="zmdi zmdi-account primary--text"></i>
                    <!-- shopping-cart-plus -->
                  </span>
                  <p class="mb-0">
                    <span class="d-block fs-14 fw-bold">{{ sumRU }}</span>
                    <span class="d-block fs-12 grey--text fw-normal">{{$t('message.employee')}}</span>
                  </p>
                </v-col>
                <v-col cols="4" class="d-custom-flex">
                  <span class="mr-2">
                    <i class="zmdi zmdi-account-o success--text"></i>
                    <!-- -eye -->
                  </span>
                  <p class="mb-0">
                    <span class="d-block fs-14 fw-bold">{{ sumGuest }}</span>
                    <span class="d-block fs-12 grey--text fw-normal">{{$t('message.stranger')}}</span>
                  </p>
                </v-col>
                <v-col cols="4" class="d-custom-flex">
                  <span class="mr-2">
                    <i class="zmdi zmdi-accounts-add error--text"></i>
                    <!-- equalizer -->
                  </span>
                  <p class="mb-0">
                    <span class="d-block fs-14 fw-bold">{{ sumRU + sumGuest }}</span>
                    <span class="d-block fs-12 grey--text fw-normal">{{$t('message.totalVisitors')}}</span>
                  </p>
                </v-col>
              </v-row>
            </app-card>
            <app-card
              :heading="$t('message.monthlyStatistics')"
              colClasses="col-xl-4 col-lg-4 col-md-5 col-sm-6 col-12"
              customClasses="temperature-screening-wrap"
            >
              <visitor-percentage :arrData="[this.sumRU, this.sumGuest]" :arrLabel="this.types"/>
            </app-card>
          </v-row>
          <!-- Daily -->
          <v-row>
            <app-card
              :heading="$t('message.visitorDaily')"
              colClasses="col-xl-8 col-lg-8 col-md-7 col-sm-6 col-12"
              customClasses="mb-0"
              contentCustomClass="pt-0"
            >
              <!-- <div>
                <div class="w-30">
                  Choose Month<v-select
                    class="mb-5"
                    v-model="currMonth"
                    :items="month"
                    menu-props="auto"
                    label="Select"
                    hide-details
                    prepend-icon="zmdi zmdi-calendar-note"
                    single-line
                  ></v-select>
                </div>
              </div>-->
              <!-- <visitor-daily
                class="mb-5"
                :height="330"
                :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug']"
                :e_label="$t('message.employee')"
                :e_dataset="[45, 32, 50, 42, 32, 46, 30, 25]"
                :s_label="$t('message.stranger')"
                :s_dataset="[10, 20, 12, 30, 10, 32, 28, 30]"
              /> -->
              <visitor-daily class="mb-5" :height="330" :dt="sortingListLogsByDay()" />
              <v-row class="cart-wrap hidden-only pl-6">
                <v-col cols="4" class="d-custom-flex">
                  <span class="mr-2">
                    <i class="zmdi zmdi-account primary--text"></i>
                    <!-- shopping-cart-plus -->
                  </span>
                  <p class="mb-0">
                    <span class="d-block fs-14 fw-bold">{{ sumRUDaily }}</span>
                    <span class="d-block fs-12 grey--text fw-normal">{{$t('message.employee')}}</span>
                  </p>
                </v-col>
                <v-col cols="4" class="d-custom-flex">
                  <span class="mr-2">
                    <i class="zmdi zmdi-account-o success--text"></i>
                    <!-- -eye -->
                  </span>
                  <p class="mb-0">
                    <span class="d-block fs-14 fw-bold">{{ sumGuestDaily }}</span>
                    <span class="d-block fs-12 grey--text fw-normal">{{$t('message.stranger')}}</span>
                  </p>
                </v-col>
                <v-col cols="4" class="d-custom-flex">
                  <span class="mr-2">
                    <i class="zmdi zmdi-accounts-add error--text"></i>
                    <!-- equalizer -->
                  </span>
                  <p class="mb-0">
                    <span class="d-block fs-14 fw-bold">{{ sumRUDaily + sumGuestDaily }}</span>
                    <span class="d-block fs-12 grey--text fw-normal">{{$t('message.totalVisitors')}}</span>
                  </p>
                </v-col>
              </v-row>
            </app-card>
            <app-card
              :heading="$t('message.dailyStatistics')"
              colClasses="col-xl-4 col-lg-4 col-md-5 col-sm-6 col-12"
              customClasses="temperature-screening-wrap"
            >
              <visitor-percentage :arrData="[this.sumRUDaily, this.sumGuestDaily]" :arrLabel="this.types"/>
            </app-card>
          </v-row>
          <!-- Hourly -->
          <v-row>
            <app-card
              :heading="$t('message.visitorHourly')"
              colClasses="col-xl-8 col-lg-8 col-md-7 col-sm-6 col-12"
              customClasses="mb-0"
              contentCustomClass="pt-0"
            >
              <!-- <div>
                <div class="w-30">
                  Choose Month<v-select
                    class="mb-5"
                    v-model="currMonth"
                    :items="month"
                    menu-props="auto"
                    label="Select"
                    hide-details
                    prepend-icon="zmdi zmdi-calendar-note"
                    single-line
                  ></v-select>
                </div>
              </div>-->
              <!-- <visitor-hourly
                class="mb-5"
                :height="330"
                :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug']"
                :e_label="$t('message.employee')"
                :e_dataset="[45, 32, 50, 42, 32, 46, 30, 25]"
                :s_label="$t('message.stranger')"
                :s_dataset="[10, 20, 12, 30, 10, 32, 28, 30]"
              /> -->
              <visitor-hourly class="mb-5" :height="330" :dt="sortingListLogsByHour()" />
              <v-row class="cart-wrap hidden-only pl-6">
                <v-col cols="4" class="d-custom-flex">
                  <span class="mr-2">
                    <i class="zmdi zmdi-account primary--text"></i>
                    <!-- shopping-cart-plus -->
                  </span>
                  <p class="mb-0">
                    <span class="d-block fs-14 fw-bold">{{ sumRUHourly }}</span>
                    <span class="d-block fs-12 grey--text fw-normal">{{$t('message.employee')}}</span>
                  </p>
                </v-col>
                <v-col cols="4" class="d-custom-flex">
                  <span class="mr-2">
                    <i class="zmdi zmdi-account-o success--text"></i>
                    <!-- -eye -->
                  </span>
                  <p class="mb-0">
                    <span class="d-block fs-14 fw-bold">{{ sumGuestHourly }}</span>
                    <span class="d-block fs-12 grey--text fw-normal">{{$t('message.stranger')}}</span>
                  </p>
                </v-col>
                <v-col cols="4" class="d-custom-flex">
                  <span class="mr-2">
                    <i class="zmdi zmdi-accounts-add error--text"></i>
                    <!-- equalizer -->
                  </span>
                  <p class="mb-0">
                    <span class="d-block fs-14 fw-bold">{{ sumRUHourly + sumGuestHourly }}</span>
                    <span class="d-block fs-12 grey--text fw-normal">{{$t('message.totalVisitors')}}</span>
                  </p>
                </v-col>
              </v-row>
            </app-card>
            <app-card
              :heading="$t('message.hourlyStatistics')"
              colClasses="col-xl-4 col-lg-4 col-md-5 col-sm-6 col-12"
              customClasses="temperature-screening-wrap"
            >
              <visitor-percentage />
            </app-card>
          </v-row>
        </div>
      </div>
      <!-- <v-row>
          <v-row>
            <app-card>
              <div>
                {{ sortingListLogsByMonth() }}
              </div>
              <div>
                <div v-for="(items, id) in sortingListLogsByDay()" :key="id" class="month">
                <h4>{{ items.month == currMonth ? 'This month' : items.month }}</h4>
                <div v-for="(v, k) in items.data" :key="k">
                  Visitor: {{ v.type }} - Date: {{ v.date.toLocaleDateString() }} -Body Temp: {{ v.bodyTemp }} - Room Temp: {{ v.roomTemp }}
                </div>
              </div>
              </div>
            </app-card>
            <app-card>
              <div>
                <div v-for="(items, id) in sortingListLogsByDay()" :key="id" class="month">
                  <h4>{{ items.date == currDay ? 'This day' : items.date }}</h4>
                  <div v-for="(v, k) in items.data" :key="k">
                    Visitor: {{ v.type }} - Date: {{ v.date.toLocaleDateString() }} -Body Temp: {{ v.bodyTemp }} - Room Temp: {{ v.roomTemp }}
                  </div>
              </div>
              </div>
            </app-card>
            <app-card>
              <div>
                <div v-for="(items, id) in sortingListLogsByHour()" :key="id" class="month">
                <h4>{{ items.hour == currHour ? 'This hour' : items.hour }}</h4>
                <div v-for="(v, k) in items.data" :key="k">
                  Visitor: {{ v.type }} - Date: {{ v.date.toLocaleTimeString() }} -Body Temp: {{ v.bodyTemp }} - Room Temp: {{ v.roomTemp }}
                </div>
              </div>
              </div>
            </app-card>
          </v-row>
      </v-row>-->
    </v-container>
  </div>
</template>

<script>
// import Vue from "vue";
import {
  groupByKey,
  groupByTime,
  groupByDateTime,
  sortMonthASC,
  sortDateASC,
  sortHourASC,
  reStructuredObj,
} from "Helpers/helpers";
import IndexesBlock from "../commons/fr-indexes-block";

// chart config
import { ChartConfig } from "Constants/chart-config";
import visitorMonthly from "../fr-charts/VisitorMonthly";
import VisitorPercentage from "../fr-detection-logs/VisitorPercentage";
import visitorDaily from "../fr-charts/VisitorDaily";
import visitorHourly from "../fr-charts/VisitorHourly";

export default {
  components: {
    visitorMonthly,
    visitorDaily,
    visitorHourly,
    IndexesBlock,
    VisitorPercentage,
  },
  data() {
    return {
      loading: true,
      errored: false,
      logs: [],
      types:[],
      currMonth: new Date().toLocaleString("en-us", { month: "long" }),
      currDay: new Date().getDate(),
      currHour: new Date().getHours(),
      month: [],
      dataByMonth: [],
      sumRU: 0,
      sumGuest: 0,
      day: [],
      dataByDay: [],
      sumRUDaily: 0,
      sumGuestDaily: 0,
      hour: [],
      dataByHour: [],
      sumRUHourly: 0,
      sumGuestHourly: 0,
      ChartConfig,
      active: null,
      tabs: [
        {
          icon: "zmdi zmdi zmdi-chart",
          title: "Entry Monthly",
        },
        {
          icon: "zmdi zmdi zmdi-chart",
          title: "Entry Daily",
        },
        {
          icon: "zmdi zmdi-chart",
          // zmdi zmdi-chart-donut
          title: "Entry hourly",
        },
      ],
    };
  },
  async mounted() {
    this.getLogs();
  },
  methods: {
    async getLogs() {
      // http://13.229.132.84:5566/logs?pageIndex=0&pageSize=100&deviceId=RLK-0061345&userId=
      await this.$axios
        .get(`/logs?pageIndex=0&pageSize=1000000`)
        .then((response) => {
          // console.log('Logs count: ' + response.data.rows.length);
          return this.logs = response.data.rows;
        })
        .catch((error) => {
          this.errored = true;
          console.log(error);
        })
        .finally(() => this.loading = false);
    },
    groupedByType(logs) {
      return groupByKey(logs, "type");
    },
    groupedByMonth() {
      return groupByTime(
        reStructuredObj(this.logs),
        (day) =>
          day.date.toLocaleString("en-us", { month: "long" }) +
          "-" +
          new Date().getFullYear().toString()
      );
    },
    groupedByDay() {
      return groupByTime(
        reStructuredObj(this.logs),
        (day) => day.date.getDate() + "-" + day.date.toLocaleString("en-us", { month: "short" }) +"-" + day.date.getFullYear().toString().substring(2));
    },
    groupedByHour() {
      return groupByDateTime(reStructuredObj(this.logs), (day) => day.date.getHours() + ':00, ' + day.date.getDate()+"-" + day.date.toLocaleString("en-us", { month: "short" }) +"-" + day.date.getFullYear().toString().substring(2));
    },
    sortingListLogsByMonth() {
      let listLogs = []; let visitorTypes = []; let totalRU = 0; let totalGuest = 0;
      for (let [key, item] of Object.entries(this.groupedByMonth(this.logs))) {
        Object.keys(groupByKey(item, "type")).forEach((key) => {
          if (visitorTypes.indexOf(key) === -1) visitorTypes.push(key);
          if (String(key).toLowerCase() === "registered_user") totalRU += Object.values(groupByKey(item, "type")[key]).length;
          else totalGuest += Object.values(groupByKey(item, "type")[key]).length;
        });
        this.sumRU = totalRU;
        this.sumGuest = totalGuest;
        this.types = visitorTypes;
        // console.log('types: ' + this.types.length);
        listLogs.push({
          month: String(key),
          data: item,
        });
      }
      return sortMonthASC(listLogs);
    },
    sortingListLogsByDay() {
      let listLogs = []; let totalRU = 0; let totalGuest = 0;
      for (let [key, item] of Object.entries(this.groupedByDay(this.logs))) {
        // console.log('Key: ' + key + ' - item: ' + item);
        Object.keys(groupByKey(item, "type")).forEach((key) => {
          if (String(key).toLowerCase() === "registered_user") totalRU += Object.values(groupByKey(item, "type")[key]).length;
          else totalGuest += Object.values(groupByKey(item, "type")[key]).length;
        });
        this.sumRUDaily = totalRU;
        this.sumGuestDaily = totalGuest;
        listLogs.push({
          date: String(key),
          data: item,
        });
      }
      return sortDateASC(listLogs);
    },
    sortingListLogsByHour() {
      let listLogs = []; let totalRU = 0; let totalGuest = 0;
      for (let [key, item] of Object.entries(this.groupedByHour(this.logs))) {
        // console.log('Key: ' + key + ' - item: ' + item);
        Object.keys(groupByKey(item, "type")).forEach((key) => {
          if (String(key).toLowerCase() === "registered_user") totalRU += Object.values(groupByKey(item, "type")[key]).length;
          else totalGuest += Object.values(groupByKey(item, "type")[key]).length;
        });
        this.sumRUHourly = totalRU;
        this.sumGuestHourly = totalGuest;
        listLogs.push({
          hour: String(key),
          data: item,
        });
      }
      return sortHourASC(listLogs);
    },
    next() {
      const active = parseInt(this.active);
      console.log("active: " + active);
      this.active = active < 2 ? active + 1 : 0;
    },
  },
  computed: {},
};
</script>
