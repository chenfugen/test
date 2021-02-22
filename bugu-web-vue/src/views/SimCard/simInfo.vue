<template lang="html">
<div class="simInfo">
	<el-row :gutter="20">
		<el-col class="mb-20" :span="6">sn：{{info.snCode}}</el-col>
		<el-col class="mb-20" :span="6">总流量：{{info.totalFlow}}</el-col>
		<el-col class="mb-20" :span="6">已使用流量：{{info.usedFlow}}</el-col>
		<el-col class="mb-20" :span="6">激活时间：{{info.activeTime}}</el-col>
		<el-col class="mb-20" :span="12">套餐名称：{{info.pkgName}}</el-col>
	</el-row>
	<!-- 操作按钮 -->
	<div>
    <el-radio-group v-model="type" @change="handleChange">
      <el-radio-button label="day">七天</el-radio-button>
      <el-radio-button label="month">一个月</el-radio-button>
      <el-radio-button label="year">一年</el-radio-button>
    </el-radio-group>
  </div>
	<div id="myChart" :style="{ height: '500px' }"></div>
</div>
</template>

<script>
export default {
	name: 'simInfo',
	data() {
		return {
			iccid: this.$route.query.iccid,
			id: this.$route.query.id,
			info: {},
			type: 'day',
			myChart: null,
		}
	},
	mounted() {
		this.myChart = this.$echarts.init(document.getElementById('myChart'))
		window.onresize = () => {
			this.myChart.resize();
		}
		this.$Ax.get(this.$api.sim_info_data, { params: { id: this.id } }).then((res) => {
			if (res.success) {
				this.info = res.data
			}
		});
		this.getChartData()
	},
	methods: {
		getChartData() {
			let data = {};
			switch (this.type) {
				case 'day':
					data = {
						num: 7,
						type: 'day'
					}
					break;
				case 'month':
					data = {
						num: 30,
						type: 'day'
					}
					break;
				case 'year':
					data = {
						num: 12,
						type: 'month'
					}
					break;
				default:
					data = {
						num: 7,
						type: 'day'
					}
					break;
			}
			this.$Ax.get(this.$api.sim_chart_data, { params: { ...data, iccid: this.iccid } })
				.then(res => {
					if (res.success) {
						this.myChart.setOption({
							width: 'auto',
							grid: {
									left: '3%',
									right: '4%',
									bottom: '3%',
									containLabel: true
							},
							xAxis: {
								type: 'category',
								data: res.data.date
							},
							tooltip: {
									trigger: 'axis'
							},
							yAxis: {
								axisLabel: {
									formatter: '{value} MB'
								},
								type: 'value'
							},
							series: [{
								data: res.data.flow,
								smooth: true,
								type: 'line'
							}]
						})
						this.chartData = res.data;
					}
				})
		},
		// 时间改变
		handleChange() {
			this.getChartData();
		},
	}
}
</script>

<style scoped>
	.mb-20 {
		margin-bottom: 20px;
	}
</style>
