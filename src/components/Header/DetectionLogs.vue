<template>
  <v-menu
    :close-on-content-click="false"
    left
    offset-y
    origin="right top"
    z-index="99"
    content-class="detection-log-dropdown"
    transition="slide-y-transition"
    nudge-top="-20"
  >
    <template v-slot:activator="{ on }">
      <v-btn class="notification-icon ma-0" v-on="on" icon large>
        <v-badge right overlap>
          <span slot="badge">{{5}}</span>
          <i
            class="zmdi grey--text zmdi-notifications-active animated infinite wobble zmdi-hc-fw font-lg"
          ></i>
        </v-badge>
      </v-btn>
    </template>
    <v-card>
      <!-- <div class="dropdown-top d-custom-flex justify-space-between primary">
        <span class="white--text fw-bold">Detection Logs</span>
        <span class="v-badge warning">3 NEW</span>
      </div>-->
      <div class="text-center pa-4" v-if="detectionlogs == ''">
        <span class="d-block font-3x mb-15 error--text">
          <i class="zmdi zmdi-info-outline"></i>
        </span>
        <h3>{{$t('message.noDetectionLogsFound')}}</h3>
      </div>
      <div v-else class="dropdown-content">
        <vue-perfect-scrollbar style="height:280px" :settings="settings">
          <v-list two-line>
            <template v-for="(detectionlog, index) in selectTop(detectionlogs,5)">
              <v-list-item :key="index">
                <div class="product-img mr-3">
                  <img height="55" width="55" :src="detectionlog.photo" />
                </div>
                <v-list-item-content>
                  <span class="fs-14">{{detectionlog.userId}}</span>
                  <span
                    class="fs-12 fw-normal grey--text"
                  >Time: {{detectionlog.detectionTime}} - Device: {{detectionlog.fromDevice}}</span>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn @click="deleteLog(detectionlog)" icon>
                    <i class="zmdi zmdi-close"></i>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </vue-perfect-scrollbar>
        <delete-confirmation-dialog
          ref="deleteConfirmationDialog"
          heading="Please confirm ..."
          message="Are you sure to delete this log?"
          @onConfirm="onDeleteLog"
        ></delete-confirmation-dialog>
      </div>
      <v-card-actions v-if="detectionlogs != ''">
        <v-btn
          color="primary"
          v-if="horizontal"
          small
          :to="`/${getCurrentAppLayoutHandler() + '/detection-logs.html'}`"
        >{{$t('message.viewDetectionLogs')}}</v-btn>
        <v-btn
          v-else
          small
          color="primary"
          :to="`/${getCurrentAppLayoutHandler() + '/detection-logs.html'}`"
        >{{$t('message.viewDetectionLogs')}}</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
/* import Nprogress from 'nprogress';
import router from '../../router'
Nprogress.start();
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (localStorage.getItem('user') === null || localStorage.getItem('jwt') === null) {
			next({
				path: '/session/login',
				query: { redirect: to.fullPath }
			})
		} else {
			next()
		}
	} else {
		next() // make sure to always call next()!
	}
}) */
// import { mapGetters } from "vuex";
import { getCurrentAppLayout } from "Helpers/helpers";
import Vue from "vue";
export default {
  props: ["horizontal"],
  data() {
    return {
      detectionlogs: [],
      selectDeletedLog: null,
      settings: {
        maxScrollbarLength: 160,
      },
    };
  },
  /* computed: {
    ...mapGetters(["detectionlogs"]),
  }, */
  async mounted() {
    const dlResponse = await this.$axios.get(`/logs?pageIndex=0&pageSize=1000000`);

    if (dlResponse.status === 200) {
      // console.log("response data: " + dlResponse.data.rows.length);
      this.detectionlogs = dlResponse.data.rows;
    } else {
      Vue.notify({
        group: "loggedIn",
        type: "error",
        text: "Can not get detection logs. Please try again later!",
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
      this.$store.dispatch("onDeleteLog", this.selectDeletedLog);
    },
    /**
     * Limitation records
     */
    selectTop(arr, length = 5) {
      if (arr && arr.length ? arr.length : 0) {
        if (length == -1) {
          return arr;
        }
        if (length > arr.length ? arr.length : 0) {
          return arr;
        }
        return arr.slice(0, length);
      }
      return null;
    },
    /* filters: {
      resultCount: function () {
        return this.arr.length;
      },
    }, */
  },
};
</script>