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
                      <v-select v-model="userType" :items="userTypes" single-line label="Select User Types" @change="getLogs(siteId, !blockId ? '' : blockId, !floorId ? '' : floorId, !compId ? '' : compId)" />
                    </v-col>
                    <v-col cols="3" class="header-table-select-devices">
                      <v-select v-model="selectedDevice" :items="devices" item-text="displayName" item-value="name" label="Select Device" @change=" getLogs(); siteId = '-- Please select site --'; blockId = '-- Please select block --'; floorId = '-- Please select floor --'; compId = '-- Please select company --';" />
                    </v-col>
                    <v-col cols="6" class="header-table-search">
                      <v-text-field
                        v-model="searchUserKey"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
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
                        @change="
                          getListUsers(
                            siteId,
                            !blockId ? '' : blockId,
                            !floorId ? '' : floorId,
                            !compId ? '' : compId
                          )
                        "
                      ></v-select>
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
                        @change="
                          getListUsers(
                            siteId,
                            !blockId ? '' : blockId,
                            !floorId ? '' : floorId,
                            !compId ? '' : compId
                          )
                        "
                      ></v-select>
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
                        @change="
                          getListUsers(
                            siteId,
                            !blockId ? '' : blockId,
                            !floorId ? '' : floorId,
                            !compId ? '' : compId
                          )
                        "
                      ></v-select>
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
                        @change="
                          getListUsers(
                            siteId,
                            !blockId ? '' : blockId,
                            !floorId ? '' : floorId,
                            !compId ? '' : compId
                          )
                        "
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="users"
                  :search="searchUserKey"
                  item-key="userId"
                >
                  <template slot="headerCell" slot-scope="props">
                    <v-tooltip bottom>
                      <span slot="activator">{{ props.header.text }}</span>
                      <span>{{ props.header.text }}</span>
                    </v-tooltip>
                  </template>
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                  </template>
                  <!-- <template v-slot:[`item.action`]="{ item }">
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
          value: "",
        },
        {
          text: "Photo",
          align: "left",
          sortable: false,
          value: "",
        },
        {
          text: "Pass/Fail",
          align: "left",
          sortable: false,
          value: "",
        },
        {
          text: "Entry/Exit",
          align: "left",
          sortable: false,
          value: "",
        },
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "",
        },
        {
          text: "Device",
          align: "left",
          sortable: false,
          value: "",
        },
        {
          text: "Temperature",
          align: "left",
          sortable: false,
          value: "",
        },
        {
          text: "ID Number",
          align: "left",
          sortable: false,
          value: "",
        },
        {
          text: "Company",
          align: "left",
          sortable: false,
          value: "",
        },
        {
          text: "Contact",
          align: "left",
          sortable: false,
          value: "",
        },
        {
          text: "Type",
          align: "left",
          sortable: false,
          value: "",
        },
        // { text: "Action", align: "center", value: "action", width: "10%" },
      ],
      devices: [],
      users: [],
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
      userType: "",
      userTypes: ["All", "Registered users", "Guests"],
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
    cSelectAllDevices() {
      return this.newUser.devices.length === this.devices.length;
    },
    cSelectSomeDevices() {
      return this.newUser.devices.length > 0 && !this.cSelectAllDevices;
    },
    icon() {
      if (this.cSelectAllDevices) return "mdi-close-box";
      if (this.cSelectSomeDevices) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },
  methods: {
    async uploadFile() {
      if (this.facePhoto) {
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            this.srcFacePhoto = reader.result;
          },
          false
        );

        reader.readAsDataURL(this.facePhoto);
      } else {
        this.srcFacePhoto = "";
      }
    },
    async changeSelectedDevice() {
      const usersResponse = await this.$axios.get(
        `/get/user/list/of/${this.selectedDevice}`
      );
      if (usersResponse.status === 200) {
        this.users = usersResponse.data || [];
      } else {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Can not get User list. Please try again later!",
        });
      }
    },
    async getLogs(sId = "", bId = "", fId = "", cId = "") {
      if (this.selectedDevice !== null || this.selectedDevice !== "") {
        // &page=1&pageSize=5&${this.siteName}
        let sSite = sId === "-- Please select site --" ? "" : sId;
        let sBlock = bId === "-- Please select block --" ? "" : bId;
        let sFloor = fId === "-- Please select floor --" ? "" : fId;
        let sComp = cId === "-- Please select company --" ? "" : cId;
        let sAPI = `${AppConfig.ip}${AppConfig.api_port}/users?device=${
          this.selectedDevice
        }${!sSite ? "" : "&site=" + sSite}${!sBlock ? "" : "&block=" + sBlock}${
          !sFloor ? "" : "&floor=" + sFloor
        }${!sComp ? "" : "&comp=" + sComp}`;
        await this.$axios
          .get(sAPI)
          .then((response) => {
            this.users = response.data || [];
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
        .then((gwRes) => {
          devices = gwRes.data;
        })
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
            .get(
              `${AppConfig.ip}${AppConfig.api_port}/devices?deviceIds=` +
                devices.join(",")
            )
            .then((beRes) => {
              this.devices = beRes.data.map((device) => {
                return {
                  ...device,
                  displayName: device.displayName
                    ? device.displayName
                    : device.displayName
                    ? device.displayName
                    : `${device.siteId ? device.siteId + "-" : ""}${
                        device.blockId ? device.blockId + "-" : ""
                      }${device.floorId ? device.floorId + "-" : ""}${
                        device.customName ? device.customName : ""
                      }`,
                };
              });
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
    selectAllDevices() {
      this.$nextTick(() => {
        if (this.cSelectAllDevices) {
          this.newUser.devices = [];
        } else {
          this.newUser.devices = this.devices.slice();
        }
      });
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
