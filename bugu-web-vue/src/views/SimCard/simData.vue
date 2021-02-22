<template lang="html">
	<div class="simData">
		<el-row :gutter="24">
			<el-col :span="8"><div id="myPieChart" :style="{ height: '500px', background: '#fff' }"></div></el-col>
			<el-col :span="16"><div id="myLineChart" :style="{ height: '500px', background: '#fff' }"></div></el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'simData',
	data() {
		return {
			lineOption: {
				width: 'auto',
				title: {
					text: '7日GPRS总量（MB）'
				},
				grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
				},
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				},
				tooltip: {
						trigger: 'axis'
				},
				yAxis: {
					axisLabel: {
						formatter: '{value} M'
					},
					type: 'value'
				},
				series: [{
					data: [820, 932, 901, 934, 1290, 1330, 1320],
					smooth: true,
					type: 'line'
				}]
			},
			pieOption: {
				width: 'auto',
				title: {
					text: '流量使用情况（MB）'
				},
				tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				series : [
						{
							name: '使用量',
							type: 'pie',
							radius : '50%',
							center: ['50%', '50%'],
							data:[
									{value: 70, name:'已使用'},
									{value: 30, name:'未使用'},
							],
							itemStyle: {
									emphasis: {
										shadowBlur: 10,
										shadowOffsetX: 0,
										shadowColor: 'rgba(0, 0, 0, 0.5)'
									}
							}
						}
				]
			}
		}
	},
	mounted() {
		const myPieChart = this.$echarts.init(document.getElementById('myPieChart'))
		myPieChart.setOption(this.pieOption)
		const myLineChart = this.$echarts.init(document.getElementById('myLineChart'))
		myLineChart.setOption(this.lineOption)
		window.onresize = () => {
			myPieChart.resize();
			myLineChart.resize();
		}
	},
	methods: {}
}
</script>

<style scoped>
</style>
