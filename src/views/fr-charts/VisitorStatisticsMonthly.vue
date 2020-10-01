<template>
   <div class="device-share-wrap">
      <div class="mb-2 pos-relative">
         <visitor-statistics-monthly
            :height="240"
            :data="objData"
         >
         </visitor-statistics-monthly>
         <div class="overlay-content d-custom-flex justify-center align-items-center">
            <span class="grey--text font-2x fw-semi-bold">{{ this.total }}</span>
         </div>
      </div>
      <div class="hidden-xs-only">
         <div v-if="this.isGuest" class="d-custom-flex widget-footer">
            <div class="fs-12 fw-normal grey--text">
               <span class="v-badge grey px-2 py-1"></span>
               <span class="d-block">{{ this.pG }}%</span>
               <span class="d-block">{{$t('message.stranger')}}</span>
            </div>
            <div class="fs-12 fw-normal grey--text">
               <span class="v-badge primary px-2 py-1"></span>
               <span class="d-block">{{ this.pRU }}%</span>
               <span class="d-block">{{$t('message.employee')}}</span>
            </div>
         </div>
         <div v-else class="d-custom-flex widget-footer">            
            <div class="fs-12 fw-normal grey--text">
               <span class="v-badge primary px-2 py-1"></span>
               <span class="d-block">{{ this.pRU }}%</span>
               <span class="d-block">{{$t('message.employee')}}</span>
            </div>
            <div class="fs-12 fw-normal grey--text">
               <span class="v-badge grey px-2 py-1"></span>
               <span class="d-block">{{ this.pG }}%</span>
               <span class="d-block">{{$t('message.stranger')}}</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import VisitorStatisticsMonthly from "./VisitorStatisticsMonthlyPieChart";

// constants
import { ChartConfig } from "Constants/chart-config";

//data
import { devicesShare } from "../../views/dashboard/data";

export default {
   data() {
      return {
         objData: {
            labels: this.arrLabel,
            data: this.arrData,
            backgroundColor: this.backgroundColors
         },
         isGuest: true,
         total:0,
         pRU: 0,
         pG:0,
         arrPercentage: [],
         arrNewLabels: [],
         ChartConfig,
         devicesShare,
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
      VisitorStatisticsMonthly
   },
   mounted() {
      Object.values(this.arrData).forEach(val => {
         this.total += val;
      });

      for (let i = 0; i < this.arrLabel.length; i++) {
         if(String(this.arrLabel[i]).toLowerCase() === "registered users") {
            this.isGuest = false;
            this.pRU =(this.arrData[i] / this.total * 100).toFixed(2)
            this.arrPercentage.push(this.pRU);
         } else {
            this.pG = (this.arrData[i] / this.total * 100).toFixed(2)
               this.arrPercentage.push(this.pG);
         }
      }  
   },
   methods:{
      getPercentageChange(ru, g){
         var decreaseValue = ru - g;
         return (decreaseValue / ru) * 100;
      }
   },
};
</script>