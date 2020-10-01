// Weekly Summary Widget
import { Bar } from 'vue-chartjs'

export default {
	extends: Bar,
	data: function () {
		return {
			gradient1: null,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				maxBarThickness: 0,
				scales: {
					yAxes: [{
						ticks: {
							stepSize: 5
						},
						gridLines: {
							display: true
						}
					}],
					xAxes: [{
						gridLines: {
							display: true,
						},
					}]
				},
				legend: {
					display: true
				}
			}
		}
	},
	mounted() {
		this.gradient1 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 250)
		this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 250)

		this.gradient1.addColorStop(0, '#3B7CFF')
		this.gradient1.addColorStop(1, '#1E3C72')
		this.gradient2.addColorStop(0, '#4BCCFF')
		this.gradient2.addColorStop(1, '#3EEC72')

		this.renderChart({
			labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			datasets: [
				{
					label: 'Body',
					barPercentage: 0.4,
					backgroundColor: this.gradient1,
					hoverBackgroundColor: this.gradient1,
					data: [27.6, 27.8, 28.0, 29.33, 30.06, 29.12, 27.52]
				},
				{
					label: 'Room',
					barPercentage: 0.4,
					backgroundColor: this.gradient2,
					hoverBackgroundColor: this.gradient2,
					data: [28.2, 21.3, 26.80, 21.11, 29.30, 29.6, 25.22]
				}
			]
		}, this.options)
	}
}
