<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid grid-list-xl pt-0>
      <v-row>
        <app-card
          :heading="$t('message.visitorsummaries')"
          :fullBlock="false"
          colClasses="col-xl-4 col-lg-4 col-md-5 col-12"
          contentCustomClass="py-0"
          footer="true"
        >
          <total-visitors></total-visitors>
        </app-card>
        <!-- <app-card
          :heading="$t('message.visitorCollection')"
          :fullBlock="false"
          colClasses="col-xl-8 col-lg-8 col-md-7 col-12"
          customClasses="campaign-performance"
          footer="true"
        >
          <register-vs-unregistered></register-vs-unregistered>
        </app-card>-->
        <app-card
          :heading="$t('message.bodyAndRoomTemperatures')"
          colClasses="col-xl-8 col-lg-8 col-md-7 col-12"
        >
          <!-- <app-section-loader :status="loader"></app-section-loader> -->
          <div class="ladgend-wrapper mb-4">
            <p class="mb-0">
              <span class="ladgend ladgend-success"></span>
              <span>Body</span>
            </p>
            <p class="mb-0">
              <span class="ladgend ladgend-pink"></span>
              <span>Room</span>
            </p>
          </div>
          <body-n-room-Temperature :width="300" :height="300"></body-n-room-Temperature>
        </app-card>
      </v-row>
      <v-row>
        <app-card
          :heading="$t('message.visitorsummaries')"
          :fullBlock="false"
          :footer="true"
          colClasses="col-xl-4 col-lg-4 col-md-5 col-12"
          contentCustomClass="py-0"
        >
          <visitor-summaries></visitor-summaries>
          <div slot="footer">
            <span class="grey--text d-custom-flex align-items-center">
              <i class="zmdi zmdi-replay mr-2"></i>
              <span class="fs-12 fw-normal">Updated 10 min ago</span>
            </span>
          </div>
        </app-card>
        <app-card
          :heading="$t('message.temperatureScreening')"
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
          <temperature-screening
            :height="350"
            :label1="registeredTemperatureData.label"
            :label2="unregisteredTemperatureData.label"
            :labels="registeredTemperatureData.timelines"
            :data1="registeredTemperatureData.body"
            :data2="unregisteredTemperatureData.room"
          ></temperature-screening>
        </app-card>
      </v-row>
      <v-row>
        <v-col xl="12" lg="12" md="12" cols="12">
          <visitors-stat></visitors-stat>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VisitorsStat from "Components/Widgets/VisitorsStat";
import TotalVisitors from "Views/fr-detection-logs/TotalVisitors";
import BodyNRoomTemperature from "Components/Charts/BodyNRoomTemperature";

// import RegisterVsUnregistered from "Components/Widgets/RegisterVsUnregistered";

import TemperatureScreening from "../fr-charts/TemperatureScreening";
import VisitorSummaries from "../fr-charts/VisitorSummaries";

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
    TotalVisitors,
    // RegisterVsUnregistered,
    BodyNRoomTemperature,
    TemperatureScreening,
    VisitorSummaries,
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
