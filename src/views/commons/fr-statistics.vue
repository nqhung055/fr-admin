<template>
   <div>
      <div class="top-selling-widget">
         <slick :options="slickOptions">
            <div v-for="(item,index) in indexStatistics" :key="index">
               <div class="align-items-center d-custom-flex mb-4">
                  <div class="crypto-icon-wrap inline-block mr-3 font-2x">
                     <i :class="item.icon"></i>
                  </div>   
                  <div class="inline-block">
                     <h4 class="mb-0">{{ item.name }}</h4>
                  </div>   
               </div>
               <div class="mb-4">
                  <index-statistics-line-chart
                     :dataSet="item.data"
                     :lineTension="0.4"
                     :dataLabels="item.chartLabel"
                     :width="400"
                     :height="80"
                     :borderWidth=3
                     :enableGradient= false
                     :enableShadow="true"
                     :shadowColor= item.chartBorderColor
                     :borderColor= item.chartBorderColor>
                  </index-statistics-line-chart>
               </div>
               <div class="chart-info d-custom-flex align-items-center justify-space-between mb-4"> 
                  <v-badge :value=false class="primary pa-2">{{$t('message.today')}} {{ format_date(new Date()) }}</v-badge>
                  <span class="primary--text font-md"><i class="primary--text mr-2" :class="item.percentageIcon"></i>{{ item.percentage }}</span>
               </div>  
               <span class="subheading"><strong class="success--text mr-1">{{ item.market_cap }}</strong> {{$t('message.value')}}</span>
            </div>
         </slick>
      </div>
   </div>
</template>

<script>
import Slick from "vue-slick";
import { indexStatistics } from '../fr-charts/data.js'
import IndexStatisticsLineChart from "../fr-charts/IndexStatisticsLineChart";
import moment from 'moment';

export default {
  components: {
    Slick,
    IndexStatisticsLineChart,
  },
  data() {
    return {
      indexStatistics,
      slickOptions: {
         infinite: true,
         speed: 1000,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: true,
         dots: false,
         fade: true,
         cssEase: 'linear',
         arrows: false,
         rtl: this.$store.getters.rtlLayout

      },
    };
  },
  methods: { 
      format_date(value){
         if (value) {
           return moment(value).format('DD-MM-YYYY')
          }
      },
   },
};
</script>
