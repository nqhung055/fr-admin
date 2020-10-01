<template>
  <div>
    <page-title-bar></page-title-bar>
    <!-- <v-container fluid pb-0>
      <temperature-report></temperature-report>
    </v-container>-->
    <v-container fluid grid-list-xl pt-0>
      <!-- <v-row class="stats-card-v4">
        <v-col xl="4" lg="4" md="4" sm="4" cols="12" b-50>
          <stats-card-v4
            :title="$t('message.totalPageViews')"
            value="35,455"
            body="+5% from yesterday"
            :status="1"
            :data="[20,15,12,6,18,17,20,2]"
            :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']"
            :color="ChartConfig.color.info"
          ></stats-card-v4>
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
      </v-row>-->
      <!-- <v-row>
        <v-col xl="3" lg="3" md="6" sm="12" cols="6" class="stats-widget-v3">
          <stats-card-v3
            icon="done_all"
            :title="$t('message.totalScreeningPassed')"
            value="25"
            color="primary"
          ></stats-card-v3>
        </v-col>
        <v-col xl="3" lg="3" md="6" sm="6" cols="6" class="stats-widget-v3">
          <stats-card-v3
            icon="person_add_disabled"
            :title="$t('message.totalScreeningFailed')"
            value="14"
            color="warning"
          ></stats-card-v3>
        </v-col>
        <v-col xl="3" lg="3" md="6" sm="6" cols="6" class="stats-widget-v3">
          <stats-card-v3
            icon="mood"
            :title="$t('message.bodyTemperature')"
            value="27.40"
            color="success"
          ></stats-card-v3>
        </v-col>
        <v-col xl="3" lg="3" md="6" sm="6" cols="6" class="stats-widget-v3">
          <stats-card-v3
            icon="house_siding"
            :title="$t('message.roomTemperature')"
            value="28.8"
            color="error"
          ></stats-card-v3>
        </v-col>
      </v-row> -->
      <indexes-block />
      <v-row>
        <!-- <app-card
          :heading="$t('message.activityAroundWorld')"
          colClasses="col-xl-8 col-lg-8 col-md-7 col-sm-6 col-12"
          contentCustomClass="pt-0"
        >
          <activity-around-world></activity-around-world>
        </app-card>-->
        <app-card
          :heading="$t('message.temperatureScreeningMonthly')"
          colClasses="col-xl-8 col-lg-8 col-md-7 col-sm-6 col-12"
          customClasses="mb-0"
          contentCustomClass="pt-0"
        >
          <!-- <temperature-monthly-failed></temperature-monthly-failed>
          <div class="footer-flex">
            <v-spacer></v-spacer>
            <span class="grey--text d-custom-flex align-items-center">
              <i class="zmdi zmdi-replay mr-2"></i>
              <span class="fs-12 fw-normal">{{$t('message.updated10MinAgo')}}</span>
            </span>
          </div> -->
          <general-visitor-chart
            class="mb-5"
            :height="330"
            :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug']"
            :e_label="$t('message.employee')"
            :e_dataset="[45, 32, 50, 42, 32, 46, 30, 25]"
            :s_label="$t('message.stranger')"
            :s_dataset="[10, 20, 12, 30, 10, 32, 28, 30]"
          />
          <v-row class="cart-wrap hidden-only pl-6">
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-account primary--text"></i>
                <!-- shopping-cart-plus -->
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">52</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.employee')}}</span>
              </p>
            </v-col>
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-account-o success--text"></i>
                <!-- -eye -->
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">49</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.stranger')}}</span>
              </p>
            </v-col>
            <v-col cols="4" class="d-custom-flex">
              <span class="mr-2">
                <i class="zmdi zmdi-accounts-add error--text"></i>
                <!-- equalizer -->
              </span>
              <p class="mb-0">
                <span class="d-block fs-14 fw-bold">101</span>
                <span class="d-block fs-12 grey--text fw-normal">{{$t('message.totalVisitors')}}</span>
              </p>
            </v-col>
          </v-row>
        </app-card>
        <app-card
          :heading="$t('message.visitorSeparations')"
          colClasses="col-xl-4 col-lg-4 col-md-5 col-sm-6 col-12"
          customClasses="temperature-screening-wrap"
        >
          <failed-screening-ratio></failed-screening-ratio>
        </app-card>
      </v-row>
      <v-row>
        <app-card
          :heading="$t('message.temperatureScreening')"
          :fullBlock="false"
          colClasses="col-xl-8 col-lg-8 col-md-7 col-sm-6 col-12"
        >
          <pass-and-failed-temperature
            vs
            Failed
            temperature
            :height="210"
            :labels="['17-08-2020', '18-08-2020', '19-08-2020', '20-08-2020', '21-08-2020', '22-08-2020','23-08-2020']"
            :data1="compareByDate.data1"
            :data2="compareByDate.data2"
          ></pass-and-failed-temperature>
        </app-card>
        <!-- Statistics by day -->
        <app-card
          :heading="$t('message.statisticsByDay')"
          colClasses="col-xl-4 col-lg-4 col-md-5 col-sm-6 col-12"
          customClasses="mb-0 sales-widget"
        >
        <index-statistics />
        </app-card>
        <!-- Weekly Summary -->
				<!-- <app-card 
					:heading="$t('message.bodyAndRoomTemperatures')" 
					colClasses="col-xl-4 col-lg-4 col-md-5 col-sm-6 col-12"
					>
					<weekly-summary :height="245"></weekly-summary>
				</app-card> -->
      </v-row>
      <!-- <v-row>
        <app-card
          :heading="$t('message.browserStatics')"
          :fullBlock="true"
          :fullScreen="true"
          :closeable="true"
          :reloadable="true"
          colClasses="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        >
          <browser-statics></browser-statics>
        </app-card>
        <app-card
          :heading="$t('message.trafficChannel')"
          :fullScreen="true"
          :closeable="true"
          :reloadable="true"
          :footer="true"
          colClasses="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12"
          contentCustomClass="pt-0"
        >
          <traffic-channel-v2></traffic-channel-v2>
          <span
            class="grey--text d-custom-flex align-items-center justify-content-end"
            slot="footer"
          >
            <i class="zmdi zmdi-replay mr-2"></i>
            <span class="fs-12 fw-normal">{{$t('message.updated10MinAgo')}}</span>
          </span>
        </app-card>
        <app-card
          :heading="$t('message.serverLoad')"
          :fullScreen="true"
          :closeable="true"
          :reloadable="true"
          colClasses="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12"
          contentCustomClass="pt-0 h-100"
        >
          <server-load styles="width: 100%; height: 275px;"></server-load>
        </app-card>
      </v-row>
      <v-row>
        <app-card
          colClasses="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
          contentCustomClass="pb-0 px-0"
        >
          <bandwidth-usage-v2></bandwidth-usage-v2>
        </app-card>
        <app-card
          contentCustomClass="pb-0 px-0"
          colClasses="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        >
          <total-downloading></total-downloading>
        </app-card>
      </v-row>
      <v-row>
        <app-card
          :heading="$t('message.notifications')"
          :fullBlock="true"
          :closeable="true"
          :reloadable="true"
          :fullScreen="true"
          :footer="true"
          colClasses="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
        >
          <notifications></notifications>
          <div class="d-custom-flex justify-space-between" slot="footer">
            <v-btn small color="primary">View All</v-btn>
            <span class="grey--text d-custom-flex align-items-center">
              <i class="zmdi zmdi-replay mr-2"></i>
              <span class="fs-12 fw-normal">Updated 10 min ago</span>
            </span>
          </div>
        </app-card>
        <app-card
          :heading="$t('message.supportTickets')"
          :fullBlock="true"
          :closeable="true"
          :reloadable="true"
          :fullScreen="true"
          :footer="true"
          colClasses="col-xl-8 col-lg-8 col-md-6 col-sm-12 col-12"
        >
          <support-tickets></support-tickets>
          <div class="d-custom-flex justify-space-between" slot="footer">
            <v-btn small color="primary">View All</v-btn>
            <span class="grey--text d-custom-flex align-items-center">
              <i class="zmdi zmdi-replay mr-2"></i>
              <span class="fs-12 fw-normal">Updated 10 min ago</span>
            </span>
          </div>
        </app-card>
      </v-row>
      <v-row>
        <app-card
          :heading="$t('message.hotKeywords')"
          :fullBlock="true"
          :closeable="true"
          :reloadable="true"
          :fullScreen="true"
          :footer="true"
          colClasses="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"
        >
          <hot-keywords></hot-keywords>
          <div slot="footer">
            <span class="grey--text d-custom-flex align-items-center">
              <i class="zmdi zmdi-replay mr-2"></i>
              <span class="fs-12 fw-normal">Updated 10 min ago</span>
            </span>
          </div>
        </app-card>
        <v-col xl="6" lg="6" md="6" cols="12">
          <v-row>
            <v-col xl="6" lg="6" md="6" cols="12" class="d-block">
              <users-stat></users-stat>
            </v-col>
            <v-col xl="6" lg="6" md="6" cols="12" class="d-block">
              <platform-users-stat></platform-users-stat>
            </v-col>
            <app-card
              :heading="$t('message.serverStatus')"
              colClasses="col-xl-12 col-lg-12 col-md-12 col-12 d-xs-half-block w-full"
              :closeable="true"
              :reloadable="true"
              :fullScreen="true"
              :footer="true"
              contentCustomClass="py-0"
            >
              <server-status></server-status>
              <div slot="footer">
                <span class="grey--text d-custom-flex align-items-center">
                  <i class="zmdi zmdi-replay mr-2"></i>
                  <span class="fs-12 fw-normal">Updated 10 min ago</span>
                </span>
              </div>
            </app-card>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col xl="6" lg="6" md="6" cols="12">
          <customer-support-service></customer-support-service>
        </v-col>
        <v-col xl="6" lg="6" md="6" cols="12">
          <promo-widget></promo-widget>
        </v-col>
      </v-row>-->
    </v-container>
  </div>
