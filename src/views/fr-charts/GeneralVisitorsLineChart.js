import { Line } from 'vue-chartjs'
import { ChartConfig } from "Constants/chart-config";

const lineTension = lineTension;
const borderWidth = 3;
const pointRadius = 7;
const pointBorderWidth = 2;


export default {
	extends: Line,
	props: {
		xLabel: {
			type: String,
			default: "x-Axes"
		},
		yLabel: {
			type: String,
			default: "y-Axes"
		},
		types: {
			type: Array,
			default: [String, String]
		},
		labels: {
			type: Array,
			default: []
		},
		dataSets: {
			type: Array,
			default: [[], []]
		}
	},
	data() {
		return {
			options: {
				scales: {
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: this.yLabel
						},
						gridLines: {
							display: true,
							drawBorder: false
						},
						ticks: {
							// reverse: false,
							stepSize: 100,
							display: true
						}
					}],
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: this.xLabel
						},
						gridLines: {
							display: false,
							drawBorder: false
						},
						ticks: {
							display: true
						}
					}]
				},
				legend: {
					display: true
				},
				responsive: true,
				maintainAspectRatio: false
			}
		}
	},
	computed: {
	},
	mounted() {
		this.renderChart({
			labels: this.labels,
			datasets: [
				{
					label: this.types[0],
					lineTension,
					borderColor: ChartConfig.color.primary,
					pointBorderColor: ChartConfig.color.primary,
					pointBorderWidth,
					pointRadius,
					fill: false,
					pointBackgroundColor: ChartConfig.color.primary,
					borderWidth,
					data: this.dataSets[0]
				},
				{
					label: this.types[1],
					lineTension,
					borderColor: ChartConfig.color.warning,
					pointBorderColor: ChartConfig.color.warning,
					pointBorderWidth,
					pointRadius,
					fill: false,
					pointBackgroundColor: ChartConfig.color.warning,
					borderWidth,
					data: this.dataSets[1]
				}
			]
		}, this.options);
		// this.getData();
	},
	methods: {
		getData() {
			this.labels.forEach(element => {
				return console.log('. visitorType: ' + element);
			})
		}
	},
}
