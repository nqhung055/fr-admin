<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid class="grid-list-xl py-0 mt-n3">
      <v-row>
        <app-card
          :fullBlock="true"
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        >
          <v-card>
            <div v-if="errored">
              <p>{{ $t("message.getLogsError") }}</p>
            </div>
            <div v-else>
              <div v-if="loading" class="pr-4">
                {{ $t("message.loading") }}
              </div>
              <div v-else>
                <v-card-text>
                  <v-row>
                    <v-col cols="3">
                      <v-select v-model="userType" :items="userTypes" item-text="name" item-value="key" label="Select User Types" @change="getLogs(!userType ? '' : userType, !siteId ? '' : siteId, !blockId ? '' : blockId, !floorId ? '' : floorId, !compId ? '' : compId)" />
                    </v-col>
                    <v-col cols="3" class="header-table-select-devices">
                      <v-select v-model="selectedDevice" :items="devices" item-text="displayName" item-value="name" label="Select Device" @change=" getLogs(); siteId = '-- Please select site --'; blockId = '-- Please select block --'; floorId = '-- Please select floor --'; compId = '-- Please select company --';" />
                    </v-col>
                    <v-col cols="3">
                      <v-select v-model="gateType" :items="gateTypes" item-text="name" item-value="key" label="Select Entry/Exit" @change="getLogs(!userType ? '' : userType, !siteId ? '' : siteId, !blockId ? '' : blockId, !floorId ? '' : floorId, !compId ? '' : compId)" />
                    </v-col>
                    <v-col cols="3" class="header-table-search">
                      <v-text-field v-model="searchUserKey" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3" sm="3" md="2" lg="3" xl="1">
                      <v-select
                        v-model="siteId"
                        :items="userSites"
                        item-text="name"
                        item-value="shortName"
                        single-line
                        label="Select Site"
                        :disabled="!selectedDevice"
                        @change="getLogs(!userType ? '' : userType, !siteId ? '' : siteId, !blockId ? '' : blockId, !floorId ? '' : floorId, !compId ? '' : compId);"></v-select>
                    </v-col>
                    <v-col cols="3" sm="3" md="2" lg="3" xl="1">
                      <v-select
                        v-model="blockId"
                        :items="userBlocks"
                        item-text="name"
                        item-value="shortName"
                        single-line
                        label="Select Block"
                        :disabled="!selectedDevice"
                        @change="getLogs(!userType ? '' : userType, !siteId ? '' : siteId, !blockId ? '' : blockId, !floorId ? '' : floorId, !compId ? '' : compId);"></v-select>
                    </v-col>
                    <v-col cols="3" sm="3" md="2" lg="3" xl="1">
                      <v-select
                        v-model="floorId"
                        :items="userFloors"
                        item-text="name"
                        item-value="shortName"
                        single-line
                        label="Select Floor"
                        :disabled="!selectedDevice"
                        @change="getLogs(!userType ? '' : userType, !siteId ? '' : siteId, !blockId ? '' : blockId, !floorId ? '' : floorId, !compId ? '' : compId);"></v-select>
                    </v-col>
                    <v-col cols="3" sm="3" md="2" lg="3" xl="1">
                      <v-select
                        v-model="compId"
                        :items="userCompanies"
                        item-text="name"
                        item-value="shortName"
                        single-line
                        label="Select Company"
                        :disabled="!selectedDevice"
                        @change="getLogs(!userType ? '' : userType, !siteId ? '' : siteId, !blockId ? '' : blockId, !floorId ? '' : floorId, !compId ? '' : compId);"></v-select>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="reports"
                  :search="searchUserKey"
                  item-key=""
                >
                  <template v-slot:item="{ item }">
                    <tr>
                      <!-- <td>
                        {{
                          reports
                            .map(function (x) {return x.id;})
                            .indexOf(item.id)
                        }}
                      </td> -->
                      <td>{{ new Date(item.detectionTime).toTimeString().substr(0,8) }}</td>
                      <td><img :src="item.photo" class="img-responsive" height="50" width="50" /></td>
                      <td>{{ item.bodyTemperature > 37.5 ? `FAIL` : 35.5 > item.bodyTemperature ? `FAIL` : 'PASS' }}</td>
                      <!-- <td>{{ 35.5 > item.bodyTemperature ? `FAIL` : `PASS` }}</td> -->
                      <td>{{ item.devType }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.siteId }}-{{ item.blockId }}-{{ item.floorId }}-{{ item.devName }}</td>
                      <td>{{ item.bodyTemperature }}</td>
                      <td>{{ String(item.icCard) === 'null' ? '' : $t('message.star') + String(item.icCard).substr(-4) }}</td>
                      <td>{{ item.companyName }}</td>
                      <td>{{ item.phone }}</td>
                      <td>{{ item.type === 'REGISTERED_USER' ? 'Registerd user' : 'Guest' }}</td>
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
                  <!-- <template slot="headerCell" slot-scope="props">
                    <v-tooltip bottom>
                      <span slot="activator">{{ props.header.text }}</span>
                      <span>{{ props.header.text }}</span>
                    </v-tooltip>
                  </template>
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn color="success" @click="editUser(item)">
                      <v-icon>ti-pencil</v-icon>
                    </v-btn>
                    <v-btn color="error" @click="removeUser(item)">
                      <v-icon>ti-trash</v-icon>
                    </v-btn>
                  </template> -->
                </v-data-table>
              </div>
            </div>
          </v-card>
        </app-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Vue from "vue";
