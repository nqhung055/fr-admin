<template>
	<div class="sales-chart-wrap d-custom-flex justify-space-between">
		<register-vs-unregistered
			:labels="yesterday.labels"
			:websiteViews="yesterday.websiteViews"
			:emailSubscription="yesterday.emailSubscription"
			:height="288"
			class="pa-3"
		>
		</register-vs-unregistered>		
	</div>
</template>

<script>
import RegisterVsUnregistered from "../../views/fr-charts/RegisterVsUnregistered";
export default {
	data() {
		return {
			yesterday: {
			labels: ["12:00 AM", "4:00 AM", "8:00 AM", "12:00 PM", "16:00 PM"],
			websiteViews: [600, 900, 660, 750, 800],
			emailSubscription: [400, 550, 400, 400, 450]
			},
			last5Days: {
			labels: ["Mon", "Tue", "Wed", "Thur", "Fri"],
			websiteViews: [600, 900, 725, 1000, 460],
			emailSubscription: [400, 700, 500, 625, 400]
			},
			last1Month: {
			labels: ["1-5", "6-10", "11-15", "16-20", "21-25"],
			websiteViews: [800, 700, 725, 600, 900],
			emailSubscription: [700, 600, 400, 400, 500]
			},
			last5Months: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May"],
			websiteViews: [1000, 700, 725, 625, 600],
			emailSubscription: [800, 450, 550, 500, 450]
			}
		};
	},
	components: {
		RegisterVsUnregistered
	}
};
</script>
