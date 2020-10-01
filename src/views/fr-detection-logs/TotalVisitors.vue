<template>
  <div>
    <v-col>
      <ul class="list-unstyled pl-0 server-status-widget referral-widget">
        <li>
          <div class="d-custom-flex justify-space-between">
            <span class="grey--text fw-normal">Registered</span>
            <h5 class="mb-0 grey--text">{{this.totalRegisters}}</h5>
          </div>
          <!-- <v-progre ss-linear :value="referral.value" height="5" color="primary"></v-progress-linear>-->
        </li>
        <li>
          <div class="d-custom-flex justify-space-between">
            <span class="rey--text fw-normal">Unregistered</span>
            <h5 class="mb-0 grey--text">{{this.totalUnregistereds}}</h5>
          </div>
          <!-- <v-progre ss-linear :value="referral.value" height="5" color="primary"></v-progress-linear>-->
        </li>
        <li>
          <div class="d-custom-flex justify-space-between">
            <span class="grey--text fw-normal">Total</span>
            <h5 class="mb-0 grey--text">{{this.totalVisitors}}</h5>
          </div>
          <!-- <v-progre ss-linear :value="referral.value" height="5" color="primary"></v-progress-linear>-->
        </li>
      </ul>
    </v-col>
    <v-col>
      <ul class="list-unstyled pl-0 server-status-widget referral-widget">
        <li>
          <div class="d-custom-flex justify-space-between">
            <span class="grey--text fw-normal">Registered Visitor</span>
            <h5 class="mb-0 grey--text"></h5>
          </div>
        </li>
      </ul>
    </v-col>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      totalVisitors: 0,
      totalRegisters: 0,
      totalUnregistereds: 0,
    };
  },
  computed: {
    ...mapGetters(["fDetectionLogs"]),
  },
  methods: {

  },
  async mounted() {
    const dlResponse = await this.$axios.get(`/logs?pageIndex=0&pageSize=1000000`);

    if (dlResponse.status === 200) {
      this.totalVisitors = dlResponse.data.rows.length;
      for (var i = 0; i < dlResponse.data.rows.length; i++) {
        if(dlResponse.data.rows[i].type === "STRANGER")
          this.totalRegisters ++;
        else this.totalUnregistereds ++;
      }
    } else {
      Vue.notify({
        group: "loggedIn",
        type: "error",
        text: "Can not get Dectection logs. Please try again later!",
      });
    }
  },
};
</script>
