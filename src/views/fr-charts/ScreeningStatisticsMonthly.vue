<template>
   <div class="device-share-wrap">
      <div class="mb-2 pos-relative">
         <screening-statistics-monthly
            :height="240"
            :data="objData"
         >
         </screening-statistics-monthly>
         <div class="overlay-content d-custom-flex justify-center align-items-center">
            <span class="grey--text font-2x fw-semi-bold">{{ this.total }}</span>
         </div>
      </div>
      <div class="hidden-xs-only">
         <div v-if="this.isFailed" class="d-custom-flex widget-footer">
            <div class="fs-12 fw-normal grey--text">
               <span class="v-badge red px-2 py-1"></span>
               <span class="d-block">{{ this.f }}%</span>
               <span class="d-block">{{$t('message.failed')}}</span>
            </div>
            <div class="fs-12 fw-normal grey--text">
               <span class="v-badge success px-2 py-1"></span>
               <span class="d-block">{{ this.p }}%</span>
               <span class="d-block">{{$t('message.pass')}}</span>
            </div>
         </div>
         <div v-else class="d-custom-flex widget-footer">            
            <div class="fs-12 fw-normal grey--text">
               <span class="v-badge success px-2 py-1"></span>
               <span class="d-block">{{ this.p }}%</span>
               <span class="d-block">{{$t('message.pass')}}</span>
            </div>
            <div class="fs-12 fw-normal grey--text">
               <span class="v-badge red px-2 py-1"></span>
               <span class="d-block">{{ this.f }}%</span>
               <span class="d-block">{{$t('message.failed')}}</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import ScreeningStatisticsMonthly from "./ScreeningStatisticsMonthlyPieChart";

// constants
import { ChartConfig } from "Constants/chart-config";

export default {
   data() {
      return {
         objData: {
            labels: this.arrLabel,
            data: this.arrData,
            backgroundColor: this.backgroundColors
         },
         isFailed: true,
         total:0,
         p: 0,
         f:0,
         arrPercentage: [],
         arrNewLabels: [],
         ChartConfig,
      };
   },
   props: {
      arrData: { 
         type: Array,
         default: () => []
      },
      arrLabel: { 
         type: Array,
         default: () => []
      },
      backgroundColors: { 
         type: Array,
         default: () => []
      },
      labels: {
         type: Array,
         default: () => ['', '']
      },
      data: {
         type: Array,
         default: () => [Number, Number]
      }
   },
   components: {
      ScreeningStatisticsMonthly
   },
   mounted() {
      Object.values(this.arrData).forEach(val => {
         this.total += val;
      });

      for (let i = 0; i < this.arrLabel.length; i++) {
         if(String(this.arrLabel[i]).toLowerCase() === "passed") {
            this.isFailed = false;
            this.p =(this.arrData[i] / this.total * 100).toFixed(2)
            this.arrPercentage.push(this.p);
         } else {
            this.f = (this.arrData[i] / this.total * 100).toFixed(2)
            this.arrPercentage.push(this.f);
         }
      } 
   },
   methods:{
      getPercentageChange(p, f){
         var decreaseValue = p - f;
         return (decreaseValue / p) * 100;
      }
   },
};
</script>