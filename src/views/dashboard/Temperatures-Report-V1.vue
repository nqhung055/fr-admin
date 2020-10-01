<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid grid-list-xl pt-0>
      <indexes-block />
      <!-- Monthly -->
      <v-row>
        <app-card
          :heading="$t('message.temperatureScreeningMonthly')"
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
          </div> -->
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
                <span
                  class="d-block fs-12 grey--text fw-normal"
                >{{$t('message.totalVisitors')}}</span>
              </p>
            </v-col>
          </v-row>
        </app-card>
        <app-card
          :heading="$t('message.visitorSeparations')"
          colClasses="col-xl-4 col-lg-4 col-md-5 col-sm-6 col-12"
          customClasses="temperature-screening-wrap"
        >
          <failed-screening-ratio></failed-screening-ratio>
        </app-card>
      </v-row>
      <!-- Daily -->
      <v-row>
        <app-card
          :heading="$t('message.temperatureScreeningDaily')"
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
          </div> -->
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
                <span
                  class="d-block fs-12 grey--text fw-normal"
                >{{$t('message.totalVisitors')}}</span>
              </p>
            </v-col>
          </v-row>
        </app-card>
        <app-card
          :heading="$t('message.visitorSeparations')"
          colClasses="col-xl-4 col-lg-4 col-md-5 col-sm-6 col-12"
          customClasses="temperature-screening-wrap"
        >
          <failed-screening-ratio></failed-screening-ratio>
        </app-card>
      </v-row>
      <!-- Hourly -->
      <v-row>
        <app-card
          :heading="$t('message.temperatureScreeningHourly')"
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
          </div> -->
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
                <span
                  class="d-block fs-12 grey--text fw-normal"
                >{{$t('message.totalVisitors')}}</span>
              </p>
            </v-col>
          </v-row>
        </app-card>
        <app-card
          :heading="$t('message.visitorSeparations')"
          colClasses="col-xl-4 col-lg-4 col-md-5 col-sm-6 col-12"
          customClasses="temperature-screening-wrap"
        >
          <failed-screening-ratio></failed-screening-ratio>
        </app-card>
      </v-row>
      <v-row>
        <div>
          <div v-for="(items, id) in sortingListLogsByHour()" :key="id" class="hour">
            <h4>{{ items.hour == currHour ? 'This hour' : items.hour }}</h4>
            <div v-for="(v, k) in items.data" :key="k">
              Visitor: {{ v.type }} - Date: {{ v.date.toLocaleTimeString() }} -Body Temp: {{ v.bodyTemp }} - Room Temp: {{ v.roomTemp }}
            </div>
          </div>
        </div>
      </v-row>
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
      </v-row> -->
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import { groupByKey, groupByTime, groupByDateTime, sortMonthASC, sortDateASC, sortHourASC, reStructuredObj, } from "Helpers/helpers";
import IndexesBlock from "../commons/fr-indexes-block";
import FailedScreeningRatio from "../fr-detection-logs/TemperatureFailedScreeningRatio";

// chart config
import { ChartConfig } from "Constants/chart-config";
import GeneralVisitorChart from "../fr-charts/GeneralChartV2";

export default {
  components: {
    GeneralVisitorChart,
    IndexesBlock,
    FailedScreeningRatio,
  },
  data() {
    return {
      logs: [],
      currMonth: new Date().toLocaleString('en-us', { month: 'long' }),
      currDay: new Date().getDate(),
      currHour: new Date().getHours(),
      month: [],
      day: [],
      hour: [],
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
    const dlResponse = await this.$axios.get(`/logs?pageIndex=0&pageSize=1000000`);
    if (dlResponse.status === 200) {
      this.logs = dlResponse.data.rows;
    } else {
      Vue.notify({
        group: "loggedIn",
        type: "error",
        text: "Can not get Dectection logs. Please try again later!",
      });
    }
    Object.keys(this.groupedByMonth(this.logs)).forEach(key => {
      this.month.push(key);
    });
  },
  methods: {
    async getLogs() {
      await this.$axios.get(`/logs?pageIndex=0&pageSize=1000000`).then((response) => {
        this.logs = response.data;
      })
      .catch((error) => console.log(error));
    },
    groupedByType(logs) {
      return groupByKey(logs, "type");
    },
    groupedByMonth(logs) {
      return groupByTime(
        reStructuredObj(logs),
        (day) => day.date.toLocaleString("en-us", { month: "long" })
      );
    },
    groupedByDay(logs) {
      return groupByTime(
        reStructuredObj(logs),
        (day) => day.date.getDate()
      );
    },
    groupedByHour(logs) {
      return groupByDateTime(
        reStructuredObj(logs),
        (day) => day.date.toLocaleDateString() + ' : ' + day.date.getHours()
      );
    },
    sortingListLogsByMonth() {
      let listLogs = [];
      for (let [key, item] of Object.entries(this.groupedByMonth(this.logs))) {
        listLogs.push({
          month: String(key),
          data: item,
        });
      }      
      return sortMonthASC(listLogs);
    },
    sortingListLogsByDay() {
      let listLogs = [];
      for (let [key, item] of Object.entries(this.groupedByDay(this.logs))) {
        listLogs.push({
          date: String(key),
          data: item,
        });
      }
      return sortDateASC(listLogs);
    },
    sortingListLogsByHour() {
      let listLogs = [];
      for (let [key, item] of Object.entries(this.groupedByHour(this.logs))) {
        listLogs.push({
          hour: String(key),
          data: item,
        });
      }
      return sortHourASC(listLogs);
    },
    next() {
      const active = parseInt(this.active);
      console.log('active: ' + active);
      this.active = active < 2 ? active + 1 : 0;
    },
  },
  computed: {

  },
};
</script>
