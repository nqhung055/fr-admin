<template>
  <div>
    <page-title-bar/>
    <v-container fluid class="pt-0 grid-list-xl">      
      <indexes-block />
      <!-- Monthly -->
      <v-row>
        <app-card
          :heading="$t('message.visitorMonthly')"
          colClasses="col-xl-8 col-lg-7 col-md-7 col-sm-6 col-12"
          customClasses="mb-0 sales-widget"
          :fullBlock="false"
        >
          <visitors-collection
            :xLabel="$t('message.byTimes').split(', ')"
            :yLabel="$t('message.hundredUnits')"
          />
        </app-card>
        <app-card
          colClasses="col-xl-4 col-lg-5 col-md-5 col-sm-6 col-12"
          :heading="$t('message.monthlyStatistics')"
          customClasses="general-dashboard-doughnut-chart"
        >
          <visitor-stat
            :total="Number(this.totalLogs)"
            :labels="visitorTypes"
            :data="[filteredByTypes[0].length, filteredByTypes[1].length]"
            :bgColor="[ChartConfig.color.lightGrey, ChartConfig.color.primary]"
          />
        </app-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { ChartConfig } from "Constants/chart-config";
import { groupByKey } from "Helpers/helpers"

import IndexesBlock from "../commons/fr-indexes-block";
import VisitorsCollection from "../fr-charts/VisitorsCollectionByMonth";
import VisitorStat from "../fr-detection-logs/VisitorStat";

export default {
  data() {
    return {
      totalLogs: Number,
      visitorTypes: [],
      ChartConfig,
    };
  },
  components: {
    IndexesBlock,
    VisitorsCollection,
    VisitorStat,
  },
  mounted() {
    this.totalLogs = this.objDLOffline.rows.length;
    Object.keys(this.groupByType).forEach((key) => {
      this.visitorTypes.push(key);
    });
  },
  computed: {
    ...mapGetters(["fDLO", "fDetectionLogsOnline1", "fDetectionLogsOffline"]),
    objDLO: {
      get: function () {
        return this.fDLO;
      },
      set: function () {
        return this.fDLO;
      },
    },
    objDLOffline: {
      get: function () {
        return this.fDetectionLogsOffline;
      },
      set: function () {
        return this.fDetectionLogsOffline;
      },
    },
    filteredByTypes() {
      let arrRU = [],
        arrGuest = [];

      arrRU = this.objDLOffline.rows.filter(
        (item) => item.type.toLowerCase().trim() === "stranger"
      );
      arrGuest = this.objDLOffline.rows.filter(
        (item) => item.type.toLowerCase().trim() === "employee"
      );

      return [arrRU, arrGuest];
    },
    groupByType() {
      return groupByKey(this.objDLOffline.rows, "type");
    },
    
  },
  methods: {},
};
</script>