<!-- <template>
   <div :class="type">
		<span class="social-icon border d-custom-flex align-items-center rounded-circle">
			<v-icon medium>{{socialIcon}}</v-icon>
		</span>
		<span>
			<span class="d-block fw-bold">{{friends}}</span>
			<span class="d-block">Friends</span>
		</span> 
		<span>
			<span class="d-block fw-bold">{{feeds}}</span>
			<span class="d-block">Feeds</span> 
		</span>
   </div>
</template>
<script>
export default {
  props: ["socialIcon", "friends", "type", "feeds"]
};
</script> -->
<template>
  <div>
    <div class="dash-card-light">
      <p>{{$t("message.averageSteps")}}</p>
      <h2 class="primary--text">3261</h2>
      <radial-progress-bar
        :diameter="135"
        :completed-steps="60"
        :total-steps="100"
        startColor="#3B7CFF"
        stopColor="#1E3C72"
        :strokeWidth="6"
        innerStrokeColor="#EAEAEA"
        class="mx-auto my-6"
      >
        <h2>
          <i class="ti-arrow-up"></i>
        </h2>
      </radial-progress-bar>
      <h2 class="primary--text">5000</h2>
      <p>{{$t("message.todaysStep")}}</p>
    </div>
    <div class="dash-card-light">
      <p>{{$t("message.todaysDistance")}}</p>
      <h2 class="warning--text">7.6 Km</h2>
      <radial-progress-bar
        :diameter="135"
        :completed-steps="40"
        :total-steps="100"
        startColor="#FD7266"
        stopColor="#F7981C"
        :strokeWidth="6"
        innerStrokeColor="#EAEAEA"
        class="mx-auto my-6"
      >
        <h2>
          <i class="ti-arrow-down"></i>
        </h2>
      </radial-progress-bar>
      <h2 class="warning--text">10 Km</h2>
      <p>{{$t("message.todaysDistance")}}</p>
    </div>
    <div class="dash-card-light">
      <p>{{$t("message.calories")}}</p>
      <h2 class="info--text">350</h2>
      <radial-progress-bar
        :diameter="135"
        :completed-steps="90"
        :total-steps="100"
        startColor="#007ADF"
        stopColor="#00ecbc"
        :strokeWidth="6"
        innerStrokeColor="#EAEAEA"
        class="mx-auto my-6"
      >
        <h2>
          <i class="ti-arrow-up"></i>
        </h2>
      </radial-progress-bar>
      <h2 class="info--text">550</h2>
      <p>{{$t("message.todaysGoal")}}</p>
    </div>
    <!-- <app-card>
      <div class="d-custom-flex justify-space-between align-items-center pa-2">
        <div>
          <p>{{$t("message.averageSteps")}}</p>
          <h2 class="primary--text">
            35,455
            <i
              :class="[{'ti-arrow-up success--text ml-2': status ===1, 'ti-arrow-down warning--text ml-2': status ===0 }]"
            ></i>
          </h2>
          <p class="fs-12 fw-normal grey--text mb-0">+5% from yesterday</p>
        </div>
        <div>
          <radial-progress-bar
            :diameter="135"
            :completed-steps="60"
            :total-steps="100"
            startColor="#3B7CFF"
            stopColor="#1E3C72"
            :strokeWidth="6"
            innerStrokeColor="#EAEAEA"
            class="mx-auto my-6"
          >
            <h2>
              <i class="ti-arrow-up"></i>
            </h2>
          </radial-progress-bar>
        </div>
      </div>
    </app-card>
    <app-card>
      <div class="d-custom-flex justify-space-between align-items-center pa-2">
        <div>
          <p>{{$t("message.todaysDistance")}}</p>
          <h2 class="warning--text">
            35,455
            <i
              :class="[{'ti-arrow-up success--text ml-2': status ===1, 'ti-arrow-down warning--text ml-2': status ===0 }]"
            ></i>
          </h2>
          <p class="fs-12 fw-normal grey--text mb-0">+5% from yesterday</p>
        </div>
        <div>
          <radial-progress-bar
            :diameter="135"
            :completed-steps="40"
            :total-steps="100"
            startColor="#3B7CFF"
            stopColor="#1E3C72"
            :strokeWidth="6"
            innerStrokeColor="#EAEAEA"
            class="mx-auto my-6"
          >
            <h2>
              <i class="ti-arrow-down"></i>
            </h2>
          </radial-progress-bar>
        </div>
      </div>
    </app-card>-->
  </div>
</template>
<script>
// charts component
import RadialProgressBar from "vue-radial-progress";
import { ChartConfig } from "Constants/chart-config";

