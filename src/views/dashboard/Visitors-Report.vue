<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container fluid grid-list-xl pt-0 pb-0 mt-n3>
      <v-row>
        <!-- Overall Traffic Status -->
        <app-card
          :heading="$t('message.overallTrafficStatus')"
          colClasses="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12"
        >
          <div class="d-sm-block d-none pa-4 mb-5 mt-n5">
            <v-row>
              <v-col
                xl="4"
                lg="4"
                md="4"
                sm="4"
                class="d-custom-flex justify-space-between align-end"
              >
                <div>
                  <p class="mb-0 grey--text">Online Sources</p>
                  <h3 class="mb-0">3500</h3>
                </div>
                <span>
                  <i class="ti-arrow-up font-lg success--text"></i>
                </span>
              </v-col>
              <v-col
                xl="4"
                lg="4"
                md="4"
                sm="4"
                class="d-custom-flex justify-space-between align-end"
              >
                <div>
                  <p class="mb-0 grey--text">Today</p>
                  <h3 class="mb-0">17,020</h3>
                </div>
                <span>
                  <i class="ti-arrow-up font-lg success--text"></i>
                </span>
              </v-col>
              <v-col
                xl="4"
                lg="4"
                md="4"
                sm="4"
                class="d-custom-flex justify-space-between align-end"
              >
                <div>
                  <p class="mb-0 grey--text">Last Month</p>
                  <h3 class="mb-0">20.30%</h3>
                </div>
                <span>
                  <i class="ti-arrow-down error--text font-lg"></i>
                </span>
              </v-col>
            </v-row>
          </div>
          <ad-campaign-perfomance :height="245" :data="adCampaignPerfomanceData"></ad-campaign-perfomance>
        </app-card>
        <!-- Weekly Summary -->
        <app-card
          :heading="$t('message.weeklySummary')"
          colClasses="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12"
        >
          <div class="d-sm-block d-none pa-4 mb-5 mt-n5">
            <v-row>
              <v-col class="d-custom-flex justify-space-between align-end">
                <div>
                  <p class="mb-0 grey--text">Passing average</p>
                  <h3 class="mb-0">10% increase from this week</h3>
                </div>
                <span>
                  <i class="ti-arrow-up font-lg success--text"></i>
                </span>
              </v-col>
            </v-row>
          </div>
          <weekly-summary :height="245"></weekly-summary>
        </app-card>
      </v-row>
    </v-container>
    <v-container fluid grid-list-xl pt-0 pb-0 mt-n3>
      <v-row>
        <app-card
          :heading="$t('message.strangerAndEmployeeStatistics')"
          colClasses="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12"
          customClasses="mb-0"
        >
          <stranger-and-employee-statistics></stranger-and-employee-statistics>
        </app-card>
        <app-card
          :heading="$t('message.bodyAndRoomTemperatures')"
          colClasses="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-12"
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
    </v-container>
    <v-container fluid class="grid-list-xl py-0">
      <v-row>
        <app-card
          :heading="$t('message.dailySales')"
          colClasses="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12"
          customClasses="mb-0"
          :footer="true"
        >
          <!-- Daily Sales -->
          <daily-sales
            :label="dailySales.label"
            :chartdata="dailySales.chartdata"
            :labels="dailySales.labels"
          ></daily-sales>
          <div slot="footer" class="justify-space-between footer-flex">
            <span class="fs-14">
              <v-icon class="mr-1 font-md">autorenew</v-icon>
              {{$t('message.updated10MinAgo')}}
            </span>
          </div>
        </app-card>
        <!-- Traffic Channel -->
        <app-card
          :heading="$t('message.trafficChannel')"
          colClasses="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12"
          customClasses="mb-0"
          :footer="true"
        >
          <traffic-channel :data="trafficChannel"></traffic-channel>
          <div slot="footer" class="justify-space-between footer-flex">
            <span class="fs-14">
              <v-icon class="mr-1 font-md">autorenew</v-icon>
              {{$t('message.updated10MinAgo')}}
            </span>
            <v-spacer></v-spacer>
            <v-btn color="primary" small>{{$t('message.goToCampaign')}}</v-btn>
          </div>
        </app-card>
        <!-- Campaign Performance -->
        <app-card
          :heading="$t('message.campaignPerformance')"
          colClasses="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12"
          :fullBlock="true"
          customClasses="campaign-performance"
        >
          <campaign-performance></campaign-performance>
        </app-card>
      </v-row>
      <v-row>
        <!-- Percentage of Stranger & Registered Users Stats -->
