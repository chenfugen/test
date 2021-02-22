<template lang="html">
<div class="sim">
	<!-- 表单组件 -->
	<formComp ref='filterForm' :inline='true' :formConf='filterFormConf'></formComp>
	<!-- 操作按钮 -->
	<el-button icon="el-icon-search" size='small' type='primary' @click='getTableData' circle/>
	<el-upload
		class="upload"
		action="/api/web/simcard/import"
		:on-success='handleOnSuccess'
		:show-file-list="false"
		:headers="{
			token
		}"
	>
		<el-button size="small" type="primary">导入</el-button>
	</el-upload>
	<el-button type="primary" size='small' @click='handleExport'>导出</el-button>
	<el-button type="primary" size='small' @click='getImportTemplate'>下载模版</el-button>
	<!-- 表格组件 -->
	<tableComp ref='table' :tableConf='tableConf' :tableActConf='tableActConf' class="marginTop"></tableComp>
</div>
</template>

<script>
import tableComp from '@/components/tableComp'
import formComp from '@/components/formComp'
import staticData from '@/staticData/simStatic.js'
export default {
	name: 'sim',
	data() {
		return {
			tableConf: staticData.tableConf,
			tableActConf: staticData.tableActConf,
			filterFormConf: staticData.filterFormConf,
			token: sessionStorage.getItem('token')
		}
	},
	components: {
		'tableComp': tableComp,
		'formComp': formComp
	},
	mounted() {
		this.getTableData()
	},
	methods: {
		getTableData() {
			const api = this.$api.sim_card_page
			const para  = this.$refs.filterForm.handleSubmit()
			this.$refs.table.getTableData(api, para)
		},
		// 复机
		handleOpenSim(row) {
			const para = {
				iccid: row.iccid,
			}
			this.$confirm('确认将卡（' + row.iccid + '）复机吗？', '确认信息', {
				distinguishCancelAndClose: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(() => {
				this.$Ax.post(this.$api.open_sim, para)
					.then(res => {
						if (res.success) {
							this.getTableData()
						}
					})
			}).catch(() => {});
		},
		// 停机
		handleCloseSim(row) {
			const para = {
				iccid: row.iccid,
			}
			this.$confirm('确认将卡（' + row.iccid + '）停机吗？', '确认信息', {
				distinguishCancelAndClose: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(() => {
				this.$Ax.post(this.$api.close_sim, para)
					.then(res => {
						if (res.success) {
							this.getTableData()
						}
					})
			}).catch(() => {});
		},
		// 查看网卡使用详情
		handleGoInfo(row) {
			this.$router.push(`/sim/info?iccid=${row.iccid}&id=${row.id}`)
		},
		// 下载模版
		getImportTemplate() {
			this.$Ax.get('/api/web/simcard/downloadModel', { responseType: 'blob' })
		},
		// 导出
		handleExport() {
			const para  = this.$refs.filterForm.handleSubmit()
			this.$Ax.get('/api/web/simcard/export', { responseType: 'blob', params: { ...para } })
		},
		handleOnSuccess(response) { // 上传前
			this.$message.success(response.msg)
		},
	}
}
</script>

<style scoped>
	.upload {
		display: inline-block;
		margin:0 10px;
	}
</style>