// components
// import StatsCardV4 from "Components/StatsCardV4/StatsCardV4";

// import WeeklySummary from "Components/Charts/WeeklySummary";
export default {
  components: {
    RadialProgressBar,
    // WeeklySummary,
    // StatsCardV4,
  },
  data() {
    return {
      ChartConfig,
    };
  },
};
</script>
<!--     <v-container fluid class="grid-list-xl py-0">
      <v-row>
        <v-col xl="8" lg="8" md="8" sm="12" cols="12" b-100>
          <div class="dash-card-wrap d-flex flex-wrap overflow-hidden border-rad-sm">
            <div class="dash-card-light">
              <p>{{$t("message.averageSteps")}}</p>
              <h2 class="primary--text">3261</h2>
              <radial-progress-bar
                :diameter="135"
                :completed-steps="60"
                :total-steps="100"
                startColor="#3B7CFF"
                stopColor="#1E3C72"
                :strokeWidth="6"
                innerStrokeColor="#EAEAEA"
                class="mx-auto my-6"
              >
                <h2>
                  <i class="ti-arrow-up"></i>
                </h2>
              </radial-progress-bar>
              <h2 class="primary--text">5000</h2>
              <p>{{$t("message.todaysStep")}}</p>
            </div>
            <div class="dash-card-light">
              <p>{{$t("message.todaysDistance")}}</p>
              <h2 class="warning--text">7.6 Km</h2>
              <radial-progress-bar
                :diameter="135"
                :completed-steps="40"
                :total-steps="100"
                startColor="#FD7266"
                stopColor="#F7981C"
                :strokeWidth="6"
                innerStrokeColor="#EAEAEA"
                class="mx-auto my-6"
              >
                <h2>
                  <i class="ti-arrow-down"></i>
                </h2>
              </radial-progress-bar>
              <h2 class="warning--text">10 Km</h2>
              <p>{{$t("message.todaysDistance")}}</p>
            </div>
            <div class="dash-card-light">
              <p>{{$t("message.calories")}}</p>
              <h2 class="info--text">350</h2>
              <radial-progress-bar
                :diameter="135"
                :completed-steps="90"
                :total-steps="100"
                startColor="#007ADF"
                stopColor="#00ecbc"
                :strokeWidth="6"
                innerStrokeColor="#EAEAEA"
                class="mx-auto my-6"
              >
                <h2>
                  <i class="ti-arrow-up"></i>
                </h2>
              </radial-progress-bar>
              <h2 class="info--text">550</h2>
              <p>{{$t("message.todaysGoal")}}</p>
            </div>
          </div>
        </v-col>
        <app-card
          :heading="$t('message.weeklySummary')"
          colClasses="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 b-100"
          :fullScreen="true"
          :reloadable="true"
          :closeable="true"
        >
          <weekly-summary :height="245"></weekly-summary>
        </app-card>
      </v-row>
    </v-container>
    <v-container fluid class="grid-list-xl py-0">
			<v-row class="stats-card-v4">
				<v-col xl="4" lg="4" md="4" sm="4" cols="12" b-50>
					<stats-card-v4 
						:title="$t('message.totalPageViews')"
						value="35,455"
						body="+5% from yesterday"
						:status="1"
						:data="[20,15,12,6,18,17,20,2]"
						:labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']"
						:color="ChartConfig.color.info"
					>
					</stats-card-v4>
				</v-col>
				<v-col xl="4" lg="4" md="4" sm="4" cols="12" b-50>
					<stats-card-v4 
						:title="$t('message.totalEarnings')"
						value="$4,500"
						body="-2% from yesterday"
						:status="0"
						:data="[15,20,6,9,18,17,20,2]"
						:labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']"
						:color="ChartConfig.color.warning"
					></stats-card-v4>
				</v-col>
				<v-col xl="4" lg="4" md="4" sm="4" cols="12" b-50>
					<stats-card-v4 
						:title="$t('message.impressions')"
						value="45,000"
						body="+5% from yesterday"
						:status="1"
						:data="[1,15,12,6,18,17,20,22]"
						:labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']"
						:color="ChartConfig.color.danger"
					></stats-card-v4>
				</v-col>
        <v-col xl="4" lg="4" md="4" sm="4" cols="12" b-50>
					<stats-card-v4 
						:title="$t('message.impressions')"
						value="45,000"
						body="+5% from yesterday"
						:status="1"
						:data="[1,15,12,6,18,17,20,22]"
						:labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']"
						:color="ChartConfig.color.danger"
					></stats-card-v4>
				</v-col>
			</v-row>
    </v-container> -->