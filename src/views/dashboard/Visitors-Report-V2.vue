<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid grid-list-xl pt-0>
      <!-- <v-row class="stats-card-v4">
        <v-col xl="4" lg="4" md="4" sm="4" cols="12" b-50>
          <stats-card-v4
            :title="$t('message.visitorsReport')"
            value="95"
            body="+5% from yesterday"
            :status="1"
          ></stats-card-v4>
        </v-col>
        <v-col xl="4" lg="4" md="4" sm="4" cols="12" b-50>
          <stats-card-v4
            :title="$t('message.totalEmployee')"
            value="50"
            body="-2% from yesterday"
            :status="0"
          ></stats-card-v4>
        </v-col>
        <v-col xl="4" lg="4" md="4" sm="4" cols="12" b-50>
          <stats-card-v4
            :title="$t('message.totalStranger')"
            value="45"
            body="+5% from yesterday"
            :status="1"
          ></stats-card-v4>
        </v-col>
      </v-row>-->
      <indexes-block />
      <v-row>
        <app-card
          :heading="$t('message.visitorsummaries')"
          :fullBlock="false"
          :footer="true"
          colClasses="col-xl-4 col-lg-4 col-md-5 col-12"
          contentCustomClass="py-0"
        >
          <index-statistics />
          <!-- <visitor-summaries></visitor-summaries>
          <div slot="footer">
            <span class="grey--text d-custom-flex align-items-center">
              <i class="zmdi zmdi-replay mr-2"></i>
              <span class="fs-12 fw-normal">Updated 10 min ago</span>
            </span>
          </div> -->
        </app-card>
        <app-card
          :heading="$t('message.visitorCollection')"
          :fullBlock="false"
          colClasses="col-xl-8 col-lg-8 col-md-7 col-12"
        >
          <!-- <temperature-screening
            :height="350"
            :label1="newsLetterCampaignData.label1"
            :label2="newsLetterCampaignData.label2"
            :labels="newsLetterCampaignData.labels"
            :data1="newsLetterCampaignData.data1"
            :data2="newsLetterCampaignData.data2"
          ></temperature-screening>-->
          <visitor-compare
            :height="350"
            :label1="registeredTemperatureData.label"
            :label2="unregisteredTemperatureData.label"
            :labels="registeredTemperatureData.timelines"
            :data1="registeredTemperatureData.body"
            :data2="unregisteredTemperatureData.room"
          ></visitor-compare>
        </app-card>
      </v-row>
      <v-row>
        <v-col xl="12" lg="12" md="12" cols="12">
          <visitors-stat></visitors-stat>
        </v-col>
      </v-row>
      <!-- <v-row>
        <app-card
          :heading="$t('message.visitorsummaries')"
          :fullBlock="false"
          :footer="true"
          colClasses="col-xl-4 col-lg-4 col-md-5 col-12"
          contentCustomClass="py-0"
        >
          <index-statistics />
        </app-card>
      </v-row> -->
    </v-container>
  </div>
</template>

<script>
import VisitorsStat from "Components/Widgets/VisitorsStat";
// import StatsCardV4 from "Components/StatsCardV4/StatsCardV4";
import IndexesBlock from "../commons/fr-indexes-block";
import IndexStatistics from "../commons/fr-statistics";

// import TotalVisitors from "Views/fr-detection-logs/TotalVisitors";
// import BodyNRoomTemperature from "Components/Charts/BodyNRoomTemperature";

// import RegisterVsUnregistered from "Components/Widgets/RegisterVsUnregistered";

import VisitorCompare from "../fr-charts/TemperatureScreening";
// import VisitorSummaries from "../fr-charts/VisitorSummaries";

// chart config
import { ChartConfig } from "Constants/chart-config";

// data
/* import {
  newsLetterCampaignData,
  newsLetterCampaignData2,
  newClients,
  recurringClients,
  bounceRates,
  pageViews,
} from "./data"; */
import {
  registeredTemperatureData,
  unregisteredTemperatureData,
  temperatureData,
} from "../fr-charts/data";

// import { activeUser } from "Views/widgets/data";

export default {
  components: {
    VisitorsStat,
    // StatsCardV4,
    IndexesBlock,
    IndexStatistics,
    // TotalVisitors,
    // RegisterVsUnregistered,
    // BodyNRoomTemperature,
    VisitorCompare,
    // VisitorSummaries,
  },
  data() {
    return {
      ChartConfig,
      /* newsLetterCampaignData,
      newsLetterCampaignData2,
      activeUser,
      newClients,
      recurringClients,
      bounceRates,
      pageViews, */
      registeredTemperatureData,
      unregisteredTemperatureData,
      temperatureData,
    };
  },
};
</script>
