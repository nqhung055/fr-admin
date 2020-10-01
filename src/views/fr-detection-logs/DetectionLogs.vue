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
                        :class="{primary: isReg}"
                      >{{ $t('message.employee') }}</v-btn>
                      <v-btn
                        class="ml-2"
                        @click="changeBtn('STRANGER')"
                        :class="{primary: isStr}"
                      >{{ $t('message.stranger') }}</v-btn>
                    </div>
                    <div v-if="errored">
                      <p>{{ $t('message.getLogsError') }}</p>
                    </div>
                    <div v-else>
                      <div v-if="loading">{{ $t('message.loading') }}</div>
                      <div  v-else>
                        <v-data-table :headers="headers" :items="selectedLogs">
                          <template v-slot:item="{ item }">
                            <tr>
                              <td>
                                {{ selectedLogs.map(function(x){return x.id;}).indexOf(item.id) }}
                              </td>
                              <td>
                                <img :src="item.photo" class="img-responsive" height="50" width="50" />
                              </td>
                              <td>{{ item.userId }}</td>
                              <td>{{ item.bodyTemperature }}</td>
                              <td>{{ item.roomTemperature }}</td>
                              <td>{{ item.fromDevice }}</td>
                              <td>{{ item.type }}</td>
                              <td>{{ item.detectionTime }}</td>
                              <td class="text-center">
                                <v-btn icon class="mx-0" @click="deleteLog(item)">
                                  <v-icon class="error--text">close</v-icon>
                                </v-btn>
                              </td>
                            </tr>
                          </template>
                          <template slot="no-data">
                            <span>{{$t('message.noItemsFound')}}</span>
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
import { ChartConfig } from "Constants/chart-config";
import { groupByKey } from "Helpers/helpers";

export default {
  data() {
    return {
      isReg: true,
      isStr: false,
      selectedBtn: "REGISTERED_USER",
      selectedLogs: [],
      logsList: [],
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
        {
          text: "Remove",
          sortable: false,
          align: "center",
          class: "w-10",
        },
      ],
    };
  },
  mounted() {
    this.getSelectedByVisitor();
    this.getLogs();
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
          return this.selectedLogs = this.logsList[this.selectedBtn];
        })
        .catch((error) => {
          this.errored = true;
          console.log(error);
        })
        .finally(() => this.loading = false);
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
      this.getSelectedByVisitor(value);
      // console.log("this.selectedCoin="+this.selectedCoin)
    },
    /**
     * open dialog to delete log
     */
    deleteLog(log) {
      this.$refs.deleteConfirmationDialog.openDialog();
      this.selectDeletedLog = log;
    },
    /**
     * delete log
     */
    onDeleteLog() {
      this.$refs.deleteConfirmationDialog.close();
      this.loader = true;
      setTimeout(() => {
        this.loader = false;
        this.$store.dispatch("onDeleteLog", this.selectDeletedLog);
      }, 1500);
    },
  },
  computed: {
    groupedByType() {
      return groupByKey(this.logsList, "type");
    },
  },
};
</script>
