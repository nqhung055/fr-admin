<template>
  <div class="cart-wrapper">
    <page-title-bar></page-title-bar>
    <v-container fluid pt-0>
      <v-row class="px-3">
        <app-card
          :fullBlock="true"
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pa-0"
        >
          <app-section-loader :status="loader"></app-section-loader>
          <v-data-table :headers="headers" :items="detectionlogs" hide-default-footer>
            <template v-slot:item="{ item }">
              <tr>
                <td class="d-custom-flex align-items-center justify-center product-item px-1">
                  <img :src="item.photo" class="img-responsive" height="50" width="50" />
                </td>
                <td>
                  <h6 class="mb-0">{{ item.userId }}</h6>
                </td>
                <td class="text-center">
                  <span class="fw-light">{{ item.bodyTemperature }}</span>
                </td>
                <td class="text-center">
                  <span class="fw-light">{{ item.roomTemperature}}</span>
                </td>
                <td class="text-center">
                  <span class="fw-light">{{ item.detectionTime }}</span>
                </td>
                <td class="text-center">
                  <span class="fw-light">{{ item.fromDevice }}</span>
                </td>
                <td class="text-center">{{ item.type }}</td>
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
          <delete-confirmation-dialog
            ref="deleteConfirmationDialog"
            heading="Pelease confirm ...?"
            message="Are you sure to delete this log?"
            @onConfirm="onDeleteLog"
          ></delete-confirmation-dialog>
        </app-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import Vue from "vue";
import { getCurrentAppLayout } from "Helpers/helpers";
export default {
  data() {
    return {
      detectionlogs: [],
      selectDeletedLog: null,
      loader: false,
      headers: [
        {
          text: "Photo",
          value: "photo",
          align: "center",
          sortable: false,
          class: "w-20",
        },
        {
          text: "User Id",
          value: "userId",
          sortable: false,
          class: "w-25",
        },
        {
          text: "Body Temperature",
          value: "bodyTemperature",
          sortable: false,
          class: "w-25",
        },
        {
          text: "Room Temperature",
          value: "roomTemperature",
          sortable: false,
          class: "w-25",
        },
        {
          text: "Date Time",
          value: "detectionTime",
          sortable: false,
          align: "center",
          class: "w-10",
        },
        {
          text: "Device",
          value: "fromDevice",
          sortable: false,
          align: "center",
          class: "w-10",
        },
        {
          text: "Type",
          value: "type",
          sortable: false,
          align: "center",
          class: "w-10",
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
  /* computed: {
    ...mapGetters(["detectionlogs"]),    
  }, */
  async mounted() {
    const dlResponse = await this.$axios.get(`/logs?pageIndex=0&pageSize=1000000`);

    if (dlResponse.status === 200) {
      // console.log("response data: " + dlResponse.data.rows);
      this.detectionlogs = dlResponse.data.rows;
    } else {
      Vue.notify({
        group: "loggedIn",
        type: "error",
        text: "Can not get Dectection logs. Please try again later!",
      });
    }
  },
  methods: {
    getCurrentAppLayoutHandler() {
      return getCurrentAppLayout(this.$router);
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
};
</script>
