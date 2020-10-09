<template>
  <div>
    <v-container fluid class="pt-0 grid-list-xl">
      <section-tooltip
        :title="$t('message.dashboard')"
        :tooltip="$t('message.dashboardOverview')"
      ></section-tooltip>
      <indexes-block 
        :b1="nTotalResidents"
        :b2="nPresentPeoples"
        :b3="nPresentResidents"
        :b4="nPresentGuests" />
      <v-row>
        <v-col md="7">
          <v-select
            v-model="selectedDevices"
            :items="devices"
            label="Select Devices"
            return-object
            multiple
            @input="getVistorData(selectedDevices)"
          >
            <template v-slot:prepend-item>
              <v-list-item ripple @click="selectAllDevices">
                <v-list-item-action>
                  <v-icon
                    :color="
                      dashboard.devices.length > 0
                        ? 'indigo darken-4'
                        : ''
                    "
                    >{{ icon }}</v-icon
                  >
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    >Select All</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
        </v-col>
      </v-row>
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
          />
        </app-card>
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
      <!-- Pass vs Fail temperature -->
      <v-row>
        <app-card
          :heading="$t('message.temperatureScreening')"
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 flex"
          customClasses="mb-0 sales-widget"
        >
          <general-column-chart />
          <v-row class="cart-wrap hidden-only pl-6" justify="center">
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-invert-colors primary--text"></i>
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">52</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.pass')}}</span>
              </p>
            </v-col>
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-invert-colors-off error--text"></i>
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">49</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.failed')}}</span>
              </p>
            </v-col>
            <v-col cols="2" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-male-female success--text"></i>
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">101</span>
                <span
                  class="d-block fs-12 grey--text fw-normal"
                >{{$t('message.guestPass')}}</span>
              </p>
            </v-col>
            <v-col cols="2" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-nature-people error--text"></i>
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">101</span>
                <span
                  class="d-block fs-12 grey--text fw-normal"
                >{{$t('message.guestFailed')}}</span>
              </p>
            </v-col>
          </v-row>
        </app-card>
        <!-- <app-card
          :heading="$t('message.statisticsByDay')"
          colClasses="col-xl-4 col-lg-5 col-md-5 col-sm-6 col-12"
          customClasses="mb-0 sales-widget"
        >
          <index-statistics />
        </app-card> -->
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { ChartConfig } from "Constants/chart-config";
import { groupByKey } from "Helpers/helpers"

import IndexesBlock from "../commons/fr-dasboard-block";
import VisitorsCollection from "../fr-charts/GeneralVisitorsCollectionV1";
import VisitorStat from "../fr-detection-logs/VisitorStat";
import GeneralColumnChart from "../fr-charts/GeneralColumnChart";
// import IndexStatistics from "../commons/fr-statistics";

export default {
  data() {
    return {
      devices: [],
      selectedDevices: [],
      dashboard: {
        devices: []
      },
      objSelectedDevice: {},
      nTotalResidents: Number,
      nPresentPeoples: Number,
      nPresentResidents: Number,
      nPresentGuests: Number,
      totalLogs: Number,
      visitorTypes: [],
      ChartConfig,
    };
  },
  components: {
    IndexesBlock,
    VisitorsCollection,
    VisitorStat,
    GeneralColumnChart,
    // IndexStatistics,
  },
  mounted() {
    this.getDevices();
    this.totalLogs = this.objDLOffline.rows.length;
    Object.keys(this.groupByType).forEach((key) => {
      this.visitorTypes.push(key);
    });
  },
  computed: {
    ...mapGetters(["fDLO", "fDetectionLogsOnline1", "fDetectionLogsOffline"]),
    cSelectAllDevices() {
      return this.selectedDevices.length === this.devices.length;
    },
    cSelectSomeDevices() {
      return this.selectedDevices.length > 0 && !this.cSelectAllDevices;
    },
    icon() {
      if (this.cSelectAllDevices) return "mdi-close-box";
      if (this.cSelectSomeDevices) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
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
    
  },
  methods: {
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
    selectAllDevices() {

      this.$nextTick(() => {
        if (this.cSelectAllDevices) {
          this.selectedDevices = [];
        } else {
          this.selectedDevices = this.devices.slice();
        }
        this.getSumPeoples(this.selectedDevices);
      });
    },
    getVistorData(device) {
      this.getSumPeoples(device);
    },
    async getSumPeoples(dts) {
      let strDevices = "";
      Object.values(dts).forEach(dt => {
        strDevices += dt + ",";
      });
      await this.$axios
        .get('http://localhost:8081/users-summary?deviceIds=' + strDevices)
        .then(response => (
          // console.log("dt: " + JSON.parse(JSON.stringify([response.data])))
          // Object.keys(response.data.forEach((key) => {
          //   console.log("key: " + key)
          // }))
          // this.objSelectedDevice = response.data,
          this.nTotalResidents = response.data["totalResidents"],
          this.nPresentPeoples = response.data["presentPeoples"],
          this.nPresentResidents = response.data["totalResidents"],
          this.nPresentGuests = response.data["presentPeoples"],
          console.log("nTotalResidentskey: " + this.nTotalResidents + "nPresentPeoples: " + this.nPresentPeoples + "nPresentResidents: " + this.nPresentResidents + "nPresentGuests: " + this.nPresentGuests)
        ));
        // "totalResidents": 2,
        // "presentPeoples": 2,
        // "presentResidents": 1,
        // "presentGuests": 1
    }
  },
};
</script>