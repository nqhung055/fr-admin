<template>
	<div>
      <div class="pos-relative mb-5">
         <vistior-percentage :height="180" :dt="this.arrData" :lbl="this.arrNewLabels" />
         <div class="overlay-content d-custom-flex justify-center align-items-center">
            <span class="grey--text font-2x fw-semi-bold">{{ this.total }}</span>
         </div>
      </div>
      <div class="d-custom-flex px-4 justify-space-between align-items-center">
         <div class="fs-12 fw-normal grey--text">
            <span class="v-badge rounded success mr-2"></span>
            <span>{{$t('message.employee')}}: {{ this.pRU }}%</span>
         </div>
         <div class="fs-12 fw-normal grey--text">
            <span class="v-badge rounded error mr-2"></span>
            <span>{{$t('message.stranger')}}: {{ this.pG }}%</span>
         </div>
      </div>
   </div>
</template>

<script>
	import VistiorPercentage from "../fr-charts/VistiorPercentagePieChart";
	export default {
      data() {
         return {
            total:0,
            pRU: 0,
            pG:0,
            arrPercentage: [],
            arrNewLabels: [],
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
         totalCount: {
            type: Number,
            default: () => 0
         } 
      },
		components: {
			VistiorPercentage
      },
      mounted() {
         Object.values(this.arrData).forEach(val => {
            this.total += val;
         });
         this.pRU =(this.arrData[0] / this.total * 100).toFixed(2)
         this.arrPercentage.push(this.pRU);
         this.pG = (this.arrData[1] / this.total * 100).toFixed(2)
         this.arrPercentage.push(this.pG);
         Object.values(this.arrLabel).forEach(val => {
            if (String(val).toLowerCase() === "registered_user") {
               this.arrNewLabels.push("Registered User");
            } else {
               this.arrNewLabels.push("Guest");
            }
         });
      },
      methods:{
         getPercentageChange(ru, g){
            var decreaseValue = ru - g;
            return (decreaseValue / ru) * 100;
         }
      },
      computed: {
      },
	};
</script>
