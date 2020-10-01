<template>
  <v-row>
    <v-col xl="3" lg="3" md="6" sm="12" cols="6" class="stats-widget-v3">
      <index-stats :title="$t('message.employee')" value="95" body="+5% from yesterday" :status="1"></index-stats>
    </v-col>
    <v-col xl="3" lg="3" md="6" sm="12" cols="6" class="stats-widget-v3">
      <index-stats :title="$t('message.stranger')" value="45" body="+5% from yesterday" :status="1"></index-stats>
    </v-col>
    <v-col xl="3" lg="3" md="6" sm="12" cols="6" class="stats-widget-v3">
      <index-stats
        :title="$t('message.totalEmployee')"
        :value="this.totalEmp"
        body="-2% from yesterday"
        :status="0"
      ></index-stats>
    </v-col>
    <v-col xl="3" lg="3" md="6" sm="12" cols="6" class="stats-widget-v3">
      <index-stats
        :title="$t('message.totalStranger')"
        :value="this.totalGuest"
        body="+5% from yesterday"
        :status="1"
      ></index-stats>
    </v-col>
  </v-row>
</template>
<script>
import IndexStats from "./IndexStats";

export default {
  props: {
    visitors: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    IndexStats,
  },
  mounted() {
    // console.log('Visitors: ' + Object.keys(this.visitors).length);
    // Object.values(this.visitors).forEach(element => {
    //   console.log('Visitors: ' + element[0]["type"] + ' - length: ' + Object.keys(element).length);
    // });
    // this.getTotalByKey();
    /* this.totalEmp = function() {
      return 0;
    }; */
    this.getSumByToday();
  },
  data() {
    return {
      totalEmp: 0,
      totalGuest: 0,
    };
  },
  computed: {
    
  },
  methods: {
    getTotalByKey() {
      for (let index = 0; index < Object.keys(this.visitors).length; index++) {
        if (String(Object.keys(this.visitors)[index]).toLowerCase() === 'employee')
          this.totalEmp = Object.values(this.visitors)[index].length;
        else
          this.totalGuest = Object.values(this.visitors)[index].length;
      }
    },
    getSumByToday() {
      // console.log('Key: ' +  Object.keys(this.visitors));
      for (let index = 0; index < Object.keys(this.visitors).length; index++) {
        if (new Date(Object.keys(this.visitors)[index]).toDateString() === new Date().toDateString()) {
          // console.log('Visitors: ' + Object.values(this.visitors)[index].length);
        }
      }
    },
  }
};
</script>
