<template>
  <div>
    <v-container fluid class="pt-0 grid-list-xl">
      <section-tooltip
        :title="$t('message.dashboard')"
        :tooltip="$t('message.dashboardOverview')"
      ></section-tooltip>
      <div v-if="errored">
        <p>{{ $t('message.getLogsError') }}</p>
      </div>
      <div v-else>
        <div v-if="loading" class="pr-4">
          <!-- {{ $t('message.loading') }} -->
          <indexes-block :b1="0" :b2="0" :b3="0" :b4="0" />
        </div>
        <div v-else>
          <indexes-block :b1="nTotalResidents" :b2="nPresentPeoples" :b3="nPresentResidents" :b4="nPresentGuests" />
        </div>
        <v-row>
          <v-col md="12">
            <v-select
              v-model="selectedDevices"
              :items="devices"
              label="Select Devices"
              item-text="displayName"
              item-value="name"
              multiple
              @input="getVistorData(selectedDevices)"
              @change="changeSelectedDevices"
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
          <v-col md="2">
            <socket @onmessage="reloadAllChart"/>
          </v-col>
        </v-row>
        <v-row>
          <app-card
            :heading="$t('message.visitorCollection')"
            colClasses="col-12"
            customClasses="mb-0 sales-widget"
            :fullBlock="false"
            :reloadable="true"
          >
            <div v-if="loading" class="pr-4">
              {{ $t('message.loading') }}
             </div>
           <div v-else>
              <visitors-collection
                ref="visitorLineChart"
                :url="this.strGetVisitorSummary"
                :xLabel="$t('message.byTimes').split(', ')"
                :yLabel="''"
                @clicked-btn="clickedBtn"/>                
          </div>
          </app-card>
        </v-row>
        <!-- Pass vs Fail temperature -->
        <v-row>
          <app-card
            :heading="$t('message.temperatureScreening')"
            colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 flex"
            customClasses="mb-0 sales-widget"
          >
            <div v-if="loading" class="pr-4">
              {{ $t('message.loading') }}
            </div>
            <div v-else>
              <temperature-collection
              ref="temperature" :url="this.strGetTemperatureSummary" :xLabel="$t('message.byTimes').split(', ')" :yLabel="''" @changeParams="reloadTemperature"/>
              <!-- <v-row class="cart-wrap hidden-only pl-6" justify="center">
                <v-col cols="4" class="d-custom-flex">
                  <span class="mr-2">
                    <i class="zmdi zmdi-account primary--text"></i>
                  </span>
                  <p class="mb-0">
                    <span class="d-block fs-14 fw-bold">52</span>
                    <span class="d-block fs-12 grey--text fw-normal">#No Registered User Pass</span>
                  </p>
                </v-col>
                <v-col cols="4" class="d-custom-flex">
                  <span class="mr-2">
                    <i class="zmdi zmdi-account-o warning--text"></i>
                  </span>
                  <p class="mb-0">
                    <span class="d-block fs-14 fw-bold">49</span>
                    <span class="d-block fs-12 grey--text fw-normal">#No Guest Pass</span>
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
              </v-row> -->
            </div>
          </app-card>
        </v-row>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { ChartConfig } from "Constants/chart-config";
import { groupByKey } from "Helpers/helpers";
import AppConfig from "Constants/AppConfig";