</template>

<script>
// import TemperatureMonthlyFailed from "../fr-detection-logs/TemperatureMonthlyFailed";
import PassAndFailedTemperature from "../fr-charts/TemperaturePassFailScreening";
// import WeeklySummary from "../fr-charts/TemperatureWeeklySummary";
import IndexesBlock from "../commons/fr-indexes-block";
import IndexStatistics from "../commons/fr-statistics";

/* import TemperatureReport from "../fr-detection-logs/TemperatureReport";
import TrafficChannelV2 from "Components/Widgets/TrafficChannelV2";
import BrowserStatics from "Components/Widgets/BrowserStatics";
import ServerLoad from "Components/Widgets/ServerLoad";
import BandwidthUsageV2 from "Components/Widgets/BandwidthUsageV2";
import TotalDownloading from "Components/Widgets/TotalDownloading";
import Notifications from "Components/Widgets/Notifications";
import SupportTickets from "Components/Widgets/SupportTickets";
import HotKeywords from "Components/Widgets/HotKeywords";
import UsersStat from "Components/Widgets/UsersStat";
import PlatformUsersStat from "Components/Widgets/PlatformUsersStat";
import ServerStatus from "Components/Widgets/ServerStatus";
import CustomerSupportService from "Components/Widgets/24x7CustomerSupport";
import PromoWidget from "Components/Widgets/PromoWidget";
import ActivityAroundWorld from "Components/Widgets/ActivityAroundWorld"; */
import FailedScreeningRatio from "../fr-detection-logs/TemperatureFailedScreeningRatio";

// components
// import StatsCardV3 from "Components/StatsCardV3/StatsCardV3";
// import StatsCardV4 from "Components/StatsCardV4/StatsCardV4";

// chart config
import { ChartConfig } from "Constants/chart-config";

const compareByDate = {
  data1: [19, 31, 18, 20, 42, 16, 30],
  data2: [10, 8, 24, 11, 25, 26, 7],
};

import GeneralVisitorChart from "../fr-charts/GeneralChartV2";


export default {
  components: {
    GeneralVisitorChart,
    // TemperatureMonthlyFailed,
    PassAndFailedTemperature,
    // WeeklySummary,
    IndexesBlock,
    IndexStatistics,
    /* TemperatureReport,
    TrafficChannelV2,
    BrowserStatics,
    ServerLoad,
    BandwidthUsageV2,
	TotalDownloading,
	Notifications,
    SupportTickets,
    HotKeywords,
    UsersStat,
    PlatformUsersStat,
    ServerStatus,
    CustomerSupportService,
    PromoWidget, */
    // StatsCardV3,
    // ActivityAroundWorld,
    FailedScreeningRatio,
    // StatsCardV4,
  },
  data() {
    return {
      ChartConfig,
      compareByDate,
    };
  },
};
</script>