<!--         <app-card
          :heading="$t('message.percentageOfVisitors')"
          colClasses="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12"
          customClasses="mb-0"
        >
          <percentage-of-visitor-stats></percentage-of-visitor-stats>
        </app-card> -->
        <app-card
					:heading="$t('message.sales')"
					colClasses="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
					customClasses="mb-0"
					contentCustomClass="text-center"
					:fullBlock="true"
					>
					<sales1></sales1> 
        </app-card>
        <!-- Sales -->
        <app-card
					:heading="$t('message.sales')"
					colClasses="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12"
					customClasses="mb-0 sales-widget"
				>
					<sales class="mb-5" :height="210"></sales>	
					<v-row class="cart-wrap hidden-only pl-6">
						<v-col cols="4" class="d-custom-flex">
							<span class="mr-2"><i class="zmdi zmdi-shopping-cart-plus primary--text"></i></span>
							<p class="mb-0">
								<span class="d-block fs-14 fw-bold">2382</span>
								<span class="d-block fs-12 grey--text fw-normal">Sales</span>
							</p>
						</v-col>
						<v-col cols="4" class="d-custom-flex">
							<span class="mr-2"><i class="zmdi zmdi-eye success--text"></i></span>
							<p class="mb-0">
								<span class="d-block fs-14 fw-bold">53,255</span>
								<span class="d-block fs-12 grey--text fw-normal">Views</span>
							</p>
						</v-col>
						<v-col cols="4" class="d-custom-flex">
							<span class="mr-2"><i class="zmdi zmdi-equalizer error--text"></i></span>
							<p class="mb-0">
								<span class="d-block fs-14 fw-bold">$1,25,000</span>
								<span class="d-block fs-12 grey--text fw-normal">Earned</span>
							</p>
						</v-col>
					</v-row>				
				</app-card>
        <app-card
					:heading="$t('message.visitorSeparations')"
					colClasses="col-xl-4 col-lg-4 col-md-5 col-sm-6 col-12"
					customClasses="device-seperation-wrap"
				>
					<visitor-separations></visitor-separations>
				</app-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import Vue from "vue";

//Overall Traffic Status
import AdCampaignPerfomance from "Components/Charts/AdCampaignPerfomance";
//Charts componet
import WeeklySummary from "Components/Charts/WeeklySummary";
import BodyNRoomTemperature from "Components/Charts/BodyNRoomTemperature";

// widgets
import StrangerAndEmployeeStatistics from "Components/Widgets/StrangerAndEmployeeStatistics";
import DailySales from "Components/Widgets/DailySales";
import TrafficChannel from "Components/Widgets/TrafficChannel";
import CampaignPerformance from "Components/Widgets/CampaignPerformance";
import Sales1 from 'Components/Charts/PieChartWithLegend';
import Sales from "Components/Charts/SalesChartV2";
// import PercentageOfVisitorStats from "Views/fr-charts/PercentageOfVisitorStats";
import VisitorSeparations from "Views/fr-detection-logs/VisitorSeparations";

//chart config
import { ChartConfig } from "Constants/chart-config";

// data
import {
  dailySales,
  trafficChannel,
  adCampaignPerfomanceData,
} from "./data.js";
import { newsLetterCampaignData } from "Views/dashboard/data";

export default {
  name: "Visitors-Report",
  components: {
    AdCampaignPerfomance,
    StrangerAndEmployeeStatistics,
    BodyNRoomTemperature,
    WeeklySummary,
    DailySales,
    TrafficChannel,
    CampaignPerformance,
    Sales1,
    Sales,
    // PercentageOfVisitorStats,
    VisitorSeparations,
  },
  data() {
    return {
      /* loaded: false,
      chartdata: null, */
      ChartConfig,
      dailySales,
      trafficChannel,
      newsLetterCampaignData,
      adCampaignPerfomanceData,
    };
  },
  /* async mounted() {
    this.loaded = false;
    try {
      const logs = await this.$axios.get("/logs");
      // console.log("Logs response status: " + logs.status);
      if (logs.status === 200) {
        //  console.log('Logs count response: ' + JSON.parse(JSON.stringify(logs.data.rows)).length);
        const logRows = JSON.parse(JSON.stringify(logs.data.rows));
        //  console.log('Logs rows response: ' + logRows.lenght);
        // console.log("Logs rows response: " + logRows.length);
        this.chartdata = logRows;
        this.loaded = true;
        this.options = { responsive: true, maintainAspectRatio: true };
      } else {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Can not get Devive list. Please reload page!",
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, */
};
</script>
