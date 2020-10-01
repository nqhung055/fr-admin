import { Doughnut } from 'vue-chartjs'

export default {
	extends: Doughnut,
	props: ['data'],
	data() {
		return {
			arrNewLabels: [],
			arrNewBgColors: [],
			options: {
				legend: {
					display: false
				},
				cutoutPercentage: 70,
				padding: 20,
			},
		}
	},
	mounted() {
		const { labels, data, backgroundColor } = this.data;
		this.renderChart({
			labels,
			datasets: [{
				data,
				backgroundColor: backgroundColor,
				borderWidth: [0, 0, 0],
				hoverBackgroundColor: backgroundColor
			}]
		}, this.options)
	},
	methods: {},
}
