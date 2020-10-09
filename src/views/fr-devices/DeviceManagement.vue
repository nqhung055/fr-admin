<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid class="grid-list-xl pt-0">
      <div class="crypto-dash-wrap">
        <v-row>
          <!-- Dection logs List -->
          <app-card
            colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
            customClasses="mb-0"
          >
            <!-- :heading="$t('message.detectionLogs')" -->
            <template>
              <div>
                <v-card flat>
                  <div class="table-responsive">
                    <div class="mb-6">
                      <v-btn
                        @click="changeBtn('REGISTERED_USER')"
                        :class="{ primary: isReg }"
                        >{{ $t("message.employee") }}</v-btn
                      >
                      <v-btn
                        class="ml-2"
                        @click="changeBtn('STRANGER')"
                        :class="{ primary: isStr }"
                        >{{ $t("message.stranger") }}</v-btn
                      >                      
                    </div>                    
                    <div v-if="errored">
                      <p>{{ $t("message.getLogsError") }}</p>
                    </div>
                    <div v-else>
                      <div v-if="loading">{{ $t("message.loading") }}</div>
                        <div v-else>
                          <div>
                              <v-select
                                v-model="selectedDevice"
                                :items="devices"
                                label="Select Device"
                                @change="changeSelectedDevice()"
                                single-line
                              ></v-select>
                              <!-- <datetime format="YYYY-MM-DD H:i:s" width="auto" v-model="val" firstDayOfWeek="1"></datetime> -->
                              <!-- <date-time-picker
                                :startDate = "startDate"
                                :endDate = "endDate"    
                                :singleDate = "false"    
                                :alignRight = "true"    
                                @onChange = "dtOnChange"  
                              /> -->
                              <Datetime 
                              type="datetime"
                              v-model="date"
                              input-class="my-class"
                              value-zone="America/New_York"
                              zone="Asia/Shanghai"
                              :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }"
                              :phrases="{ok: 'Continue', cancel: 'Exit'}"
                              :hour-step="2"
                              :minute-step="15"
                              :min-datetime="minDatetime"
                              :max-datetime="maxDatetime"
                              :week-start="7"
                              use12-hour
                              auto
                              class="theme-orange"
                              ></Datetime>
                          </div>
                        <div id="dt">
                        </div>
                        <v-data-table :headers="headers" :items="selectedLogs">
                          <template v-slot:item="{ item }">
                            <tr>
                              <td>
                                {{
                                  selectedLogs
                                    .map(function (x) {
                                      return x.id;
                                    })
                                    .indexOf(item.id)
                                }}
                              </td>
                              <td>
                                <img
                                  :src="item.photo"
                                  class="img-responsive"
                                  height="50"
                                  width="50"
                                />
                              </td>
                              <td>{{ item.userId }}</td>
                              <td>{{ item.bodyTemperature }}</td>
                              <td>{{ item.roomTemperature }}</td>
                              <td>{{ item.fromDevice }}</td>
                              <td>{{ item.type }}</td>
                              <td>{{ item.detectionTime }}</td>
                              <!-- <td class="text-center">
                                <v-btn
                                  icon
                                  class="mx-0"
                                  @click="deleteLog(item)"
                                >
                                  <v-icon class="error--text">close</v-icon>
                                </v-btn>
                              </td> -->
                            </tr>
                          </template>
                          <template slot="no-data">
                            <span>{{ $t("message.noItemsFound") }}</span>
                          </template>
                        </v-data-table>
                      </div>
                    </div>
                    <delete-confirmation-dialog
                      ref="deleteConfirmationDialog"
                      heading="Pelease confirm ...?"
                      message="Are you sure to delete this log?"
                      @onConfirm="onDeleteLog"
                    ></delete-confirmation-dialog>
                  </div>
                </v-card>
              </div>
            </template>
          </app-card>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>

import Vue from 'vue'
import { ChartConfig } from "Constants/chart-config";
import { groupByKey } from "Helpers/helpers";

import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
// Vue.use(datetime);
// Vue.component('vue-datetime', window.VueDatetime.Datetime);
Vue.extend({
  template: '...',
  components: {
    datetime: Datetime
  }
});