import IndexesBlock from "../commons/fr-dasboard-block";
import VisitorsCollection from "../fr-charts/VisitorsCollection";
import TemperatureCollection from "../fr-charts/TemperatureCollection";
import socket from "../../components/fr-admin/socket.vue";
export default {
  data() {
    return {
      loading: true,
      errored: false,
      devices: [],
      selectedDevices: [],
      dashboard: {
        devices: []
      },
      objSelectedDevice: {},
      nTotalResidents: '',
      nPresentPeoples: '',
      nPresentResidents: '',
      nPresentGuests: '',
      totalLogs: Number,
      visitorTypes: ["Guest", "Registered User"],
      ChartConfig,
      strGetVisitorSummary: `${AppConfig.ip}${AppConfig.api_port}/visitor-summary?deviceIds=`,
      strGetTemperatureSummary: `${AppConfig.ip}${AppConfig.api_port}/temperature-summary?deviceIds=`,
      pieChartData: [30, 50],
      temperatureChartData: [30, 50],
    };
  },
  created() {
  },
  components: {
    IndexesBlock,
    VisitorsCollection,
    TemperatureCollection,
    socket,
  },
  mounted() {
    this.nTotalResidents = "0"; this.nPresentPeoples = "0";  this.nPresentResidents = "0"; this.nPresentGuests = "0";
    this.getDevices();
    this.getUsersSummary();

    setInterval(() => {
      this.$axios
        .get("/registered/device/list")
        .then((response) => {
          const disconnected_devices = this.updateStatusDevices(response.data);
          console.log(disconnected_devices);
        })
        .catch((error) => {
          console.log(error);
        })
    }, 1000 * 60 * 1);
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
      console.log(238, [arrRU, arrGuest]);

      return [arrRU, arrGuest];
    },
    groupByType() {
      return groupByKey(this.objDLOffline.rows, "type");
    },
  },
  methods: {
    reloadAllChart() {
      this.getSumPeoples(this.selectedDevices);
      this.$refs.visitorLineChart.reloadWithDefaultUrl(this.strGetVisitorSummary)
      this.getTemperatureSummary(this.selectedDevices);
      this.clickedBtn();
    },
    changeSelectedDevices() {
      console.log(246, this.selectedDevices);
      this.$refs.visitorLineChart.reloadWithDefaultUrl(this.strGetVisitorSummary)
      this.getTemperatureSummary(this.selectedDevices);
      this.clickedBtn();
    },
    async getDevices() {
      let devices = []
      await this.$axios
        .get("/registered/device/list")
        .then((response) => {
          Object.values(response.data).forEach(val => { if (devices.indexOf(val) === -1) devices.push(val); });
          this.getVisitorSummary(devices);
          this.getTemperatureSummary(devices);
          this.selectedDevices = devices
          this.updateStatusDevices(response.data)
        })
        .catch((error) => {
          this.errored = true;
          console.log(error);
        })
        .finally(async () => {
          this.loading = false
          // Bind this array of deviceObj to a variable
          const devicesResponse = await this.$axios.get(`${AppConfig.ip}${AppConfig.api_port}/devices?deviceIds=` + devices.join(','));
          this.devices = devicesResponse.data.map(device => {
            return {
              ...device,
              displayName: device.displayName ? device.displayName : device.displayName ? device.displayName : `${device.siteId ? device.siteId + '-' : ""}${device.blockId ? device.blockId + '-' : ""}${device.floorId ? device.floorId + '-' : ""}${device.customName ? device.customName: ""}`
            }
          })
        });
    },
    selectAllDevices() {
      this.$nextTick(() => {
        this.nTotalResidents = "0"; this.nPresentPeoples = "0";  this.nPresentResidents = "0"; this.nPresentGuests = "0";
        if (this.cSelectAllDevices) {
          this.selectedDevices = [];
        } else {
          this.selectedDevices = this.devices.map(device => device.name).slice();
        }
        this.getVisitorSummary(this.selectedDevices);
        this.getTemperatureSummary(this.selectedDevices);
        this.getSumPeoples(this.selectedDevices);
      });
    },
    getVistorData(device) {
      this.getVisitorSummary(device)
      this.getSumPeoples(device);
    },
    async getSumPeoples(dts) {
      let strDevices = ""; this.nTotalResidents = "0"; this.nPresentPeoples = "0";  this.nPresentResidents = "0"; this.nPresentGuests = "0";
      Object.values(dts).forEach(dt => {
        strDevices += dt + ",";
      });
      await this.$axios
        .get(`${AppConfig.ip}${AppConfig.api_port}/users-summary?deviceIds=` + strDevices)
        .then(response => {
          this.nTotalResidents = response.data["totalResidents"],
          this.nPresentPeoples = response.data["presentPeoples"],
          this.nPresentResidents = response.data["presentResidents"],
          this.nPresentGuests = response.data["presentGuests"]
        })
        .catch((error) => {
          console.log(error);
        })
        .finally();
    },
    getVisitorSummary(arrDevices) {
      let strDevices = ""; this.strGetVisitorSummary = `${AppConfig.ip}${AppConfig.api_port}/visitor-summary?deviceIds=`;
      if(arrDevices != null) {
        Object.values(arrDevices).forEach(dv => {
          strDevices += dv + ",";
        });
        this.strGetVisitorSummary += strDevices;
        return this.strGetVisitorSummary
      }
      
    },
    getTemperatureSummary(arrDevices) {
      let strDevices = ""; this.strGetTemperatureSummary = `${AppConfig.ip}${AppConfig.api_port}/temperature-summary?deviceIds=`;
      if(arrDevices != null) {
        Object.values(arrDevices).forEach(dv => {
          strDevices += dv + ",";
        });
        this.strGetTemperatureSummary += strDevices;
        return this.strGetTemperatureSummary
      }
    },
    reloadPieChart(data) {
      // Object.keys(data[1]).forEach(key => {
      //   console.log('key: ' + key + ' - val: ' + data[1][key]);
      // });
      const total = data.reduce((total, unitData) => {
        const { noStranger, noUser } = unitData
        total.totalStranger = total.totalStranger + noStranger
        total.totalUser = total.totalUser + noUser
        return total
      }, { totalStranger: 0, totalUser: 0 })

      this.pieChartData = [ total.totalStranger, total.totalUser ]
      this.$refs.visitorPieChart.reloadPieChart()
    },
    reloadTemperature(data) {
      const total = data.reduce((total, unitData) => {
        const { noStranger, noUser } = unitData
        total.totalStranger = total.totalStranger + noStranger
        total.totalUser = total.totalUser + noUser
        return total
      }, { totalStranger: 0, totalUser: 0 })

      this.temperatureChartData = [ total.totalStranger, total.totalUser ]
      this.$refs.temperature.reloadTemperature()
    },
    async getUsersSummary() {
      await this.$axios
        .get(`${AppConfig.ip}${AppConfig.api_port}/users-summary?deviceIds=`)
        .then(response => {
          this.nTotalResidents = response.data["totalResidents"],
          this.nPresentPeoples = response.data["presentPeoples"],
          this.nPresentResidents = response.data["presentResidents"],
          this.nPresentGuests = response.data["presentGuests"]
        })
        .catch((error) => {
          console.log(error);
        })
        .finally();
    },
    clickedBtn() {
      const url = `${this.strGetTemperatureSummary}&endDate=${this.$refs.visitorLineChart.date}&dataPointType=${this.$refs.visitorLineChart.selectedBtn}&dataPointNumber=${this.$refs.visitorLineChart.numDataPoint}&traffic=${this.$refs.visitorLineChart.trafficValue}`
      this.$refs.temperature.reloadWithDefaultUrl(url)
    },
    updateStatusDevices(activeDevices) {
      let disconnected_devices = this.$axios
      .patch(`${AppConfig.ip}${AppConfig.api_port}/devices/status`, { activeDevices })
      .then(() => {return(disconnected_devices);})
      .catch((error) => {
        console.log(error);
      })
    }
  },
  beforeDestroy () {
  },
};
</script>