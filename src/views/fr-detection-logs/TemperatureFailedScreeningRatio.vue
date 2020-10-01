<template>
	<div>
      <div class="pos-relative mb-5">
         <temperature-screening-failed-chart :height="180" />
         <div class="overlay-content d-custom-flex justify-center align-items-center">
            <span class="grey--text font-2x fw-semi-bold">320</span>
         </div>
      </div>
      <div class="d-custom-flex px-4 justify-space-between align-items-center">
         <div class="fs-12 fw-normal grey--text">
            <span class="v-badge rounded success mr-2"></span>
            <span>Pass: 70%</span>
         </div>
         <div class="fs-12 fw-normal grey--text">
            <span class="v-badge rounded error mr-2"></span>
            <span>Failed: 30%</span>
         </div>
      </div>
   </div>
</template>

<script>
	import TemperatureScreeningFailedChart from "../fr-charts/TemperatureScreeningFailed";
	export default {
		components: {
			TemperatureScreeningFailedChart
		}
	};
</script>