// import datetime from 'vuejs-datetimepicker';

// import '@lazy-copilot/datetimepicker/dist/datetimepicker.css'
// import { DateTimePicker } from "@lazy-copilot/datetimepicker";

export default {
  data() {
    return {
      isReg: true,
      isStr: false,
      selectedBtn: "REGISTERED_USER",
      selectedLogs: [],
      logsList: [],
      selectedDevice: "",
      devices: [],
      date: "",
      startDate: new Date("2018-12-13T00:03"),
      endDate: new Date("2018-12-16T23:29"),
      minDatetime:new Date("2018-12-13T00:03").toString(),
      maxDatetime:new Date("2018-12-16T23:29").toString(),
      ChartConfig,
      loading: true,
      errored: false,
      headers: [
        {
          text: "No",
          align: "left",
          sortable: false,
          value: "number",
        },
        {
          text: "Photo",
          align: "center",
          sortable: false,
          value: "photo",
        },
        {
          text: "User Id",
          align: "left",
          sortable: false,
          value: "userId",
        },
        {
          text: "Body Temperature",
          align: "left",
          sortable: false,
          value: "bodyTemperature",
        },
        {
          text: "Room Temperature",
          align: "left",
          sortable: false,
          value: "roomTemperature",
        },
        {
          text: "fromDevice",
          align: "left",
          sortable: false,
          value: "fromDevice",
        },
        {
          text: "Visitor",
          align: "left",
          sortable: false,
          value: "type",
        },
        {
          text: "Time",
          align: "left",
          sortable: false,
          value: "detectionTime",
        },
        // {
        //   text: "Remove",
        //   sortable: false,
        //   align: "center",
          // class: "w-10",
        // },
      ],
    };
  },
  mounted() {
    this.getSelectedByVisitor();
    this.getLogs();
    this.getDevices();
  },
  methods: {
    getSelectedByVisitor(key) {
      this.selectedLogs = this.logsList[key];
    },
    async getLogs() {
      // pageIndex=0&pageSize=1000000&deviceId=&from_date=&to_date=&userId=
      await this.$axios
        .get(`/logs?pageIndex=0&pageSize=1000000&deviceId=&from_date=&to_date=&userId=`)
        .then((response) => {
          this.logsList = groupByKey(response.data.rows, "type");
          return (this.selectedLogs = this.logsList[this.selectedBtn]);
        })
        .catch((error) => {
          this.errored = true;
          console.log(error);
        })
        .finally(() => (this.loading = false));
    },
    async getDevices() {
      await this.$axios
        .get("/registered/device/list")
        .then((response) => {          
          return this.devices = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally();
    },
    changeBtn(value) {
      switch (value) {
        case "STRANGER":
          this.isReg = false;
          this.isStr = true;
          break;
        default:
          this.isReg = true;
          this.isStr = false;
          break;
      }
      this.selectedBtn = value;
      this.selectedDevice = "";
      this.getSelectedByVisitor(value);
      // console.log("this.selectedCoin="+this.selectedCoin)
    },
    changeSelectedDevice() {
      this.selectedLogs = this.logsList[this.selectedBtn];
      this.selectedLogs = groupByKey(this.selectedLogs, "fromDevice")[this.selectedDevice];
    },
    deleteLog(log) {
      this.$refs.deleteConfirmationDialog.openDialog();
      this.selectDeletedLog = log;
    },
    onDeleteLog() {
      this.$refs.deleteConfirmationDialog.close();
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
        this.$store.dispatch("onDeleteLog", this.selectDeletedLog);
      }, 1500);
    },
    dtOnChange: function(data) {
      console.log("data: ", data);
    }
  },
  computed: {
    groupedByType() {
      return groupByKey(this.logsList, "type");
    },
  },
  components: { Datetime },
  // setup (props, context) {
  //   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
  //     'September', 'October', 'November', 'December']

  //   const startingYear = 2010
  //   const numberofYears = 20

  //   return {
  //     months,
  //     numberofYears,
  //     startingYear
  //   }
  // },
};
</script>
<style>
#dt {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
};
.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #FF9800;
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: #ff9800;
}

</style>