import AppConfig from "../../constants/AppConfig";

export default {
  components: {},
  data() {
    return {
      loader: true,
      loading: true,
      errored: false,
      searchUserKey: "",
      headers: [
        {
          text: "Time",
          align: "left",
          sortable: false,
          value: "detectionTime",
        },
        {
          text: "Photo",
          align: "left",
          sortable: false,
          value: "photo",
        },
        {
          text: "Pass/Fail",
          align: "left",
          sortable: false,
          value: "bodyTemperature",
        },
        {
          text: "Entry/Exit",
          align: "left",
          sortable: false,
          value: "devType",
        },
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name",
        },
        {
          text: "Device",
          align: "left",
          sortable: false,
          value: "fromDevice",
        },
        {
          text: "Body Temp",
          align: "left",
          sortable: false,
          value: "bodyTemperature",
        },
        {
          text: "ID Number",
          align: "left",
          sortable: false,
          value: "icCard",
        },
        {
          text: "Company",
          align: "left",
          sortable: false,
          value: "companyName",
        },
        {
          text: "Contact",
          align: "left",
          sortable: false,
          value: "phone",
        },
        {
          text: "Type",
          align: "left",
          sortable: false,
          value: "type",
        },
        // { text: "Action", align: "center", value: "action", width: "10%" },
      ],
      devices: [],
      reports: [],
      selectedUsersToDelete: [],
      selectedDevice: "",
      showNewUserDialog: false,
      showEditUserDialog: false,
      isShowEffectFromPanel: false,
      isShowEffectFromMinutePanel: false,
      isShowExpiredAtPanel: false,
      isShowExpiredAtMinutePanel: false,
      effectFromStringMinute: "",
      expiredAtStringMinute: "",

      isShowEndTime: false,
      isShowStartTime: false,
      endTime: "",
      startTime: "",

      dt: new Date().toTimeString(),
      facePhoto: {},
      srcFacePhoto: "",
      isNewUserValid: true,
      editedUser: {},
      editUserEffectFromStringMinute: "",
      editUserExpiredAtStringMinute: "",
      exelFile: {},
      isShowPopupUploadUsers: false,
      isShowPopupSyncUsers: false,
      showConfirmDeleteUsersDialog: false,
      userType: "all",
      userTypes: [{"key":"all", "name":"All"}, {"key":"registered_user", "name":"Registered users"}, {"key":"stranger", "name":"Guests"}],
      gateType: "entry",
      gateTypes: [{"key":"all", "name":"All"}, {"key":"entry", "name":"Entry",}, {"key":"exit", "name":"Exit"}],
      userBlocks: [],
      blockId: "-- Please select block --",
      userSites: [],
      siteId: "-- Please select site --",
      userFloors: [],
      floorId: "-- Please select floor --",
      userCompanies: [],
      compId: "-- Please select company --",
    };
  },
  mounted() {
    this.getDevices();
    this.getUserRelatedData();
  },
  computed: {
  },
  methods: {
    async getLogs(userType = "", sId = "", bId = "", fId = "", cId = "") {
      if (this.selectedDevice !== null || this.selectedDevice !== "") {
        // &page=1&pageSize=5&${this.siteName}
        let sDN = !Object.isFrozen(this.selectedDevice) ? this.selectedDevice["name"] : this.selectedDevice;
        let sUserType = userType === "all" ? "" : userType;
        let sSite = sId === "-- Please select site --" ? "" : sId;
        let sBlock = bId === "-- Please select block --" ? "" : bId;
        let sFloor = fId === "-- Please select floor --" ? "" : fId;
        let sComp = cId === "-- Please select company --" ? "" : cId;
        let sAPI = `${AppConfig.ip}${AppConfig.api_port}/reports?device=${sDN}${!sUserType ? "" : "&type=" + sUserType}${!sSite ? "" : "&site=" + sSite}${!sBlock ? "" : "&block=" + sBlock}${!sFloor ? "" : "&floor=" + sFloor}${!sComp ? "" : "&comp=" + sComp}`;
        // console.log('Log api: ' + sAPI);
        await this.$axios
          .get(sAPI)
          .then((response) => {
            this.reports = response.data || [];
          })
          .catch((error) => {
            this.errored = true;
            console.log(error);
          })
          .finally(() => (this.loading = false));
      }
    },
    async getDevices() {
      let devices = [];
      await this.$axios
        .get("/registered/device/list")
        .then((gwRes) => { Object.values(gwRes.data).forEach(val => {if (devices.indexOf(val) === -1) devices.push(val)})})
        .catch((error) => {
          this.errored = true;
          Vue.notify({
            group: "loggedIn",
            type: "error",
            text: "Can not get Devive list. Please reload page!",
          });
          console.log(error);
        })
        .finally(async () => {
          await this.$axios
            .get(`${AppConfig.ip}${AppConfig.api_port}/devices?deviceIds=` + devices.join(","))
            .then((beRes) => {
              this.devices = beRes.data.map((device) => {
                return {
                  ...device,
                  displayName: device.displayName ? device.displayName : device.displayName ? device.displayName : `${device.siteId ? device.siteId + "-" : ""}${device.blockId ? device.blockId + "-" : "" }${device.floorId ? device.floorId + "-" : ""}${device.customName ? device.customName : ""}`,
                };
              });
              this.selectedDevice = this.devices[0];
              this.getLogs();
            })
            .catch((error) => {
              this.errored = true;
              console.log(error);
            })
            .finally(() => {
              this.loading = false;
            });
        });
    },
    async getUserRelatedData() {
      const blocks = await this.$axios.get(
        `${AppConfig.ip}${AppConfig.api_port}/blocks`
      );
      const companies = await this.$axios.get(
        `${AppConfig.ip}${AppConfig.api_port}/companies`
      );
      const floors = await this.$axios.get(
        `${AppConfig.ip}${AppConfig.api_port}/floors`
      );
      const sites = await this.$axios.get(
        `${AppConfig.ip}${AppConfig.api_port}/sites`
      );
      let arrSites = [{ shortname: "", name: "-- Please select site --" }];
      let arrBlocks = [{ shortname: "", name: "-- Please select block --" }];
      let arrFloors = [{ shortname: "", name: "-- Please select floor --" }];
      let arrCompanies = [
        { shortname: "", name: "-- Please select company --" },
      ];
      try {
        if (
          blocks.status === 200 &&
          companies.status === 200 &&
          floors.status === 200 &&
          sites.status === 200
        ) {
          Object.values(sites.data).forEach((val) => {
            arrSites.push({ shortName: val["shortName"], name: val["name"] });
          });
          Object.values(blocks.data).forEach((val) => {
            arrBlocks.push({ shortName: val["shortName"], name: val["name"] });
          });
          Object.values(floors.data).forEach((val) => {
            arrFloors.push({ shortName: val["shortName"], name: val["name"] });
          });
          Object.values(companies.data).forEach((val) => {
            arrCompanies.push({
              shortName: val["shortName"],
              name: val["name"],
            });
          });
          this.userBlocks = arrBlocks;
          this.userCompanies = arrCompanies;
          this.userFloors = arrFloors;
          this.userSites = arrSites;
        }
      } catch (error) {
        this.errored = true;
        console.log(error);
      } finally {
        () => (this.loading = false);
      }
    },
  },
};
</script>

<style>
.v-text-field {
  margin-top: 0 !important;
}
.v-text-field input {
  padding: 2px 0 2px;
}
.container {
  max-width: 100%;
}
.col {
  padding: 2px 10px !important;
}
.v-dialog {
  overflow-x: hidden;
}
@media screen and (max-width: 1024px) {
  .header-table-select-devices,
  .header-table-search {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media only screen and (max-width: 720px) {
  .continer-user-left,
  .continer-user-right,
  .container-user-info,
  .container-user-photo {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
